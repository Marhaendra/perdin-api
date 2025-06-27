const KotaModel = require('../models/kota');

const getAllCities = async (req, res) => {
  try {
    const [cities] = await KotaModel.getAllCities();
    res.json({
      success: true,
      data: cities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data kota'
    });
  }
};

const getCityDetail = async (req, res) => {
  try {
    const city = await KotaModel.getCityById(req.params.id);
    
    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'Kota tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: city
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail kota'
    });
  }
};

const createCity = async (req, res) => {
  try {
    const [result] = await KotaModel.createCity(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Kota berhasil ditambahkan',
      data: {
        id: result.insertId,
        ...req.body
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan kota'
    });
  }
};

const updateCity = async (req, res) => {
  try {
    await KotaModel.updateCity(req.params.id, req.body);
    
    res.json({
      success: true,
      message: 'Data kota berhasil diperbarui'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui data kota'
    });
  }
};

const deleteCity = async (req, res) => {
  try {
    await KotaModel.deleteCity(req.params.id);
    
    res.json({
      success: true,
      message: 'Kota berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus kota'
    });
  }
};

module.exports = {
  getAllCities,
  getCityDetail,
  createCity,
  updateCity,
  deleteCity
};