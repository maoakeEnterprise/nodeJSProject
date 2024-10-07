const express = require('express')
let pokemons = require('./src/db/mock-pokemon')

const app = express()
const port = 3000


/*
Formule app.{METHODE}({ROUTE}, {CONFIGURATION}) 
GET sert a appeler une route qui sera configuré dans l'URL puis il y aura une methode de configuré dans cette méthode
LISTEN sert a ecouter le port qu'on a emprunter pour lancer le site en localhost
*/

app.get('/', (req,res) => res.send('Hello again express'))

app.get('/api/pokemons', (req,res) => {
    const pokemonsLenght = pokemons.length
    
    res.send(`Il y a ${pokemonsLenght} pokemon dans le pokedex pour le moment.`)
}) 

app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)

    const pokemon = pokemons.find(pokemon => pokemon.id === id)

    res.send(`Vous avez demandé le pokémon ${pokemon.name}.`)
})

app.listen(port, () => console.log(`Notre application Node est sur : http://localhost:${port}`))

