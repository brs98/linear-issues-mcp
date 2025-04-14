#!/usr/bin/env node

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the built server entry point
const serverPath = resolve(__dirname, '../dist/index.js');

// Show startup message
console.error('Starting Linear Issues MCP Server...');
console.error('Working directory:', process.cwd());
console.error('Environment:');
console.error(`- LINEAR_API_KEY: ${process.env.LINEAR_API_KEY ? '***' : 'Not set'}`);
console.error(`- SERVER_NAME: ${process.env.SERVER_NAME || 'linear-issues-mcp'}`);
console.error(`- SERVER_VERSION: ${process.env.SERVER_VERSION || '1.0.0'}`);
console.error(`- LOG_LEVEL: ${process.env.LOG_LEVEL || 'info'}`);
console.error('\nMCP server is ready for connections. Press Ctrl+C to exit.\n');

// Start the server process
const server = spawn('node', [serverPath], {
  stdio: ['inherit', 'inherit', 'inherit'],
  env: process.env
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