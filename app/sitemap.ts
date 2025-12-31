import type { MetadataRoute } from "next";
import { DOMAIN } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DOMAIN,
      lastModified: new Date(),
    },
  ];
}
