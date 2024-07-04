'use client'; // let's make sure this component is treated as a Client Component

// NOTE: This is a Client Component
// this is to allow to use the Provider component from react-redux
// this can not be done directly in the layout component because the layout component is not a Client Component

import { Provider } from 'react-redux'; // import the Provider component
import store from './store'; // import the store

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
