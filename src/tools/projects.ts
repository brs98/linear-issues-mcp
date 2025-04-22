import { z } from 'zod';
import { LinearClient } from '@linear/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  projectCreateInputSchema,
  projectFilterSchema,
  projectUpdateCreateInputSchema,
  projectUpdatesFilterSchema,
} from '../../zod-schemas.js';

/**
 * Register project-related tools with the MCP server
 */
export function registerProjectTools(server: McpServer, linearClient: LinearClient) {
  server.tool(
    'getProject',
    'Retrieves detailed information about a specific Linear project by its ID. Use this tool when you need to look up information about a particular project, such as its name, description, and associated teams. This is useful when you need to reference project details or check project status.',
    {
      projectId: z.string().describe('ID of the project to fetch'),
    },
    async ({ projectId }) => {
      try {
        const project = await linearClient.project(projectId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  id: project.id,
                  name: project.name,
                  description: project.description,
                  team: await project.teams().then((t) =>
                    t.nodes.map((team) => ({
                      id: team.id,
                      name: team.name,
                    }))
                  ),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching project: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    'getProjects',
    'Retrieves a list of all Linear projects with optional filtering parameters. Use this tool when you need to browse or search through multiple projects. This is helpful for getting an overview of all ongoing projects, finding relevant projects for an issue, or selecting a project for a new task.',
    {
      filter: projectFilterSchema.describe('Input for fetching projects'),
    },
    async ({ filter }) => {
      try {
        const projects = await linearClient.projects({ filter });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await Promise.all(
                  projects.nodes.map((project) => ({
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    teams: project.teams().then((t) =>
                      t.nodes.map((team) => ({
                        id: team.id,
                        name: team.name,
                      }))
                    ),
                  }))
                ),
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching projects: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    'getProjectUpdate',
    'Retrieves a specific update/status report for a Linear project by its ID. Use this tool when you need to view the content of a particular project update, such as progress reports, status changes, or milestone announcements. This helps in tracking project progress over time.',
    {
      projectUpdateId: z.string().describe('ID of the project update to fetch'),
    },
    async ({ projectUpdateId }) => {
      try {
        const projectUpdate = await linearClient.projectUpdate(projectUpdateId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  id: projectUpdate.id,
                  project: projectUpdate.project,
                  body: projectUpdate.body,
                  user: projectUpdate.user,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching project update: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    'getProjectUpdates',
    'Retrieves a list of updates/status reports for Linear projects with optional filtering. Use this tool when you need to see the history of updates for one or more projects. This helps in tracking project progress, reviewing past status reports, or compiling project history.',
    {
      filter: projectUpdatesFilterSchema.describe('Input for fetching project updates'),
    },
    async ({ filter }) => {
      try {
        const projectUpdates = await linearClient.projectUpdates({ filter });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await Promise.all(
                  projectUpdates.nodes.map((projectUpdate) => ({
                    id: projectUpdate.id,
                    project: projectUpdate.project,
                    body: projectUpdate.body,
                    user: projectUpdate.user,
                  }))
                ),
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching project updates: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    'createProject',
    "Creates a new project in Linear with the provided details. Use this tool when you need to set up a new initiative, feature development, or any work requiring project-level organization. Required fields include 'name' and 'teamIds'. Optional fields include 'description', 'state', 'startDate', and 'targetDate'.",
    {
      input: projectCreateInputSchema.describe('Input for creating a project'),
    },
    async ({ input }) => {
      try {
        const project = await linearClient.createProject(input);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: project.success,
                  project: await project.project?.then(async (p) => ({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    team: await p.teams().then(async (t) =>
                      t.nodes.map((team) => ({
                        id: team.id,
                        name: team.name,
                      }))
                    ),
                  })),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating project: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    'createProjectUpdate',
    "Creates a new status update for an existing Linear project. Use this tool when you need to report progress, document milestone completion, or share important project information with stakeholders. Required fields are 'projectId' and 'body' which contains the update text.",
    {
      input: projectUpdateCreateInputSchema.describe('Input for creating a project update'),
    },
    async ({ input }) => {
      try {
        const projectUpdate = await linearClient.createProjectUpdate(input);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: projectUpdate.success,
                  projectUpdate: await projectUpdate.projectUpdate?.then(async (pu) => ({
                    id: pu.id,
                    project: pu.project,
                    body: pu.body,
                    user: pu.user,
                  })),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating project update: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
