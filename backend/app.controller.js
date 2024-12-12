const cnx = require("./data")
exports.addPlayer = (req, res)=>{
    const error = []

    if(!req.body.nom){error.push("Entre un Nom")}
    if(!req.body.prenoms){error.push("Entre un Prenoms")}
    if(!req.body.dateNais){error.push("Entre la date de naissance")}
    if(!req.body.genre){error.push("Entre votre genre")}
    
    if(req.body.nom && req.body.nom.length <= 3){error.push("Entre un nom supperieur 3 carateres")}
    if(req.body.prenoms && req.body.prenoms.length <= 3){error.push("Entre un prenoms supperieur 3 carateres")}

    if(error.length > 0){
        return res.status(400).json(error)
    }
    else{
        const outStament = cnx.prepare(`INSERT INTO player(nom, prenoms, dateNais, genre) VALUES (?,?,?,?)`)
        outStament.run([req.body.nom, req.body.prenoms, req.body.dateNais, req.body.genre], (error)=>{
            if (error) {
                return res.send(400).json({message : "error sql"})
            }
            else{
                return res.status(200).json({message : `${req.body.nom} ${req.body.prenoms} a ete ajouter`})
            }
        })

    }
}


exports.getAllPlayer =  (req, res)=>{
    cnx.all("SELECT * FROM player", (err, rows)=>{
        if(err){
            return res.status(400).json({"message" : "error sql"})
        }
        else {
            if(rows.length == 0 ){
                return res.status(404).json("Pas de Joueur")
            }
            else{
                return res.status(200).json(rows)
            }
        }
    }
    )
}


exports.putPlayer = (req, res)=>{

    const error = []
    let nbrePlayer = 0
    let id = 0
    if( typeof req.params.id == "string") {id = parseInt(req.params.id)}
    if(!req.body.nom){error.push("Entre un Nom")}
    if(!req.body.prenoms){error.push("Entre un Prenoms")}
    if(!req.body.dateNais){error.push("Entre la date de naissance")}
    if(!req.body.genre){error.push("Entre votre genre")}
    
    if(req.body.nom && req.body.nom.length <= 3){error.push("Entre un nom supperieur 3 carateres")}
    if(req.body.prenoms && req.body.prenoms.length <= 3){error.push("Entre un prenoms supperieur 3 carateres")}

    if(error.length > 0){
        return res.status(400).json(error)
    }
    else{
        cnx.each(`SELECT COUNT(id) as nbre FROM player;`, (err, row)=>{
            nbrePlayer = row.nbre
            if (err) return res.status(400).json({"error" : err})
            if(nbrePlayer < id){
                return res.status(404).json("pas de player")
            }
            else{
                const outStament = cnx.prepare(`UPDATE player SET nom = '${req.body.nom}', prenoms = '${req.body.prenoms}', dateNais = '${req.body.dateNais}', genre = '${req.body.genre}' where id = ${id} `)
                outStament.run((error)=>{
                    if (error) {
                        return res.status(400).json({error : error})
                    }
                    else{
                        return res.status(200).json({message : `${req.body.nom} ${req.body.prenoms} a ete modifier`})
                    }
                })

            }
        })
    }
}