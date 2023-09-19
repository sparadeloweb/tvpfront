import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import buildDate from '../../helpers/buildDate';
import ProgrammeList from '../../components/TvGrid/ProgrammeList';

export default function Programme({ programInfo, recommended, actors }) {
    const { 
        main_title,
        description,
        year_date,
        country,
        category,
        image,
        start_time,
        finish_time,
    } = programInfo;

    const formattedStartTime = buildDate(start_time);
    const formattedFinishTime = buildDate(finish_time);

    return (
        <>
            <Head>
                <title>{main_title.replaceAll("%REPLACEFORCOLON%", "'")} - TV Programme</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={main_title.replaceAll("%REPLACEFORCOLON%", "'")} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
            </Head>
            <div className="programme-container overflow-hidden">
                <section className="content__head">
                    <div className="hero__overlay programme__overlay flex justify-center items-center">
                        <h1 className="content__title hero__title programme__title">
                            {main_title.replaceAll("%REPLACEFORCOLON%", "'")}
                        </h1>
                    </div>
                </section>
            </div>
            <section className="programme__content flex container">
                <div className="programme__info">
                    <h2>Programme Info</h2>
                    <hr/>
                    <p>{description}</p>
                    <p>{`Année: ${year_date}`}</p>
                    <p>{`Pays: ${country}`}</p>
                    <p>{`Catégorie: ${category}`}</p>
                    <p>{`Heure de début: ${formattedStartTime.time} - ${formattedStartTime.date}`}</p>
                    <p>{`Heure de fin: ${formattedFinishTime.time} - ${formattedFinishTime.date}`}</p>

                    {
                        actors.length > 0 && (
                            <div className="programme__actors">
                                <h2>Acteurs</h2>
                                <hr/>
                                <ul>
                                    {actors.map((actor) => (
                                        <li key={actor.auid} className="actor">
                                            <Link href={`/interprete/${actor.auid}`}>
                                                <a className="actor__name">{actor.name}</a>
                                            </Link>
                                            <p className="actor__role">{`Role: ${actor.role}`}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                </div>
                <div className='programme__image'>
                    <div className="programme__image-container relative">
                        <Image 
                            src={image}
                            alt={main_title}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>
            </section>
            <section className='container'>
                <div className="programme__recommended">
                    <h2>Programmes recommandés</h2>
                    <hr/>
                    {recommended.map((program) => (
                        <ProgrammeList key={program.pid} programme={program} /> // <-- Use ProgrammeList component
                    ))}
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const res = await fetch(`${process.env.NEXT_PUBLIC_PROGRAMMES_URL}/programme/${slug}`);
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            programInfo: data.program_info,
            actors: data.actors || [],
            recommended: data.similar_category_3,
        },
    }
}
