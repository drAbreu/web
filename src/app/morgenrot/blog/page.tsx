import { getBlogPostsByTag } from "@/lib/mdx";
import MorgenrotBlogClient from "./MorgenrotBlogClient";

export const metadata = {
  title: "Morgenrot Blog - The Journey from Darkness to Light",
  description: "Blog posts about Morgenrot, anxiety, mental health, and the journey of writing this book.",
};

export default function MorgenrotBlogPage() {
  // Get all blog posts tagged with "morgenrot"
  const morgenrotPosts = getBlogPostsByTag("morgenrot");
  
  return <MorgenrotBlogClient posts={morgenrotPosts} />;
}

