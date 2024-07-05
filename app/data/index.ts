import { Device } from "../types";

export const devices: Array<Device> = [
  {
    id: "megapack-2xl",
    name: "Megapack 2XL",
    description:
      "Extra large-scale 4 MWh battery storage product suitable for the most demanding energy storage workloads.",
    detailedDescription: "Megapack 2XL is the latest addition to the Megapack family. It is a fully integrated, AC-connected energy storage system with everything needed to connect to a building or utility network. It dramatically simplifies installation, integration and future support, offering system-wide benefits that far outweigh those of standalone batteries.",
    price: 120000, // in USD
    energy: 4, // in MWh
    releaseDate: new Date("2022-01-01"),
    dimensions: {
      width: 40, // in feet
      depth: 10, // in feet
      height: 10, // in feet
    },
  },
  {
    id: "megapack-2",
    name: "Megapack 2",
    description: "Large-scale 3 MWh battery storage product suitable for heavy energy storage deamnds.",
    detailedDescription: "Megapack 2 is a fully integrated, AC-connected energy storage system with everything needed to connect to a building or utility network. It dramatically simplifies installation, integration and future support, offering system-wide benefits that far outweigh those of standalone batteries.",
    price: 80000, // in USD
    energy: 3, // in MWh
    releaseDate: new Date("2021-01-01"),
    dimensions: {
      width: 30, // in feet
      depth: 10, // in feet
      height: 10, // in feet
    },
  },
  {
    id: "megapack",
    name: "Megapack",
    description: "Original 2 MWh versatile battery storage product.",
    detailedDescription: "Megapack is a fully integrated, AC-connected energy storage system with everything needed to connect to a building or utility network. It dramatically simplifies installation, integration and future support, offering system-wide benefits that far outweigh those of standalone batteries.",
    price: 50000, // in USD
    energy: 2, // in MWh
    releaseDate: new Date("2005-01-01"),
    dimensions: {
      width: 30, // in feet
      depth: 10, // in feet
      height: 10, // in feet
    },
  },
  {
    id: "powerpack",
    name: "Powerpack",
    description: "1 MWh battery storage product suitable for small to medium energy storage workloads.",
    detailedDescription: "Powerpack is a fully integrated, AC-connected energy storage system with everything needed to connect to a building or utility network. It dramatically simplifies installation, integration and future support, offering system-wide benefits that far outweigh those of standalone batteries.",
    price: 20000, // in USD
    energy: 1, // in MWh
    releaseDate: new Date("2000-01-01"),
    dimensions: {
      width: 10, // in feet
      depth: 10, // in feet
      height: 10, // in feet
    },
  },
  {
    id: "transformer",
    name: "Transformer",
    description: "State of the art transformer that transfers electrical energy between two or more circuits. A transformer is required for every 4 batteries.",
    detailedDescription: "A transformer is a static electrical device that transfers electrical energy between two or more circuits. A varying current in one coil of the transformer produces a varying magnetic flux, which, in turn, induces a varying electromotive force across a second coil wound around the same core. Electrical energy can be transferred between the two coils, without a metallic connection between the two circuits.",
    price: 10000, // in USD
    energy: -0.25, // in MWh
    releaseDate: new Date("2000-01-01"),
    dimensions: {
      width: 10, // in feet
      depth: 10, // in feet
      height: 10, // in feet
    },
  },
];
