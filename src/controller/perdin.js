const PerdinModel = require('../models/perdin');
const { authenticateToken } = require('../middleware/auth');

const createPerdin = async (req, res) => {
    try {
        const userId = req.user.id;
        const perdinData = req.body;
        
        const [result] = await PerdinModel.createPerdin(userId, perdinData);
        
        res.status(201).json({
            success: true,
            message: 'Pengajuan perdin berhasil dibuat',
            data: {
                id: result.insertId,
                ...perdinData
            }
        });
    } catch (error) {
        console.error('Error creating perdin:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal membuat pengajuan perdin',
            error: error.message
        });
    }
};

const getUserPerdin = async (req, res) => {
    try {
        const userId = req.params.userId;

        const [perdins] = await PerdinModel.getPerdinByUserId(userId);
        
        res.json({
            success: true,
            data: perdins
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mendapatkan data perdin'
        });
    }
};

const getAllPerdin = async (req, res) => {
    try {
        const [perdins] = await PerdinModel.getAllPerdin();
        
        res.json({
            success: true,
            data: perdins
        });
    } catch (error) {
        console.error('Error getting all perdin:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mendapatkan semua data perdin'
        });
    }
};

const approvePerdin = async (req, res) => {
    try {
        const { id } = req.params;
        
        await PerdinModel.updatePerdinStatus(id, 'DISETUJUI');
        
        res.json({
            success: true,
            message: 'Perdin berhasil disetujui'
        });
    } catch (error) {
        console.error('Error approving perdin:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal menyetujui perdin'
        });
    }
};

const rejectPerdin = async (req, res) => {
    try {
        const { id } = req.params;
        
        await PerdinModel.updatePerdinStatus(id, 'DITOLAK');
        
        res.json({
            success: true,
            message: 'Perdin berhasil ditolak'
        });
    } catch (error) {
        console.error('Error rejecting perdin:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal menolak perdin'
        });
    }
};

module.exports = {
    createPerdin,
    getUserPerdin,
    getAllPerdin,
    approvePerdin,
    rejectPerdin
};