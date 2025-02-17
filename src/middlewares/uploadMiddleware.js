const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory as buffers

const upload = multer({
  storage,
  limits: {  }, // Limit to 10MB
  fileFilter: (req, file, cb) => {
    
    const allowedTypes = [
      'application/pdf', // PDF
      'image/png', // PNG
      'image/jpeg', // JPG, JPEG
      'application/vnd.ms-excel', // XLS
      'application/vnd.ms-excel.sheet.binary.macroEnabled.12', // XLSB
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
      'text/csv', // CSV
      'application/vnd.ms-powerpoint', // PPT
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
      'application/msword', // DOC
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
      'text/plain', // TXT
      'image/svg+xml', // SVG
      'application/zip', // ZIP
      'application/x-rar-compressed', // RAR
      'application/x-zip-compressed', // ZIP (agregado para permitir este tipo también)
      'application/json', // JSON
      'application/javascript', // JS
      'application/rtf', // RTF
      'audio/mpeg', // MP3
      'audio/wav', // WAV
      'video/mp4', // MP4
      'video/x-msvideo', // AVI
      'video/quicktime', // MOV
      'video/x-matroska', // MKV
      'application/x-shockwave-flash', // SWF (Flash)
      'application/x-tar', // TAR
      'application/x-7z-compressed', // 7Z
      'application/x-bzip2', // BZ2
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // El tipo de archivo es válido
    } else {
      // Mejorar el mensaje de error para mostrar el tipo MIME que se rechazó
      cb(new Error(`Invalid file type: ${file.mimetype}. Only the following types are allowed: ${allowedTypes.join(', ')}.`));
    }
  },
}).fields([{ name: 'materials', maxCount: 40 }]); // Maximum of 20 files

module.exports = upload;