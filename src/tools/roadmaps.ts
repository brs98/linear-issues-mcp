import { z } from 'zod';
import { LinearClient, LinearRoadmapsClient } from '../linear/index.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register roadmap-related tools with the MCP server
 */
export function registerRoadmapTools(server: McpServer, linearClient: LinearClient) {
  // Create roadmaps client
  const roadmapsClient = new LinearRoadmapsClient(linearClient);

  // Get all roadmaps
  server.tool(
    'getRoadmaps',
    {
      limit: z.number().optional().default(25).describe('Maximum number of roadmaps to return')
    },
    async ({ limit }) => {
      try {
        const roadmaps = await roadmapsClient.getRoadmaps(limit);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(roadmaps, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching roadmaps: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Get roadmap by ID
  server.tool(
    'getRoadmapById',
    {
      id: z.string().describe('The ID of the roadmap')
    },
    async ({ id }) => {
      try {
        const roadmap = await roadmapsClient.getRoadmapById(id);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(roadmap, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching roadmap: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Create roadmap
  server.tool(
    'createRoadmap',
    {
      name: z.string().describe('Name of the roadmap'),
      description: z.string().optional().describe('Description of the roadmap'),
      startDate: z.string().describe('Start date of the roadmap (ISO format)'),
      targetDate: z.string().optional().describe('Target date of the roadmap (ISO format)'),
      state: z.string().optional().describe('State of the roadmap')
    },
    async (params) => {
      try {
        const roadmap = await roadmapsClient.createRoadmap(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(roadmap, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating roadmap: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Update roadmap
  server.tool(
    'updateRoadmap',
    {
      id: z.string().describe('ID of the roadmap to update'),
      name: z.string().optional().describe('New name for the roadmap'),
      description: z.string().optional().describe('New description for the roadmap'),
      startDate: z.string().optional().describe('New start date for the roadmap (ISO format)'),
      targetDate: z.string().optional().describe('New target date for the roadmap (ISO format)'),
      state: z.string().optional().describe('New state for the roadmap')
    },
    async (params) => {
      try {
        const roadmap = await roadmapsClient.updateRoadmap(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(roadmap, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error updating roadmap: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );
} 