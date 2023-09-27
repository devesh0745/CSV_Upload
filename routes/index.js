//Index routes
const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);

router.post('/upload-file',homeController.uploadCSV);

router.get('/del-file/:id',homeController.deleteFile);

router.use('/table',require('./table'));

module.exports=router;