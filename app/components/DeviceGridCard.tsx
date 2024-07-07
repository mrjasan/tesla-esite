import { DatabaseZap, Grip, ServerCrash, Trash } from "lucide-react";
import { Device } from "../types";
import { useDispatch } from "react-redux";
import { removeDevice } from "../store/siteConfigSlice";
import DeviceDetailsDrawer from "./DeviceDetails";

const DeviceGridCard = ({ device }: { device: Device }) => {
  const dispatch = useDispatch();
  const { id, name, energy, dimensions } = device;
  const isTransformer = id === "transformer";
  return (
    <div className="w-full h-full bg-gray-100 border border-gray-200 shadow-md rounded-md p-2 flex flex-col justify-between">
      <div className="flex flex-row justify-between text-xs text-gray-400">
        <div className="cursor-move draggable flex flex-row justify-start space-x-1 items-center">
          <Grip size={14} />
        </div>
        {!isTransformer && <Trash
          onClick={() => {
            console.log("Delete click");
            dispatch(removeDevice(id));
          }}
          className="cursor-pointer"
          size={14}
          strokeWidth={1.5}
        />}
      </div>
      <div className="w-full mx-auto text-center justify-center items-center flex flex-col space-y-3">
        <DeviceDetailsDrawer device={device} trigger={<span className="text-[10px] text-zinc-400 tracking-wider underline-offset-2 underline">{name}</span>}  />
        {isTransformer ? (
          <ServerCrash size={40} className="text-green-400" strokeWidth={1.5} />
        ) : (
          <DatabaseZap size={36} className="text-green-400" strokeWidth={1.5} />
        )}

        <span className="text-zinc-500 tracking-wide font-bold text-md mt-2">
          {!isTransformer ? <span>{energy} MWh</span> : <span>&nbsp;</span>}
        </span>
      </div>
      <div className="text-right">
        <span className="tracking-wider text-[9px] text-gray-400">
          {dimensions.width} x {dimensions.depth} ft
        </span>
      </div>
    </div>
  );
};

export default DeviceGridCard;
