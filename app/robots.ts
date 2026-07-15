import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://siddharth-portfolio-pi.vercel.app/sitemap.xml",
  };
}
