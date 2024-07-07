import React from 'react';
import { Device } from '../types';
import Image from "next/image";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";

const DeviceDetailsDrawer = ({ trigger, device }: { trigger:React.ReactNode, device: Device }) => {
  return (
    <Drawer>
              <DrawerTrigger>
                {trigger}
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
                      <p className="text-gray-500 text-xs mb-2">
                        Energy: {device.energy} MWh
                      </p>
                      <p className="text-gray-500 text-xs mb-2">
                        Dimensions: {device.dimensions.width} x{" "}
                        {device.dimensions.depth} x {device.dimensions.height}{" "}
                        ft
                      </p>
                      <p className="text-gray-500 text-xs mb-2">
                        Release Date: {device.releaseDate.getFullYear()}
                      </p>
                    </div>
                  </DrawerHeader>
                </div>
              </DrawerContent>
            </Drawer>
  )

}

export default DeviceDetailsDrawer;