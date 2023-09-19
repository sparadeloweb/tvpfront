
import axios from "axios";
import fs from 'fs';
import path from 'path';
import formatUrl from "../helpers/formatUrl";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';

export default function Sitemap () {
    return null;
}

export const getServerSideProps = async (ctx) => {
    ctx.res.setHeader('Content-Type', 'text/xml');
    const xml = await generateSitemap();
    ctx.res.write(xml);
    ctx.res.end();
    return {
        props: {}
    }
}

async function generateSitemap () {
    // Genera las rutas estáticas
    let paths = await generatePaths();
    paths = paths.filter(path => (!path.startsWith('[') && !path.startsWith('_') && path !== 'sitemap.xml') )

    // Genera las rutas de los canales
    const responseChannels = await axios.get(`${process.env.NEXT_PUBLIC_PROGRAMMES_URL}/channels`, {
        headers: {
          Accept: "application/json",
        },
    });
    const channelsData = responseChannels.data.data;
    const channelsPaths = channelsData.map(channel => {
        return { path: `chaine/${channel.slug}`, priority: 0.8 };
    });
    
    // Genera las rutas de los programas
    const responseProgrammes = await axios.get(`${process.env.NEXT_PUBLIC_PROGRAMMES_URL}/programmes`, {
        headers: {
          Accept: "application/json",
        },
    });
    const programmesData = responseProgrammes.data.data;
    const programmesPaths = programmesData.map(programme => {
        return { path: `programme/${programme.slug}`, priority: 0.7 };
    });

    // Une todas las rutas
    paths = [...paths, ...channelsPaths, ...programmesPaths];

    // Genera el sitemap
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${siteUrl}/</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
            </url>
            ${paths.map(({path, priority}) => {
                return `
                    <url>
                        <loc>${siteUrl}${path}</loc>
                        <lastmod>${new Date().toISOString()}</lastmod>
                        ${priority ? `<priority>${priority}</priority>` : ""}
                    </url>
                `
            }).join('')}
        </urlset>`;
}
async function generatePaths() {
    // Obtiene la ruta a la carpeta /pages
    const pagesDirectory = path.join(process.cwd(), 'pages');
  
    // Obtiene los nombres de los archivos dentro de /pages
    const filenames = fs.readdirSync(pagesDirectory);
  
    // Filtra solo los archivos que terminan en .js o .tsx y no son index.js
    const pageFilenames = filenames.filter(
      (name) => name.endsWith('.js') || name.endsWith('.tsx')
    ).filter(
      (name) => !name.startsWith('index.') && !name.startsWith('[')
    );
  
    // Obtiene los nombres de las páginas eliminando la extensión de archivo y agrega la ruta relativa
    const paths = pageFilenames.map((name) => name.replace(/\.js$/, '').replace(/\.tsx$/, ''));
  
    return paths;
}