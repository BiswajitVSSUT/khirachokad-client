'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProductVerification } from '@/hooks/useProductVerification';
import { VerificationContent } from '@/components/product/VerificationContent';
import { LoadingSpinner } from '@/components/ui/custom  ui/LoadingSpinner';

const VerifyProductContent = () => {
  const searchParams = useSearchParams();
  const verificationCode = searchParams.get('verify');
  
  const { verificationResult, loading, error } = useProductVerification(verificationCode);

  if (loading) {
    return <LoadingSpinner message="Verifying product..." />;
  }

  return (
    <VerificationContent 
      verificationResult={verificationResult}
      error={error}
    />
  );
};

const VerifyProduct = () => {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading verification..." />}>
      <VerifyProductContent />
    </Suspense>
  );
};

export default VerifyProduct;