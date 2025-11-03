import { api } from './api.service';
import { Policy } from '../types';

/**
 * Policy Service (ABAC)
 */
export class PolicyService {
  /**
   * Get all policies
   * Note: This would need admin permissions
   */
  async getAllPolicies(): Promise<Policy[]> {
    try {
      // This endpoint doesn't exist in current backend, would need to be added
      const response = await api.get('/policies');
      return response.data.policies || [];
    } catch (error) {
      console.error('getAllPolicies endpoint not implemented yet');
      return [];
    }
  }

  /**
   * Get policy by ID
   */
  async getPolicyById(policyId: string): Promise<Policy> {
    const response = await api.get(`/policies/${policyId}`);
    return response.data.policy;
  }

  /**
   * Create policy (Enterprise only)
   */
  async createPolicy(policyData: Partial<Policy>): Promise<Policy> {
    const response = await api.post('/policies', policyData);
    return response.data.policy;
  }

  /**
   * Update policy
   */
  async updatePolicy(policyId: string, updates: Partial<Policy>): Promise<Policy> {
    const response = await api.patch(`/policies/${policyId}`, updates);
    return response.data.policy;
  }

  /**
   * Delete policy
   */
  async deletePolicy(policyId: string): Promise<void> {
    await api.delete(`/policies/${policyId}`);
  }

  /**
   * Enable/disable policy
   */
  async togglePolicy(policyId: string, enabled: boolean): Promise<Policy> {
    const response = await api.patch(`/policies/${policyId}`, { enabled });
    return response.data.policy;
  }
}

export const policyService = new PolicyService();



