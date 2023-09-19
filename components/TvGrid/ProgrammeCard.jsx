import Link from "next/link";
import Image from "next/image";
import buildDate from "../../helpers/buildDate";

export default function ProgrammeCard ({ programme }) {
  
    const link = `/programme/${programme.slug}`

    return (
      <Link href={link}>
        <div className="programme-main home-programme">
          <Image
            src={programme.image}
            layout="fill"
            alt={programme.main_title.replaceAll("%REPLACEFORCOLON%", "'")}
            className="programme-image"
          />
          <div className="left-div">
            <span>{programme.category}</span>
            <h4>{programme.main_title.replaceAll("%REPLACEFORCOLON%", "'")}</h4>
            <hr />
            <div className="timer-container">
              <span className="programme-hour home-hour">
                Départs
                <br />
                <div>
                  <span className="time-hour">{`${buildDate(
                    programme.start_time
                  ).time}`}</span>{" "}
                  &nbsp;- {` ${buildDate(programme.start_time).date}`}
                </div>
              </span>
              <span className="programme-hour home-hour">
                Prend fin
                <br />
                <div>
                  <span className="time-hour">{`${buildDate(
                    programme.finish_time
                  ).time}`}</span>{" "}
                  &nbsp;- {` ${buildDate(programme.finish_time).date}`}
                </div>
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  };