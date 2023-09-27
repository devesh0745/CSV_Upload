//Creating schema for files.
const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
//will store this path in FILE_PATH
const FILE_PATH=path.join('./uploads/csv');

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    csvPath:{
        
    }

},{
    timestamps:true
});


let storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'..',FILE_PATH));
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

//statics methods
//this will attach the diskstorage on multer on the storage property.//single will tell to upload the single file only.
fileSchema.statics.uploadedFile=multer({storage:storage}).single('file');

//So this avatar_path can be available publicially.
fileSchema.statics.filePath=FILE_PATH;


const CSVupload=mongoose.model('CSVupload',fileSchema);

module.exports=CSVupload;