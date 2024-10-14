const express = require('express');
const router = express.Router();
const Assessment = require('../models/assessments');
// const authenticateToken = require('../middlewares/auth')

router.post('/',async (req, res) => {
    try {
        const assessment = await Assessment.create(req.body);
        res.status(201).json(assessment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/count',async(req,res)=> {
    try{
        const assessmentCount = await Assessment.count();
        res.status(200).json({count:assessmentCount});
    }catch(err){
        res.status(500).json({error:err.message});
    }
    
});

router.get('/',async(req,res) =>{
    try{
        const assessment = await Assessment.findAll();
        res.status(201).json(assessment);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});

router.get('/:id',async(req,res) =>{
    try{
        const assessment = await Assessment.findByPk(req.params.id);
        if(assessment) res.status(201).json(assessment);
        else res.status(404).json({error:'Assesssment not found.'});
    }catch(err){
        res.status(500).json({eror:err.message});
    }
});


router.put('/:id',async(req,res)=>{
    try{
        const assessment = await Assessment.update(req.body,{where :{id:req.params.id}});
        res.json(assessment);
    }catch(err){
        req.status(500).json({error:err.message});
    }
});


router.delete('/:id',async(req,res)=>{
    try{
        await Assessment.destroy({where:{id:req.params.id}});
        res.json({message:'Assesssment deleted'});
    }catch(err){
        res.status(500).json({ error: err.message });       
    }
});


module.exports = router;