import { getProjects } from "@/lib/mdx";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  // Load all projects and filter for featured ones
  const allProjects = getProjects();
  const featuredProjects = allProjects
    .filter(project => project.featured)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return <HomeClient featuredProjects={featuredProjects} />;
}
