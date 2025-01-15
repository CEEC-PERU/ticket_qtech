const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory as buffers

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDFs and images are allowed.'));
    }
  },
}).fields([{ name: 'materials', maxCount: 20 }]); // Maximum of 20 files

module.exports = upload;