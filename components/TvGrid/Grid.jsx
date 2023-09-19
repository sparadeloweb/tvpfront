import { useState, useEffect } from "react";
import Image from "next/image";
import ProgrammeCard from "./ProgrammeCard";
import Link from "next/link";
import { initialChannelIds } from "../../helpers/initialChannelsArray";

export default function Grid({ programmes }) {
  const [expandedChannels, setExpandedChannels] = useState([]);
  const [sortedProgrammes, setSortedProgrammes] = useState([]);

  useEffect(() => {
    const sorted = [...programmes].sort(
      (a, b) => 
        initialChannelIds.indexOf(a.cid) - initialChannelIds.indexOf(b.cid)
    );
    setSortedProgrammes(sorted);
  }, [programmes]);


  return (
    <div className="container-fluid programmes-grid">
      <div className="row programmes-grid-list">
        {sortedProgrammes.length > 0 &&
          sortedProgrammes.map((channel, index) => {
            const isExpanded = expandedChannels.includes(channel.cid);
            const displayedProgrammes = isExpanded
              ? channel.programmes
              : channel.programmes.slice(0, 4);

            return (
              <div className="channel-row" key={index}>
                <div className="channel-main">
                  <Image
                    src={channel.logo_src}
                    height={60}
                    width={60}
                    alt={channel.name.replaceAll("%REPLACEFORCOLON%", "'")}
                  />
                  <Link href={`/chaine/${channel.slug}`}>
                    <h3 style={{cursor: "pointer"}}>{channel.name.replaceAll("%REPLACEFORCOLON%", "'")}</h3>
                  </Link>
                  <Link href={`/chaine/${channel.slug}`}>
                      <button className="expand-button">+</button>
                  </Link>
                </div>
                <div className="programme-container">
                    {
                    displayedProgrammes.length > 0 &&
                        displayedProgrammes.map((programme, index) => (
                            <ProgrammeCard key={index} programme={programme} />
                        ))
                    }
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
