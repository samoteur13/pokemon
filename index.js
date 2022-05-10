import express from 'express';
import twig from 'twig';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Pokemon from './models/modelPokemon.js';
import User from './models/modelUser.js';
import session from 'express-session';
import { Helper } from './helper/helper.js';
import { Config } from './config.js';



const app = express();
const database = "mongodb+srv://" + Config.dbUserName + ":" + Config.dbPassword + "@" + Config.bdClusterName + "/" + Config.bdNameDatabase + "?retryWrites=true&w=majority"


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
    let user = await User.findOne({ _id: req.session.userId })
    const listUser = await User.find()
    res.render('./template/pokemon/listPokemon.html.twig', {
        users: listUser,
        user: user
    })
})

//-----------------------------------------modifier un utilisateur a finire
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
        messageErreur: req.session.messageErreur
    })
    req.session.destroy()
})

app.post('/addUser', async (req, res) => {
    const userEmail = await User.findOne({ email: req.body.email })
    const userPseudo = await User.findOne({ pseudo: req.body.pseudo })

    req.session.messageErreur = ""

    if (userEmail || userPseudo) {
        if (userEmail) {
            req.session.messageErreur += "Ces information sont déjà utiliser <br />"
        }
        if (userPseudo) {
            req.session.messageErreur += "ce pseudo est déja utiliser <br />"
        }

        res.redirect('/addUser')
    } else {
        req.session.messageErreur = ""
        const user = new User(req.body)
        user.save()
        res.redirect('/connexion')
    }

})

//------------------------------------------se connecter un une session
app.get('/connexion', async (req, res) => {

    res.render('./template/user/connexion.html.twig', {
        messageErreur: req.session.messageErreur
    })
    req.session.destroy()
})

app.post('/connexion', async (req, res) => {

    const user = await User.findOne({ pseudo: req.body.pseudo, password: req.body.password })
    if (user) {
        req.session.userId = user._id
        req.session.messageErreur = ""
        res.redirect('/connexionUser/' + req.session.userId)
    } else {
        req.session.messageErreur = "Vos informations sont erronés"
        res.redirect('/connexion')
    }

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
    await user.pokemonUser.push(pokemon) //renvoie dans le tableaux le pokémon avec les information

    let number = 0
    number = user.badgeUser.length

    if (user.badgeUser.length < 8) {
        if (user.badgeUser.length === 0 && user.pokemonUser.length == 2) {
            await user.badgeUser.push(Helper.badgePokemon(number))
        } else if (user.badgeUser.length === 1 && user.pokemonUser.length === 2 * 2) {
            await user.badgeUser.push(Helper.badgePokemon(number))
        } else if (user.badgeUser.length === 2 && user.pokemonUser.length === 2 * 3) {
            await user.badgeUser.push(Helper.badgePokemon(number))
        } else if (user.badgeUser.length === 3 && user.pokemonUser.length === 2 * 4) {
            await user.badgeUser.push(Helper.badgePokemon(number))
        } else if (user.badgeUser.length === 4 && user.pokemonUser.length === 2 * 5) {
            await user.badgeUser.push(Helper.badgePokemon(number))
        } else if (user.badgeUser.length === 5 && user.pokemonUser.length === 2 * 6) {
            await user.badgeUser.push(Helper.badgePokemon(number))
        } else if (user.badgeUser.length === 6 && user.pokemonUser.length === 2 * 7) {
            await user.badgeUser.push(Helper.badgePokemon(number))
        } else if (user.badgeUser.length === 7 && user.pokemonUser.length === 2 * 8) {
            await user.badgeUser.push(Helper.badgePokemon(number))
        }
    }

    await user.save() //attend la sauvgarde
    res.redirect('/connexionUser/' + req.session.userId)
})

//------------------------------------------modifier un pokemon pour l'utilisateur
app.get('/updateUserPokemon/:id', async (req, res) => {
    let user = await User.findOne({ _id: req.session.userId })
    const index = user.pokemonUser.findIndex(pokemonUser => pokemonUser._id == req.params.id)

    res.render('./template/pokemon/addPokemon.html.twig', {
        action: "/updateUserPokemon",
        user: user,
        pokemon: req.params.id,
        pokemonParams: user.pokemonUser[index]
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
    const index = user.pokemonUser.findIndex(pokemonUser => pokemonUser._id == req.params.id);//cherche l'index du pokemon 
    user.pokemonUser.splice(index, 1) //supprimé l'élèment ciblé
    await user.save()
    res.redirect('/connexionUser/' + req.session.userId)
})

app.get('/deconexion', async (req, res) => {
    req.session.destroy()
    res.redirect('/connexion')
})




