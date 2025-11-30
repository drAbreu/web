import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ProjectMatter {
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  featured: boolean
  image?: string
  link?: string
  color: 'coral' | 'orange' | 'gold' | 'burgundy' | 'purple'
  icon?: string
  order?: number
}

export interface BlogPostMatter {
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  featured: boolean
  image?: string
  lang: 'en' | 'es'
}

export interface Project extends ProjectMatter {
  slug: string
  content: string
}

export interface BlogPost extends BlogPostMatter {
  slug: string
  content: string
}

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')
const blogDirectory = path.join(process.cwd(), 'src/content/blog')

export function getProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(projectsDirectory)
  const projects = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        ...(data as ProjectMatter)
      }
    })
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return projects
}

export function getProject(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as ProjectMatter)
    }
  } catch {
    return null
  }
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter(project => project.featured)
}

export function getBlogPosts(lang?: 'en' | 'es'): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(blogDirectory)
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        ...(data as BlogPostMatter)
      }
    })
    .filter(post => !lang || post.lang === lang)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as BlogPostMatter)
    }
  } catch {
    return null
  }
}

export function getFeaturedBlogPosts(lang?: 'en' | 'es'): BlogPost[] {
  return getBlogPosts(lang).filter(post => post.featured)
}

