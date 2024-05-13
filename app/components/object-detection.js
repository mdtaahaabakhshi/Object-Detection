"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from '@tensorflow/tfjs'
import {renderPredictions} from "@/utils/render-predictions";
let detectInterval;

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true);

const canvasRef=useRef(null)
const webcamRef=useRef(null)

// async function  runCoco () {
  const runCoco = async () => {
    setIsLoading(true);
    const model = await cocoSSDLoad();
    setIsLoading(false);
    
    detectInterval=setInterval(() => {
      runObjectDetection(model)
    }, 10);
  };

  const runObjectDetection =async(model)=>{
            if (
              canvasRef.current  &&
              webcamRef.current.video.readyState === 4
            ) {
             canvasRef.current.width = webcamRef.current.video.videoWidth;
             canvasRef.current.height= webcamRef.current.video.videoHeight;
          
             //find detected objects
             const detectedObjects = await model.detect(webcamRef.current.video,undefined,0.6);
            //  console.log("Detected Objects: ", detectedObjects);
            const context= canvasRef.current.getContext("2d");
            renderPredictions(detectedObjects,context);
            }
  }

 const showmyvideo = () => {
  if (
    webcamRef.current !== null &&
    webcamRef.current.video?.readyState === 4 
  ) {
    const myvideoWidth = webcamRef.current.video.videoWidth;
    const myvideoHeight = webcamRef.current.video.videoHeight;

    webcamRef.current.video.width = myvideoWidth;
    webcamRef.current.video.height = myvideoHeight;
  }
 }

useEffect(() => {
runCoco();
showmyvideo();
}, [])

  return (
    <div className="mt-4 overflow-hidden ">
      { 
      isLoading ?  (
      <div className="gradient-text">Loading AI Model...</div>
    ) : 
      <div className="relative flex justify-center w-full items-center align-middle gradient p-1.5 rounded-md">
        <Webcam
        ref={webcamRef} className="rouded-md w-full  lg:h-[520px]" muted />
        <canvas
        ref={canvasRef}
          className="absolute top-0 left-0 z-50  lg:h-[720px]"
        />
      </div>
      }
    </div>
  );
};

export default ObjectDetection;
