import { z } from 'zod';
import { LinearClient } from '../linear/client.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register comment-related tools with the MCP server
 */
export function registerCommentTools(server: McpServer, linearClient: LinearClient) {
  // Get comments
  server.tool(
    'getComments',
    {
      issueId: z.string().describe('ID or identifier of the issue to get comments from'),
      limit: z.number().optional().default(25).describe('Maximum number of comments to return')
    },
    async ({ issueId, limit }) => {
      try {
        const comments = await linearClient.getComments({ issueId, limit });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(comments, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching comments: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Create comment
  server.tool(
    'createComment',
    {
      issueId: z.string().describe('ID or identifier of the issue to comment on'),
      body: z.string().describe('Text of the comment (Markdown supported)')
    },
    async ({ issueId, body }) => {
      try {
        const comment = await linearClient.createComment({ issueId, body });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(comment, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating comment: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );
} 