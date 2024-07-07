"use client"; // let's make sure this component is treated as a Client Component

import { Provider } from "react-redux"; // import the Provider component
import store, {persistor} from "./store"; // import the store
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "./components/Loading";



export default function Providers({ children }: { children: React.ReactNode }) {

  
  return <Provider store={store}>
    <PersistGate loading={<Loading/>} persistor={persistor}>
      {children}
    </PersistGate>
    </Provider>;
}
