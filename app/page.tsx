import Image from "next/image";
import SectionTitle from "./components/SectionTitle";
import EnergySiteGridLayout from "./components/EnergySiteGridLayout";

export default function Home() {
  return (
    <div>
      <SectionTitle>Energy Site Layout</SectionTitle>
      <div className="w-full h-full">
        <EnergySiteGridLayout />
      </div>
    </div>
  );
}
