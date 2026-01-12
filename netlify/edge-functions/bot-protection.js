export default async function botProtection(request, context) {
    try {
        const url = new URL(request.url);
        const pathname = url.pathname.toLowerCase();

        const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.json', '.xml', '.txt'];
        const isStaticAsset = staticExtensions.some((ext) => pathname.endsWith(ext));

        if (isStaticAsset) {
            return context.next();
        }

        const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
        const ip = context.ip || 'unknown';

        if (!userAgent) {
            return context.next();
        }

        const allowedPatterns = ['safari', 'chrome', 'firefox', 'edge', 'opera', 'mobile', 'iphone', 'ipad', 'android', 'windows phone', 'webkit', 'mozilla', 'gecko', 'version'];

        const isAllowedBrowser = allowedPatterns.some((pattern) => userAgent.includes(pattern));

        if (isAllowedBrowser) {
            return context.next();
        }

        const blockedPatterns = ['bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python-requests', 'scrapy', 'lighthouse', 'puppeteer', 'selenium', 'headless', 'phantom'];

        const isBlocked = blockedPatterns.some((pattern) => userAgent.includes(pattern));

        if (isBlocked) {
            console.log(`[BLOCKED] IP: ${ip}, UA: ${userAgent}, Path: ${pathname}`);
            return new Response('Not Found', {
                status: 404,
                headers: { 'Content-Type': 'text/plain' }
            });
        }

        return context.next();
    } catch (error) {
        console.error('[BOT PROTECTION ERROR]', error);
        return context.next();
    }
}

export const config = {
    path: '/*'
};
