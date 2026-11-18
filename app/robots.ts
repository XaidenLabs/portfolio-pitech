import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin/*', '/admin-login', '/invoice/', '/invoice/*', '/pay/', '/pay/*', '/receipt/'],
    },
    sitemap: 'https://pitech.dev/sitemap.xml',
  };
}
