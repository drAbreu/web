import Link from "next/link";
import { notFound } from "next/navigation";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

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
  strong: (props: any) => <strong className="font-bold text-white" {...props} />,
  em: (props: any) => <em className="italic text-gray-300" {...props} />,
};

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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <div className="min-h-screen bg-black">
      {/* Simple header for blog posts */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-white hover:text-brand-gold transition-colors font-semibold">
              ← DATASTAR
            </Link>
            <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
              All Posts
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            {/* Category */}
            <div className="mb-6">
              <span className="px-3 py-1 bg-brand-purple/30 text-brand-gold text-sm rounded-full font-semibold">
                {frontmatter.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {frontmatter.title}
            </h1>

            {/* Description */}
            {frontmatter.description && (
              <p className="text-xl text-gray-400 mb-6">
                {frontmatter.description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{frontmatter.author}</span>
              </div>
              <span>•</span>
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}
              </time>
              {frontmatter.readTime && (
                <>
                  <span>•</span>
                  <span>{frontmatter.readTime} read</span>
                </>
              )}
            </div>

            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {frontmatter.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* MDX Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <MDXRemote source={content} components={components} />
          </div>

          {/* Footer Navigation */}
          <footer className="mt-16 pt-8 border-t border-white/10">
            <div className="flex justify-between items-center">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Posts
              </Link>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors"
              >
                Home
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}

