import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"

export default function Grid () {

    const buildDate = (date, start) => {
        const separatedDate = date.split(/\s/);
        const year = separatedDate[0].substring(0, 4)
        const month = separatedDate[0].substring(4, 6)
        const day = separatedDate[0].substring(6, 8)
        const hour = separatedDate[0].substring(8, 10)
        const min = separatedDate[0].substring(10, 12)
        const ampm = (hour >= 12) ? 'PM' : 'AM'; // agregamos esta línea para determinar si es PM o AM
        if (hour > 12) hour -= 12; // ajustamos el formato de la hora
        if (start) {
            return `A partir de ${hour}:${min} ${ampm} le ${day}/${month}`
        } else {
            return `${hour}:${min} ${ampm} le ${day}/${month}`
        }
    }
    

    const programmes = useSelector((state) => state.programmes.programmes)

    return (
        <div className="container-fluid programmes-grid">
            <div className="row row--grid programmes-grid-list">
                {
                    programmes.length > 0 ? programmes.map(channel => {
                        return (
                            <div className="channel-row">
                                <div className="channel-main">
                                    <h3>{channel.name.replace("%REPLACEFORCOLON%", "'")}</h3>
                                    <Image src={channel.logo_src} height={100} width={100}/>
                                </div>
                                {channel.programmes.length > 0 ? channel.programmes.map(programme => {
                                        return (
                                            <div className="programme-main">
                                                <Image src={programme.image} 
                                                        layout="fill" 
                                                        alt={programme.main_title.replace("%REPLACEFORCOLON%", "'")}
                                                        className="programme-image"
                                                />
                                                <div
                                                 className="left-div">
                                                    <span className="programme-hour">{`${buildDate(programme.start_time, true)} jusqu'à ${buildDate(programme.finish_time, false)}`}</span>
                                                    <span>{programme.category}</span>
                                                    <h4>{programme.main_title.replace("%REPLACEFORCOLON%", "'")}</h4>
                                                    <p>{programme.description !== "None" ? programme.description : ""}</p>
                                                    <Link href="#">
                                                        Voir plus
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    }) : <></>}
                            </div>
                        )
                    }) : <></>
                }
            </div>
        </div>
    )
}