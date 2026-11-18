import { MetadataRoute } from 'next';
import { initialProjects, initialPosts } from '@/lib/mock/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pitech.dev';
  const buildDate = new Date('2026-02-15T00:00:00.000Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: buildDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/stack`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/testimonials`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/request-quote`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = initialProjects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = initialPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
