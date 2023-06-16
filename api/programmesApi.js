import axios from 'axios';

class programmesApi {
    static getHomeProgrammes() {
        return fetch(`${process.env.NEXT_PUBLIC_PROGRAMMES_URL}/home`).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static getAllChannels () {
        return fetch(`${process.env.NEXT_PUBLIC_PROGRAMMES_URL}/channels`).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static renewProgrammesList(channels_ids) {
        const data = JSON.stringify({channels_ids: channels_ids});
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return axios.post(`${process.env.NEXT_PUBLIC_PROGRAMMES_URL}/renew`, data, config).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }
}

export default programmesApi;
