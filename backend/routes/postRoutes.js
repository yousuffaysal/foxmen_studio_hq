const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { protect } = require('../middleware/authMiddleware');
const cacheMiddleware = require('../middleware/cacheMiddleware');
const invalidateCache = require('../utils/cacheInvalidate');
const router = express.Router();
const prisma = new PrismaClient();

// Get all posts
router.get('/', cacheMiddleware(3600), async (req, res) => {
    try {
        const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
        const mappedPosts = posts.map(p => ({ ...p, _id: p.id }));
        res.json(mappedPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single post
router.get('/:idOrSlug', cacheMiddleware(3600), async (req, res) => {
    try {
        const { idOrSlug } = req.params;
        let post;

        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(idOrSlug);

        if (isUUID) {
            post = await prisma.post.findUnique({ where: { id: idOrSlug } });
        } else {
            post = await prisma.post.findUnique({ where: { slug: idOrSlug } });
        }

        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json({ ...post, _id: post.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create post
router.post('/', protect, async (req, res) => {
    const {
        title, excerpt, content, coverImage, tags, references,
        author, authorRole, authorBio, authorImage, authorTwitter, authorLinkedin,
        date, slug
    } = req.body;
    try {
        const finalSlug = slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const newPost = await prisma.post.create({
            data: {
                title,
                excerpt,
                content,
                coverImage,
                tags,
                references,
                author,
                authorRole,
                authorBio,
                authorImage,
                authorTwitter,
                authorLinkedin,
                date: new Date(date),
                slug: finalSlug
            }
        });

        // Invalidate cache
        await invalidateCache('api:/api/posts*');

        res.status(201).json({ ...newPost, _id: newPost.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update post
router.put('/:id', protect, async (req, res) => {
    const {
        title, excerpt, content, coverImage, tags, references,
        author, authorRole, authorBio, authorImage, authorTwitter, authorLinkedin,
        date, slug
    } = req.body;
    try {
        const updatedPost = await prisma.post.update({
            where: { id: req.params.id },
            data: {
                title,
                excerpt,
                content,
                coverImage,
                tags,
                references,
                author,
                authorRole,
                authorBio,
                authorImage,
                authorTwitter,
                authorLinkedin,
                date: date ? new Date(date) : undefined,
                slug
            }
        });

        // Invalidate cache
        await invalidateCache('api:/api/posts*');

        res.json({ ...updatedPost, _id: updatedPost.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete post
router.delete('/:id', protect, async (req, res) => {
    try {
        await prisma.post.delete({ where: { id: req.params.id } });

        // Invalidate cache
        await invalidateCache('api:/api/posts*');

        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add Comment
router.post('/:id/comments', async (req, res) => {
    const { name, email, content } = req.body;
    try {
        const comment = await prisma.comment.create({
            data: {
                name,
                email,
                content,
                postId: req.params.id
            }
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get Comments
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            where: { postId: req.params.id },
            orderBy: { createdAt: 'desc' }
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Comment
router.put('/comments/:commentId', protect, async (req, res) => {
    const { content } = req.body;
    try {
        const updatedComment = await prisma.comment.update({
            where: { id: req.params.commentId },
            data: { content }
        });
        res.json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Comment
router.delete('/comments/:commentId', protect, async (req, res) => {
    try {
        await prisma.comment.delete({ where: { id: req.params.commentId } });
        res.json({ message: 'Comment removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
