import axios from 'axios'

class programmesApi {
    static getHomeProgrammes() {
        return fetch('http://localhost:5000/home').then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static getAllChannels () {
        return fetch('http://localhost:5000/channels').then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static renewProgrammesList(channels_ids) {

        const data = JSON.stringify({channels_ids: channels_ids})
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return axios.post('http://localhost:5000/renew', data, config).then(response => {
            return response;
        }).catch(error => {
            return error
        })
    }


}

export default programmesApi