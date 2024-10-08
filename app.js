const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
let pokemons = require('./src/db/mock-pokemon')
const { success } = require('./helper.js')
const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/src/favicon.ico'))
    .use(morgan('dev'))

app.get('/', (req, res) => res.send('Hello again express'))

app.get('/api/pokemons', (req, res) => {
    const message = `Il y a ${pokemons.length} pokemon dans le pokedex pour le moment.`
    res.json(success(message, pokemons))
})

app.get('/api/pokemons/:id', (req, res) => {
    const message = "Un pokemon a bien été trouvé"
    const pokemon = pokemons.find(pokemon => pokemon.id === parseInt(req.params.id))

    res.json(success(message, pokemon))
})

app.listen(port, () => console.log(`Notre application Node est sur : http://localhost:${port}`))

