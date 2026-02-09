const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { protect } = require('../middleware/authMiddleware');
const cacheMiddleware = require('../middleware/cacheMiddleware');
const invalidateCache = require('../utils/cacheInvalidate');
const router = express.Router();
const prisma = new PrismaClient();

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', cacheMiddleware(3600), async (req, res) => {
    try {
        const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
        // Map id to _id for frontend compatibility
        const mappedProjects = projects.map(p => ({ ...p, _id: p.id }));
        res.json(mappedProjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/projects/:idOrSlug
// @desc    Get single project by ID or Slug
// @access  Public
router.get('/:idOrSlug', cacheMiddleware(3600), async (req, res) => {
    try {
        const { idOrSlug } = req.params;
        let project;

        // Check if UUID
        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(idOrSlug);

        if (isUUID) {
            project = await prisma.project.findUnique({ where: { id: idOrSlug } });
        } else {
            project = await prisma.project.findUnique({ where: { slug: idOrSlug } });
        }

        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ ...project, _id: project.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/projects
// @desc    Create a project
// @access  Private
router.post('/', protect, async (req, res) => {
    const {
        title, description, image, tags, techStack, link, github, slug,
        client, role, duration, challenge, solution, outcome, video, gallery, process, results, testimonial, features
    } = req.body;

    try {
        const finalSlug = slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const newProject = await prisma.project.create({
            data: {
                title, description, image, tags, techStack, link, github, slug: finalSlug,
                client, role, duration, challenge, solution, outcome, video, gallery, process, results, testimonial, features
            }
        });

        // Invalidate cache
        await invalidateCache('api:/api/projects*');

        res.status(201).json({ ...newProject, _id: newProject.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', protect, async (req, res) => {
    // ... (fields extraction same as before)
    const {
        title, description, image, tags, techStack, link, github, slug,
        client, role, duration, challenge, solution, outcome, video, gallery, process, results, testimonial, features
    } = req.body;

    try {
        const updatedProject = await prisma.project.update({
            where: { id: req.params.id },
            data: {
                title, description, image, tags, techStack, link, github, slug,
                client, role, duration, challenge, solution, outcome, video, gallery, process, results, testimonial, features
            }
        });

        // Invalidate cache
        await invalidateCache('api:/api/projects*');

        res.json({ ...updatedProject, _id: updatedProject.id });
    } catch (error) {
        // Prisma throws P2025 if record not found for update
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(400).json({ message: error.message });
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        await prisma.project.delete({ where: { id: req.params.id } });

        // Invalidate cache
        await invalidateCache('api:/api/projects*');

        res.json({ message: 'Project removed' });
    } catch (error) {
        // Prisma throws P2025 if record not found for delete
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
