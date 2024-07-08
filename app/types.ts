
export type DeviceType = 'transformer' | 'powerpack' | 'megapack' | 'megapack-2' | 'megapack-2xl';

export interface Device {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  releaseDate: Date;
  price: number;
  energy: number;
  dimensions: {
    width: number;
    depth: number;
    height: number;
  };
}

export type SiteDevices = {
  [key: string]: number;
};

export interface IndustrialSite {
  id: string;
  name: string;
  description?: string;
  coordinates?: { lat: number; lon: number };
  devices: SiteDevices;
  status: 'draft' | 'submitted';
  lastModified: number;
}

export interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  deviceId: string;
}

export interface GridLayout {
  width: number;
  depth: number;
  items: GridItem[];
}