// store/siteCollectionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { SiteConfig } from "../types";

interface IndustrialSite {
  id: string;
  name: string;
  description?: string;
  coordinates?: { x: number; y: number };
  config: SiteConfig;
  lastModified: number;
}

interface SiteCollectionState {
  sites: IndustrialSite[];
  latestSite: IndustrialSite | null;
}

const initialState: SiteCollectionState = {
  sites: [],
  latestSite: null,
};

const siteCollectionSlice = createSlice({
  name: "siteCollection",
  initialState,
  reducers: {
    // Add a new site to the collection
    addSite: (state, action: PayloadAction<IndustrialSite>) => {
      const { payload } = action;
      const newSite = {
        ...payload,
        id: nanoid(8),
        lastModified: Date.now(),
      };
      state.sites.push(newSite);
      // update the latest site
      state.latestSite = newSite;
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
    // Update the site with the given id
    updateSite: (state, action: PayloadAction<any>) => {
      const { id, name, config, description, coordinates } = action.payload;
      const existingSite = state.sites.find((cfg) => cfg.id === id);
      if (existingSite) {
        if (name) {
          existingSite.name = name;
        }
        if (config) {
          existingSite.config = config;
        }
        if (description) {
          existingSite.description = description;
        }
        if (coordinates) {
          existingSite.coordinates = coordinates;
        }
        existingSite.lastModified = Date.now();
        state.latestSite = existingSite;
      }
    },
  },
});

export const { addSite, deleteSite, updateSite } = siteCollectionSlice.actions;
export default siteCollectionSlice.reducer;
