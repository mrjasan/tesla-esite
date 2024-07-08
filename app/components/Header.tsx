"use client";

import React, { Fragment } from "react";
import Logo from "./Logo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";
import { capitalize } from "../lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "../store";
const exclude = ["not-found"];
const Header: React.FC = () => {

  const pathname = usePathname();
  const { sites } = useSelector((state: RootState) => state.siteCollection);
  const parts = pathname.split("/").filter(Boolean).filter((part) => !exclude.includes(part));
  const getUrl = (index: number) => {
    return `/${parts.slice(0, index + 1).join("/")}`;
  }
  const displayName = (part: string, index: number) => {
    if(index == 1) {
      const id = part
      const siteFound = sites.find((site) => site.id === id);
      if(siteFound) {
        return siteFound.name;
      }
    }
    return capitalize(part);
  }
  
  

  return (
    <header className="w-full py-4 px-10 border-b border-gray-100 shadow-sm flex items-center flex-row justify-between">
      <div className="space-y-3">
        <Logo />
        <div>
          <Breadcrumb>
            <BreadcrumbList className="text-xs tracking-wide text-zinc-400">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {parts.map((part, index) => {
                return (
                  <Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={getUrl(index)}>
                        {displayName(part, index)}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </header>
  );
};

export default Header;
