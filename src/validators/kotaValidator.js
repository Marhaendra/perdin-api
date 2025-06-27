const { body } = require('express-validator');

const cityValidationRules = () => {
  return [
    body('nama').notEmpty().withMessage('Nama kota diperlukan'),
    body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude tidak valid'),
    body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude tidak valid'),
    body('provinsi').notEmpty().withMessage('Nama provinsi diperlukan'),
    body('pulau').notEmpty().withMessage('Nama pulau diperlukan'),
    body('luar_negeri').optional().isBoolean()
  ];
};

module.exports = {
  cityValidationRules
};