"use client";

import Link from "next/link";
import MainContent from "./components/MainContent";
import { Button } from "./components/ui/button";
import { useSite } from "./hooks/useSite";

const cover_style = {
  backgroundImage: "url('/img/megapack-2xl-scaled.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default function Home() {
  const siteManager = useSite();

  return (
    <MainContent>
      <div
        className="min-h-[768px] w-full h-full mx-auto flex-grow flex"
        style={cover_style}
      >
        <div className="flex flex-col justify-center items-center w-full h-full bg-white bg-opacity-60">
          <div className="p-10 my-10 mx-auto text-center">
            <h1 className="text-4xl font-bold mb-5 text-black">
              Industrial Energy Site Manager
            </h1>
            <p className="pt-10 text-zinc-700">
              Welcome to Tesla&apos;s Industrial Energy Site Manager.<br></br>
              Get started by creating a new site or managing existing sites.
            </p>
          </div>
          <div className="items-center justify-between space-x-4">
            <Button
              className="w-48 h-10 bg-indigo-500"
              onClick={siteManager.create}
            >
              New Site
            </Button>
            <Button className="w-48 h-10" variant={"outline"}>
              <Link href="/sites">Manage Sites</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
