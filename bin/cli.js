#!/usr/bin/env node

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the built server entry point
const serverPath = resolve(__dirname, '../dist/index.js');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  tools: ['issues', 'comments', 'labels', 'roadmaps', 'webhooks', 'cycles', 'projects', 'teams'], // Default: include all tools
  verbose: false
};

// Process arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  // Tool selection
  if (arg === '--tools' || arg === '-t') {
    const toolsArg = args[++i];
    if (!toolsArg) {
      console.error('Error: --tools option requires a comma-separated list of tools');
      process.exit(1);
    }
    options.tools = toolsArg.split(',').map(t => t.trim());
  }
  // Handle --tools=value format
  else if (arg.startsWith('--tools=') || arg.startsWith('-t=')) {
    const toolsArg = arg.split('=')[1];
    if (!toolsArg) {
      console.error('Error: --tools option requires a comma-separated list of tools');
      process.exit(1);
    }
    options.tools = toolsArg.split(',').map(t => t.trim());
  }
  
  // Individual tool flags
  else if (arg === '--no-issues') {
    options.tools = options.tools.filter(t => t !== 'issues');
  }
  else if (arg === '--no-comments') {
    options.tools = options.tools.filter(t => t !== 'comments');
  }
  else if (arg === '--no-labels') {
    options.tools = options.tools.filter(t => t !== 'labels');
  }
  else if (arg === '--no-roadmaps') {
    options.tools = options.tools.filter(t => t !== 'roadmaps');
  }
  else if (arg === '--no-webhooks') {
    options.tools = options.tools.filter(t => t !== 'webhooks');
  }
  else if (arg === '--no-cycles') {
    options.tools = options.tools.filter(t => t !== 'cycles');
  }
  else if (arg === '--no-projects') {
    options.tools = options.tools.filter(t => t !== 'projects');
  }
  else if (arg === '--no-teams') {
    options.tools = options.tools.filter(t => t !== 'teams');
  }
  else if (arg === '--issues-only') {
    options.tools = ['issues'];
  }
  else if (arg === '--comments-only') {
    options.tools = ['comments'];
  }
  else if (arg === '--labels-only') {
    options.tools = ['labels'];
  }
  else if (arg === '--roadmaps-only') {
    options.tools = ['roadmaps'];
  }
  else if (arg === '--webhooks-only') {
    options.tools = ['webhooks'];
  }
  else if (arg === '--cycles-only') {
    options.tools = ['cycles'];
  }
  else if (arg === '--projects-only') {
    options.tools = ['projects'];
  }
  else if (arg === '--teams-only') {
    options.tools = ['teams'];
  }
  
  // Verbose flag
  else if (arg === '--verbose' || arg === '-v') {
    options.verbose = true;
  }
  
  // Help
  else if (arg === '--help' || arg === '-h') {
    console.log(`
Linear MCP Server - CLI Options:

Tool Selection:
  --tools, -t <tools>    Specify which tools to include (comma-separated)
                         Examples: --tools issues,comments  OR  --tools=issues,comments
  --no-issues            Exclude issue tools
  --no-comments          Exclude comment tools
  --no-labels            Exclude label tools
  --no-roadmaps          Exclude roadmap tools
  --no-webhooks          Exclude webhook tools
  --no-cycles            Exclude cycle tools
  --no-projects          Exclude project tools
  --no-teams             Exclude team tools
  --issues-only          Include only issue tools
  --comments-only        Include only comment tools
  --labels-only          Include only label tools
  --roadmaps-only        Include only roadmap tools
  --webhooks-only        Include only webhook tools
  --cycles-only          Include only cycle tools
  --projects-only        Include only project tools
  --teams-only           Include only team tools

Other Options:
  --verbose, -v          Enable verbose logging
  --help, -h             Show this help message
`);
    process.exit(0);
  }
}

// Show startup message
console.error('Starting Linear MCP Server...');
console.error('Working directory:', process.cwd());
console.error('Environment:');
console.error(`- LINEAR_API_KEY: ${process.env.LINEAR_API_KEY ? '***' : 'Not set'}`);
console.error(`- SERVER_NAME: ${process.env.SERVER_NAME || 'linear-mcp'}`);
console.error(`- SERVER_VERSION: ${process.env.SERVER_VERSION || '1.0.0'}`);
console.error(`- LOG_LEVEL: ${process.env.LOG_LEVEL || 'info'}`);
console.error('Enabled tool groups:', options.tools.join(', '));
console.error('\nMCP server is ready for connections. Press Ctrl+C to exit.\n');

// Pass options to the server via environment variables
const serverEnv = {
  ...process.env,
  LINEAR_MCP_TOOLS: options.tools.join(','),
  LINEAR_MCP_VERBOSE: options.verbose.toString()
};

// Start the server process
const server = spawn('node', [serverPath], {
  stdio: ['inherit', 'inherit', 'inherit'],
  env: serverEnv
});

// Handle server process events
server.on('close', (code) => {
  console.error(`MCP server exited with code ${code}`);
  process.exit(code);
});

// Handle process signals
process.on('SIGINT', () => {
  console.error('Stopping MCP server...');
  server.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('Stopping MCP server...');
  server.kill('SIGTERM');
  process.exit(0);
}); 