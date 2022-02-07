import express from 'express';
import twig from 'twig';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Pokemon from './models/modelPokemon.js';
import User from './models/modelUser.js';
import session from 'express-session';
import { Helper } from './helper/helper.js';



const app = express();
const database = "mongodb+srv://samoteur13:022394Samy@cluster0.jwcdd.mongodb.net/pokemon?retryWrites=true&w=majority"


//----------------------------------------connexion mongose
mongoose.connect(database, err => {
    if (err) {
        console.log("erreur de connexion" + err)
    } else {
        console.log('connected at mongodb')
    }
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./assets'));

//-----------------------------------------création de session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

//----------------------------------------lancement de serveeur
app.listen(8081, () => {
    console.log('le serveur a démare')
})

//-----------------------------------------main page
app.get('/', async (req, res) => {
    const listUser = await User.find()//
    res.render('./template/pokemon/listPokemon.html.twig', {
        users: listUser
    })
})


//-----------------------------------------ajouter un pokemon
app.get('/addPokemon', async (req, res) => {
    res.render('./template/pokemon/addPokemon.html.twig', {
    })
})

//-----------------------------------------modifier un utilisateur
app.get('/updateUser/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    res.render('./template/user/addUser.html.twig', {
        user: user,
        action: '/updateUser'
    })
})

app.post('/updatePokemon/:id', async (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body, (error, pokemon) => {
        if (error) {
            console.log(error)
            res.status(404)  // renvoie l'erreur si il y a un probleme 
        } else {
            res.redirect('/')
        }
    })
})

//-----------------------------------------suprimé un utilisateur
app.get('/deleteUser/:id', async (req, res) => {
    User.deleteOne({ _id: req.params.id }, (error, pokemon) => {
        if (error) {
            console.log(404)
        } else {
            res.redirect('/')
        }
    })
})

//-----------------------------------------ajouter un utilisateur
app.get('/addUser', async (req, res) => {
    res.render('./template/user/addUser.html.twig', {

    })
})

app.post('/addUser', async (req, res) => {
    const user = new User(req.body)
    user.save()
    res.redirect('/connexion')
})

//------------------------------------------se connecter un une session
app.get('/connexion', async (req, res) => {

    res.render('./template/user/connexion.html.twig', {

    })
})

app.post('/connexion', async (req, res) => {
    //  if (req.session.userId) {
    //     res.redirect('connexionUser/' + req.session.userId)
    // }
    const user = await User.findOne({ pseudo: req.body.pseudo, password: req.body.password })
    if (user) {
        req.session.userId = user._id
    }
    res.redirect('/connexionUser/' + req.session.userId)
})

//------------------------------------------page de connexion pour utilisateur
app.get('/connexionUser/:id', async (req, res) => {
    let user = await User.findOne({ _id: req.params.id })
    if (user) {
        req.session.userId = user._id       ///pourquoi ceci
    }

    res.render('./template/pokemon/listPokemon.html.twig', {
        action: "/connexionUser",
        user: user
    })
})

//------------------------------------------ajouter un pokemon pour l'utilisateur
app.get('/addPokemonUser/:id', async (req, res) => {
    let pokemonRandom = Helper.imagePokemon()
    let user = await User.findOne({ _id: req.params.id })

    res.render('./template/pokemon/addPokemon.html.twig', {
        action: "/addPokemonUser",
        user: user,
        pokemonImage: pokemonRandom.image,
        pokemonName: pokemonRandom.name,
        pokemonLvl: pokemonRandom.lvl
    })
})


app.post('/addPokemonUser/:id', async (req, res) => {
    let user = await User.findOne({ _id: req.params.id })  //rappel de ce qu'il faut
    if (user) {
        req.session.userId = user._id       ///pourquoi ceci
    }

    const pokemon = new Pokemon(req.body) //appel un shema de pokémon
    user.pokemonUser.push(pokemon) //renvoie dans le tableaux le pokémon avec les information

    let number = 0
    number = user.badgeUser.length
    res.redirect('/connexionUser/' + req.session.userId)
    if (user.badgeUser.length < 8) {
        if (user.pokemonUser.length % 2 == 0) {
            if (user.badgeUser.length === 0) {
                number
            }
            user.badgeUser.push(Helper.badgePokemon(number))
        }
    }

    await user.save() //attend la sauvgarde
})

//------------------------------------------modifier un pokemon pour l'utilisateur
app.get('/updateUserPokemon/:id', async (req, res) => {
    let user = await User.findOne({ _id: req.session.userId })
    const index = user.pokemonUser.findIndex(pokemonUser => pokemonUser._id == req.params.id)

    res.render('./template/pokemon/addPokemon.html.twig', {
        action: "/updateUserPokemon",
        user: user,
        pokemon: req.params.id ,
        pokemonParams : user.pokemonUser[index]
    })
})

app.post('/updateUserPokemon/:id', async (req, res) => {

    const user = await User.findOne({ _id: req.session.userId });

    //recherche l'index dans le tableaux
    const index = user.pokemonUser.findIndex(pokemonUser => pokemonUser._id == req.params.id);

    user.pokemonUser[index].attaque = req.body.attaque;
    user.pokemonUser[index].defense = req.body.defense;
    user.pokemonUser[index].vitesse = req.body.vitesse;

    User.updateOne({ _id: req.session.userId }, { pokemonUser: user.pokemonUser }, (error, user) => {
        if (error) {
            console.log(error);
            res.status(404);
        } else {
            res.redirect('/connexionUser/' + req.session.userId)
        }
    })

})

//------------------------------------------suprimé un pokemon pour l'utilisateur
app.get('/deleteUserPokemon/:id', async (req, res) => {

    const user = await User.findOne({ _id: req.session.userId }) //pour sauvegarder enssuite sur l'utilisateur
    let url = req.params.id //recup param du pokemon
    user.pokemonUser.splice(url, 1) //supprimé l'élèment ciblé
    await user.save()

    res.redirect('/connexionUser/' + req.session.userId)
})

app.get('/deconexion', async (req, res) => {
    req.session.destroy()
    res.redirect('/connexion')
})




