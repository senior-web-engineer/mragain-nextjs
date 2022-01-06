import { GetServerSideProps } from 'next';
import { getServerSideSitemap } from 'next-sitemap';
import { API_PATH, FRONT_END_URL } from "../../constants";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const response = await fetch('https://mragain.eu.pythonanywhere.com/api/get-pages/?t=b');
    const blogs: any[] = await response.json();

    console.log(blogs);

    const fields: ISitemapField[] = blogs.map(blog => ({
        loc: `${FRONT_END_URL}/blog/${blog.slug}`,
        lastmod: new Date().toISOString(),
        }));

    return getServerSideSitemap(ctx, fields)
}

export default function Site() {}