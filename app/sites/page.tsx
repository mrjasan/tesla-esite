"use client";

import MainContent from "@/app/components/MainContent";
import SiteCollectionManager from "../components/SiteCollectionManager";

export default function Home() {
  return (
    <MainContent>
      <div className="bg-neutral-100 py-4 px-10 w-full">
        <div className="w-full">
          <SiteCollectionManager />
        </div>
      </div>
    </MainContent>
  );
}
