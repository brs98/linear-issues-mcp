import { LinearClient } from './client.js';

export interface Cycle {
  id: string;
  name: string;
  description?: string;
  startsAt: string;
  endsAt: string;
  teamId: string;
  number: number;
  isActive: boolean;
  isCompleted: boolean;
  progress: number;
  // Add other fields as needed
}

export interface CreateCycleParams {
  teamId: string;
  name: string;
  description?: string;
  startsAt: string;
  endsAt: string;
}

export interface UpdateCycleParams {
  id: string;
  name?: string;
  description?: string;
  startsAt?: string;
  endsAt?: string;
}

// Define issue-related types
export interface CycleIssue {
  id: string;
  title: string;
  description?: string;
  state?: {
    name: string;
    color: string;
  };
  priority?: number;
  assignee?: {
    id: string;
    name: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IssueWithCycleId {
  id: string;
  title: string;
  cycleId: string | null;
}

// Response types
interface CyclesResponse {
  cycles: {
    nodes: Cycle[];
  };
}

interface CycleResponse {
  cycle: Cycle;
}

interface TeamCycleResponse {
  team: {
    activeCycle: Cycle | null;
  };
}

interface CreateCycleResponse {
  cycleCreate: {
    success: boolean;
    cycle: Cycle;
  };
}

interface UpdateCycleResponse {
  cycleUpdate: {
    success: boolean;
    cycle: Cycle;
  };
}

interface CycleIssuesResponse {
  cycle: {
    issues: {
      nodes: CycleIssue[];
    };
  };
}

interface IssueUpdateResponse {
  issueUpdate: {
    success: boolean;
    issue: IssueWithCycleId;
  };
}

export class LinearCyclesClient {
  private client: LinearClient;

  constructor(client: LinearClient) {
    this.client = client;
  }

  /**
   * Get a list of cycles, optionally filtered by team
   */
  async getCycles(teamId?: string, limit: number = 25): Promise<Cycle[]> {
    const query = `
      query Cycles($teamId: String, $first: Int) {
        cycles(teamId: $teamId, first: $first) {
          nodes {
            id
            name
            description
            startsAt
            endsAt
            teamId
            number
            isActive
            isCompleted
            progress
          }
        }
      }
    `;

    const variables = { teamId, first: limit };
    const result = await this.client.request<CyclesResponse>(query, variables);
    return result.cycles.nodes;
  }

  /**
   * Get a cycle by ID
   */
  async getCycleById(id: string): Promise<Cycle> {
    const query = `
      query Cycle($id: ID!) {
        cycle(id: $id) {
          id
          name
          description
          startsAt
          endsAt
          teamId
          number
          isActive
          isCompleted
          progress
        }
      }
    `;

    const variables = { id };
    const result = await this.client.request<CycleResponse>(query, variables);
    return result.cycle;
  }

  /**
   * Get the currently active cycle for a team
   */
  async getActiveCycle(teamId: string): Promise<Cycle | null> {
    const query = `
      query ActiveCycle($teamId: ID!) {
        team(id: $teamId) {
          activeCycle {
            id
            name
            description
            startsAt
            endsAt
            teamId
            number
            isActive
            isCompleted
            progress
          }
        }
      }
    `;

    const variables = { teamId };
    const result = await this.client.request<TeamCycleResponse>(query, variables);
    return result.team.activeCycle;
  }

  /**
   * Create a new cycle
   */
  async createCycle(params: CreateCycleParams): Promise<Cycle> {
    const { teamId, name, description, startsAt, endsAt } = params;

    const mutation = `
      mutation CreateCycle($input: CycleCreateInput!) {
        cycleCreate(input: $input) {
          success
          cycle {
            id
            name
            description
            startsAt
            endsAt
            teamId
            number
            isActive
            isCompleted
            progress
          }
        }
      }
    `;

    const variables = {
      input: {
        teamId,
        name,
        description,
        startsAt,
        endsAt,
      },
    };

    const result = await this.client.request<CreateCycleResponse>(mutation, variables);
    return result.cycleCreate.cycle;
  }

  /**
   * Update an existing cycle
   */
  async updateCycle(params: UpdateCycleParams): Promise<Cycle> {
    const { id, name, description, startsAt, endsAt } = params;

    const mutation = `
      mutation UpdateCycle($id: ID!, $input: CycleUpdateInput!) {
        cycleUpdate(id: $id, input: $input) {
          success
          cycle {
            id
            name
            description
            startsAt
            endsAt
            teamId
            number
            isActive
            isCompleted
            progress
          }
        }
      }
    `;

    const variables = {
      id,
      input: {
        name,
        description,
        startsAt,
        endsAt,
      },
    };

    const result = await this.client.request<UpdateCycleResponse>(mutation, variables);
    return result.cycleUpdate.cycle;
  }

  /**
   * Get issues for a cycle
   */
  async getCycleIssues(cycleId: string, limit: number = 25): Promise<CycleIssue[]> {
    const query = `
      query CycleIssues($cycleId: ID!, $first: Int) {
        cycle(id: $cycleId) {
          issues(first: $first) {
            nodes {
              id
              title
              description
              state {
                name
                color
              }
              priority
              assignee {
                id
                name
                email
              }
              createdAt
              updatedAt
            }
          }
        }
      }
    `;

    const variables = { cycleId, first: limit };
    const result = await this.client.request<CycleIssuesResponse>(query, variables);
    return result.cycle.issues.nodes;
  }

  /**
   * Add an issue to a cycle
   */
  async addIssueToCycle(issueId: string, cycleId: string): Promise<IssueWithCycleId> {
    const mutation = `
      mutation AddIssueToCycle($issueId: ID!, $cycleId: ID!) {
        issueUpdate(id: $issueId, input: { cycleId: $cycleId }) {
          success
          issue {
            id
            title
            cycleId
          }
        }
      }
    `;

    const variables = { issueId, cycleId };
    const result = await this.client.request<IssueUpdateResponse>(mutation, variables);
    return result.issueUpdate.issue;
  }

  /**
   * Remove an issue from its cycle
   */
  async removeIssueFromCycle(issueId: string): Promise<IssueWithCycleId> {
    const mutation = `
      mutation RemoveIssueFromCycle($issueId: ID!) {
        issueUpdate(id: $issueId, input: { cycleId: null }) {
          success
          issue {
            id
            title
            cycleId
          }
        }
      }
    `;

    const variables = { issueId };
    const result = await this.client.request<IssueUpdateResponse>(mutation, variables);
    return result.issueUpdate.issue;
  }
} 