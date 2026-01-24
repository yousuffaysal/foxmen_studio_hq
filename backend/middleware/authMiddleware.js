const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const admin = await prisma.admin.findUnique({
                where: { id: decoded.id }
            });

            if (!admin) {
                return res.status(401).json({ message: 'Not authorized, token failed' });
            }

            delete admin.password;
            req.admin = admin;
            next();
        } catch (error) {
            console.error(error);
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                res.status(401).json({ message: 'Not authorized, token failed' });
            } else {
                res.status(500).json({ message: 'Server error during auth: ' + error.message });
            }
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
