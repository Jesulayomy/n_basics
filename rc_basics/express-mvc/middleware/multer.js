const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: async (req, file, cb) => {
    try {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        return cb(new Error("File type is not supported"), false);
      }
      cb(null, true);
    } catch (error) {
      cb(error, false);
    }
  }
});
