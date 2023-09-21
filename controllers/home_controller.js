const CSVupload=require('../models/file');
const fs=require('fs');
const path=require('path');



module.exports.home=async function(req,res){
    try{
        const allFiles=await CSVupload.find({});
      //  console.log('working')
        return res.render('home',{
            title:'CSV-Upload',
            allFiles:allFiles
        });
    }catch(err){
        console.log('error in displaying files');
        return res.redirect('back');
    }
}

module.exports.uploadCSV=async function(req,res){
        CSVupload.uploadedFile(req,res,async function(err){
            try{
                console.log('file ingo:',req.file);
            if(err){
                console.log('****multer error:',err);
                return res.redirect('back');
            }
            if(req.file){
                let csvFile=await CSVupload.findOne({name:req.file.originalname});
                if(csvFile){
                    console.log('file already exits');
                    return res.redirect('back');
                }else{
                    if(req.file.mimetype!='text/csv'){
                        console.log('Please upload CSV file');
                        return res.redirect('back');
                    }else{
                    const csvFile=await CSVupload.create({
                        name:req.file.originalname,
                        avatar:CSVupload.filePath + '/' + req.file.filename,
                        csvPath:req.file.path
                    })
                    console.log('****file uploaded:',csvFile);
                    return res.redirect('back');
                }
                }

            }
            }catch(err){
                console.log('error in uploading:',err);
                return res.redirect('back');
            }
    })
}

module.exports.deleteFile=async function(req,res){
    try{
        const file=await CSVupload.findByIdAndDelete(req.params.id);
        return res.redirect('back');
    }catch(err){
        console.log('error in deleting file:',err);
        return res.redirect('back');
    }
}
 