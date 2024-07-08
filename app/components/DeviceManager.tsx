"use client"; // let's make sure this component is treated as a Client Component

import { supportedDevices } from "../data";
import { Input } from "./ui/input";
import { Decimals, USDollar, cn } from "@/app/lib/utils";
import { useDispatch } from "react-redux";

import EnergySite from "../lib/energySite";
import DeviceSummary from "./DeviceSummary";
import SubmitConfiguration from "./SubmitConfiguration";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { IndustrialSite } from "../types";
import { addDevice, removeDevice, resetSite, setQuantity } from "../store/siteCollectionSlice";

const DeviceManager = ({ site }: { site: IndustrialSite }) => {
  const dispatch = useDispatch();
  const { devices } = site;
  const eSite = new EnergySite(devices);

  return (
    <div className="py-2 ">
      {supportedDevices.map((device) => {
        const quantity = devices[device.id] || 0;
        const isTransformer = device.id === "transformer";
        return (
          <div
            key={device.id}
            className="mb-5 flex flex-row justify-between items-start"
          >
            <div className="w-full max-w-[280px] mr-1 p-0">
              <DeviceSummary device={device} />
            </div>
            <div className="flex flex-row space-x-2 items-center w-16">
              <button
                className={cn(
                  "text-gray-600",
                  isTransformer && "text-gray-300"
                )}
                disabled={isTransformer}
                onClick={() => dispatch(removeDevice({id:site.id, deviceId:device.id}))}
              >
                {isTransformer ? <span>&nbsp;&nbsp;</span> : <span>-</span>}
              </button>
              <Input
                className="w-12 h-10 rounded-sm text-center text-gray-500"
                type="number"
                disabled={isTransformer}
                value={quantity}
                readOnly={isTransformer}
                onChange={(e) => {
                  dispatch(
                    setQuantity({
                      id: site.id,
                      deviceId: device.id,
                      quantity: parseInt(e.target.value),
                    })
                  );
                }}
              />
              <button
                className={cn(
                  "text-gray-600",
                  isTransformer && "text-gray-300"
                )}
                disabled={isTransformer}
                onClick={() =>
                  dispatch(addDevice({ id: site.id, deviceId: device.id }))
                }
              >
                {isTransformer ? <span>&nbsp;&nbsp;</span> : <span>+</span>}
              </button>
            </div>
          </div>
        );
      })}

      <div className="mb-5 flex flex-row justify-between items-start">
        <div className="">
          <span className="tracking-wide text-gray-550 text-sm">
            Energy Density
          </span>
          <p className="text-xs text-gray-400 tracking-wide">
            Energy stored per unit of land area.
          </p>
        </div>
        <div className="text-right">
          <span className="text-gray-500 text-sm">
            {eSite.totalEnergy.toFixed(2)} MWh
          </span>
        </div>
      </div>
      <div className="mb-5 flex flex-row justify-between items-start">
        <div className="">
          <span className="tracking-wide text-gray-550 text-sm">
            Estimated Area
          </span>
          <p className="text-xs text-gray-400 tracking-wide">
            Estimated area of the site
          </p>
        </div>
        <div className="text-right">
          <span className="text-gray-500 text-sm">
            {Decimals.format(eSite.totalSquareFootage)} sqft
          </span>
        </div>
      </div>
      <Separator />
      <div className="mt-5 flex flex-row justify-between items-start text-md">
        <div>
          <span className="">Total Cost</span>
        </div>
        <div className="text-right">
          <span>{USDollar.format(eSite.totalCost)}</span>
        </div>
      </div>
      <div className="w-full mb-5">
        <Button
          className="m-0 p-0 underline text-gray-600 text-sm"
          variant={"link"}
          onClick={() => {
            dispatch(resetSite(site.id));
          }}
        >
          Start Over
        </Button>
      </div>
      <div className="w-full mx-auto">
        <SubmitConfiguration site={site} />
      </div>
    </div>
  );
};

export default DeviceManager;
