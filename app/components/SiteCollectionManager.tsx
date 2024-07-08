"use client"; // let's make sure this component is treated as a Client Component
// components/EnergySiteGridLayout.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import EnergySite from "../lib/energySite";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { IndustrialSite } from "../types";
import { Button } from "./ui/button";
import { DatabaseZap, Ellipsis, Pencil, Plus, Trash2, Zap } from "lucide-react";
import { Decimals } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useSite } from "@/app/hooks/useSite";
import Link from "next/link";

const columns = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "area", label: "Area" },
  { key: "totalDevices", label: "Total Devices" },
  { key: "totalEnergy", label: "Total Energy" },
  { key: "actions", label: "" },
];
const SiteCollectionManager: React.FC = () => {
  const siteManager = useSite();
  const { sites } = useSelector((state: RootState) => state.siteCollection);
  const isEmpty = sites.length === 0;

  return (
    <div className="p-10 max-h-[748px] overflow-scroll mx-auto bg-white border shadow-md rounded-md w-2/3 min-w-[748px]">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-medium mb-5">Manage Sites</h3>
        {!isEmpty && (
          <Button
            className="h-8 px-3 "
            variant={"outline"}
            onClick={siteManager.create}
          >
            <Plus className="h-4 w-4 mr-2" /> New Site
          </Button>
        )}
      </div>

      {isEmpty ? (
        <div className="border border-dashed rounded-md p-20 text-center w-full mx-auto">
          <Button
            className="underline"
            onClick={siteManager.create}
            variant={"link"}
          >
            + Create a new site
          </Button>
        </div>
      ) : (
        <div className="border rounded-md p-2 w-full mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableHead
                      key={column.key}
                      className="h-8 p-2 text-sm text-gray-400"
                    >
                      <span>{column.label}</span>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sites.map((site: IndustrialSite) => {
                const eSite = new EnergySite(site.devices);
                return (
                  <TableRow key={site.id}>
                    <TableCell className="h-8 p-2" title="Edit Site">
                    <Link className="underline" href={`/sites/${site.id}`}>{site.name}</Link></TableCell>
                    <TableCell className="h-8 p-2">
                      {site.description}
                    </TableCell>
                    <TableCell className="h-8 p-2">
                      {Decimals.format(eSite.totalSquareFootage)} sqft
                    </TableCell>
                    <TableCell className="h-8 p-2">
                      <div className="flex items-center">
                        <DatabaseZap
                          className="h-4 w-4 mr-2 text-green-400"
                          strokeWidth={1.5}
                        />
                        <span>{eSite.totalDevices}</span>
                      </div>
                    </TableCell>
                    <TableCell className="h-8 p-2">
                      <div className="flex items-center">
                        <Zap
                          className="h-4 w-4 mr-2 text-green-400"
                          strokeWidth={1.5}
                        />
                        <span>{eSite.totalEnergy.toFixed(2)} MWh</span>
                      </div>
                    </TableCell>
                    <TableCell className="h-8 p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"ghost"}>
                            <Ellipsis size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem>
                            <div className="flex items-center">
                              <Link
                                className="flex flex-row"
                                href={`/sites/${site.id}`}
                              >
                                <Pencil
                                  className="h-4 w-4 mr-2 "
                                  strokeWidth={1.5}
                                />
                                <span>Edit</span>
                              </Link>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              siteManager.delete(site.id);
                            }}
                          >
                            <div className="flex items-center">
                              <Trash2
                                className="h-4 w-4 mr-2 "
                                strokeWidth={1.5}
                              />
                              Delete
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SiteCollectionManager;
