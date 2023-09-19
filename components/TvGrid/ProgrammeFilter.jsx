export default function ProgrammeFilter({ handleFilterByHourClick, activeTime }) {
    return (
        <div className="programmeFilterContainer">
            <div className="timeFilter">
                <button className={`filterButton timeButton ${activeTime === 'morning' ? 'active' : ''}`} onClick={() => handleFilterByHourClick('morning')}>Ce matin (06 AM - 12PM)</button>
                <button className={`filterButton timeButton ${activeTime === 'afternoon' ? 'active' : ''}`} onClick={() => handleFilterByHourClick('afternoon')}>Cet apres-midi (12PM - 19PM)</button>
                <button className={`filterButton timeButton ${activeTime === 'night' ? 'active' : ''}`} onClick={() => handleFilterByHourClick('night')}>Ce soir (19PM - 06 AM)</button>
            </div>
        </div>
    )
}
