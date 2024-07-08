import { deleteSite, putSite } from "@/app/store/siteCollectionSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IndustrialSite } from "../types";
import { generateSlug } from "random-word-slugs";
import { supportedDevices } from "../data";

export const generateNewSite = (): IndustrialSite => {
  const site: IndustrialSite = {
    id: generateSlug(2, {
      format: "kebab",
      partsOfSpeech: ["adjective", "noun"],
      categories: {
        adjective: ["color", "size"],
        noun: ["business", "place"],
      },
    }),
    name: "New Site",
    description: "",
    status: "draft",
    devices: {},
    lastModified: Date.now(),
  };
  supportedDevices.forEach((device) => {
    site.devices[device.id] = 0;
  });
  return site;
};

export const useSite = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return {
    create: () => {
      // create a new site
      const newSite = generateNewSite();
      dispatch(putSite(newSite));
      router.push(`/sites/${newSite.id}`);
    },
    delete: (id: string, redirect?: boolean) => {
      // delete a site
      dispatch(deleteSite(id));
      if (redirect) {
        router.push("/sites");
      }
    },
  };
};
