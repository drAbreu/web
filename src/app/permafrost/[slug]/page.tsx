import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import PermafrostPostClient from "./PermafrostPostClient";

function calculateReadingTime(content: string): number {
  return Math.ceil(content.trim().split(/\s+/).length / 200);
}

function extractHeadings(content: string) {
  const headingRegex = /^##\s+(.+)$/gm;
  const headings: { text: string; id: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ text, id });
  }
  return headings;
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="pf-prose-h1" style={{ fontFamily: "var(--pf-font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--pf-text)", marginBottom: "1rem", marginTop: "2.5rem", letterSpacing: "0.04em" }} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 style={{ fontFamily: "var(--pf-font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--pf-ice-bright)", marginBottom: "0.75rem", marginTop: "2.5rem", letterSpacing: "0.04em" }} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 style={{ fontFamily: "var(--pf-font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--pf-ice)", marginBottom: "0.5rem", marginTop: "2rem", letterSpacing: "0.04em" }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{ fontFamily: "var(--pf-font-body)", fontSize: "1.125rem", lineHeight: 1.85, color: "var(--pf-text)", marginBottom: "1.75rem" }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", marginBottom: "1.75rem", color: "var(--pf-text)", fontFamily: "var(--pf-font-body)" }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol style={{ listStyle: "decimal", paddingLeft: "1.5rem", marginBottom: "1.75rem", color: "var(--pf-text)", fontFamily: "var(--pf-font-body)" }} {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: "0.5rem", lineHeight: 1.75, fontFamily: "var(--pf-font-body)", fontSize: "1.0625rem" }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a style={{ color: "var(--pf-ice)", textDecoration: "underline", textUnderlineOffset: "3px" }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote style={{ borderLeft: "3px solid var(--pf-ice)", paddingLeft: "1.25rem", fontStyle: "italic", color: "var(--pf-text-muted)", margin: "2rem 0", background: "var(--pf-bg-card)", padding: "1rem 1.5rem", borderRadius: "0 4px 4px 0", fontFamily: "var(--pf-font-body)" }} {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code style={{ fontFamily: "monospace", background: "var(--pf-bg-card)", color: "var(--pf-aurora)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem", fontSize: "0.875em" }} {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre style={{ background: "var(--pf-bg-card)", padding: "1.25rem", borderRadius: "0.5rem", overflowX: "auto", marginBottom: "1.75rem", border: "1px solid var(--pf-border)" }} {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ fontWeight: 700, color: "var(--pf-ice-bright)" }} {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em style={{ fontStyle: "italic", color: "oklch(0.78 0.07 230)" }} {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr style={{ border: "none", borderTop: "1px solid var(--pf-border)", margin: "2.5rem 0" }} {...props} />
  ),
};

const permafrostDirectory = path.join(process.cwd(), "src/content/permafrost");

async function getPost(slug: string) {
  try {
    const fullPath = path.join(permafrostDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { frontmatter: data, content };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  if (!fs.existsSync(permafrostDirectory)) return [];
  return fs
    .readdirSync(permafrostDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found | Permafrost" };
  const { frontmatter: fm } = post;
  return {
    title: `${fm.title} | Permafrost`,
    description: fm.description,
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: "article",
      publishedTime: fm.date,
    },
  };
}

export default async function PermafrostPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const readingTime = calculateReadingTime(content);
  const headings = extractHeadings(content);
  const lang = (frontmatter as { lang?: string }).lang || "en";

  const baseSlug = slug.replace(/-es$/, "").replace(/-en$/, "");
  const hasSpanish = fs.existsSync(path.join(permafrostDirectory, `${baseSlug}-es.mdx`));
  const hasEnglish = fs.existsSync(path.join(permafrostDirectory, `${baseSlug}.mdx`));
  const alternateSlug =
    lang === "en" && hasSpanish
      ? `${baseSlug}-es`
      : lang === "es" && hasEnglish
      ? baseSlug
      : null;
  const alternateLang = lang === "en" && hasSpanish ? "es" : lang === "es" && hasEnglish ? "en" : null;

  const mdxContent = <MDXRemote source={content} components={mdxComponents} />;

  return (
    <PermafrostPostClient
      frontmatter={frontmatter}
      mdxContent={mdxContent}
      readingTime={readingTime}
      headings={headings}
      slug={slug}
      lang={lang}
      alternateSlug={alternateSlug}
      alternateLang={alternateLang as "en" | "es" | null}
    />
  );
}
