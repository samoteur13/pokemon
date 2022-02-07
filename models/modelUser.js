import mongoose from 'mongoose';

const userShema = new mongoose.Schema({
    name: String,
    firstname: String,
    pseudo: String,
    email: String,
    password: String,
    pokemonUser: Array ,
    badgeUser:Array
})

const User = mongoose.model('user', userShema) //premier argument nom de la sous-database

export default User