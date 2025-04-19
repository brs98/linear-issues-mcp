# Linear MCP Server

A Model Context Protocol (MCP) server that integrates with Linear's API, allowing AI models to interact with Linear through standardized MCP tools.

## Quick Start for AI Integrations

### Integration with Claude and Cursor

You can integrate this MCP server with Claude Desktop or Cursor by adding it to your configuration file:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@brs98/linear-mcp"],
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
      "args": ["-y", "@brs98/linear-mcp", "--tools=issues,projects,teams"],
      "env": {
        "LINEAR_API_KEY": "<your-linear-api-key>"
      }
    }
  }
}
```

This configuration allows Claude and other AI assistants to interact with your Linear instance directly through the MCP server.

### Docker Integration

For Docker-based usage with Claude Desktop or Cursor:

```json
{
  "mcpServers": {
    "linear": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "LINEAR_API_KEY=<your-linear-api-key>",
        "brs98/linear-mcp:latest"
      ]
    }
  }
}
```

You can pass the same CLI options as with the npx version by adding them to the end of the args array:

```json
{
  "mcpServers": {
    "linear": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "LINEAR_API_KEY=<your-linear-api-key>",
        "brs98/linear-mcp:latest",
        "--tools=issues,projects,teams"
      ]
    }
  }
}
```

#### CLI Options Reference:

| Option            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `--tools`, `-t`   | Specify which tools to include (comma-separated) |
| `--no-issues`     | Exclude issue tools                              |
| `--no-comments`   | Exclude comment tools                            |
| `--no-labels`     | Exclude label tools                              |
| `--no-teams`      | Exclude team tools                               |
| `--no-projects`   | Exclude project tools                            |
| `--no-users`      | Exclude user tools                               |
| `--issues-only`   | Include only issue tools                         |
| `--comments-only` | Include only comment tools                       |
| `--labels-only`   | Include only label tools                         |
| `--teams-only`    | Include only team tools                          |
| `--projects-only` | Include only project tools                       |
| `--users-only`    | Include only user tools                          |
| `--verbose`, `-v` | Enable verbose logging                           |
| `--help`, `-h`    | Show help message                                |

## Features

- Get and search Linear issues
- Create, update, and delete issues
- Manage issue properties (labels, assignees, priority)
- Work with issue comments
- Team management operations
- Project management capabilities
- Full integration with Linear's GraphQL API

## Requirements

- Node.js 18+ or Docker (for local installation)
- Linear API key

### Available Tools

#### Issue Operations - `issues`

- `getIssue` - Get a specific issue by ID
- `getIssues` - Get a list of issues
- `createIssue` - Create a new issue
- `updateIssue` - Update an existing issue
- `deleteIssue` - Delete an issue
- `createIssueBatch` - Create multiple issues in a batch

#### Comment Operations - `comments`

- `getComments` - Get comments for an issue
- `createComment` - Add a comment to an issue

#### Label Operations - `labels`

- `getLabels` - Get all available labels
- `addIssueLabel` - Add a label to an issue
- `removeIssueLabel` - Remove a label from an issue

#### Team Operations - `teams`

- `getTeamById` - Get a specific team by ID
- `getTeams` - Get a list of teams

#### Project Operations - `projects`

- `getProject` - Get a specific project by ID
- `getProjects` - Get a list of projects
- `getProjectUpdate` - Get a specific project update
- `getProjectUpdates` - Get all project updates
- `createProject` - Create a new project
- `createProjectUpdate` - Create a project update

#### User Operations - `users`

- `getUserById` - Get a specific user by ID
- `getUsers` - Get a list of users

## License

MIT
