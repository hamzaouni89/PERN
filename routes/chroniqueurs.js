const router = require('express').Router();
const pool = require('../db');


//Create a chroniqueur

router.route('/add').post( async(req,res)=>{
    try{
        const {nom , prenom , date_naissance ,num_tel} = req.body;

        const newChroniqueur = await pool.query('INSERT INTO chroniqueur (nom, prenom, date_naissance, num_tel) VALUES ($1, $2, $3, $4) ',
        [nom , prenom , date_naissance, num_tel]);
        res.json(newChroniqueur)
    }catch (err){
        console.error(err.message);    
    }
});

// Get all chroniqueurs

router.route('/').get(async(req , res) => {
    try{
        const allChroniqueur = await pool.query('SELECT * FROM chroniqueur');
        res.json(allChroniqueur.rows);
    }catch (err){
        console.log(err.message);    
    }
});

//get a chroniqueur

router.route('/:id').get(async(req , res) => {
    try{
        const {id } = req.params;
        const chroniqueur = await pool.query('SELECT * FROM chroniqueur WHERE chroniqueur_id =$1', [id]);
        res.json(chroniqueur.rows[0]);
    }catch (err){
        console.log(err.message);    
    }
});

// update a chroniqueur 

router.route('/update/:id').post(async(req , res) => {
    try{
        const {id } = req.params;
        const {nom , prenom , date_naissance ,num_tel} = req.body;

        const chroniqueur = await pool.query('UPDATE chroniqueur SET nom =$1, prenom=$2, date_naissance=$3, num_tel=$4  WHERE chroniqueur_id =$5',
         [nom , prenom, date_naissance, num_tel, id]);
        res.json('Chroniqueur was updated');
    }catch (err){
        console.log(err.message);    
    }
});

//Delete a chroniqueur

router.route('/:id').delete (async(req , res) => {
    try{
        const { id } = req.params;
        const deleteEmission = await pool.query("DELETE FROM chroniqueur WHERE chroniqueur_id =$1", [ id]);
        res.json('Chroniqueur was deleted');
    }catch (err){
        console.log(err.message);    
    }
});


module.exports = router ;