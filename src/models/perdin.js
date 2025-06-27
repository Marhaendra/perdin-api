const dbPool = require('../config/database');
const { calculateDistance, calculateAllowance } = require('../utils/perdinUtils.js');

const createPerdin = async (userId, perdinData) => {
    const { 
        maksud_tujuan, 
        tanggal_berangkat, 
        tanggal_pulang,
        kota_asal_id,
        kota_tujuan_id
    } = perdinData;

    const durasi = Math.ceil((new Date(tanggal_pulang) - new Date(tanggal_berangkat)) / (1000 * 60 * 60 * 24) + 1)
    
    const [kotaAsal] = await dbPool.execute('SELECT * FROM kota WHERE id = ?', [kota_asal_id]);
    const [kotaTujuan] = await dbPool.execute('SELECT * FROM kota WHERE id = ?', [kota_tujuan_id]);
    
    const jarak_km = calculateDistance(
        kotaAsal[0].latitude, kotaAsal[0].longitude,
        kotaTujuan[0].latitude, kotaTujuan[0].longitude
    );
    
    const uang_saku_perhari = calculateAllowance(
        jarak_km,
        kotaAsal[0].provinsi === kotaTujuan[0].provinsi,
        kotaAsal[0].pulau === kotaTujuan[0].pulau,
        kotaTujuan[0].luar_negeri
    );
    
    const total_uang_saku = uang_saku_perhari * durasi;

    const SQLQuery = `
        INSERT INTO perdin 
        (user_id, maksud_tujuan, tanggal_berangkat, tanggal_pulang, kota_asal_id, kota_tujuan_id, 
         durasi, jarak_km, uang_saku_perhari, total_uang_saku, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENGAJUAN')
    `;
    
    const values = [
        userId, maksud_tujuan, tanggal_berangkat, tanggal_pulang, kota_asal_id, kota_tujuan_id,
        durasi, jarak_km, uang_saku_perhari, total_uang_saku
    ];

    return dbPool.execute(SQLQuery, values);
};

const getPerdinByUserId = async (userId) => {

    const SQLQuery = `
        SELECT p.*, 
               ka.nama as kota_asal, 
               kt.nama as kota_tujuan
        FROM perdin p
        JOIN kota ka ON p.kota_asal_id = ka.id
        JOIN kota kt ON p.kota_tujuan_id = kt.id
        WHERE p.user_id = ?
        ORDER BY p.tanggal_berangkat DESC
    `;

    try {
        const result = await dbPool.execute(SQLQuery, [userId]);
        return result;

    } catch (error) {
        throw error; 
    }
};

const getAllPerdin = async () => {
    const SQLQuery = `
        SELECT p.*, 
               ka.nama as kota_asal, 
               kt.nama as kota_tujuan,
               u.username as nama_pegawai
        FROM perdin p
        JOIN kota ka ON p.kota_asal_id = ka.id
        JOIN kota kt ON p.kota_tujuan_id = kt.id
        JOIN users u ON p.user_id = u.id
        ORDER BY p.tanggal_berangkat DESC
    `;
    return dbPool.execute(SQLQuery);
};

const updatePerdinStatus = async (perdinId, status,) => {
    const SQLQuery = `
        UPDATE perdin 
        SET status = ?
        WHERE id = ?
    `;
    return dbPool.execute(SQLQuery, [status, perdinId]);
};

module.exports = {
    createPerdin,
    getPerdinByUserId,
    getAllPerdin,
    updatePerdinStatus
};