"use client"; // let's make sure this component is treated as a Client Component

import { devices } from "../data";
import { Input } from "./ui/input";
import { Decimals, USDollar, cn } from "@/app/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addDevice, removeDevice } from "../store/siteConfigSlice";
import EnergySite from "../lib/energySite";
import DeviceSummary from "./DeviceSummary";


const ComponentManager: React.FC = () => {
  const dispatch = useDispatch();
  const siteConfig = useSelector((state: RootState) => state.siteConfig);
  const { deviceCount } = siteConfig;
  const eSite = new EnergySite(deviceCount);

  return (
    <div className="py-2">
      {devices.map((device) => {
        const quantity = deviceCount[device.id] || 0;
        const isTransformer = device.id === "transformer";
        return (
          <div
            key={device.id}
            className="mb-10 flex flex-row justify-between items-start"
          >
            <div className="w-full max-w-[340px] mr-2 p-0">
              <DeviceSummary device={device} />
            </div>
            <div className="flex flex-row space-x-2 items-center w-16">
              <button
                className={cn(
                  "text-gray-600",
                  isTransformer && "text-gray-300"
                )}
                disabled={isTransformer}
                onClick={() => dispatch(removeDevice(device.id))}
              >
                {isTransformer ? <span>&nbsp;&nbsp;</span> : <span>-</span>}
              </button>
              <Input
                className="w-12 h-10 rounded-sm text-center text-gray-500"
                type="number"
                disabled={isTransformer}
                value={quantity}
              />
              <button
                className={cn(
                  "text-gray-600",
                  isTransformer && "text-gray-300"
                )}
                disabled={isTransformer}
                onClick={() => dispatch(addDevice(device.id))}
              >
                {isTransformer ? <span>&nbsp;&nbsp;</span> : <span>+</span>}
              </button>
            </div>
          </div>
        );
      })}

      <div className="mb-10 flex flex-row justify-between items-start">
        <div className="">
          <p className="tracking-wide text-gray-550 text-sm">Estimated Area</p>
          <p className="text-xs text-gray-400 tracking-wide">
            Estimated area of the site
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-sm">
            {Decimals.format(eSite.totalSquareFootage)} sqft
          </p>
        </div>
      </div>
      <div className="mb-10 flex flex-row justify-between items-start">
        <div className="">
          <p className="tracking-wide text-gray-550 text-sm">Energy Density</p>
          <p className="text-xs text-gray-400 tracking-wide">
            Energy stored per unit of land area.
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-sm">
            {eSite.energyDensity.toFixed(2)} MWh/sqft
          </p>
        </div>
      </div>
      <div className="mb-10 flex flex-row justify-between items-start">
        <div>
          <p className="">Total Cost</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">{USDollar.format(eSite.totalCost)}</p>
        </div>
      </div>
    </div>
  );
};

export default ComponentManager;
