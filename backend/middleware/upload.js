const multer = require("multer");
const path = require("path")
const fs = require("fs");

const uploadFile = (req, res, next) => {

    const UPLOADS_FOLDER = "./uploads/"

    // Ensure uploads folder exists
    if (!fs.existsSync(UPLOADS_FOLDER)) {
        fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOADS_FOLDER)
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname)
            const fileName = file.originalname
                                .replace(fileExt, "")
                                .toLowerCase()
                                .split(" ")
                                .join("-") + "-" + Date.now()
            cb(null, fileName + fileExt)
        }
    })

    var uploadMulter = multer({
        dest: UPLOADS_FOLDER,
        limits: {
            fileSize: 1024 * 1024 * 100  // 100 MB
        },
        storage: storage,
        fileFilter: (req, file, cb) => {
            if(file.mimetype === "application/pdf") {
                cb(null, true);
            } else {
                return cb(new Error('Please upload pdf file'));
            }
        }
    })

    const upload = uploadMulter.single('file');

    upload(req, res, function (err) {
        if(err) {
            res.status(400).send({success: false, msg: err.message})
        }
        else {
            next()
        }
    })
}

module.exports = uploadFile