const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Routes - adjusted relative paths for api directory
const authRoutes = require('../routes/authRoutes');
const projectRoutes = require('../routes/projectRoutes');
const postRoutes = require('../routes/postRoutes');
const messageRoutes = require('../routes/messageRoutes');
const uploadRoutes = require('../routes/uploadRoutes');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Connect to Database - Prisma connection is usually lazy but good for testing
prisma.$connect()
    .then(() => console.log('PostgreSQL Connected via Prisma'))
    .catch(err => console.log('Prisma connection error:', err));

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); 

// Make prisma available in request object
app.use((req, res, next) => {
    req.prisma = prisma;
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);

// Static Asset Serving (Note: Vercel serverless has temporary ephemeral storage, not recommended for real persistence)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
    res.send('Foxmen Studio Backend is running on Vercel');
});

// We don't call app.listen() here when running as a serverless function on Vercel
// Export the app for Vercel
module.exports = app;
