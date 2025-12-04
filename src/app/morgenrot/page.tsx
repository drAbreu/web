import MorgenrotClient from "./MorgenrotClient";
import { getBlogPostsByTag } from "@/lib/mdx";

export const metadata = {
  title: "Morgenrot - The Path from Darkness to Light",
  description: "A book about conquering anxiety through science and epic determination. Coming 2025.",
};

export default function MorgenrotPage() {
  // Get all blog posts tagged with "morgenrot"
  const morgenrotPosts = getBlogPostsByTag("morgenrot");
  
  return <MorgenrotClient morgenrotPosts={morgenrotPosts} />;
}
