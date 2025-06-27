const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

    const tokenHeader = req.header('Authorization');

    if (!tokenHeader) {
        console.error('Access Denied: No token provided');
        return res.status(401).json({ 
            success: false,
            message: 'Access Denied: No token provided' 
        });
    }

    let token = tokenHeader;
    if (tokenHeader.startsWith('Bearer ')) {
        token = tokenHeader.slice(7);
    }
    
    try {
        const decodedUser = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = {
            id: decodedUser.userId,
            username: decodedUser.username,
            role: decodedUser.role
        };
        
        console.log(`Token valid untuk user: ${req.user.username}, role: ${req.user.role}.`);
        
        next();

    } catch (err) {
        console.error('Invalid Token:', err.message);
            
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                message: 'Token expired',
                expiredAt: err.expiredAt
            });
        }
            
        return res.status(403).json({ 
            success: false,
            message: 'Forbidden: Invalid Token'
        });
    }
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            console.error(`User ${req.user?.username} with role ${req.user?.role} tried to access restricted route`);
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Insufficient permissions'
            });
        }
        next();
    };
};


module.exports = { authenticateToken, authorizeRoles };