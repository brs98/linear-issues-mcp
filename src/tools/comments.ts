import { z } from 'zod';
import { LinearClient } from '@linear/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register comment-related tools with the MCP server
 */
export function registerCommentTools(server: McpServer, linearClient: LinearClient) {
  // Get comments
  server.tool(
    'getComments',
    {
      variables: z
        .custom<Parameters<(typeof linearClient)['comments']>[0]>()
        .describe('Input for fetching comments'),
    },
    async ({ variables }) => {
      try {
        const comments = await linearClient.comments(variables);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(comments, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching comments: ${errorMessage}`,
            },
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
      input: z
        .custom<Parameters<(typeof linearClient)['createComment']>[0]>()
        .describe('Input for creating a comment'),
    },
    async ({ input }) => {
      try {
        const comment = await linearClient.createComment(input);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(comment, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating comment: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}

