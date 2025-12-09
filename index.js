#!/usr/bin/env node

/**
 * Tech Monitor - Reddit API Integration
 * Fetches public posts from specified subreddits based on keyword search
 */

const snoowrap = require('snoowrap');

// Try to load config, fallback to example config
let config;
try {
  config = require('./config.js');
} catch (error) {
  console.error('Error: config.js not found. Please copy config.example.js to config.js and fill in your credentials.');
  process.exit(1);
}

/**
 * Initialize Reddit API client
 */
function createRedditClient() {
  try {
    return new snoowrap({
      userAgent: config.reddit.userAgent,
      clientId: config.reddit.clientId,
      clientSecret: config.reddit.clientSecret,
      username: config.reddit.username,
      password: config.reddit.password
    });
  } catch (error) {
    console.error('Error creating Reddit client:', error.message);
    process.exit(1);
  }
}

/**
 * Check if post title or text contains any of the keywords
 * @param {Object} post - Reddit post object
 * @param {Array} keywords - Array of keywords to search for
 * @returns {boolean} - True if post matches any keyword
 */
function matchesKeywords(post, keywords) {
  const searchText = `${post.title} ${post.selftext || ''}`.toLowerCase();
  return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
}

/**
 * Fetch posts from a subreddit and filter by keywords
 * @param {Object} reddit - Reddit client instance
 * @param {string} subreddit - Subreddit name
 * @param {Array} keywords - Array of keywords to search for
 * @param {number} limit - Number of posts to fetch
 * @returns {Promise<Array>} - Array of matched posts
 */
async function fetchPostsFromSubreddit(reddit, subreddit, keywords, limit) {
  try {
    console.log(`\nFetching posts from r/${subreddit}...`);
    
    const posts = await reddit.getSubreddit(subreddit).getHot({ limit });
    const matchedPosts = [];
    
    for (const post of posts) {
      if (matchesKeywords(post, keywords)) {
        matchedPosts.push({
          subreddit: subreddit,
          title: post.title,
          author: post.author.name,
          url: `https://reddit.com${post.permalink}`,
          score: post.score,
          created: new Date(post.created_utc * 1000).toISOString()
        });
      }
    }
    
    return matchedPosts;
  } catch (error) {
    console.error(`Error fetching posts from r/${subreddit}:`, error.message);
    return [];
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Tech Monitor - Reddit API Integration');
  console.log('======================================\n');
  console.log(`Searching for keywords: ${config.keywords.join(', ')}`);
  console.log(`Subreddits: ${config.subreddits.map(s => `r/${s}`).join(', ')}`);
  
  const reddit = createRedditClient();
  
  // Fetch posts from all subreddits
  const allMatchedPosts = [];
  
  for (const subreddit of config.subreddits) {
    const matchedPosts = await fetchPostsFromSubreddit(
      reddit,
      subreddit,
      config.keywords,
      config.postsLimit
    );
    allMatchedPosts.push(...matchedPosts);
  }
  
  // Display results
  console.log(`\n\nFound ${allMatchedPosts.length} matching posts:\n`);
  console.log('='.repeat(80));
  
  if (allMatchedPosts.length === 0) {
    console.log('No posts found matching the specified keywords.');
  } else {
    allMatchedPosts.forEach((post, index) => {
      console.log(`\n${index + 1}. [r/${post.subreddit}] ${post.title}`);
      console.log(`   Author: u/${post.author} | Score: ${post.score}`);
      console.log(`   URL: ${post.url}`);
      console.log(`   Posted: ${post.created}`);
    });
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('\nDone!');
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { createRedditClient, matchesKeywords, fetchPostsFromSubreddit };
