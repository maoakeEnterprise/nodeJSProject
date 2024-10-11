const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize.js')


const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/src/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDB()

//Point de terminaison
require('./src/routes/findAllPokemons.js')(app)
require('./src/routes/findPokemonByPk.js')(app)
require('./src/routes/createPokemon.js')(app)
require('./src/routes/updatePokemon.js')(app)
require('./src/routes/deletePokemon.js')(app)
/* Peut s'écrire de cette facon (car c'est un raccourci de syntaxe)
findAllPokemon = require('./src/routes/findAllPokemons.js')
findAllPokemon(app)
 */

//On ajoute la gestion des erreurs 404 

app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource demandée ! Essayer un autre URL '
    res.status(404).json({ message })
})

app.listen(port, () => console.log(`Notre application Node est sur : http://localhost:${port}`))

