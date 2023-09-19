import { useState } from "react";
import Head from "next/head";
import SearchResultList from "../components/TvGrid/SearchResultList";

export default function Search({ searchResults, query }) {

    const [filter, setFilter] = useState('all');

    return (
        <>
            <Head>
                <title>Résultats de recherche</title>
                <meta name="description" content="Résultats de recherche pour les programmes, les chaînes et les acteurs." />
            </Head>
            <div className="programme-container overflow-hidden search-container">
                <section className="content__head">
                    <div className="hero__overlay programme__overlay flex justify-center items-center">
                        <h1 className="content__title hero__title programme__title">
                            Résultats de recherche pour: {query}
                        </h1>
                    </div>
                    <div className="filterContainer">
                        <select 
                            className="filterButton searchFilter" 
                            value={filter} 
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">Tout</option>
                            <option value="programme">Programmes</option>
                            <option value="channel">Channels</option>
                            <option value="actor">Acteurs</option>
                        </select>
                    </div>
                </section>
            </div>
            <div className="search-results-container container">
                {filter === 'all' || filter === 'programme' ? searchResults.programmes?.map(programme => (
                    <SearchResultList key={programme.uid} item={programme} type="programme" />
                )) : null}

                {filter === 'all' || filter === 'channel' ? searchResults.channels?.map(channel => (
                    <SearchResultList key={channel.cid} item={channel} type="channel" />
                )) : null}

                {filter === 'all' || filter === 'actor' ? searchResults.actors?.map(actor => (
                    <SearchResultList key={actor.auid} item={actor} type="actor" />
                )) : null}

                {(!searchResults.programmes?.length && !searchResults.channels?.length && !searchResults.actors?.length) && (
                    <div className="no-results">
                        <p>😞 Désolé, aucun résultat trouvé.</p>
                    </div>
                )}
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const query = context.query.query;
    const res = await fetch(`${process.env.NEXT_PUBLIC_PROGRAMMES_URL}/search?q=${query}`);
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            searchResults: data,
            query: query
        },
    };
}
