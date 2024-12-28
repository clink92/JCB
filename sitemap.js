
const fs = require('fs');
const path = require('path');

const pages = [
  '/',
  '/quote',
  '/admin',
  // Add other routes here
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>https://yourwebsite.com${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('')}
</urlset>`;

fs.writeFileSync(path.resolve(__dirname, 'public', 'sitemap.xml'), sitemap);