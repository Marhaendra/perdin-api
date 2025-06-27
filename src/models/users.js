const dbPool = require ('../config/database');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users';

    return dbPool.execute(SQLQuery);
}

const getUserById = (id) => {
    const SQLQuery = `  SELECT id, username
                        FROM users
                        WHERE id = ?
                        `;

    return dbPool.execute(SQLQuery, [id]);
}

const getUserByUsername = async(username) => {
    try {
        const [user] = await dbPool.execute('SELECT * FROM users WHERE username = ?', [username]);
    
        return user;
        
    } catch (error) {
        throw error;

    }
}


// const updateUser = async (body, id) => {
//     try {
//         const SQLQuery = `
//             UPDATE users
//             SET name = ?
//             WHERE id = ?`;
        
//         return dbPool.execute(SQLQuery, [body.name, id]);
//     } catch (error) {
//         throw error;
//     }
// };

const deleteUser = async (id)=> {
    try {
        const SQLQuery = `  DELETE FROM users
                            WHERE id = ?`;

        return dbPool.execute(SQLQuery, [id]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    deleteUser,
}