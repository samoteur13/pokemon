function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export class Helper {

    static imagePokemon() {
        let number = getRandomInt(151)
        let tab = [
            'Bulbizarre',
            'Herbizarre',
            'Florizarre',
            'Salamèche',
            'Reptincel',
            'Dracaufeu',
            'Carapuce',
            'Carabaffe',
            'Tortank',
            'Chenipan',
            'Chrysacier',
            'Papilusion',
            'Aspicot',
            'Coconfort',
            'Dardargnan',
            'Roucool',
            'Roucoups',
            'Roucarnage',
            'Rattata',
            'Rattatac',
            'Piafabec',
            'Rapasdepic',
            'Abo',
            'Arbok',
            'Pikachu',
            'Raichu',
            'Sabelette',
            'Sablaireau',
            'Nidoran♀',
            'Nidorina',
            'Nidoqueen',
            'Nidoran♂',
            'Nidorino',
            'Nidoking',
            'Mélofée',
            'Mélodelfe',
            'Goupix',
            'Feunard',
            'Rondoudou',
            'Grodoudou',
            'Nosferapti',
            'Nosferalto',
            'Mystherbe',
            'Ortide',
            'Rafflésia',
            'Paras',
            'Parasect',
            'Mimitoss',
            'Aéromite',
            'Taupiqueur',
            'Triopikeur',
            'Miaouss',
            'Persian',
            'Psykokwak',
            'Akwakwak',
            'Férosinge',
            'Colossinge',
            'Caninos',
            'Arcanin',
            'Ptitard',
            'Têtarte',
            'Tartard',
            'Abra',
            'Kadabra',
            'Alakazam',
            'Machoc',
            'Machopeur',
            'Mackogneur',
            'Chétiflor',
            'Boustiflor',
            'Empiflor',
            'Tentacool',
            'Tentacruel',
            'Racaillou',
            'Gravalanch',
            'Grolem',
            'Ponyta',
            'Galopa',
            'Ramoloss',
            'Flagadoss',
            'Magnéti',
            'Magnéton',
            'Canarticho',
            'Doduo',
            'Dodrio',
            'Otaria',
            'Lamantine',
            'Tadmorv',
            'Grotadmorv',
            'Kokiyas',
            'Crustabri',
            'Fantominus',
            'Spectrum',
            'Ectoplasma',
            'Onix',
            'Soporifik',
            'Hypnomade',
            'Krabby',
            'Krabboss',
            'Voltorbe',
            'Électrode',
            'Nœunœuf',
            'Noadkoko',
            'Osselait',
            'Ossatueur',
            'Kicklee',
            'Tygnon',
            'Excelangue',
            'Smogo',
            'Smogogo',
            'Rhinocorne',
            'Rhinoféros',
            'Leveinard',
            'Saquedeneu',
            'Kangourex',
            'Hypotrempe',
            'Hypocéan',
            'Poissirène',
            'Poissoroy',
            'Stari',
            'Staross',
            'M.Mime',
            'Insécateur',
            'Lippoutou',
            'Élektek',
            'Magmar',
            'Scarabrute',
            'Tauros',
            'Magicarpe',
            'Léviator',
            'Lokhlass',
            'Métamorph',
            'Évoli',
            'Aquali',
            'Voltali',
            'Pyroli',
            'Porygon',
            'Amonita',
            'Amonistar',
            'Kabuto',
            'Kabutops',
            'Ptéra',
            'Ronflex',
            'Artikodin',
            'Électhor',
            'Sulfura',
            'Minidraco',
            'Draco',
            'Dracolosse',
            'Mewtwo',
            'Mew',
        ];

        const pokemonRandom = {
            name: String,
            image: String
        }

        for (let i = 0; i < tab.length; i++) {
            if (i === number) {

                pokemonRandom.name = tab[i]
                pokemonRandom.image = "/pokemonPng/" + (number + 1) + ".png"
            }
        }

        return pokemonRandom
    }



    static badgePokemon(number) {

        let tab = ["Badge Roche", "Badge Cascade", "Badge Foudre", "Badge Prisme", "Badge Âme", "Badge Marais", "Badge Volcan", "Badge Terre"]
        const badgeUser = {
            name: String,
            image: String
        }
        for (let i = 0; i < tab.length; i++) {
            if (i === number) {
                badgeUser.name = tab[i]
                badgeUser.image = "/badge/" + (i + 1) + ".png"
            }
        }
        return badgeUser
    }


}

