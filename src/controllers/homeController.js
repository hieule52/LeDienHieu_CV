/**
 * Home Controller
 * Handles rendering of the main portfolio page with multilingual support (EN / VI)
 */

const githubService = require('../services/githubService');
const translations = require('../config/i18n');

const homeController = {
  /**
   * GET /
   * Render the main portfolio page
   */
  index: async (req, res, next) => {
    try {
      // Determine language (query param, or default to 'en')
      const lang = req.query.lang === 'vi' ? 'vi' : 'en';
      const t = translations[lang] || translations.en;

      // Base person data
      const person = {
        name: 'Lê Diên Hiếu',
        nameEn: 'Le Dien Hieu',
        avatar: '/images/profile.png',
        email: 'lehieu2900.in@gmail.com',
        phone: '0328821260',
        github: 'https://github.com/hieule52',
        githubUsername: 'hieule52',
        cvUrl: '/cv/Le-Dien-Hieu-CV.pdf',
      };

      const portfolioData = {
        lang,
        t,
        allTranslations: translations,
        meta: {
          title: t.meta.title,
          description: t.meta.description,
          url: process.env.SITE_URL || 'https://hieu-dev.onrender.com',
          image: '/images/og-image.svg',
          keywords:
            'Lê Diên Hiếu, Software Developer, Web Developer, IT Support, IT Helpdesk, Technical Support, PHP, Python, Next.js, Node.js, JavaScript, Docker, Portfolio',
        },
        person,
        roles: t.hero.roles,
        projects: [
          {
            id: 'tienquoc-autospa',
            name: 'Tiến Quốc Auto Spa',
            description: t.projects.autospaDesc,
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
            features: t.projects.features,
            live: 'https://tienquoc-autospa.vercel.app',
            source: null,
            image: '/images/duAn.png',
            featured: true,
          },
        ],
        skills: {
          development: [
            'JavaScript',
            'PHP',
            'Python',
            'Next.js',
            'Node.js',
            'Express.js',
            'HTML5',
            'CSS3',
            'Java',
          ],
          database: ['MySQL', 'SQL'],
          tools: ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman'],
          itSupport: [
            'Windows OS',
            'Software Installation',
            'PC Troubleshooting',
            'Custom PC Assembly (Build PC)',
            'Hardware Maintenance & Cleaning',
            'Driver Setup',
            'Basic Networking',
            'User Support & Peripherals',
          ],
          soft: t.skills.softItems,
        },
        sportsGallery: t.interests.sports,
        interests: t.interests.items,
        workingStyle: t.interests.tags,
        year: new Date().getFullYear(),
      };

      res.render('index', portfolioData);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = homeController;
