import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { supportedDevices } from "../data";
import { Device } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const Decimals = new Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 0,
});

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const supportedDeviceById = (id: string): Device => {
  const ret = supportedDevices.find((d) => d.id === id);
  if(!ret) {
    throw new Error(`Device with id ${id} not found`)
  }
  return ret
}