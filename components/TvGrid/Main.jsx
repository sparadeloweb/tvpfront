import Grid from './Grid'
import { useEffect, useState } from 'react'
import programmesApi from "../../api/programmesApi"
import LoadingProgrammes from './LoadingProgrammes';
import { initialChannelIds } from "../../helpers/initialChannelsArray";
import Filters from './Filters';
import buildDate from '../../helpers/buildDate';

export default function TvGrid () {

    const [adding, setAdding] = useState(false)
    const [helper, setHelper ] = useState(false)
    const [activeTime, setActiveTime] = useState("")
    const [originalProgrammes, setOriginalProgrammes] = useState([]);
    const [filteredProgrammes, setFilteredProgrammes] = useState([]);
    const [channels, setChannels] = useState([]);
    const [channels_ids, setChannelsIds] = useState(initialChannelIds);
    
    function handleAddOrRemoveToChannelsArray(channel_cid) {
        setChannelsIds((prevChannels_ids) => {
            if (prevChannels_ids.includes(channel_cid)) {
                return prevChannels_ids.filter(id => id !== channel_cid);
            } else {
                return [...prevChannels_ids, channel_cid];
            }
        });

        setHelper(true);
    }

    const handleFilterByHourClick = (time) => {
        if (time === activeTime) {
            setFilteredProgrammes(originalProgrammes);
            setActiveTime('');
        } else {
            const newFilteredProgrammes = originalProgrammes.map(channel => {
                const filteredChannel = { ...channel };
                filteredChannel.programmes = channel.programmes.filter(program => {
                    const startTime = buildDate(program.start_time);
                    const startHour = startTime.time.split(':')[0];
                    if (time === 'morning') {
                        return startHour >= 6 && startHour < 12;
                    } else if (time === 'afternoon') {
                        return startHour >= 12 && startHour < 19;
                    } else if (time === 'night') {
                        return startHour >= 19 || startHour < 6;
                    }
                });
                return filteredChannel;
            });
            setFilteredProgrammes(newFilteredProgrammes);
            setActiveTime(time);
        }
    };
      

    useEffect(() => {
        if(!originalProgrammes.length > 0) {
          programmesApi.getHomeProgrammes().then(res => {
            setOriginalProgrammes(res.data)
            setFilteredProgrammes(res.data)
          })
        }
      
        if(!channels.length > 0) {
            programmesApi.getAllChannels().then(res => {
                let allChannels = res.data;
                setChannels(allChannels);
            });                      
        };
      
        if (helper) {
          setAdding(true)
          programmesApi.renewProgrammesList(channels_ids).then(res => {
            setOriginalProgrammes(res.data.data)
            setFilteredProgrammes(res.data.data)
            setAdding(false)
          })
        }
    }, [channels_ids, helper])

    return (
        <section className="content home-hero" style={{overflowX: 'hidden'}}>
            <div className="content__head container">
                <div className="container filters-container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="content__title text-white">Consultez rapidement le Programme TV</h2>
                        </div>
                    </div>
                </div>      
            </div>
            <Filters 
                handleFilterByHourClick={handleFilterByHourClick}
                activeTime={activeTime}
                handleAddOrRemoveToChannelsArray={handleAddOrRemoveToChannelsArray}
                channels={channels}
                channels_ids={channels_ids}
                adding={adding}
            />
            {
                filteredProgrammes.length > 0 ? <Grid programmes={filteredProgrammes}/> : <LoadingProgrammes/>
            }
        </section>
    )
}
