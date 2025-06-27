const { body } = require('express-validator');

const perdinValidationRules = () => {
    return [
        body('maksud_tujuan').notEmpty().withMessage('Maksud tujuan diperlukan'),
        body('tanggal_berangkat').isDate().withMessage('Tanggal berangkat tidak valid'),
        body('tanggal_pulang').isDate().withMessage('Tanggal pulang tidak valid'),
        body('kota_asal_id').isInt().withMessage('Kota asal tidak valid'),
        body('kota_tujuan_id').isInt().withMessage('Kota tujuan tidak valid'),
        body('tanggal_pulang').custom((value, { req }) => {
            if (new Date(value) < new Date(req.body.tanggal_berangkat)) {
                throw new Error('Tanggal pulang harus setelah tanggal berangkat');
            }
            return true;
        })
    ];
};

module.exports = {
    perdinValidationRules
};