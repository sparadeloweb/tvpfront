import Link from "next/link";
import Image from "next/image";
import buildDate from "../../helpers/buildDate";
import formatUrl from "../../helpers/formatUrl";

export default function ProgrammeList({ programme }) {
  
    const link = `/programme/${programme.slug}`;

    return (
      <Link href={link}>
        <div className="programme-container">
          <div className="image-container">
            <Image
              src={programme.image}
              layout="fill"
              alt={programme.main_title.replaceAll("%REPLACEFORCOLON%", "'")}
              className="programme-image"
            />
          </div>
          <div className="info-container">
            <div className="title-category-container">
              <span>{programme.category}</span>
              <h4>{programme.main_title.replaceAll("%REPLACEFORCOLON%", "'")}</h4>
            </div>
            <div className="timer-container">
              <span className="programme-hour">
                <span className="time-title">Départs</span>
                <div className="time-container">
                    <span className="time-hour">{`${buildDate(
                    programme.start_time
                    ).time}`}</span>
                    <span className="time-finish">&nbsp;- {` ${buildDate(programme.start_time).date}`}</span>
                </div>
              </span>
              <span className="programme-hour">
                <span className="time-title">Prend fin</span>
                <div className="time-container">
                    <span className="time-hour">{`${buildDate(
                    programme.finish_time
                    ).time}`}</span>
                    <span className="time-finish">&nbsp;- {` ${buildDate(programme.finish_time).date}`}</span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
};
