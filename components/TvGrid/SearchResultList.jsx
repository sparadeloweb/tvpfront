// components/SearchResultList.jsx

import Link from "next/link";
import Image from "next/image";
import buildDate from "../../helpers/buildDate";

export default function SearchResultList({ item, type }) {
    let link, title, image, description;

    if (type === "programme") {
        link = `/programme/${item.slug}`;
        title = item.main_title.replaceAll("%REPLACEFORCOLON%", "'");
        image = item.image;
        description = `Programme / ${buildDate(item.start_time).time} - ${buildDate(item.finish_time).time}`;
    } else if (type === "channel") {
        link = `/channel/${item.slug}`;
        title = item.name;
        image = item.logo_src;
        description = "Channel";
    } else if (type === "actor") {
        link = `/actor/${item.auid}`;
        title = item.name;
        image = item.image || "/img/no-actor.webp";
        description = "Actor";
    }

    return (
        <Link href={link}>
            <div className="search-result-container">
                <div className="image-container">
                    <Image
                        src={image}
                        layout="fill"
                        alt={title}
                        className="search-result-image"
                    />
                </div>
                <div className="info-container">
                    <h4>{title}</h4>
                    <span>{description}</span>
                </div>
            </div>
        </Link>
    );
}
