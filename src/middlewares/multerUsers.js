const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users');
    },

    filename: (req, file, cb) => {
        let newName =  uuidv4();
        let fileName = `${newName}${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

let upload = multer({ storage: storage });


module.exports = upload