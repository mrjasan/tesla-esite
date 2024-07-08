// store/siteCollectionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IndustrialSite } from "../types";
import EnergySite from "../lib/energySite";
import { supportedDevices } from "../data";

interface SiteCollectionState {
  sites: IndustrialSite[];
  latestSite: IndustrialSite | null;
}

const initialState: SiteCollectionState = {
  sites: [],
  latestSite: null,
};

const updateTransformers = (site: IndustrialSite) => {
  // Use EnergySite class to calculate transformers
  const eSite = new EnergySite(site.devices);
  const requiredTransformers = eSite.minimumTransformersNeeded;

  site.devices["transformer"] = requiredTransformers;
};

const findSite = (state: SiteCollectionState, id: string) => {
  return state.sites.find((site) => site.id === id);
};


const siteCollectionSlice = createSlice({
  name: "siteCollection",
  initialState,
  reducers: {
    // Add a new site to the collection
    putSite: (state, action: PayloadAction<IndustrialSite>) => {
      const { payload } = action;
      const { id } = action.payload;
      const idx = state.sites.findIndex((cfg) => cfg.id === id);
      if (idx !== -1) {
        state.sites[idx] = action.payload;
      } else {
        state.sites.push(payload);
      }
      // update the latest site
      state.latestSite = payload;
    },
    // Delete a site from the collection
    deleteSite: (state, action: PayloadAction<string>) => {
      // Remove the site with the given id
      state.sites = state.sites.filter((site) => site.id !== action.payload);
      // If the latest site was deleted, set the latest site to the last site in the collection
      if (state.latestSite?.id === action.payload) {
        state.latestSite =
          state.sites.length > 0 ? state.sites[state.sites.length - 1] : null;
      }
    },
    // add device to site
    addDevice: (
      state,
      action: PayloadAction<{ id: string; deviceId: string }>
    ) => {
      const { id, deviceId } = action.payload;
      const site = findSite(state, id);
      if (site) {
        site.devices[deviceId] = (site.devices[deviceId] || 0) + 1;
        updateTransformers(site);
        site.lastModified = Date.now();
      }
    },
    // remove device from site
    removeDevice: (
      state,
      action: PayloadAction<{ id: string; deviceId: string }>
    ) => {
      const { id, deviceId } = action.payload;
      const site = findSite(state, id);
      if (site) {
        // only decrement if count is greater than 0
        if (site.devices[deviceId] > 0) {
          site.devices[deviceId] -= 1;
        }
        updateTransformers(site);
        site.lastModified = Date.now();
      }
    },

    setQuantity: (
      state,
      action: PayloadAction<{ id: string; deviceId: string; quantity: number }>
    ) => {
      const { id, deviceId, quantity } = action.payload;

      const site = findSite(state, id);
      if (site) {
        site.devices[deviceId] = quantity;

        updateTransformers(site);
        site.lastModified = Date.now();
      }
    },
    resetSite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const site = findSite(state, id);
      if(site) {
        site.devices = {};
        supportedDevices.forEach((device) => {site.devices[device.id] = 0;});
        site.lastModified = Date.now();
      }
      
    },
    updateSite: (
      state,
      action: PayloadAction<Partial<IndustrialSite> & { id: string }>
    ) => {
      const { id, name, description, coordinates, devices } = action.payload;
      const site = findSite(state, id);
      if (site) {
        if (name !== undefined) {
          site.name = name;
        }
        if (description !== undefined) {
          site.description = description;
        }
        if (coordinates) {
          site.coordinates = coordinates;
        }
        if (devices) {
          site.devices = devices;
          updateTransformers(site);
        }
        site.lastModified = Date.now();
      }
    },
  },
});

export const {
  putSite,
  deleteSite,
  addDevice,
  removeDevice,
  setQuantity,
  updateSite,
  resetSite,
} = siteCollectionSlice.actions;
export default siteCollectionSlice.reducer;
