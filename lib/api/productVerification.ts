import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface VerificationResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface VerificationResult {
  isValid: boolean;
  message: string;
}

export const productVerificationAPI = {
  verify: async (verificationCode: string): Promise<VerificationResult> => {
    try {
      const response = await api.get<VerificationResponse>(`/product/verify/${verificationCode}`);
      
      return {
        isValid: true,
        message: response.data.message || 'Product verified successfully!',
      };
    } catch (error: any) {
      // Handle different error scenarios
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          return {
            isValid: false,
            message: error.response.data?.message || 'Product verification failed.',
          };
        } else if (error.request) {
          // Network error
          throw new Error('Network error. Please check your connection and try again.');
        }
      }
      
      // Generic error
      throw new Error('Verification service unavailable.');
    }
  },
};