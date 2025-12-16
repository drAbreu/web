import { notFound } from "next/navigation";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';
import React from 'react';

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
  p: (props: any) => {
    // Check if children contain block-level elements (img, table, etc.)
    const children = props.children;
    const hasBlockElements = React.Children.toArray(children).some((child: any) => {
      if (React.isValidElement(child)) {
        return child.type === 'img' || child.type === 'table' || child.type === 'div';
      }
      return false;
    });
    
    // If it contains block elements, render as div instead of p
    if (hasBlockElements) {
      return <div className="text-gray-300 leading-relaxed mb-4" {...props} />;
    }
    return <p className="text-gray-300 leading-relaxed mb-4" {...props} />;
  },
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
  strong: (props: any) => <strong className="font-bold text-white" {...props} />,
  em: (props: any) => <em className="italic text-gray-300" {...props} />,
  img: (props: any) => {
    // Use a span wrapper to avoid hydration errors when img is inside <p>
    return (
      <span className="block my-6 text-center">
        <span className="inline-block bg-white p-2 rounded-lg">
          <img {...props} className="max-w-full h-auto block" />
        </span>
      </span>
    );
  },
  table: (props: any) => (
    <div className="my-6 overflow-x-auto">
      <table 
        className="w-full border-collapse" 
        style={{ 
          border: '1px solid rgba(255, 255, 255, 0.4)',
          borderSpacing: 0
        }} 
        {...props} 
      />
    </div>
  ),
  thead: (props: any) => <thead className="bg-brand-navy/50" {...props} />,
  tbody: (props: any) => <tbody {...props} />,
  tr: (props: any) => (
    <tr 
      className="border-b" 
      style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }} 
      {...props} 
    />
  ),
  th: (props: any) => (
    <th 
      className="px-4 py-3 text-left text-white font-semibold text-sm" 
      style={{ 
        borderRight: '1px solid rgba(255, 255, 255, 0.25)',
        borderCollapse: 'collapse',
        backgroundColor: 'rgba(13, 21, 32, 0.5)'
      }}
      {...props} 
    />
  ),
  td: (props: any) => (
    <td 
      className="px-4 py-3 text-gray-300 text-sm" 
      style={{ 
        borderRight: '1px solid rgba(255, 255, 255, 0.25)',
        borderCollapse: 'collapse'
      }}
      {...props} 
    />
  ),
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
      title: 'Post Not Found | DATASTAR',
    };
  }

  const { frontmatter } = post;

  return {
    title: `${frontmatter.title} | DATASTAR Blog`,
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
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
    <BlogPostClient
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
