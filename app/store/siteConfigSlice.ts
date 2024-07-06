// store/siteConfigSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { devices } from '../data';
import { GridItem, SiteConfig } from '../types';
import EnergySite from '../lib/energySite';

// key value pair of device id and count
interface SiteConfigState {
  deviceCount: SiteConfig;
  layout: Array<GridItem>
}

// intialize state with 0 count for each device
const initialState: SiteConfigState = {
  deviceCount: {},
  layout: []
};
devices.forEach((device) => {initialState.deviceCount[device.id] = 0;});

const updateTransformers = (state: SiteConfigState) => {
  // Use EnergySite class to calculate transformers
  const site = new EnergySite(state.deviceCount);
  const requiredTransformers = site.minimumTransformersNeeded;

  state.deviceCount['transformer'] = requiredTransformers;

}

const siteConfigSlice = createSlice({
  name: 'siteConfig',
  initialState,
  reducers: {
    reset: (state) => {
      state.deviceCount = {};
      devices.forEach((device) => {state.deviceCount[device.id] = 0;});
      state.layout = [];
    },
    // add device to site config
    addDevice: (state, action: PayloadAction<string>) => {
      const deviceId = action.payload;
      const device = devices.find(device => device.id === deviceId);

      if (!device) return;

      state.deviceCount[deviceId] = (state.deviceCount[deviceId] || 0) + 1;

      updateTransformers(state);
    },
    // remove device from site config
    removeDevice: (state, action: PayloadAction<string>) => {
      // only decrement if count is greater than 0
      if (state.deviceCount[action.payload] > 0) {
        state.deviceCount[action.payload] -= 1;
      }
      updateTransformers(state);
    },

    setQuantity: (state, action: PayloadAction<{deviceId: string, quantity: number}>) => {
      const { deviceId, quantity } = action.payload;
      state.deviceCount[deviceId] = quantity;

      updateTransformers(state);
    },

    // set the layout
    setLayout: (state, action: PayloadAction<Array<GridItem>>) => {
      state.layout = action.payload;
    } 
  },
});

export const { addDevice, removeDevice, setQuantity, reset } = siteConfigSlice.actions;
export default siteConfigSlice.reducer;
