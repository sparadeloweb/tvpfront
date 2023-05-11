export default function ProgrammeCard ({programme}) {

    const convertDate = (dateStr) => {
        dateStr = dateStr.split(" ")
        let date = dateStr[0].replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,'$4:$5:$6 $2/$3/$1').split(" ")
        return {
            day: date[1],
            hour: date[0]
        }
    }

    return (
        <div className="col-6 col-sm-4 col-md-3 col-xl-3">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front" style={{backgroundImage: `url("${programme.image}")`}}>
                        <span className="flip-card-front-category">{programme.category}</span>
                        <span className="flip-card-front-subcategory">{programme.sub_category}</span>
                        <h3 className="flip-card-front-title">{programme.main_title}</h3>
                        <span className="flip-card-front-start-time">{convertDate(programme.start_time).day} - {convertDate(programme.start_time).hour}</span>
                        <span className="flip-card-front-finish-time">{convertDate(programme.finish_time).day} -{convertDate(programme.finish_time).hour}</span>
                    </div>
                    <div className="flip-card-back" style={{backgroundImage: `url("${programme.image}")`}}>

                    </div>
                </div>
            </div>
        </div>
    )
}