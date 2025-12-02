import { notFound } from "next/navigation";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ProjectPageClient from './ProjectPageClient';

// Function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

// Function to extract headings for TOC
function extractHeadings(content: string) {
  const headingRegex = /^##\s+(.+)$/gm;
  const headings: { text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ text, id });
  }

  return headings;
}

// MDX Components with custom styling and IDs for navigation
const createComponents = (headings: { text: string; id: string }[]) => ({
  h1: (props: any) => <h1 className="text-4xl font-bold text-white mb-6 mt-8" {...props} />,
  h2: (props: any) => {
    const text = props.children;
    const heading = headings.find(h => h.text === text);
    return (
      <h2
        id={heading?.id}
        className="text-3xl font-bold text-white mb-4 mt-8 scroll-mt-24"
        {...props}
      />
    );
  },
  h3: (props: any) => <h3 className="text-2xl font-semibold text-brand-coral mb-3 mt-6" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-semibold text-gray-300 mb-2 mt-4" {...props} />,
  p: (props: any) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4" {...props} />,
  li: (props: any) => <li className="text-gray-300" {...props} />,
  a: (props: any) => <a className="text-brand-orange hover:text-brand-gold transition-colors underline" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-brand-coral pl-4 italic text-gray-400 my-6" {...props} />
  ),
  code: (props: any) => <code className="bg-brand-navy/50 px-2 py-1 rounded text-brand-orange text-sm" {...props} />,
  pre: (props: any) => (
    <pre className="bg-brand-navy/50 p-4 rounded-lg overflow-x-auto mb-6 border border-brand-purple/30" {...props} />
  ),
});

async function getProject(slug: string) {
  try {
    const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { frontmatter: data, content };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
  const files = fs.readdirSync(projectsDirectory);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({ slug: file.replace(/\.mdx$/, '') }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;
  const readingTime = calculateReadingTime(content);
  const headings = extractHeadings(content);
  const components = createComponents(headings);

  // Get language from frontmatter, default to 'en'
  const lang = (frontmatter as any).lang || 'en';

  // Render MDX content server-side
  const mdxContent = <MDXRemote source={content} components={components} />;

  return (
    <ProjectPageClient
      frontmatter={frontmatter}
      mdxContent={mdxContent}
      readingTime={readingTime}
      headings={headings}
      slug={slug}
      lang={lang}
    />
  );
}
