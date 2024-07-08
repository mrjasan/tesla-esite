'use client'
import { ZapOff } from "lucide-react";
import MainContent from "./components/MainContent";
import { Button } from "./components/ui/button";
import Link from "next/link";
import { useSite } from "./hooks/useSite";
export default function Home() {
  const siteManager = useSite();
  return (
    <MainContent>
      <div className="min-h-[768px] w-full h-full flex flex-col justify-center items-center">
        <div className="w-full flex  items-center justify-center mb-10">
          <ZapOff size={128} className="text-gray-400" />
          <h1 className="text-gray-400 text-2xl font-bold m-6">
            Page not found
          </h1>
        </div>
        <div className="w-full flex justify-center items-center mx-auto ">
          <Button variant={"link"} className="w-48 h-10 text-gray-400" onClick={siteManager.create}>
            New Site
          </Button>
          <Button variant={"link"} className="w-48 h-10 text-gray-400">
            <Link href="/sites">Manage Sites</Link>
          </Button>
        </div>
      </div>
    </MainContent>
  );
}
