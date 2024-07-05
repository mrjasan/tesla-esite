// lib/energySite.ts
import { devices } from "@/app/data";
import { GridItem, GridLayout, SiteConfig } from "../types";

// Class to manage an energy site
class EnergySite {
  private siteConfig: SiteConfig;

  /**
   * Creates a new instance of the EnergySite class
   * @param siteConfig - The site configuration
   */
  constructor(siteConfig: { [key: string]: number }) {
    this.siteConfig = siteConfig;
  }


  /**
   * Get the amount of transformers needed for the site.
   * Assumes that for every 4 batteries, a transformer is needed.
   * @returns A number that indicates the minimum amount transformers needed for the site given the number of batteries in the site configuration
   */
  get minimumTransformersNeeded(): number {
    const totalBatteries = Object.entries(this.siteConfig).reduce(
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
   * @returns True if the site configuration is valid, false otherwise
   */
  get isValid() {
    const validTransformers = this.siteConfig["transformer"] >= this.minimumTransformersNeeded;
    return validTransformers;
  }

  /**
   * Get the total square footage of the site
   * @returns The total square footage of the site
   */
  get totalSquareFootage() {
    return Object.entries(this.siteConfig).reduce((total, [id, quantity]) => {
      const device = devices.find((device) => device.id === id);
      if (device) {
        total += device.dimensions.width * device.dimensions.depth * quantity;
      }
      return total;
    }, 0);
  }

  /**
   * Get the total energy of the site
   * @returns The total energy of the site
   */
  get totalEnergy() {
    return Object.entries(this.siteConfig).reduce((total, [id, quantity]) => {
      const device = devices.find((device) => device.id === id);
      if (device) {
        total += device.energy * quantity;
      }
      return total;
    }, 0);
  }

  /**
   * Get the energy density of the site
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
    return Object.entries(this.siteConfig).reduce((total, [id, quantity]) => {
      const device = devices.find((device) => device.id === id);
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
  getGridLayout(): GridLayout {
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

    for (const [id, quantity] of Object.entries(this.siteConfig)) {
      const device = devices.find(device => device.id === id);
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
          x: currentX,
          y: currentY,
          width: device.dimensions.width,
          depth: device.dimensions.depth,
          deviceId: device.id,
        });

        // update the cursor and row height
        currentX += device.dimensions.width;
        if(currentX > actualMaxWidth) {
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
}

export default EnergySite;
