// store/siteCollectionSlice.test.ts
import reducer, {
  addDevice,
  deleteSite,
  putSite,
  removeDevice,
  resetSite,
  setQuantity,
  updateSite,
} from '@/app/store/siteCollectionSlice';
import { IndustrialSite } from '@/app/types';

const initialState = {
  sites: [],
  latestSite: null,
};

const testSite: IndustrialSite = {
  id: 'test-site',
  name: 'Test Site',
  description: '',
  status: 'draft',
  devices: { },
  lastModified: Date.now(),
};

describe('siteCollectionSlice', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle putSite', () => {
    const actual = reducer(initialState, putSite(testSite));
    expect(actual.sites.length).toBe(1);
    expect(actual.latestSite).toEqual(testSite);
  });

  it('should handle deleteSite', () => {
    const stateWithSite = { sites: [testSite], latestSite: testSite };
    const actual = reducer(stateWithSite, deleteSite('test-site'));
    expect(actual.sites.length).toBe(0);
    expect(actual.latestSite).toBeNull();
  });

  it('should handle addDevice', () => {
    const stateWithSite = { sites: [testSite], latestSite: testSite };
    const actual = reducer(
      stateWithSite,
      addDevice({ id: 'test-site', deviceId: 'powerpack' })
    );
    expect(actual.sites[0].devices['powerpack']).toBe(1);
  });

  it('should handle removeDevice', () => {
    const stateWithSite = {
      sites: [{ ...testSite, devices: { transformer: 1 } }],
      latestSite: testSite,
    };
    const actual = reducer(
      stateWithSite,
      removeDevice({ id: 'test-site', deviceId: 'transformer' })
    );
    expect(actual.sites[0].devices.transformer).toBe(0);
  });

  
  it('should handle resetSite', () => {
    const stateWithSite = {
      sites: [{ ...testSite, devices: { transformer: 1 } }],
      latestSite: testSite,
    };
    const actual = reducer(stateWithSite, resetSite('test-site'));
    expect(actual.sites[0].devices.transformer).toBe(0);
  });

  it('should handle updateSite', () => {
    const updatedName = 'Updated Site';
    const stateWithSite = { sites: [testSite], latestSite: testSite };
    const actual = reducer(
      stateWithSite,
      updateSite({ id: 'test-site', name: updatedName })
    );
    expect(actual.sites[0].name).toBe(updatedName);
  });

  it('should handle setQuantity', () => {
    const stateWithSite = { sites: [testSite], latestSite: testSite };
    const actual = reducer(
      stateWithSite,
      setQuantity({ id: 'test-site', deviceId: 'powerpack', quantity: 5 })
    );
    expect(actual.sites[0].devices['powerpack']).toBe(5);
  });

  it('should enforce transformer requirement', () => {
    const stateWithSite = { sites: [testSite], latestSite: testSite };
    const actual = reducer(
      stateWithSite,
      setQuantity({ id: 'test-site', deviceId: 'powerpack', quantity: 5})
    );
    expect(actual.sites[0].devices['transformer']).toBe(1);
  });
});
