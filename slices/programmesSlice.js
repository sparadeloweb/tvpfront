import { createSlice, current } from "@reduxjs/toolkit"

export const initialChannelIds = [
  '192.api-tel.programme-tv.net', 
  '4.api-tel.programme-tv.net',
  '80.api-tel.programme-tv.net',
  '78.api-tel.programme-tv.net',
  '47.api-tel.programme-tv.net',
  '118.api-tel.programme-tv.net',
  '681.api-tel.programme-tv.net',
  '445.api-tel.programme-tv.net',
  '119.api-tel.programme-tv.net',
  '195.api-tel.programme-tv.net',
  '446.api-tel.programme-tv.net',
  '444.api-tel.programme-tv.net',
  '992.api-tel.programme-tv.net',
  '481.api-tel.programme-tv.net',
  '482.api-tel.programme-tv.net',
  '1401.api-tel.programme-tv.net',
  '1403.api-tel.programme-tv.net',
  '1402.api-tel.programme-tv.net',
  '1400.api-tel.programme-tv.net',
  '1399.api-tel.programme-tv.net',
  '112.api-tel.programme-tv.net',
  '2111.api-tel.programme-tv.net'
]

const programmesSlice = createSlice({
  name: "programmes",
  initialState: {
    programmes: [],
    helperProgrammes: [],
    channels: [],
    channels_ids: initialChannelIds,
  },
  reducers: {
    fillList: (state, action) => {
        let programmes = [...state.programmes]
        programmes = action.payload
        return {...state, programmes, helperProgrammes: action.payload}
    },
    fillChannelList: (state, action) => {
        let channels = [...state.channels]
        channels = action.payload
        return {...state, channels}
    },
    addToIdsList: (state, action) => {
      let channels_ids = [...state.channels_ids]
      channels_ids.push(action.payload)
      return {...state, channels_ids}
    },
    removeFromIdsList: (state, action) => {
      let channels_ids = [...state.channels_ids]
      channels_ids = channels_ids.filter(element => element != action.payload)
      return {...state, channels_ids}
    },
    resetChannelsIds: (state) => {
      let channels_ids = [...state.channels_ids]
      channels_ids = initialChannelIds
      return {...state, channels_ids}
    },
    filterByHour: (state, action) => {
      const timeToFilter = action.payload
      if (timeToFilter === 'renew') {
        return {...state, programmes: [...state.helperProgrammes]}
      } else {
        const filteredProgrammes = [...state.helperProgrammes].map(channel => {
          const filteredChannel = {...channel}
          filteredChannel.programmes = channel.programmes.filter(program => {
            let startTime = parseInt((program.start_time.split(/\s/))[0].substring(8, 10))
            let finishTime = parseInt((program.finish_time.split(/\s/))[0].substring(8, 10))
            if (startTime >= 19) {
              startTime -= 24
            }
            if (finishTime < 6 && startTime >= 19) {
              finishTime += 24
            }
            
            if (timeToFilter === 'morning') {
              return startTime >= 6 && finishTime <= 12
            } else if (timeToFilter === 'afternoon') {
              return startTime >= 12 && finishTime <= 19
            } else if (timeToFilter === 'night') {
              return startTime >= 19 || finishTime <= 6
            }
          })
          return filteredChannel
        })
        return {...state, programmes: filteredProgrammes}
      }
    }
  },
})

export const {
  fillList,
  fillChannelList,
  addToIdsList,
  removeFromIdsList,
  resetChannelsIds,
  filterByHour,
} = programmesSlice.actions

export default programmesSlice