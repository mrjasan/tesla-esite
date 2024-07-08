// lib/energySite.ts
import { Device, GridItem, GridLayout, SiteDevices } from "../types";
import { supportedDeviceById } from "./utils";

// Class to manage an energy site
class EnergySite {
  private devices: SiteDevices;

  /**
   * Creates a new instance of the EnergySite class
   * @param siteDevices - The device selection for the site
   */
  constructor(siteDevices: { [key: string]: number }) {
    this.devices = siteDevices;
  }

  /**
   * Get the site devices
   * @returns The site devices
   */
  get siteDevices() {
    return this.devices;
  }

  /**
   * Get the amount of transformers needed for the site.
   * Assumes that for every 4 batteries, a transformer is needed.
   * @returns A number that indicates the minimum amount transformers needed for the site given the number of batteries in the site devices
   */
  get minimumTransformersNeeded(): number {
    const totalBatteries = Object.entries(this.devices).reduce(
      (sum, [id, quantity]) => {
        if (id !== "transformer") {
          sum += quantity;
        }
        return sum;
      },
      0
    );
    return Math.floor(totalBatteries / 4);
  }

  /**
   * @returns True if the selection of devices for the site is valid, false otherwise
   */
  get isValid() {
    const validTransformers =
      this.devices["transformer"] >= this.minimumTransformersNeeded;
    return this.totalDevices > 0 && validTransformers;
  }

  /**
   * Get the total square footage of the site
   * @returns The total square footage of the site
   */
  get totalSquareFootage() {
    return Object.entries(this.devices).reduce((total, [id, quantity]) => {
      const device = supportedDeviceById(id);
      if (device) {
        total += device.dimensions.width * device.dimensions.depth * quantity;
      }
      return total;
    }, 0);
  }

  /**
   * Get the total number of devices in the site
   * @returns The total number of devices in the site
   */
  get totalDevices() {
    return Object.entries(this.devices).reduce((total, [id, quantity]) => {
      const device = supportedDeviceById(id);
      if (device) {
        total += quantity;
      }
      return total;
    }, 0);
  }

  /**
   * Get the total energy of the site
   * @returns The total energy of the site
   */
  get totalEnergy() {
    return Object.entries(this.devices).reduce((total, [id, quantity]) => {
      const device = supportedDeviceById(id);
      if (device) {
        total += device.energy * quantity;
      }
      return total;
    }, 0);
  }

  /**
   * Get the energy density of the site (energy per square foot) defined as the total energy divided by the total square footage.
   * Different from the total energy of the site
   * @returns The energy density of the site
   */
  get energyDensity() {
    return this.totalSquareFootage
      ? this.totalEnergy / this.totalSquareFootage
      : 0;
  }

  /**
   * Get the total cost of the site
   * @returns The total cost of the site
   */
  get totalCost() {
    return Object.entries(this.devices).reduce((total, [id, quantity]) => {
      const device = supportedDeviceById(id);
      if (device) {
        total += device.price * quantity;
      }
      return total;
    }, 0);
  }

  /**
   * Get the grid layout of the site.
   * This is greedy algorithm that places devices in the grid from left to right, top to bottom.
   * TODO: Implement a more sophisticated algorithm to place devices in the grid optimally.
   * @returns The grid layout of the site
   */
  getGridLayoutGreedy(): GridLayout {
    const gridItems: GridItem[] = [];
    // cursor of horizontal offset
    let currentX = 0;
    // cursor of vertical offset
    let currentY = 0;
    // height of the current row
    let rowHeight = 0;
    // the actual maximum width of the grid
    let actualMaxWidth = 0;
    const maxWidth = 100;

    for (const [id, quantity] of Object.entries(this.devices)) {
      const device = supportedDeviceById(id);
      // make sure the device is valid
      if (!device) continue;

      // this will place all the devices of the same kind as much as possible in the same row
      for (let i = 0; i < quantity; i++) {
        // if adding the device will exceed the width, move to the next row
        if (currentX + device.dimensions.width > maxWidth) {
          currentX = 0;
          currentY += rowHeight;
          rowHeight = 0;
        }

        gridItems.push({
          i: `${i}-${device.id}`,
          x: currentX,
          y: currentY,
          w: device.dimensions.width,
          h: device.dimensions.depth,
          deviceId: device.id,
        });

        // update the cursor and row height
        currentX += device.dimensions.width;
        if (currentX > actualMaxWidth) {
          actualMaxWidth = currentX;
        }
        // the row height is the height of the tallest device in the row
        rowHeight = Math.max(rowHeight, device.dimensions.depth);
      }
    }

    return {
      width: actualMaxWidth,
      depth: currentY + rowHeight,
      items: gridItems,
    };
  }

  /**
   * Generates an optimal grid layout for the site. Using First Fit Decreasing algorithm.
   * @returns The grid layout of the site
   */
  getGridLayout(): GridLayout {
    const gridItems: GridItem[] = [];
    const maxWidth = 100;

    // Flatten the devices and sort them in descending order by width (for better fitting)
    const allDevices = Object.entries(this.devices)
      .flatMap(([id, quantity]) => {
        const device = supportedDeviceById(id);
        return device ? Array(quantity).fill(device) : [];
      })
      .sort((a, b) => b.dimensions.width - a.dimensions.width);

    let currentY = 0; // cursor of vertical offset
    let row = []; // current row items
    let index = 0;

    const placeRow = (row: Array<Device>, y: number) => {
      let x = 0;
      let rowHeight = 0;

      row.forEach((device) => {
        gridItems.push({
          x,
          y,
          w: device.dimensions.width,
          h: device.dimensions.depth,
          deviceId: device.id,
          i: `${index++}-${device.id}`,
        });
        x += device.dimensions.width;
        rowHeight = Math.max(rowHeight, device.dimensions.depth);
      });

      return rowHeight;
    };

    // while we have devices to place, try to place them in the grid
    while (allDevices.length > 0) {
      let currentX = 0; // cursor of horizontal offset
      row = []; // current row items
      const remainingDevices = [];

      // Attempt to place devices in the current row
      // this will go all the way to the end trying to find a device to place on the grid
      while (allDevices.length > 0) {
        // remove the first device from the list
        const device = allDevices.shift();
        // if this device fits in the current row, add it to the row
        if (currentX + device.dimensions.width <= maxWidth) {
          row.push(device);
          // move the cursor
          currentX += device.dimensions.width;
        }
        // if the device doesn't fit, add it to the remaining devices
        else {
          remainingDevices.push(device);
        }
      }

      // we got to the end of all devices and we can not place more devices on the current row
      // re add the remaining devices back to the list of all devices sorted by width ( is this necessary?)
      allDevices.push(
        ...remainingDevices.sort(
          (a, b) => b.dimensions.width - a.dimensions.width
        )
      );

      // Place the current row and update the cursor
      const rowHeight = placeRow(row, currentY);
      currentY += rowHeight;
    }

    const actualMaxWidth = Math.max(
      ...gridItems.map((item) => item.x + item.w),
      0
    );
    return {
      width: Math.min(actualMaxWidth, maxWidth),
      depth: currentY,
      items: gridItems,
    };
  }
}

export default EnergySite;
