import multer, { diskStorage } from "multer";

const storageConfig = diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./uploads/")
    },
    filename: (req,file,cb)=>{
        const name = Date.now()+"-"+file.originalname
        cb(null,name)
    }
})

export const upload = multer({
    storage: storageConfig
})