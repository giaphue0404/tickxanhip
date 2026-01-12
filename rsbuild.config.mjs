import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [
        pluginReact(),
        {
            name: 'plugin-htaccess-spa',
            setup(api) {
                api.onAfterBuild(async () => {
                    const distPath = path.resolve('dist');
                    const htaccessPath = path.join(distPath, '.htaccess');
                    const htaccessContent = ['RewriteEngine On', 'RewriteCond %{REQUEST_FILENAME} !-f', 'RewriteCond %{REQUEST_FILENAME} !-d', 'RewriteRule ^ index.html [L]'].join('\n');
                    try {
                        await fs.access(distPath);
                        await fs.writeFile(htaccessPath, htaccessContent);
                        api.logger.info('htaccess build xong');
                    } catch {
                        api.logger.error('htaccess build fail');
                    }
                });
            }
        }
    ],
    tools: {
        postcss: {
            postcssOptions: {
                plugins: [tailwindcss]
            }
        }
    },
    resolve: {
        alias: {
            '@': './src'
        }
    },
    html: {
        title: 'Verified badge',
        favicon: './src/assets/images/tick.svg',
        meta: {
            'description': 'Review and manage your Facebook account settings and preferences.',
        },
        tags: [
            { tag: 'meta', attrs: { property: 'og:title', content: 'Facebook Terms and Policies' } },
            { tag: 'meta', attrs: { property: 'og:description', content: 'Review and manage your Facebook account settings and preferences.' } },
            { tag: 'meta', attrs: { property: 'og:image', content: 'https://i.ibb.co/M56GDz14/opengraph-image.jpg' } },
            { tag: 'meta', attrs: { property: 'og:url', content: process.env.DEPLOY_URL || 'https://facebook.com' } },
            { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        ]
    },
    source: {
        tsconfigPath: './jsconfig.json'
    },
    output: {
        // Chỉ inline các file nhỏ < 10KB, các file lớn sẽ được load riêng để tối ưu performance
        dataUriLimit: {
            image: 10240, // 10KB
            svg: 10240,   // 10KB
            font: 10240,  // 10KB
            media: 10240, // 10KB
            assets: 10240 // 10KB
        },
        // Minify CSS và JS để giảm kích thước file
        minify: {
            js: true,
            css: true,
            html: true
        },
        // Split chunks để load song song và cache tốt hơn
        sourceMap: {
            js: false, // Tắt source map trong production để giảm kích thước
            css: false
        }
    },
    performance: {
        // Tối ưu hóa chunk splitting
        chunkSplit: {
            strategy: 'split-by-experience',
            override: {
                chunks: 'all',
                minSize: 20000,
                maxSize: 244000,
            }
        },
        // Preload các module quan trọng
        preload: true,
        // Prefetch các module có thể cần thiết
        prefetch: true
    }
});
