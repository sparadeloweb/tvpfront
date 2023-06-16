import Image from "next/image"
import { useSelector } from "react-redux"

export default function Grid () {

    const buildDate = (date) => {
        const separatedDate = date.split(/\s/);
        const year = separatedDate[0].substring(0, 4)
        const month = separatedDate[0].substring(4, 6)
        const day = separatedDate[0].substring(6, 8)
        const hour = separatedDate[0].substring(8, 10)
        const min = separatedDate[0].substring(10, 12)
        const ampm = (hour >= 12) ? 'PM' : 'AM'; // agregamos esta línea para determinar si es PM o AM
        if (hour > 12) hour -= 12; // ajustamos el formato de la hora
        return {
            time: `${hour}:${min} ${ampm}`,
            date: `${day}/${month}`
        }
            
    }
    

    const programmes = useSelector((state) => state.programmes.programmes)

    return (
        <div className="container-fluid programmes-grid">
            <div className="row row--grid programmes-grid-list">
                {
                    programmes.length > 0 ? programmes.map((channel, index) => {
                        return (
                            <div className="channel-row" key={index}>
                                <div className="channel-main">
                                    <Image src={channel.logo_src} height={60} width={60}/>
                                    <h3>{channel.name.replace("%REPLACEFORCOLON%", "'")}</h3>
                                    <div className="separator"/>
                                </div>
                                <div className="programme-container">
                                {channel.programmes.length > 0 ? channel.programmes.map((programme, index) => {
                                        return (
                                            <div className="programme-main" key={index}>
                                                <Image src={programme.image} 
                                                        layout="fill" 
                                                        alt={programme.main_title.replace("%REPLACEFORCOLON%", "'")}
                                                        className="programme-image"
                                                />
                                                <div
                                                 className="left-div">
                                                    <span>{programme.category}</span>
                                                    <h4>{programme.main_title.replace("%REPLACEFORCOLON%", "'")}</h4>
                                                    <hr/>
                                                    <div className="timer-container">
                                                        <span className="programme-hour">
                                                            Départs
                                                            <br/>
                                                            <span className="time-hour">{`${buildDate(programme.start_time).time}`}</span> - {` ${buildDate(programme.start_time).date}`}
                                                        </span>
                                                        <span className="programme-hour">
                                                            Prend fin
                                                            <br/>
                                                            <span className="time-hour">{`${buildDate(programme.finish_time).time}`}</span> - {` ${buildDate(programme.finish_time).date}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : <></>}
                                </div>
                            </div>
                        )
                    }) : <></>
                }
            </div>
        </div>
    )
}