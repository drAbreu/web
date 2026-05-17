import { getPermafrostPosts } from "@/lib/mdx";
import PermafrostClient from "./PermafrostClient";

export const metadata = {
  title: "Interstellar Permafrost — Jorge Abreu-Vicente, PhD",
  description: "A science fiction story about 3I/ATLAS, the interstellar object that changed everything — and the world that wasn't ready for it.",
};

export default function PermafrostPage() {
  const posts = getPermafrostPosts();
  return <PermafrostClient posts={posts} />;
}
