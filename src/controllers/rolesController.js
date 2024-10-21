const Roles = require('../models/roles');
const rolesService = require('../services/rolesService')

const createRole = async (req, res) => {
    try {
        const roles = await rolesService.createRoles(req.body);
        res.status(201).json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const showRoles = async(req,res) =>{
    try{
        const roles = await rolesService.getallRoles();
        res.status(201).json(roles);
    } catch(err){
        res.status(500).json({error:err.message});
    }
}
const showRoleById = async(req,res) =>{
    try{
        const roles = await rolesService.getRoleById(req.params.id);
        if(roles) res.status(201).json(roles);
        else res.status(404).json({error:'Role not found.'});
    }catch(err){
        res.status(500).json({eror:err.message});
    }
}
const updateRole = async(req,res)=>{
    try{
        const roles = await rolesService.updateRole(req.params.id,req.body);
        res.json(roles);
    }catch(err){
        req.status(500).json({error:err.message});
    }
}
const removeRole = async(req,res)=>{
    try{
        await rolesService.removeRole(req.params.id);
        res.json({message:'Role deleted'});
    }catch(err){
        res.status(500).json({ error: err.message });       
    }
}
module.exports = {
    createRole,
    showRoles,
    showRoleById,
    updateRole,
    removeRole
}