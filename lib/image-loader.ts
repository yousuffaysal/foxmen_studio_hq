export default function imageLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
    // ImageKit Optimization
    if (src.includes('ik.imagekit.io')) {
        const params = [`w-${width}`];

        // Default quality if not specified
        if (quality) {
            params.push(`q-${quality}`);
        } else {
            params.push('q-80');
        }

        // Force rasterization for SVGs to avoid 6.5MB download
        // Using PNG as it's safe (72KB vs 6.5MB)
        if (src.toLowerCase().endsWith('.svg')) {
            params.push('f-png');
        } else {
            params.push('f-auto');
        }

        const paramsString = params.join(',');
        const separator = src.includes('?') ? '&' : '?';
        return `${src}${separator}tr=${paramsString}`;
    }

    // Cloudinary Optimization
    // Example: https://res.cloudinary.com/demo/image/upload/sample.jpg
    // Becomes: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/sample.jpg
    if (src.includes('res.cloudinary.com')) {
        const params = [`w-${width}`, 'c_limit', 'q_auto', 'f_auto'];
        const paramsString = params.join(',');

        // Insert params after 'upload/'
        return src.replace('/upload/', `/upload/${paramsString}/`);
    }

    // ImgBB / Others - Return original with width param if supported, otherwise return original
    // ImgBB direct links (i.ibb.co) don't support dynamic resizing via URL easily without paid API usually.
    // We'll rely on Next.js default optimization if we don't use this loader globally, 
    // BUT if this loader is used, we just return src.
    return src;
}
