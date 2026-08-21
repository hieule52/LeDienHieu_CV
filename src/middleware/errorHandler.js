const translations = require('../config/i18n');

const defaultPerson = {
  name: 'Lê Diên Hiếu',
  email: 'lehieu2900.in@gmail.com',
  phone: '0328821260',
  github: 'https://github.com/hieule52',
  githubUsername: 'hieule52',
  cvUrl: '/cv/Le-Dien-Hieu-CV.pdf',
};

const errorHandler = {
  /**
   * 404 Not Found
   */
  notFound: (req, res, next) => {
    // JSON response for API routes
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ success: false, message: 'Route not found.' });
    }
    const lang = req.query.lang === 'vi' ? 'vi' : 'en';
    const t = translations[lang] || translations.en;

    res.status(404).render('404', {
      meta: {
        title: '404 — Page Not Found | Lê Diên Hiếu',
        description: 'The page you are looking for does not exist.',
      },
      lang,
      t,
      person: defaultPerson,
      path: req.path,
      year: new Date().getFullYear(),
    });
  },

  /**
   * 500 Server Error
   */
  serverError: (err, req, res, next) => {
    console.error('[Server Error]', err);

    if (req.path.startsWith('/api')) {
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    const lang = req.query.lang === 'vi' ? 'vi' : 'en';
    const t = translations[lang] || translations.en;

    res.status(500).render('500', {
      meta: {
        title: '500 — Server Error | Lê Diên Hiếu',
        description: 'An unexpected error occurred.',
      },
      lang,
      t,
      person: defaultPerson,
      path: req.path,
      year: new Date().getFullYear(),
    });
  },
};

module.exports = errorHandler;
