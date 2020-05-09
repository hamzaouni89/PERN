const router = require('express').Router();
const pool = require('../db');

//Create a emission

router.route('/add').post(async(req,res)=>{
    try{
        const {nom_emission ,dure ,date_emission, animateur, visiteur , id_chroniqueur} = req.body;

        const newEmission = await pool.query('INSERT INTO emission (nom_emission, dure , date_emission,animateur,visiteur,id_chroniqueur) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [nom_emission , dure , date_emission, animateur,visiteur,id_chroniqueur]);
        res.json(newEmission)
    }catch (err){
        console.error(err.message);    
    }
});

// Get all emissions

router.route('/').get(async(req , res) => {
    try{
        const allEmissions = await pool.query('SELECT * FROM emission INNER JOIN chroniqueur ON emission.id_chroniqueur = chroniqueur.chroniqueur_id');
        res.json(allEmissions.rows);
        console.log(allEmissions.rows);
        
    }catch (err){
        console.log(err.message);    
    }
});

//get a emission

router.route('/:id').get(async(req , res) => {
    try{
        const {id } = req.params;
        const emission = await pool.query('SELECT * FROM emission WHERE emission_id =$1', [id]);
        res.json(emission.rows[0]);
    }catch (err){
        console.log(err.message);    
    }
});

// update a emission 

router.route('/update/:id').post(async(req , res) => {
    try{
        const {id } = req.params;
        const {nom_emission ,dure ,date_emission, animateur, visiteur , id_chroniqueur} = req.body;

        const emission = await pool.query('UPDATE emission SET nom_emission =$1, dure=$2, date_emission=$3, animateur=$4, visiteur=$5, id_chroniqueur=$6 WHERE emission_id =$7', 
        [nom_emission , dure , date_emission, animateur, visiteur, id_chroniqueur, id]);
        res.json('Emission was updated');
    }catch (err){
        console.log(err.message);    
    }
});

//Delete a emission

router.route('/:id').delete(async(req , res) => {
    try{
        const { id } = req.params;
        const deleteEmission = await pool.query("DELETE FROM emission WHERE emission_id =$1", [ id]);
        res.json('Emission was deleted');
    }catch (err){
        console.log(err.message);    
    }
});


module.exports = router ;