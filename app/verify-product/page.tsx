'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Create a separate component that uses useSearchParams
const VerifyProductContent = () => {
  const searchParams = useSearchParams();
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    productCode: string;
    productName: string;
    batchNumber: string;
    manufacturingDate: string;
    expiryDate: string;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyCode = searchParams.get('verify');
    
    if (verifyCode) {
      // Simulate API call
      setTimeout(() => {
        const isValid = verifyCode.startsWith('KC');
        setVerificationResult({
          isValid,
          productCode: verifyCode,
          productName: isValid ? 'KHIRA CHOKADA Premium Cattle Feed' : '',
          batchNumber: isValid ? 'KC2024001' : '',
          manufacturingDate: isValid ? '2024-01-15' : '',
          expiryDate: isValid ? '2025-01-15' : '',
          message: isValid 
            ? 'Product verified successfully! This is an authentic KHIRA CHOKADA product.'
            : 'Invalid product code. Please check the code and try again.'
        });
        setLoading(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Verification Result */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            {verificationResult?.isValid ? (
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            ) : (
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            )}

            <h1 className={`text-3xl font-bold mb-4 ${
              verificationResult?.isValid ? 'text-green-600' : 'text-red-600'
            }`}>
              {verificationResult?.isValid ? 'Product Verified' : 'Verification Failed'}
            </h1>

            <p className={`text-lg mb-8 ${
              verificationResult?.isValid ? 'text-green-700' : 'text-red-700'
            }`}>
              {verificationResult?.message}
            </p>

            {verificationResult?.isValid && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-green-800 mb-4">
                  Product Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <span className="font-medium text-green-700">Product Code:</span>
                    <p className="text-green-800">{verificationResult.productCode}</p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Product Name:</span>
                    <p className="text-green-800">{verificationResult.productName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Batch Number:</span>
                    <p className="text-green-800">{verificationResult.batchNumber}</p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Manufacturing Date:</span>
                    <p className="text-green-800">{verificationResult.manufacturingDate}</p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Expiry Date:</span>
                    <p className="text-green-800">{verificationResult.expiryDate}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                Back to Home
              </Link>
              {verificationResult?.isValid && (
                <Link
                  href="#products"
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

// Main component with Suspense boundary
const VerifyProduct = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verification...</p>
        </div>
      </div>
    }>
      <VerifyProductContent />
    </Suspense>
  );
};

export default VerifyProduct;