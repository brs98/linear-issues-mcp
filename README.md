# Linear Issues MCP Server

A Model Context Protocol (MCP) server that integrates with Linear's Issues API, allowing AI models to interact with Linear issues through standardized MCP tools.

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
git clone https://github.com/yourusername/linear-issues-mcp.git
cd linear-issues-mcp

# Install dependencies
npm install

# Build the application
npm run build
```

### Option 2: Docker Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/linear-issues-mcp.git
cd linear-issues-mcp

# Build the Docker image
docker build -t linear-issues-mcp .
```

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
LINEAR_API_KEY=your_linear_api_key_here
SERVER_NAME=linear-issues-mcp
SERVER_VERSION=1.0.0
LOG_LEVEL=info
```

You can obtain a Linear API key from your Linear account settings.

## Usage

### Starting the Server

#### Option 1: Local Execution

```bash
# Start the server
npm start
```

#### Option 2: Using Docker

```bash
# Run with Docker
docker run -it --env-file .env linear-issues-mcp

# Or using docker-compose
docker-compose up
```

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
  command: 'node',
  args: ['dist/index.js'], // Path to your built MCP server
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