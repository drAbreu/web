import MorgenrotClient from "./MorgenrotClient";
import { getBlogPosts } from "@/lib/mdx";

export const metadata = {
  title: "Morgenrot — Jorge Abreu-Vicente",
  description: "A memoir about panic disorder, recovery, and the meaning of dawn. Written in public, published free, chapter by chapter.",
};

export default function MorgenrotPage() {
  const morgenrotPosts = getBlogPosts().filter(
    (p) => p.category?.toLowerCase().includes("morgenrot") ||
           (p.tags && p.tags.some((t) => t.toLowerCase() === "morgenrot"))
  );
  return <MorgenrotClient morgenrotPosts={morgenrotPosts} />;
}
