import  mongoose  from "mongoose";

const pokemonShema = new mongoose.Schema({
    name: String,
    attaque: Number,
    defense: Number,
    vitesse: Number,
    image: String,
    lvl: String
})

const Pokemon = mongoose.model('pokemons', pokemonShema)

 export default Pokemon;

