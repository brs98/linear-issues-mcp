/**
 * Configuration for the Linear API client
 */
export interface LinearClientConfig {
  apiKey: string;
  baseUrl?: string;
}

/**
 * Linear Issue model
 */
export interface LinearIssue {
  id: string;
  identifier: string;
  title: string;
  description?: string;
  priority?: number;
  estimate?: number;
  state?: {
    id: string;
    name: string;
  };
  assignee?: {
    id: string;
    name: string;
  };
  labels?: {
    nodes: {
      id: string;
      name: string;
    }[];
  };
  team?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Linear Comment model
 */
export interface LinearComment {
  id: string;
  body: string;
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Linear Label model
 */
export interface LinearLabel {
  id: string;
  name: string;
  color?: string;
}

/**
 * Linear User model
 */
export interface LinearUser {
  id: string;
  name: string;
  email?: string;
}

/**
 * Create Issue parameters
 */
export interface CreateIssueParams {
  title: string;
  description?: string;
  teamId?: string;
  assigneeId?: string;
  stateId?: string;
  priority?: number;
  estimate?: number;
  labelIds?: string[];
}

/**
 * Update Issue parameters
 */
export interface UpdateIssueParams {
  id: string;
  title?: string;
  description?: string;
  stateId?: string;
  assigneeId?: string;
  priority?: number;
  estimate?: number;
  labelIds?: string[];
  teamId?: string;
}

/**
 * Search Issues parameters
 */
export interface SearchIssuesParams {
  query?: string;
  teamId?: string;
  stateId?: string;
  assigneeId?: string;
  labelIds?: string[];
  limit?: number;
}

/**
 * Get Comments parameters
 */
export interface GetCommentsParams {
  issueId: string;
  limit?: number;
}

/**
 * Create Comment parameters
 */
export interface CreateCommentParams {
  issueId: string;
  body: string;
}

