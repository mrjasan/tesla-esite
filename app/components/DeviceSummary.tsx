import { USDollar } from "../lib/utils";
import { Device } from "../types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import DeviceDetailsDrawer from "./DeviceDetails";
const DeviceSummary = ({ device }: { device: Device }) => {
  return (
    <div>
      <Collapsible>
        <CollapsibleTrigger>
          <span className="text-sm underline">{device.name}</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="py-1">
            <p className="text-gray-500 text-xs">{device.description}</p>
            <DeviceDetailsDrawer
              trigger={
                <span className="text-gray-500 text-xs underline">
                  More Details
                </span>
              }
              device={device}
            />{" "}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <p className="text-gray-600 text-sm">{USDollar.format(device.price)}</p>
    </div>
  );
};

export default DeviceSummary;
