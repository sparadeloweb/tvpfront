import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import ChannelFilter from "../../components/TvGrid/ChannelFilter";
import buildDate from "../../helpers/buildDate";
import ProgrammeList from "../../components/TvGrid/ProgrammeList";

export default function Channel({ channelInfo }) {
  const { name, logo_src, programmes } = channelInfo;

  const [filteredProgrammes, setFilteredProgrammes] = useState(programmes);
  const [filter, setFilter] = useState({ name: "", time: "" });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    filterProgrammes(newFilter);
  };

  const filterProgrammes = (filter) => {
    let result = programmes;

    if (filter.name) {
      console.log(programmes[0])
      result = result.filter(program => program.main_title.toLowerCase().includes(filter.name.toLowerCase()));
    }

    if (filter.time) {
      result = result.filter(program => {
        const startTime = buildDate(program.start_time);
        const startHour = startTime.time.split(':')[0];
        if (filter.time === 'morning') {
            return startHour >= 6 && startHour < 12;
        } else if (filter.time === 'afternoon') {
            return startHour >= 12 && startHour < 19;
        } else if (filter.time === 'night') {
            return startHour >= 19 || startHour < 6;
        }
        return true;
      });
    }

    setFilteredProgrammes(result);
  };


  return (
    <>
      <Head>
          <title>{name.replaceAll("%REPLACEFORCOLON%", "'")} - TV Programme</title>
          <meta name="description" content={`Découvrez tous les programmes que la chaîne ${name.replaceAll("%REPLACEFORCOLON%", "'")} peut proposer`} />
          <meta property="og:title" content={name.replaceAll("%REPLACEFORCOLON%", "'")} />
          <meta property="og:description" content={`Découvrez tous les programmes que la chaîne ${name.replaceAll("%REPLACEFORCOLON%", "'")} peut proposer`} />
      </Head>
      <div className="channel-container overflow-hidden">
        <section className="content__head">
          <div className="hero__overlay channel__overlay flex justify-center items-center">
              <h1 className="content__title hero__title channel__title">Consultez rapidement le canal: <Image src={logo_src} height={60} width={60} alt={name} className="mt-2"/> {name}</h1>
          </div>
        </section>
        <ChannelFilter filter={filter} onFilterChange={handleFilterChange} />
        <div className="programmes-container container mt-4">
            {
                  filterProgrammes.length && filteredProgrammes.map((programme, index) => (
                      <ProgrammeList key={index} programme={programme} />
                  ))
            }
            {
                  !filteredProgrammes.length && (
                    <h3 className="no-results-channel">Aucun programme ne répond à vos besoins 😔...</h3>
                  )
            }
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const res = await fetch(`${process.env.NEXT_PUBLIC_PROGRAMMES_URL}/channel/${slug}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      channelInfo: data.data,
    },
  };
}
