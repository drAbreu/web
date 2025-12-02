"use client";

import { useState, useEffect } from "react";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { Project } from "@/lib/mdx";

interface ProjectContentProps {
  projectEn: {
    frontmatter: Project;
    content: string;
    mdxSource: MDXRemoteSerializeResult;
  } | null;
  projectEs: {
    frontmatter: Project;
    content: string;
    mdxSource: MDXRemoteSerializeResult;
  } | null;
}

// MDX Components with custom styling
const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold text-white mb-6 mt-8" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold text-white mb-4 mt-8" {...props} />,
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
};

export default function ProjectContent({ projectEn, projectEs }: ProjectContentProps) {
  // Try to get language from localStorage, default to 'en'
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    // Read language preference from localStorage or browser
    const savedLang = localStorage.getItem('language') as 'en' | 'es' | null;
    if (savedLang) {
      setLanguage(savedLang);
    }

    // Listen for language changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language' && (e.newValue === 'en' || e.newValue === 'es')) {
        setLanguage(e.newValue);
      }
    };

    // Custom event for language change within the same page
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail === 'en' || e.detail === 'es') {
        setLanguage(e.detail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languagechange' as any, handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languagechange' as any, handleLanguageChange);
    };
  }, []);

  // Select the appropriate project version
  const project = language === 'es' && projectEs ? projectEs : projectEn;

  if (!project) {
    return <div className="text-white">Project not found</div>;
  }

  const { frontmatter, content } = project;

  return (
    <>
      {/* Article Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          {frontmatter.tags?.map((tag: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-brand-purple/30 text-brand-gold text-xs rounded-full font-semibold">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          {frontmatter.title}
        </h1>
        {frontmatter.subtitle && (
          <p className="text-xl text-gray-400 italic mb-4">{frontmatter.subtitle}</p>
        )}
        <p className="text-xl text-gray-400 mb-6">
          {frontmatter.description}
        </p>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
              year: 'numeric',
              month: 'long'
            })}
          </time>
          <span>•</span>
          <span>{frontmatter.category}</span>
        </div>
      </header>

      {/* MDX Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <MDXRemote {...project.mdxSource} components={components} />
      </div>
    </>
  );
}
