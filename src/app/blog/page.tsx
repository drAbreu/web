import { getBlogPosts } from "@/lib/mdx";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog | DATASTAR - Insights on AI, Data Science & Astrophysics",
  description: "Technical deep-dives, tutorials, and insights on AI, machine learning, data science, astrophysics, and the intersection of science and technology.",
  keywords: ["AI", "Machine Learning", "Data Science", "Astrophysics", "Research", "Technology", "Tutorial", "Blog"],
  openGraph: {
    title: "Blog | DATASTAR",
    description: "Technical insights and tutorials on AI, data science, and astrophysics",
    type: "website",
  }
};

export default async function BlogPage() {
  const allPosts = getBlogPosts();

  return <BlogClient posts={allPosts} />;
}
