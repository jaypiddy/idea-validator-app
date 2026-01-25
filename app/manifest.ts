import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Power Shifter MVP Validator',
        short_name: 'MVP Validator',
        description: 'Pressure-test your idea before you build. Get a free, instant assessment of your MVP\'s market viability.',
        start_url: '/',
        display: 'standalone',
        background_color: '#09090b', // neutral-950
        theme_color: '#0060FF', // ps-blue
        icons: [
            {
                src: '/icon.png', // We might need to make sure this exists or use a default one, for now assuming standard convention or fallback
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
