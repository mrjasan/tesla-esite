'use client';

import MainContent from "@/app/components/MainContent";
import SectionTitle from "@/app/components/SectionTitle";
import Sidebar from "@/app/components/Sidebar";
import SiteLayout from "@/app/components/SiteLayout";

export default function Home() {
  return (
    <MainContent>
      <div className="min-w-[24rem]">
        <Sidebar />
      </div>
      <div className="bg-neutral-100 py-4 px-10 w-full">
        <SectionTitle>Energy Site Layout</SectionTitle>
        <div className="w-full">
          <SiteLayout />
        </div>
      </div>
    </MainContent>
  );
}
