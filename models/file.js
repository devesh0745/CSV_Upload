const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
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

//fileSchema.statics.uploadedFile=multer({storage:storage});

//fileSchema.statics.filePath=FILE_PATH;

fileSchema.statics.uploadedFile=multer({storage:storage}).single('file');
fileSchema.statics.filePath=FILE_PATH;


const CSVupload=mongoose.model('CSVupload',fileSchema);

module.exports=CSVupload;