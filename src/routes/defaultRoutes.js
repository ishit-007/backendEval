const express = require('express');
const router = express.Router();
const controller = require('../controllers/defaultController');
const validator = require('../middlewares/validator');
router.post('/api/save', validator.postReqValidator, controller.postReqHandler);
router.get('/api/companies', validator.getReqValidator, controller.getReqHandler);
router.patch('/api/update/:id', validator.patchReqValidator, controller.patchReqHandler);
module.exports = router;