import { useState, useEffect } from 'react';
import { productVerificationAPI, VerificationResult } from '@/lib/api/productVerification';

export const useProductVerification = (verificationCode: string | null) => {
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyProduct = async () => {
      if (!verificationCode) {
        setVerificationResult({
          isValid: false,
          message: 'No verification code provided.',
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await productVerificationAPI.verify(verificationCode);
        setVerificationResult(result);
      } catch (err: any) {
        setError(err.message);
        setVerificationResult({
          isValid: false,
          message: 'Verification service unavailable.',
        });
      } finally {
        setLoading(false);
      }
    };

    verifyProduct();
  }, [verificationCode]);

  return {
    verificationResult,
    loading,
    error,
  };
};