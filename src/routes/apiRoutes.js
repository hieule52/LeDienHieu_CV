/**
 * API Routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');
const githubService = require('../services/githubService');

// ─── Contact ──────────────────────────────────────────────────────────────────
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 100 }).withMessage('Name must be under 100 characters.')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail()
    .isLength({ max: 254 }).withMessage('Email is too long.'),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required.')
    .isLength({ max: 200 }).withMessage('Subject must be under 200 characters.')
    .escape(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 characters.')
    .escape(),
];

router.post('/contact', contactValidation, contactController.send);

// ─── GitHub ───────────────────────────────────────────────────────────────────
router.get('/github/repos', async (req, res) => {
  try {
    const repos = await githubService.getRepos();
    res.json({ success: true, data: repos });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch repositories.' });
  }
});

module.exports = router;
