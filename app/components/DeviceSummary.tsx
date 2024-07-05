import { USDollar } from "../lib/utils";
import { Device } from "../types";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Image from "next/image";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
const DeviceSummary = ({ device }: { device: Device }) => {
  return (
    <div>
      <Collapsible>
        <CollapsibleTrigger>
          <p className="text-sm underline">{device.name}</p>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="py-1">
            <p className="text-gray-500 text-xs">{device.description}</p>
            <Drawer>
              <DrawerTrigger>
                <p className="text-gray-500 text-xs underline">More Details</p>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-[640px] text-center h-[640px]">
                  <DrawerHeader>
                    <DrawerTitle>{device.name}</DrawerTitle>
                    <DrawerDescription>
                      {device.detailedDescription}
                    </DrawerDescription>
                    <div className="py-4">
                      <Image
                        width={1200}
                        height={666}
                        src={`/img/${device.id}.webp`}
                        alt={device.name}
                        className="w-full h-72 object-cover"
                      />
                    </div>
                    <div>
                    <p className="text-gray-500 text-xs mb-2">Energy: {device.energy} MWh</p>
            <p className="text-gray-500 text-xs mb-2">
              Dimensions: {device.dimensions.width} x {device.dimensions.depth}{" "}
              x {device.dimensions.height} ft
            </p>
            <p className="text-gray-500 text-xs mb-2">
              Release Date: {device.releaseDate.getFullYear()}
            </p>
                    </div>
                  </DrawerHeader>
                  
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <p className="text-gray-600 text-sm">{USDollar.format(device.price)}</p>
    </div>
  );
};

export default DeviceSummary;
