# Tech Monitor

A minimal Node.js script that connects to the Reddit API using OAuth and retrieves public posts from technology-related subreddits based on keyword search.

## Features

- Connects to Reddit API using OAuth authentication
- Fetches public posts from multiple subreddits (r/webdev, r/reactjs, r/nextjs)
- Filters posts based on configurable keywords
- Read-only access (no posting, voting, or messaging)
- Simple console output with matched post titles and details

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Reddit API Application

1. Go to https://www.reddit.com/prefs/apps
2. Click "Create App" or "Create Another App"
3. Fill in the form:
   - Name: tech-monitor (or any name you prefer)
   - App type: Select "script"
   - Description: (optional)
   - About url: (optional)
   - Redirect uri: http://localhost:8080 (required but not used)
4. Click "Create app"
5. Note down your `client_id` (under the app name) and `client_secret`

### 3. Configure API Credentials

1. Copy the example config file:
   ```bash
   cp config.example.js config.js
   ```

2. Edit `config.js` and fill in your credentials:
   - `clientId`: Your Reddit app's client ID
   - `clientSecret`: Your Reddit app's client secret
   - `username`: Your Reddit username
   - `password`: Your Reddit password
   - `userAgent`: Update with your Reddit username

3. (Optional) Customize the subreddits and keywords to monitor

### 4. Run the Script

```bash
node index.js
```

## Configuration

The `config.js` file allows you to customize:

- **API Credentials**: Reddit OAuth credentials
- **Subreddits**: List of subreddits to monitor (default: webdev, reactjs, nextjs)
- **Keywords**: Search terms to filter posts (case-insensitive)
- **Posts Limit**: Number of posts to fetch per subreddit (default: 25)

## Project Structure

```
tech-monitor/
├── index.js              # Main script
├── config.example.js     # Configuration template
├── config.js            # Your credentials (git-ignored)
├── package.json         # Node.js dependencies
└── README.md           # This file
```

## Security Notes

- Never commit your `config.js` file with credentials (it's already in `.gitignore`)
- Keep your Reddit credentials secure
- The script only performs read operations and cannot post, vote, or message

## License

ISC