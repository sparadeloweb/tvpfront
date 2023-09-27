// pages/articles.js

import Head from "next/head";
import ArticleList from "../components/TvGrid/ArticleList";

export default function Articles({ articles }) {
    return (
        <>
            <Head>
                <title>Liste des articles - TV Programme</title>
                <meta name="description" content="Liste de tous les articles du blog." />
            </Head>
            <div className="programme-container overflow-hidden search-container">
                <section className="content__head">
                    <div className="hero__overlay programme__overlay flex justify-center items-center">
                        <h1 className="content__title hero__title programme__title">
                            Liste des articles
                        </h1>
                    </div>
                </section>
            </div>
            <div className="articles-container container" style={{display: 'flex'}}>
                {articles.map(article => (
                    <ArticleList key={article.id} article={article} />
                ))}
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch("https://wp.programmetvcesoir.fr/wp-json/wp/v2/posts?_embed");
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            articles: data,
        },
    };
}
