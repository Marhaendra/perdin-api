const bcrypt = require('bcrypt');
const dbPool = require('../config/database');

const registerUser = async(body) => {
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const SQLQuery = `  INSERT INTO users (username, password, role) 
                            VALUES (?, ?,'PEGAWAI')`;
        
        const result = await dbPool.execute(SQLQuery, [body.username, hashedPassword]);
        return result;
    } catch (error) {
        throw error;
    }
    
}

module.exports = {
    registerUser,
}