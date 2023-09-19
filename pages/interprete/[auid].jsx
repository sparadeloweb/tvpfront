import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Actor({ actorInfo, actorImage }) {
    const { name, bio, role } = actorInfo;

    return (
        <>
            <Head>
                <title>{name}</title>
                <meta name="description" content={bio} />
                <meta property="og:title" content={name} />
                <meta property="og:description" content={bio} />
                <meta property="og:image" content={actorImage} />
            </Head>
            <section className="actor__hero" style={{ backgroundImage: `url(${actorImage})` }}>
                <div className="hero__overlay">
                    <h1 className="hero__title">{name}</h1>
                </div>
            </section>
            <section className="actor__info">
                <p>{bio}</p>
                <p>{`Role: ${role}`}</p>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    const auid = context.params.auid;
    const res = await fetch(`${process.env.NEXT_PUBLIC_PROGRAMMES_URL}/actor/${auid}`);
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            actorInfo: data.actor,
        },
    }
}
