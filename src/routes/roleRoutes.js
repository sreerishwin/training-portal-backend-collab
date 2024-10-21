const express = require('express');
const router = express.Router();
// const authenticateToken = require('../middlewares/authMiddleware')
const {createRole,
    showRoles,
    showRoleById,
    updateRole,
    removeRole } = require('../controllers/rolesController');

router.post('/',createRole );

router.get('/',showRoles);

router.get('/:id',showRoleById);

router.put('/:id',updateRole);

router.delete('/:id',removeRole);

module.exports = router;
