import { notFound } from "next/navigation";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import MorgenrotBlogPostClient from './MorgenrotBlogPostClient';

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

// MDX Components with Morgenrot styling
const createComponents = (headings: { text: string; id: string }[]) => ({
  h1: (props: any) => <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--foreground)', marginBottom: 'var(--spacing-lg)', marginTop: 'var(--spacing-2xl)' }} {...props} />,
  h2: (props: any) => {
    const text = props.children;
    const heading = headings.find(h => h.text === text);
    return (
      <h2
        id={heading?.id}
        style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--primary)', marginBottom: 'var(--spacing-md)', marginTop: 'var(--spacing-2xl)' }}
        {...props}
      />
    );
  },
  h3: (props: any) => <h3 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--foreground)', marginBottom: 'var(--spacing-sm)', marginTop: 'var(--spacing-xl)' }} {...props} />,
  h4: (props: any) => <h4 style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--foreground)', marginBottom: 'var(--spacing-sm)', marginTop: 'var(--spacing-lg)' }} {...props} />,
  p: (props: any) => <p style={{ color: 'var(--foreground)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--spacing-md)', fontSize: 'var(--text-lg)' }} {...props} />,
  ul: (props: any) => <ul style={{ listStyle: 'disc', paddingLeft: 'var(--spacing-xl)', color: 'var(--foreground)', marginBottom: 'var(--spacing-md)' }} {...props} />,
  ol: (props: any) => <ol style={{ listStyle: 'decimal', paddingLeft: 'var(--spacing-xl)', color: 'var(--foreground)', marginBottom: 'var(--spacing-md)' }} {...props} />,
  li: (props: any) => <li style={{ color: 'var(--foreground)', marginBottom: 'var(--spacing-sm)' }} {...props} />,
  a: (props: any) => <a style={{ color: 'var(--primary)', textDecoration: 'underline' }} {...props} />,
  blockquote: (props: any) => (
    <blockquote style={{ borderLeft: '4px solid var(--primary)', paddingLeft: 'var(--spacing-lg)', fontStyle: 'italic', color: 'var(--muted-foreground)', margin: 'var(--spacing-xl) 0' }} {...props} />
  ),
  code: (props: any) => <code style={{ backgroundColor: 'var(--muted)', padding: 'var(--spacing-xs) var(--spacing-sm)', borderRadius: 'var(--radius)', color: 'var(--primary)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }} {...props} />,
  pre: (props: any) => (
    <pre style={{ backgroundColor: 'var(--muted)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', overflowX: 'auto', marginBottom: 'var(--spacing-lg)', border: '1px solid var(--border)' }} {...props} />
  ),
  strong: (props: any) => <strong style={{ fontWeight: 700, color: 'var(--foreground)' }} {...props} />,
  em: (props: any) => <em style={{ fontStyle: 'italic', color: 'var(--foreground)' }} {...props} />,
});

async function getBlogPost(slug: string) {
  try {
    const blogDirectory = path.join(process.cwd(), 'src/content/blog');
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { frontmatter: data, content };
  } catch {
    return null;
  }
}

async function checkAlternateLanguageExists(baseSlug: string, targetLang: 'en' | 'es'): Promise<boolean> {
  const blogDirectory = path.join(process.cwd(), 'src/content/blog');
  let checkSlug: string;
  
  if (targetLang === 'es') {
    checkSlug = `${baseSlug}-es`;
  } else {
    checkSlug = baseSlug;
  }
  
  const fullPath = path.join(blogDirectory, `${checkSlug}.mdx`);
  return fs.existsSync(fullPath);
}

export async function generateStaticParams() {
  const blogDirectory = path.join(process.cwd(), 'src/content/blog');
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  const files = fs.readdirSync(blogDirectory);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({ slug: file.replace(/\.mdx$/, '') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Morgenrot',
    };
  }

  const { frontmatter } = post;

  return {
    title: `${frontmatter.title} | Morgenrot Blog`,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    authors: [{ name: frontmatter.author }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
    },
  };
}

export default async function MorgenrotBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const readingTime = calculateReadingTime(content);
  const headings = extractHeadings(content);
  const components = createComponents(headings);

  // Get language from frontmatter, default to 'en'
  const lang = (frontmatter as any).lang || 'en';
  
  // Determine base slug (remove language suffix)
  const baseSlug = slug.replace(/-es$/, '').replace(/-en$/, '');
  
  // Check if alternate language versions exist
  const hasEnglishVersion = await checkAlternateLanguageExists(baseSlug, 'en');
  const hasSpanishVersion = await checkAlternateLanguageExists(baseSlug, 'es');
  
  // Determine alternate slug
  let alternateSlug: string | null = null;
  let alternateLang: 'en' | 'es' | null = null;
  
  if (lang === 'en' && hasSpanishVersion) {
    alternateSlug = `${baseSlug}-es`;
    alternateLang = 'es';
  } else if (lang === 'es' && hasEnglishVersion) {
    alternateSlug = baseSlug;
    alternateLang = 'en';
  }

  // Render MDX content server-side
  const mdxContent = <MDXRemote source={content} components={components} />;

  return (
    <MorgenrotBlogPostClient
      frontmatter={frontmatter}
      mdxContent={mdxContent}
      readingTime={readingTime}
      headings={headings}
      slug={slug}
      lang={lang}
      alternateSlug={alternateSlug}
      alternateLang={alternateLang}
    />
  );
}

