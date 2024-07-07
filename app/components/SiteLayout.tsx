"use client"; // let's make sure this component is treated as a Client Component
// components/EnergySiteGridLayout.tsx
import React from "react";
import GridLayout from "react-grid-layout";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import EnergySite from "../lib/energySite";
import { devices } from "../data";
import { LayoutTemplate } from "lucide-react";
import { Decimals } from "../lib/utils";
import DeviceGridCard from "./DeviceGridCard";

const SiteLayout: React.FC = () => {
  const siteConfig = useSelector((state: RootState) => state.siteConfig);
  const eSite = new EnergySite(siteConfig.deviceCount);
  const layout = eSite.getGridLayout().items;

  return (
    <div className="p-4 bg-white max-h-[748px] text-center overflow-scroll rounded-sm mx-auto">
      {eSite.isValid && (
        <div className="flex flex-row justify-between items-center w-full mx-auto">
          <div>&nbsp;</div>
          <div className="text-xs space-x-6 tracking-wider text-gray-500">
            <span>Area: {Decimals.format(eSite.totalSquareFootage)} sqft</span>
            <span>Energy: {eSite.totalEnergy.toFixed(2)} MWh</span>
            {Object.entries(siteConfig.deviceCount)
              .filter(([_, q]) => q)
              .map(([id, quantity]) => {
                const device = devices.find((device) => device.id === id);
                return (
                  <span key={id}>
                    {device?.name}: {quantity}
                  </span>
                );
              })}
          </div>
          <div>&nbsp;</div>
        </div>
      )}
      <div className="w-[1200px] h-full border-dashed border rounded-md my-4 mx-auto">
        {eSite.isValid ? (
          <GridLayout
            className="layout w-[1200px]"
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
              const device = devices.find(
                (device) => device.id === item.deviceId
              );
              return (
                <div
                  key={item.i}
                  className="select-none p-0"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <DeviceGridCard key={item.i} device={device!} />
                </div>
              );
            })}
          </GridLayout>
        ) : (
          <div className="text-center text-gray-500 min-h-48 p-4 items-center justify-center flex flex-col">
            <LayoutTemplate
              size={46}
              className="text-green-400"
              fill="#4ade80"
              strokeWidth={1.5}
            />
            <span className="mt-6">Add devices to preview the site layout</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteLayout;
