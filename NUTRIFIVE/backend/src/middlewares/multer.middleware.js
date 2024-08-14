import multer from "multer";


const storage=multer.diskStorage(
    {
        destination:function(req,file,cb){
            cb(null,"./public/temp")
        },
        filename:function(req,file,cb){
            cb(null,file.originalname) //not recommanded as there can be multiple files with the same name
        }
    }
)


export const upload=multer({
    storage,
})