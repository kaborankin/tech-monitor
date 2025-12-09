/**
 * Reddit API Configuration
 * 
 * To use this application:
 * 1. Copy this file to config.js
 * 2. Go to https://www.reddit.com/prefs/apps
 * 3. Create a new app (select "script" type)
 * 4. Fill in your credentials below
 */

module.exports = {
  reddit: {
    userAgent: 'tech-monitor/1.0.0 (by /u/YOUR_USERNAME)',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    username: 'YOUR_REDDIT_USERNAME',
    password: 'YOUR_REDDIT_PASSWORD'
  },
  
  // Subreddits to monitor
  subreddits: ['webdev', 'reactjs', 'nextjs'],
  
  // Keywords to search for (case-insensitive)
  keywords: ['react', 'next.js', 'nextjs', 'javascript', 'typescript'],
  
  // Number of posts to fetch per subreddit
  postsLimit: 25
};
