import Image from "next/image";
import SectionTitle from "./components/SectionTitle";

export default function Home() {
  return (
    <div>
      <SectionTitle>Site Visualization</SectionTitle>
      {/* Add your visualization components here */}
      <div className="w-full h-64 bg-gray-200">Visualization Area</div>
    </div>
  );
}
