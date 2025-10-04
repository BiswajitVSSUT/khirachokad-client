import React from 'react';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { VerificationResult } from '@/lib/api/productVerification';

interface VerificationContentProps {
  verificationResult: VerificationResult | null;
  error: string | null;
}

export const VerificationContent: React.FC<VerificationContentProps> = ({
  verificationResult,
  error,
}) => {
  const isValid = verificationResult?.isValid || false;
  const message = verificationResult?.message || 'Verification failed.';

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Verification Result */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            {isValid ? (
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            ) : (
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            )}

            <h1 className={`text-3xl font-bold mb-4 ${
              isValid ? 'text-green-600' : 'text-red-600'
            }`}>
              {isValid ? 'Product Verified' : 'Verification Failed'}
            </h1>

            <p className={`text-lg mb-8 ${
              isValid ? 'text-green-700' : 'text-red-700'
            }`}>
              {message}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isValid && (
                <Link
                  href="/#products"
                  className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors duration-200"
                >
                  View Our Products
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Security Notice
          </h3>
          <p className="text-blue-700">
            All KHIRA CHOKADA products come with unique verification codes. 
            Always verify your product before purchase to ensure authenticity and quality.
          </p>
        </div>
      </div>
    </div>
  );
};