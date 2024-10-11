const { pokemonMod } = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        pokemonMod.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return pokemonMod.findByPk(id).then(pokemon => {
                    if (pokemon === null) {
                        const message = `Le pokemon demandé n'existe pas. Réessayez un autre identifiant.`
                        return res.status(404).json({ message })
                    }
                    const message = `Le pokemon ${pokemon.name} a bien été modifié`
                    res.json({ message, data: pokemon })
                })
            })
            .catch(error => {
                const message = `Le pokemon n'a pas être modifié. Réessayez dans quelques instants. `
                res.status(404).json({ message, data: error })
            })
    })
}