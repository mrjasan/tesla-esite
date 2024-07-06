"use client"; // let's make sure this component is treated as a Client Component
// components/EnergySiteGridLayout.tsx
import React, { use, useEffect } from "react";
import GridLayout from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import EnergySite from "../lib/energySite";
import { devices } from "../data";
import {
  LayoutTemplate,
  PlugZap,
  DatabaseZap,
  Zap,
  PlugZap2,
  ServerCrash,
  Trash2,
  Trash,
  Grip,
} from "lucide-react";
import { Decimals } from "../lib/utils";
import { removeDevice } from "../store/siteConfigSlice";

const EnergySiteGridLayout: React.FC = () => {
  const dispatch = useDispatch();
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
    <div className="p-4 bg-white flex flex-col items-center justify-center h-auto overflow-scroll rounded-sm">
      {eSite.isValid && (
        <div className="flex flex-row justify-between items-center w-full">
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
          {/* <div>
          <Button variant={"outline"}>
            <LayoutTemplate className="mr-2 h-4 w-4" />Reset
          </Button>
        </div> */}
        </div>
      )}
      <div className="w-[1200px] h-full border-dashed border rounded-md my-4">
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
              const { name, dimensions, energy, id } = device || {
                name: "",
                dimensions: {},
              };
              const isTransformer = id === "transformer";
              return (
                <div
                  key={item.i}
                  className="select-none p-0"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="w-full h-full bg-gray-100 border border-gray-200 shadow-md rounded-md p-2 flex flex-col justify-between">
                    <div className="flex flex-row justify-between text-xs text-gray-400">
                      <div className="cursor-move draggable flex flex-row justify-start space-x-1 items-center">
                        <Grip size={14} />
                        
                      </div>
                      <Trash
                        onClick={() => {
                          console.log("Delete click");
                          dispatch(removeDevice(item.deviceId));
                        }}
                        className="cursor-pointer"
                        size={14}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="w-full mx-auto text-center justify-center items-center flex flex-col space-y-3">
                    <span className="text-[10px] text-gray-400 tracking-wider">{name}</span>
                      {isTransformer ? (
                        <ServerCrash
                          size={40}
                          className="text-green-400"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <DatabaseZap
                          size={36}
                          className="text-green-400"
                          strokeWidth={1.5}
                        />
                      )}
                      
                        <span className="text-zinc-500 tracking-wide font-bold text-md mt-2">
                        {!isTransformer ? <span>{energy} MWh</span>:<span>&nbsp;</span> }
                        </span>
                      
                    </div>
                    <div className="text-right">
                      <span className="tracking-wider text-[9px] text-gray-400">
                        {dimensions.width} x {dimensions.depth} ft
                      </span>
                    </div>
                  </div>
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

export default EnergySiteGridLayout;
