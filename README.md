# Linear MCP Server

A Model Context Protocol (MCP) server that integrates with Linear's API, allowing AI models to interact with Linear through standardized MCP tools.

## Features

- Get and search Linear issues
- Create, update, and delete issues
- Manage issue properties (labels, assignees)
- Work with issue comments
- Search functionality

## Requirements

- Node.js 18+ (for local installation)
- Linear API key
- Docker (optional, for containerized usage)

## Installation

### Option 1: Local Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/linear-mcp.git
cd linear-mcp

# Install dependencies
npm install

# Build the application
npm run build
```

### Option 2: Docker Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/linear-mcp.git
cd linear-mcp

# Build the Docker image
docker build -t linear-mcp .
```

### Option 3: NPX Usage (Recommended)

You can run the MCP server directly without installation using npx:

```bash
npx linear-mcp
```

With environment variables:

```bash
LINEAR_API_KEY=your_api_key npx linear-mcp
```

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
LINEAR_API_KEY=your_linear_api_key_here
SERVER_NAME=linear-mcp
SERVER_VERSION=1.0.0
LOG_LEVEL=info
```

You can obtain a Linear API key from your Linear account settings.

### Tool Configuration

You can customize which tool groups are enabled using command-line options:

```bash
# Only include issue tools
npx linear-mcp --issues-only

# Include issues and comments, but not labels
npx linear-mcp --no-labels

# Specify exact tools to include
npx linear-mcp --tools=issues,comments
```

#### Available Options:

| Option | Description |
|--------|-------------|
| `--tools`, `-t` | Specify which tools to include (comma-separated) |
| `--no-issues` | Exclude issue tools |
| `--no-comments` | Exclude comment tools |
| `--no-labels` | Exclude label tools |
| `--issues-only` | Include only issue tools |
| `--comments-only` | Include only comment tools |
| `--labels-only` | Include only label tools |
| `--verbose`, `-v` | Enable verbose logging |
| `--help`, `-h` | Show help message |

## Usage

### Starting the Server

#### Option 1: Local Execution

```bash
# Start the server
npm start

# Start with only issue tools
npm start -- --issues-only
```

#### Option 2: Using Docker

```bash
# Run with Docker (all tools)
docker run -it --env-file .env linear-mcp

# Run with Docker (issues only)
docker run -it --env-file .env linear-mcp --issues-only

# Or using docker-compose
docker-compose up
```

#### Option 3: Using NPX

```bash
# Run directly with NPX (all tools)
LINEAR_API_KEY=your_linear_api_key npx linear-mcp

# Run with only issue tools
LINEAR_API_KEY=your_linear_api_key npx linear-mcp --issues-only
```

### Integration with Claude Desktop

You can integrate this MCP server with Claude Desktop by adding it to your `claud_desktop_config.json` file:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "linear-mcp"],
      "env": {
        "LINEAR_API_KEY": "<your-linear-api-key>"
      }
    }
  }
}
```

To use only specific tools, modify the `args` field:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "linear-mcp", "--issues-only"],
      "env": {
        "LINEAR_API_KEY": "<your-linear-api-key>"
      }
    }
  }
}
```

This configuration allows Claude to interact with your Linear issues directly through the MCP server.

### Connecting to the MCP Server

The server communicates via stdin/stdout following the MCP protocol. To connect:

1. Start the server as described above
2. Use an MCP client to communicate with the server
3. The client should connect to the server's stdin/stdout

### Example Usage with MCP Client

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// Start the client
const transport = new StdioClientTransport({
  command: 'npx',
  args: ['-y', 'linear-mcp'], // Run directly via npx
  env: {
    LINEAR_API_KEY: 'your_linear_api_key_here'
  }
});

const client = new Client({
  name: 'linear-issues-client',
  version: '1.0.0',
});

await client.connect(transport);

// Call a tool
const issues = await client.callTool({
  name: 'getIssues',
  arguments: {
    limit: 10
  }
});

console.log(issues);
```

### Available Tools

#### Issue Operations

- `getIssues` - Get a list of issues
- `getIssueById` - Get a specific issue by ID
- `searchIssues` - Search for issues with various filters
- `createIssue` - Create a new issue
- `updateIssue` - Update an existing issue
- `deleteIssue` - Delete an issue
- `assignIssue` - Assign an issue to a user
- `setIssuePriority` - Set the priority of an issue

#### Comment Operations

- `getComments` - Get comments for an issue
- `createComment` - Add a comment to an issue

#### Label Operations

- `getLabels` - Get all available labels
- `addIssueLabel` - Add a label to an issue
- `removeIssueLabel` - Remove a label from an issue

### Tool Parameter Reference

#### `getIssues`
```javascript
{
  limit: number // Optional, default: 25. Maximum number of issues to return
}
```

#### `getIssueById`
```javascript
{
  id: string // Required. The ID or identifier of the issue
}
```

#### `searchIssues`
```javascript
{
  query: string    // Optional. Text to search for in issue title or description
  teamId: string   // Optional. Filter issues by team ID
  assigneeId: string // Optional. Filter issues by assignee ID
  stateId: string  // Optional. Filter issues by state ID
  labelIds: string[] // Optional. Filter issues by label IDs
  limit: number    // Optional, default: 25. Maximum number of issues to return
}
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Publishing to npm

To publish this package to npm:

```bash
# Login to npm
npm login

# Build and publish
npm publish
```

## Docker Development

For development with Docker:

```bash
# Start in development mode with volume mounting
docker-compose up --build
```

This will mount your local directory into the container, allowing you to make changes and see them reflected without rebuilding the image.

## Security Considerations

- Store your Linear API key securely and never commit it to version control
- The MCP server has full access to your Linear issues through the API key
- Consider using API keys with limited scope for production deployments
- For production use, add appropriate logging to track usage

## License

MIT 