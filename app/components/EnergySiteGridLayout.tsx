"use client"; // let's make sure this component is treated as a Client Component
// components/EnergySiteGridLayout.tsx
import React from "react";
import GridLayout from "react-grid-layout";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import EnergySite from "../lib/energySite";
import { devices } from "../data";
import { PlugZap } from "lucide-react";
import { HousePlug } from "lucide-react";


const EnergySiteGridLayout: React.FC = () => {
  const siteConfig = useSelector((state: RootState) => state.siteConfig);
  const eSite = new EnergySite(siteConfig);
  const gridLayout = eSite.getGridLayout();

  return (
    <div className="p-4 bg-white h-auto overflow-scroll border-dashed border rounded-md">
      <GridLayout
        className="layout w-full bg-green-200"
        layout={gridLayout.items.map((item, index) => ({
          i: `${item.deviceId}-${index}`,
          x: item.x,
          y: item.y,
          w: item.width,
          h: item.depth,
        }))}
        autoSize={true}
        isResizable={false}
        isDroppable={false}
        isDraggable={false}
        isBounded={true}
        cols={100}
        rowHeight={20}
        maxRows={10}
        width={1000}
        margin={[0, 0]}
      >
        {gridLayout.items.map((item, index) => {
          const device = devices.find((device) => device.id === item.deviceId);
          const { name, dimensions, id } = device || {
            name: "",
            dimensions: {},
          };
          const isTransformer = id === "transformer";
          return (
            <div key={`${item.deviceId}-${index}`} className="p-1  bg-red-100">
              <div className="h-full space-y-2 bg-gray-100 border border-gray-200 shadow-md rounded-md flex flex-col justify-center items-center">
                {isTransformer ? (
                  <PlugZap
                    size={32}
                    className="text-green-300"
                    strokeWidth={1.5}
                  />
                ) : (
                  <HousePlug
                    size={32}
                    className="text-green-300"
                    strokeWidth={1.5}
                  />
                )}
                <p className="text-sm text-gray-600 font-semibold">{name}</p>
                <p className="text-xs text-gray-400">
                  {dimensions.width} x {dimensions.depth}
                </p>
              </div>
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default EnergySiteGridLayout;
