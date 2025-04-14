import { LinearClient } from './client.js';

// Define team related types
export interface LinearTeam {
  id: string;
  name: string;
  key: string;
  description?: string;
  icon?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LinearTeamMember {
  id: string;
  name: string;
  email?: string;
  active: boolean;
  role?: string;
}

export interface CreateTeamParams {
  name: string;
  key: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface UpdateTeamParams {
  id: string;
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
}

/**
 * Extension of LinearClient with team-specific operations
 */
export class LinearTeamsClient {
  private client: LinearClient;

  constructor(client: LinearClient) {
    this.client = client;
  }

  /**
   * Get a list of all teams
   */
  async getTeams(): Promise<LinearTeam[]> {
    const query = `
      query Teams {
        teams {
          nodes {
            id
            name
            key
            description
            icon
            color
            createdAt
            updatedAt
          }
        }
      }
    `;

    const data = await this.client.request<{ teams: { nodes: LinearTeam[] } }>(query);
    return data.teams.nodes;
  }

  /**
   * Get a team by ID
   */
  async getTeamById(id: string): Promise<LinearTeam> {
    const query = `
      query Team($id: String!) {
        team(id: $id) {
          id
          name
          key
          description
          icon
          color
          createdAt
          updatedAt
        }
      }
    `;

    const data = await this.client.request<{ team: LinearTeam }>(query, { id });
    return data.team;
  }

  /**
   * Create a new team
   */
  async createTeam(params: CreateTeamParams): Promise<LinearTeam> {
    const mutation = `
      mutation CreateTeam($input: TeamCreateInput!) {
        teamCreate(input: $input) {
          team {
            id
            name
            key
            description
            icon
            color
            createdAt
            updatedAt
          }
        }
      }
    `;

    const data = await this.client.request<{ teamCreate: { team: LinearTeam } }>(mutation, {
      input: params,
    });

    return data.teamCreate.team;
  }

  /**
   * Update an existing team
   */
  async updateTeam(params: UpdateTeamParams): Promise<LinearTeam> {
    const { id, ...input } = params;

    const mutation = `
      mutation UpdateTeam($id: String!, $input: TeamUpdateInput!) {
        teamUpdate(id: $id, input: $input) {
          team {
            id
            name
            key
            description
            icon
            color
            createdAt
            updatedAt
          }
        }
      }
    `;

    const data = await this.client.request<{ teamUpdate: { team: LinearTeam } }>(mutation, {
      id,
      input,
    });

    return data.teamUpdate.team;
  }

  /**
   * Get team members
   */
  async getTeamMembers(teamId: string): Promise<LinearTeamMember[]> {
    const query = `
      query TeamMembers($teamId: String!) {
        team(id: $teamId) {
          members {
            nodes {
              id
              name
              email
              active
              role
            }
          }
        }
      }
    `;

    const data = await this.client.request<{
      team: { members: { nodes: LinearTeamMember[] } };
    }>(query, { teamId });

    return data.team.members.nodes;
  }
} 