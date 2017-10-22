import multer from 'multer';
import path from 'path';

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,'..','public','uploads'));
  },
  filename:(req,file,cb)=>{
    let nameExt = file.originalname.split('.');
    cb(null,nameExt[0]+"-"+Date.now()+"."+nameExt[1]);
  }
});

const upload=multer({storage,limits:{filesize:2000000}});



module.exports=upload
