const { Sequelize, DataTypes } = require('sequelize')
let pokemons = require('./mock-pokemon.js')
const PokemonModel = require('../models/pokemon.js')

const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)
const pokemonMod = PokemonModel(sequelize, DataTypes)

const initDB = () => {
    return sequelize.sync({ force: true })
        .then(_ => {
            console.log("La base de donnée pokemon a bien été synchronisée")

            pokemons.map(pokemon => {
                pokemonMod.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types,
                })
                    .then(pokemon => console.log(pokemon.toJSON()))

            })
        })
}

module.exports = {
    initDB, pokemonMod
}



