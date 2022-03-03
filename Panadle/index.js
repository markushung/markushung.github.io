const PORT = 8000
const axios = require("axios").default
const express = require('express')

const app = express()

app.get('/word', (req, res) => {

})

app.listen(PORT, () => console.log('Server running on port' + PORT))

const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: {count: '5', wordLength: '5'},
    headers: {
        'x-rapidapi-host': 'random-words5.p.rapidapi.com',
        'x-rapidapi-key': '3dadb2bf6dmshc5d7067624aa1f8p1d718cjsn454dea59d05a'
    }
}

axios.request(options).then((response) => {
    console.log(response.data)
}).catch((error) => {
    console.error(error)
})