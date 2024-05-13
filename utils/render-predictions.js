export const renderPredictions=(predictions,ctx) =>{
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    //fonts
    const font="16px sans-serif"
    ctx.font=font
    ctx.textBaseline="top"

    predictions.forEach(prediction =>{
      const [x,y,width,height]=  prediction["bbox"]

      const isPerson =prediction.class==="person";         

      //bounding box
      // ctx.strokeStyle=isPerson ? "red":"green"
      ctx.strokeStyle="green"
      ctx.lineWidth=4;
      ctx.strokeRect(x,y,width,height)
      
      //label
        // fill the color
    // ctx.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`; // Set the fill color to red
    ctx.fillStyle = `rgba(0, 0, 0, 0.2)`
    ctx.fillRect(x, y, width, height);

    // Draw the label background.
    // ctx.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
    ctx.fillStyle ="#00FFFF";
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10); // base 10
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

    ctx.fillStyle = "green";
    ctx.fillText(prediction.class, x, y);
        })
}