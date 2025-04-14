import { z } from 'zod';
import { LinearClient, LinearWebhooksClient } from '../linear/index.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register webhook-related tools with the MCP server
 */
export function registerWebhookTools(server: McpServer, linearClient: LinearClient) {
  // Create webhooks client
  const webhooksClient = new LinearWebhooksClient(linearClient);

  // Get all webhooks
  server.tool(
    'getWebhooks',
    {
      limit: z.number().optional().default(25).describe('Maximum number of webhooks to return')
    },
    async ({ limit }) => {
      try {
        const webhooks = await webhooksClient.getWebhooks(limit);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(webhooks, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching webhooks: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Create webhook
  server.tool(
    'createWebhook',
    {
      url: z.string().describe('URL that will receive webhook payloads'),
      label: z.string().optional().describe('Label for the webhook'),
      resourceTypes: z.array(z.string()).describe('Resource types to subscribe to (e.g., ["Issue", "Comment"])'),
      teamId: z.string().optional().describe('ID of the team this webhook belongs to (optional)'),
      enabled: z.boolean().optional().default(true).describe('Whether the webhook is enabled')
    },
    async (params) => {
      try {
        const webhook = await webhooksClient.createWebhook(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(webhook, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating webhook: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Delete webhook
  server.tool(
    'deleteWebhook',
    {
      id: z.string().describe('ID of the webhook to delete')
    },
    async ({ id }) => {
      try {
        const success = await webhooksClient.deleteWebhook(id);
        return {
          content: [
            {
              type: 'text',
              text: success 
                ? `Webhook ${id} deleted successfully` 
                : `Failed to delete webhook ${id}`
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error deleting webhook: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );
} 