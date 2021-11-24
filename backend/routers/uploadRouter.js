import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';


const uploadRouter = express.Router();


const getExtensionFile = (filename) => {
    const arrString = filename.split('.');
    return arrString[arrString.length - 1];
}

const storage = multer.diskStorage({
    //cb is callback
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const extensionImageList = ['png', 'jpg', 'jpeg,', 'gif', 'webp'];
        const extensionFile = getExtensionFile(file.originalname);
        if (extensionImageList.includes(extensionFile)) {
            cb(null, true);
        } else {
            cb(new Error("Extension is invalid."));
        }
    },
});

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});




export default uploadRouter;