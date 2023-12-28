var wavFileInfo= require('./wav-file-info.js');


var filename = process.argv[2];

wavFileInfo.infoByFilename(filename, function(err, info){
  if(err) console.log(err, info);
  else console.log(info);

})
