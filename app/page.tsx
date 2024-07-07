import Link from "next/link";
import MainContent from "./components/MainContent";
import { Button } from "./components/ui/button";

const cover_style = {
  backgroundImage: "url('/img/megapack-2xl-scaled.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default function Home() {
  return (
    <MainContent>
      <div
        className="min-h-[768px] w-full h-full mx-auto flex-grow flex justify-center items-center"
        style={cover_style}
      >
        <div className="h-full items-center justify-between space-x-4 flex pt-80">
          <Button className="w-48 h-10 bg-indigo-500">
            <Link href="/site">New Site</Link>
          </Button>
          <Button className="w-48 h-10" variant={"outline"}>
            <Link href="/site">Open Site</Link>
          </Button>
        </div>
      </div>
    </MainContent>
  );
}
