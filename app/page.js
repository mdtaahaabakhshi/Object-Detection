import ObjectDetection from "./components/object-detection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-8">
      <h1
      className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xltracking-tighter md:px- text-center">Object Detection</h1>
      <ObjectDetection />
    </main>
    
  );
}
