"use client";

import { Loading } from "@/app/components/Loading";
import MainContent from "@/app/components/MainContent";
import SectionTitle from "@/app/components/SectionTitle";
import Sidebar from "@/app/components/Sidebar";
import SiteLayout from "@/app/components/SiteLayout";
import { RootState } from "@/app/store";
import { IndustrialSite } from "@/app/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  // get the id as the last part of the pathname
  const id = parts[parts.length - 1];
  // get the industrial site from the store
  const { sites } = useSelector((state: RootState) => state.siteCollection);

  const [site, setSite] = useState<IndustrialSite | null>(null);

  useEffect(() => {
    const currentSite = sites.find((site) => site.id === id);
    if (currentSite) {
      setSite(currentSite);
    } else {
      router.push("/not-found");
    }
  }, [id, sites]);

  return (
    <MainContent>
      {site ? (
        <>
          <div className="min-w-[24rem]">
            <Sidebar site={site} />
          </div>
          <div className="bg-neutral-100 py-4 px-10 w-full">
            <SectionTitle>Energy Site Layout</SectionTitle>
            <div className="w-full">
              <SiteLayout site={site} />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </MainContent>
  );
}
