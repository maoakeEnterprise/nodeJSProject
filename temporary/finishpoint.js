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

app.post('/api/pokemons', (req, res) => {// AJOOUTER
    const id = getUniqueId(pokemons)
    const pokemonCreated = {
        ...req.body, ...{ id: id, created: new Date() }
    }
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => { //MODIFIER
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié`
    res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé`
    res.json(success(message, pokemonDeleted))
})