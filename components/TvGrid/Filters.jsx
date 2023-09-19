import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function Filters({ handleFilterByHourClick, activeTime, handleAddOrRemoveToChannelsArray, channels, channels_ids, adding }) {
    const [selectedChannels, setSelectedChannels] = useState([]);

    const channelOptions = channels.map(channel => ({ value: channel.cid, label: channel.name.replaceAll("%REPLACEFORCOLON%", "'") }));

    useEffect(() => {
        const initialSelectedChannels = channelOptions.filter(option => channels_ids.includes(option.value));
        setSelectedChannels(initialSelectedChannels);
    }, [channels, channels_ids]);

    const handleChannelChange = (selectedOptions) => {
        setSelectedChannels(selectedOptions);
        const newChannelIds = selectedOptions.map(option => option.value);
        const addedChannels = newChannelIds.filter(id => !channels_ids.includes(id));
        const removedChannels = channels_ids.filter(id => !newChannelIds.includes(id));

        addedChannels.forEach(channelId => {
            handleAddOrRemoveToChannelsArray(channelId);
        });

        removedChannels.forEach(channelId => {
            handleAddOrRemoveToChannelsArray(channelId);
        });
    }

    const handleTimeChange = (e) => {
        handleFilterByHourClick(e.target.value);
    }

    const customStyles = (selectedChannels) => {
        return {
            option: (provided, state) => {
                const isSelected = selectedChannels.some(option => option.value === state.data.value);
                return {
                    ...provided,
                    backgroundColor: isSelected ? '#151314' : provided.backgroundColor,
                }
            },
        }
    }

    return (
        <div className="filterContainer">
            <div className="channelFilter container">
                <div className="timeFilter row">
                    <select value={activeTime} onChange={handleTimeChange} className="hourSearch">
                        <option value="">Tous les temps</option>
                        <option value="morning">Ce matin (06 AM - 12PM)</option>
                        <option value="afternoon">Cet après-midi (12PM - 19PM)</option>
                        <option value="night">Ce soir (19PM - 06 AM)</option>
                    </select>
                </div>

                <div className='channelAndHour'>
                    <Select
                        isMulti
                        name="channels"
                        options={channelOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Sélectionnez une chaîne"
                        onChange={handleChannelChange}
                        isOptionSelected={(option) => selectedChannels.some(selected => selected.value === option.value)}
                        value={selectedChannels}
                        hideSelectedOptions={false}
                        styles={customStyles(selectedChannels)}
                        controlShouldRenderValue={false}
                    />
                </div>
            </div>

            {adding ? <p className='updatingChannels'>Mise à jour de la liste des programmes...</p> : null}
        </div>
    )
}
