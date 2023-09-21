const express=require('express');
const router=express.Router();

const tableController=require('../controllers/table_controller');

router.get('/file-data/:id',tableController.viewData);

module.exports=router;