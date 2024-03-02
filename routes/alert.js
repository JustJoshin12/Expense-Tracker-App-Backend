const router = require("express").Router();
const { setAlertThreshold, updateAlertThreshold, deleteAlert } = require('../controllers/alert'); 

//CRUD

//Create a alert threshold
router.post('/', setAlertThreshold);

// Update alert threshold
router.patch('/:id', updateAlertThreshold);

// Delete alert 
router.delete('/:id', deleteAlert);

module.exports = router;
