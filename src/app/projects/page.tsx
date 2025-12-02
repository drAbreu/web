import { getProjects } from "@/lib/mdx";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = getProjects();

  return <ProjectsClient projects={projects} />;
}
