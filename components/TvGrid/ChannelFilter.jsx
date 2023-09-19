import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function ChannelFilter({ filter, onFilterChange }) {
    const [programName, setProgramName] = useState(filter.name);
    const [time, setTime] = useState(filter.time);

    const handleNameChange = (e) => {
        setProgramName(e.target.value);
        onFilterChange({ ...filter, name: e.target.value });
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
        onFilterChange({ ...filter, time: e.target.value });
    };

    return (
        <div className="container channelFilterContainer">
            <div className="channelSearchContainer">
                <BiSearch />
                <input 
                    type="text" 
                    placeholder="Recherche par nom de programme" 
                    value={programName} 
                    className="channelSearch"
                    onChange={handleNameChange}
                />
            </div>
            <div className="hourSearchContainer">
            <select value={time} onChange={handleTimeChange} className="hourSearch">
                <option value="">Chaque fois</option>
                <option value="morning">Matin</option>
                <option value="afternoon">Cet après-midi</option>
                <option value="night">Ce soir</option>
            </select>
            </div>
        </div>
    );
}
