const dbPool = require('../config/database');

const getAllCities = async () => {
  const SQLQuery = 'SELECT * FROM kota ORDER BY nama ASC';
  return dbPool.execute(SQLQuery);
};

const getCityById = async (id) => {
  const SQLQuery = 'SELECT * FROM kota WHERE id = ?';
  const [rows] = await dbPool.execute(SQLQuery, [id]);
  return rows[0];
};

const createCity = async (cityData) => {
  const SQLQuery = `INSERT INTO kota 
    (nama, latitude, longitude, provinsi, pulau, luar_negeri) 
    VALUES (?, ?, ?, ?, ?, ?)`;
  
  const values = [
    cityData.nama,
    cityData.latitude,
    cityData.longitude,
    cityData.provinsi,
    cityData.pulau,
    cityData.luar_negeri || false
  ];

  return dbPool.execute(SQLQuery, values);
};

const updateCity = async (id, cityData) => {
  const SQLQuery = `UPDATE kota SET 
    nama = ?, latitude = ?, longitude = ?, 
    provinsi = ?, pulau = ?, luar_negeri = ? 
    WHERE id = ?`;
  
  const values = [
    cityData.nama,
    cityData.latitude,
    cityData.longitude,
    cityData.provinsi,
    cityData.pulau,
    cityData.luar_negeri || false,
    id
  ];

  return dbPool.execute(SQLQuery, values);
};

const deleteCity = async (id) => {
  const SQLQuery = 'DELETE FROM kota WHERE id = ?';
  return dbPool.execute(SQLQuery, [id]);
};

module.exports = {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity
};