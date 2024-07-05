"use client"; // let's make sure this component is treated as a Client Component
// components/EnergySiteGridLayout.tsx
import React, { use, useEffect } from "react";
import GridLayout from "react-grid-layout";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import EnergySite from "../lib/energySite";
import { devices } from "../data";
import { LayoutTemplate, PlugZap, HousePlug } from "lucide-react";
import { Decimals } from "../lib/utils";
import { Button } from "./ui/button";

const EnergySiteGridLayout: React.FC = () => {
  
  const siteConfig = useSelector((state: RootState) => state.siteConfig);
  const eSite = new EnergySite(siteConfig.deviceCount);

  const [layout, setLayout] = React.useState<Array<any>>([]);
  
  const resetLayout = () => {
    const optimalLayout = eSite.getGridLayout();
    setLayout(optimalLayout.items);
  };

  useEffect(() => {
    resetLayout();
  }, [siteConfig]);

  return (
    <div className="p-4 bg-white flex flex-col items-center justify-center h-auto overflow-scroll rounded-md">
      <div className="flex flex-row justify-between items-center w-full">
        <div>&nbsp;</div>
        <div className="text-xs space-x-6 tracking-wide text-gray-500">
          <span>Area: {Decimals.format(eSite.totalSquareFootage)} sqft</span>
          <span>Total Energy: {Decimals.format(eSite.totalEnergy)} MWh</span>
          <span>
            Energy Density: {eSite.energyDensity.toFixed(2)} MWh / sqft
          </span>
        </div>
        <div>&nbsp;</div>
        {/* <div>
          <Button variant={"outline"}>
            <LayoutTemplate className="mr-2 h-4 w-4" />Reset
          </Button>
        </div> */}
      </div>
      <GridLayout
        className="layout w-[1200px] border-dashed border rounded-md my-4"
        layout={layout}
        draggableHandle=".draggable"
        isResizable={false}
        // isDraggable={true}
        // isBounded={false}
        cols={100}
        rowHeight={10}
        //maxRows={10}
        width={1200}
        // margin={[0, 0]}
        compactType={"vertical"}
        containerPadding={[20, 20]}
      >
        {layout.map((item) => {
          const device = devices.find((device) => device.id === item.deviceId);
          const { name, dimensions, id } = device || {
            name: "",
            dimensions: {},
          };
          const isTransformer = id === "transformer";
          return (
            <div
              key={item.i}
              className="select-none draggable p-0"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="draggable cursor-move w-full h-full space-y-1 bg-gray-100 border border-gray-200 shadow-md rounded-md flex flex-col justify-center items-center">
                {isTransformer ? (
                  <PlugZap
                    size={24}
                    className="text-green-300"
                    strokeWidth={1.5}
                  />
                ) : (
                  <HousePlug
                    size={24}
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
