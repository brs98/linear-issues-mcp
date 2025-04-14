import { LinearClient } from './client.js';

export interface Roadmap {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  targetDate?: string;
  state: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoadmapParams {
  name: string;
  description?: string;
  startDate: string;
  targetDate?: string;
  state?: string;
}

export interface UpdateRoadmapParams {
  id: string;
  name?: string;
  description?: string;
  startDate?: string;
  targetDate?: string;
  state?: string;
}

// Response types
interface RoadmapsResponse {
  roadmaps: {
    nodes: Roadmap[];
  };
}

interface RoadmapResponse {
  roadmap: Roadmap;
}

interface CreateRoadmapResponse {
  roadmapCreate: {
    success: boolean;
    roadmap: Roadmap;
  };
}

interface UpdateRoadmapResponse {
  roadmapUpdate: {
    success: boolean;
    roadmap: Roadmap;
  };
}

export class LinearRoadmapsClient {
  private client: LinearClient;

  constructor(client: LinearClient) {
    this.client = client;
  }

  /**
   * Get a list of roadmaps
   */
  async getRoadmaps(limit: number = 25): Promise<Roadmap[]> {
    const query = `
      query Roadmaps($first: Int) {
        roadmaps(first: $first) {
          nodes {
            id
            name
            description
            startDate
            targetDate
            state
            slug
            createdAt
            updatedAt
          }
        }
      }
    `;

    const variables = { first: limit };
    const result = await this.client.request<RoadmapsResponse>(query, variables);
    return result.roadmaps.nodes;
  }

  /**
   * Get a roadmap by ID
   */
  async getRoadmapById(id: string): Promise<Roadmap> {
    const query = `
      query Roadmap($id: ID!) {
        roadmap(id: $id) {
          id
          name
          description
          startDate
          targetDate
          state
          slug
          createdAt
          updatedAt
        }
      }
    `;

    const variables = { id };
    const result = await this.client.request<RoadmapResponse>(query, variables);
    return result.roadmap;
  }

  /**
   * Create a new roadmap
   */
  async createRoadmap(params: CreateRoadmapParams): Promise<Roadmap> {
    const { name, description, startDate, targetDate, state } = params;

    const mutation = `
      mutation CreateRoadmap($input: RoadmapCreateInput!) {
        roadmapCreate(input: $input) {
          success
          roadmap {
            id
            name
            description
            startDate
            targetDate
            state
            slug
            createdAt
            updatedAt
          }
        }
      }
    `;

    const variables = {
      input: {
        name,
        description,
        startDate,
        targetDate,
        state
      },
    };

    const result = await this.client.request<CreateRoadmapResponse>(mutation, variables);
    return result.roadmapCreate.roadmap;
  }

  /**
   * Update an existing roadmap
   */
  async updateRoadmap(params: UpdateRoadmapParams): Promise<Roadmap> {
    const { id, name, description, startDate, targetDate, state } = params;

    const mutation = `
      mutation UpdateRoadmap($id: ID!, $input: RoadmapUpdateInput!) {
        roadmapUpdate(id: $id, input: $input) {
          success
          roadmap {
            id
            name
            description
            startDate
            targetDate
            state
            slug
            createdAt
            updatedAt
          }
        }
      }
    `;

    const variables = {
      id,
      input: {
        name,
        description,
        startDate,
        targetDate,
        state
      },
    };

    const result = await this.client.request<UpdateRoadmapResponse>(mutation, variables);
    return result.roadmapUpdate.roadmap;
  }
} 