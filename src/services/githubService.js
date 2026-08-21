/**
 * GitHub Service
 * Fetches public repositories from GitHub API
 */

const GITHUB_USERNAME = 'hieule52';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

let cache = { data: null, timestamp: 0 };

const githubService = {
  /**
   * Fetch public repos for the portfolio GitHub section.
   * Returns up to 6 repos sorted by pushed_at, with fallback on error.
   */
  getRepos: async () => {
    // Return cached data if still fresh
    if (cache.data && Date.now() - cache.timestamp < CACHE_TTL) {
      return cache.data;
    }

    try {
      const headers = { 'User-Agent': 'hieu-dev-portfolio' };
      if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
      }

      const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=20&type=public`;

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`);
      }

      const repos = await response.json();

      // Filter and shape data
      const filtered = repos
        .filter((r) => !r.fork && r.name !== GITHUB_USERNAME)
        .slice(0, 6)
        .map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description || 'No description provided.',
          url: r.html_url,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language,
          updatedAt: r.pushed_at,
          topics: r.topics || [],
        }));

      cache = { data: filtered, timestamp: Date.now() };
      return filtered;
    } catch (err) {
      console.warn('[GitHub Service] Failed to fetch repos:', err.message);
      // Return empty array as fallback — UI handles gracefully
      return [];
    }
  },
};

module.exports = githubService;
