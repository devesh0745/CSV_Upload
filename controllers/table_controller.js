const CSVupload=require('../models/file');
const fs=require('fs');
const csv=require('csv-parser');
const path=require('path');
const jsonToTable=require('json-to-table');


module.exports.viewData=async function(req,res){
    try{
    const results=[];
    const file=await CSVupload.findById(req.params.id);
  //  let csv_file=file.name;
    fs.createReadStream(file.csvPath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
    //    console.log('results:',results);
        const convertToTable=jsonToTable(results);
    //    console.log(convertToTable[0]);
        return res.render('table',{
            title:'CSV_Upload',
            table:convertToTable
          })
  });
 
    }catch(err){
        console.log('error in parsing csv file!',err);
        return res.redirect('back');
    }
}