const PORT = 8000
const axios = require("axios").default
const express = require('express')
const cors = require("cors")
require('dotenv').config()

const app = express()

app.use(cors())

//own RAPID_API_KEY=3dadb2bf6dmshc5d7067624aa1f8p1d718cjsn454dea59d05a
//ania RAPID_API_KEY=c8326cc712msh26f92b647d75484p13025cjsnc5bec1e9f4c4

app.get('/word', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '5'},
        headers: {
            'x-rapidapi-host': 'random-words5.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPID_API_KEY
        }
    }

    axios.request(options).then((response) => {
        console.log(response)
        res.json(response.data[0])
    }).catch((error) => {
        console.error(error)
    })
})

app.get('/check', (req, res) => {
    const word = req.query.word

    const options = {
        method: 'GET',
        url: 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary',
        params: {word: word},
        headers: {
            'x-rapidapi-host': 'dictionary-by-api-ninjas.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPID_API_KEY
        }
    }

    axios.request(options).then((response) => {
        console.log(response.data)
        res.json(response.data.valid)
    }).catch((error) => {
        console.error(error)
    })
})




app.listen(PORT, () => console.log('Server running on port ' + PORT))

