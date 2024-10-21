const Roles = require('../models/roles')

const createRoles = async(roledata) =>{
    return await Roles.create(roledata);
}
const getallRoles = async() =>{
    return await Roles.findAll();
}
const getRoleById = async(roleId) =>{
    return await Roles.findByPk(roleId);
}
const updateRole = async(roleId, updateData)=>{
    return await Roles.update(updateData,{
        where:{
            id:roleId
        }
    });
}
const removeRole = async(roleId) =>{
    return await Roles.destroy({
        where:{
            id:roleId
        }
    })
}

module.exports = {
    createRoles,
    getallRoles,
    getRoleById,
    updateRole,
    removeRole
}