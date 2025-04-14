import { describe, expect, it, vi, beforeEach } from 'vitest';
import { registerIssueTools } from '../../src/tools/issues.js';
import { LinearClient } from '../../src/linear/client.js';
import type { LinearIssue } from '../../src/types.js';

// Mock McpServer
const mockTool = vi.fn();
const mockServer = {
  tool: mockTool,
};

// Mock LinearClient
vi.mock('../../src/linear/client.js', () => {
  return {
    LinearClient: vi.fn().mockImplementation(() => ({
      getIssues: vi.fn(),
      getIssueById: vi.fn(),
      searchIssues: vi.fn(),
      createIssue: vi.fn(),
      updateIssue: vi.fn(),
      deleteIssue: vi.fn(),
      assignIssue: vi.fn(),
    })),
  };
});

describe('Issue Tools', () => {
  let linearClient: LinearClient;

  beforeEach(() => {
    vi.resetAllMocks();
    linearClient = new LinearClient({ apiKey: 'mock-api-key' });
    registerIssueTools(mockServer as any, linearClient);
  });

  describe('Tool Registration', () => {
    it('should register all issue tools', () => {
      // Verify that the tool function was called for each tool
      expect(mockTool).toHaveBeenCalledTimes(8);
      
      // Check that the specific tools were registered
      const toolNames = mockTool.mock.calls.map(call => call[0]);
      expect(toolNames).toContain('getIssues');
      expect(toolNames).toContain('getIssueById');
      expect(toolNames).toContain('searchIssues');
      expect(toolNames).toContain('createIssue');
      expect(toolNames).toContain('updateIssue');
      expect(toolNames).toContain('deleteIssue');
      expect(toolNames).toContain('assignIssue');
      expect(toolNames).toContain('setIssuePriority');
    });
  });

  describe('getIssues Tool', () => {
    it('should call the LinearClient.getIssues method and return formatted issues', async () => {
      // Find the getIssues tool handler
      const getIssuesCall = mockTool.mock.calls.find(call => call[0] === 'getIssues');
      const getIssuesHandler = getIssuesCall?.[2];
      expect(getIssuesHandler).toBeDefined();

      // Mock the LinearClient.getIssues method
      const mockIssues: LinearIssue[] = [{
        id: 'issue1',
        identifier: 'ABC-1',
        title: 'Test Issue',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      }];
      linearClient.getIssues = vi.fn().mockResolvedValue(mockIssues);

      // Call the handler
      const result = await getIssuesHandler({ limit: 10 });

      // Verify LinearClient.getIssues was called with the correct args
      expect(linearClient.getIssues).toHaveBeenCalledWith(10);

      // Verify the response format
      expect(result).toEqual({
        content: [
          { 
            type: 'text', 
            text: JSON.stringify(mockIssues, null, 2) 
          }
        ]
      });
    });

    it('should handle errors in getIssues', async () => {
      // Find the getIssues tool handler
      const getIssuesCall = mockTool.mock.calls.find(call => call[0] === 'getIssues');
      const getIssuesHandler = getIssuesCall?.[2];

      // Mock the LinearClient.getIssues method to throw an error
      const errorMessage = 'API error';
      linearClient.getIssues = vi.fn().mockRejectedValue(new Error(errorMessage));

      // Call the handler
      const result = await getIssuesHandler({ limit: 10 });

      // Verify the error response format
      expect(result).toEqual({
        content: [
          { 
            type: 'text', 
            text: `Error fetching issues: ${errorMessage}` 
          }
        ],
        isError: true,
      });
    });
  });

  // Add more tests for other tools as needed
}); 