import Grid from './Grid'
import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { addToIdsList, removeFromIdsList, fillList, resetChannelsIds, fillChannelList, filterByHour } from "../../slices/programmesSlice"
import programmesApi from "../../api/programmesApi"
import LoadingProgrammes from './LoadingProgrammes';
import {BiReset} from "react-icons/bi"

export default function TvGrid () {

    const [modalIsOpen, setIsOpen] = useState(false);

    Modal.setAppElement('body');

    const [adding, setAdding] = useState(false)

    const [defaultIndexOptions, setDefaultIndexOptions] = useState(0)

    const [helper, setHelper ] = useState(false)

    const [activeTime, setActiveTime] = useState("")

    const programmes = useSelector((state) => state.programmes.programmes)

    const channels = useSelector((state) => state.programmes.channels)

    const channels_ids = useSelector((state) => state.programmes.channels_ids)

    const dispatch = useDispatch()

    function openModal(tabIndex) {
        setDefaultIndexOptions(tabIndex)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function addOrRemoveToChannelsArray(channel_cid) {
        if (channels_ids.includes(channel_cid)) {
          dispatch(removeFromIdsList(channel_cid));
        } else {
          dispatch(addToIdsList(channel_cid));
        }

        if (!helper) {
            setHelper(true)
        }
      }      

    function filterByHourClick (time) {
        if (time === activeTime) {
            dispatch(filterByHour('renew'))
            setActiveTime('')
        } else {
            dispatch(filterByHour(time))
            setActiveTime(time)
        }
        
    }

    useEffect(() => {
        if(!programmes.length > 0) {
          programmesApi.getHomeProgrammes().then(res => {
            dispatch(fillList(res.data))
          })
        }
      
        if(!channels.length > 0) {
          programmesApi.getAllChannels().then(res => {
            dispatch(fillChannelList(res.data))
          })
        }
      
        if (helper) {
          setAdding(true)
          programmesApi.renewProgrammesList(channels_ids).then(res => {
            dispatch(fillList(res.data.data))
            setAdding(false)
          })
        }
      }, [channels_ids, helper])
    
    const customStyles = {
        content: {
            width: '60%',
            height: 'fit-content',
            top: '50%',
            left: '50%',
            right: 'auto',
            position: 'relative',
            bottom: 'auto',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            padding: '50px',
            marginRight: '-50%',
            zIndex: '3',
            transform: 'translate(-50%, -50%)',
        },
    };
      

    return (
        <section className="content" style={{overflowX: 'hidden'}}>
            <div className="content__head container">
                <div className="container filters-container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="content__title">Consultez rapidement le Programme TV</h2>
                            <div className='filter__buttons'>
                                <button className='middle' onClick={() => openModal(0)}>Heure</button>
                                <button onClick={() => openModal(1)}>Chaines</button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Menu d'options"
                                >   
                                    <h3>Menu d&apos;options</h3>
                                    <button id="close-modal" onClick={closeModal}><AiOutlineCloseCircle/></button>
                                    <Tabs defaultIndex={defaultIndexOptions}>
                                        <TabList>
                                            <Tab>Heure</Tab>
                                            <Tab>Chaines</Tab>
                                        </TabList>
                                        <TabPanel>
                                            <div className='channels-tab hour'>
                                                <button className={activeTime === 'morning' ? 'active' : null} onClick={() => filterByHourClick('morning')}>Ce matin (06 AM - 12PM)</button>
                                                <button className={activeTime === 'afternoon' ? 'active' : null} onClick={() => filterByHourClick('afternoon')}>Cet apres-midi (12PM - 19PM)</button>
                                                <button className={activeTime === 'night' ? 'active' : null} onClick={() => filterByHourClick('night')}>Ce soir (19PM - 06 AM)</button>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <button className='reset-channels' onClick={() => dispatch(resetChannelsIds())}><BiReset/> Réinitialiser la liste des chaînes</button>
                                            <div className='channels-tab'>
                                                {channels.length ? channels.map((channel, index) => {
                                                    return (
                                                    <div key={index}>
                                                        <button onClick={() => addOrRemoveToChannelsArray(channel.cid)} className={`channel ${channels_ids.includes(channel.cid) ? 'channel-active' : null}`} disabled={adding ? 'disabled' : null}>{channel.name.replace("%REPLACEFORCOLON%", "'")}</button>
                                                    </div>
                                                    )
                                                }) : null}
                                            </div>
                                            {adding ? <p className='updating-channels'>Mise à jour de la liste des programmes...</p> : null}
                                        </TabPanel>
                                    </Tabs>
                                </Modal>
                            </div>  
                        </div>
                    </div>
                </div>      
            </div>
            {
                programmes.length > 0 ? <Grid/> : <LoadingProgrammes/>
            }
            
        </section>
    )
}