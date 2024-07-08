import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ServerCrash, DatabaseZap } from "lucide-react";
import { Decimals, USDollar, supportedDeviceById } from "../lib/utils";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { IndustrialSite } from "../types";
import EnergySite from "../lib/energySite";
import { useDispatch } from "react-redux";
import { updateSite } from "../store/siteCollectionSlice";

const SubmitConfiguration = ({ site }: { site: IndustrialSite }) => {

  const dispatch = useDispatch();

  const { devices } = site;
  const eSite = new EnergySite(devices);

  const validForm = () => {
    return eSite.isValid && site.name && site.description;
  }

  const submit = () => {
    dispatch(updateSite({id: site.id, status: 'submitted'}));
    toast.success("Site configuration submitted successfully");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full border-gray-500 border-2 text-gray-600"
          disabled={!eSite.isValid}
          variant={"outline"}
        >
          Submit Configuration
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px] h-auto">
        <DialogHeader>
          <DialogTitle>Submit Configuration</DialogTitle>
          <DialogDescription>
            Review the configuration of your Industrial Energy Site.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-3">
          <div className="mb-10">
            <div className="tracking-wider text-sm mb-5">
              <Input placeholder="Site Name*" value={site.name} onChange={(e) => {dispatch(updateSite({id: site.id, name: e.target.value}))}} />
            </div>
            <div className="tracking-wider text-sm mb-5">
              <Input placeholder="Site Description*" value={site.description} onChange={(e) => {dispatch(updateSite({id: site.id, description: e.target.value}))}} />
            </div>
            <Separator />
          </div>
          <div className="mb-10">
            {Object.entries(devices)
              .filter(([_, q]) => q)
              .map(([id, quantity]) => {
                const device = supportedDeviceById(id);
                const isTransformer = id === "transformer";
                return (
                  <div key={id}>
                    <div className="flex flex-row justify-between tracking-wider text-sm mb-5 items-center">
                      <div className="flex flex-row items-center">
                        {isTransformer ? (
                          <ServerCrash
                            size={24}
                            className="text-green-400"
                            strokeWidth={1.5}
                          />
                        ) : (
                          <DatabaseZap
                            size={24}
                            className="text-green-400"
                            strokeWidth={1.5}
                          />
                        )}
                        <span className="ml-2 text-gray-600">
                          {device.name}
                        </span>
                      </div>
                      <span className="font-bold">{quantity}</span>
                    </div>
                  </div>
                );
              })}
          </div>
          <Separator />
          <div>
            <div className="flex flex-row justify-between tracking-wider text-sm mb-5">
              <span className="text-gray-500">Energy Density</span>
              <span className="font-bold">
                {eSite.totalEnergy.toFixed(2)} MWh
              </span>
            </div>
            <Separator />
          </div>
          <div>
            <div className="flex flex-row justify-between tracking-wider text-sm mb-5">
              <span className="text-gray-500">Estimated Area</span>
              <span className="font-bold">
                {Decimals.format(eSite.totalSquareFootage)} sqft
              </span>
            </div>
            <Separator />
          </div>
          <div>
            <div className="flex flex-row justify-between tracking-wider mt-10 font-bold">
              <span>Total Cost</span>
              <span>{USDollar.format(eSite.totalCost)}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-blue-500 w-full"
              disabled={!validForm()}
              onClick={submit}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitConfiguration;
