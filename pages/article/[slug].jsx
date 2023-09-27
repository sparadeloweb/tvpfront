import Head from "next/head";

export default function ArticleDetail({ article }) {

    const featuredImage = article._embedded['wp:featuredmedia'][0]?.source_url;

    return (
        <>
            <Head>
                <title>{article.title.rendered} - TV Programme</title>
                <meta name="description" content={article.excerpt.rendered} />
                <meta property="og:title" content={article.title.rendered} />
                <meta property="og:description" content={article.excerpt.rendered} />
                <meta property="og:image" content={featuredImage} />
                <meta property="og:type" content="article" />
            </Head>
            <div className="programme-container overflow-hidden search-container">
                <section className="content__head">
                    <div className="hero__overlay programme__overlay flex justify-center items-center">
                        <h1 className="content__title hero__title programme__title">
                            {article.title.rendered}
                        </h1>
                    </div>
                </section>
            </div>
            <div className="article-container">
                {featuredImage && <div className="featured-image-container">
                    <img src={featuredImage} alt={article.title.rendered} />
                </div>}
                <div dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const res = await fetch(`https://wp.programmetvcesoir.fr/wp-json/wp/v2/posts?slug=${slug}&_embed`);
    const data = await res.json();

    if (!data || data.length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            article: data[0],
        },
    };
}
