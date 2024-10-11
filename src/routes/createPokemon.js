const { pokemonMod } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemons', (req, res) => {
        pokemonMod.create(req.body)
            .then(pokemon => {
                const message = `Le pokemon ${req.body.name} a bien été créé`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                const message = `Le pokemon n'a pas pu être créer. Réessayez dans quelques instant`
                res.status(500).json({ message, data: error })
            })
    })
}