// store/siteConfigSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { devices } from '../data';
import { DeviceType, SiteConfig } from '../types';
import EnergySite from '../lib/energySite';

// key value pair of device id and count
interface SiteConfigState extends SiteConfig {}

// intialize state with 0 count for each device
const initialState: SiteConfigState = {};
devices.forEach((device) => {initialState[device.id] = 0;});

const siteConfigSlice = createSlice({
  name: 'siteConfig',
  initialState,
  reducers: {
    // add device to site config
    addDevice: (state, action: PayloadAction<string>) => {
      const deviceId = action.payload;
      const device = devices.find(device => device.id === deviceId);

      if (!device) return;

      state[deviceId] = (state[deviceId] || 0) + 1;

       // Use EnergySite class to calculate transformers
       const site = new EnergySite(state);
       const requiredTransformers = site.minimumTransformersNeeded;
 
       state['transformer'] = requiredTransformers;
    },
    // remove device from site config
    removeDevice: (state, action: PayloadAction<string>) => {
      // only decrement if count is greater than 0
      if (state[action.payload] > 0) {
        state[action.payload] -= 1;
      }

      // Use EnergySite class to calculate transformers
      const site = new EnergySite(state);
      const requiredTransformers = site.minimumTransformersNeeded;

      state['transformer'] = requiredTransformers;
    },
  },
});

export const { addDevice, removeDevice } = siteConfigSlice.actions;
export default siteConfigSlice.reducer;
