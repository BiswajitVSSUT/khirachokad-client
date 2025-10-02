'use client';

import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Camera, CheckCircle, Upload, X, Scan, Image as ImageIcon, SwitchCamera } from 'lucide-react';
import jsQR from 'jsqr';

// Extend Window interface to include BarcodeDetector
declare global {
  interface Window {
    BarcodeDetector?: {
      new (options?: { formats: string[] }): BarcodeDetector;
    };
  }

  class BarcodeDetector {
    constructor(options?: { formats: string[] });
    detect(image: ImageBitmapSource): Promise<Array<{
      rawValue: string;
      boundingBox: DOMRectReadOnly;
      cornerPoints: Array<{ x: number; y: number }>;
      format: string;
    }>>;
  }
}

interface JsQRResult {
  data: string;
  location: {
    topRightCorner: { x: number; y: number };
    topLeftCorner: { x: number; y: number };
    bottomRightCorner: { x: number; y: number };
    bottomLeftCorner: { x: number; y: number };
  };
}

const VerifyProduct = () => {
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCameraSupported, setIsCameraSupported] = useState(true);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  // Check browser support with proper type checking - no more 'any'
  const isBarcodeDetectorSupported = typeof window !== 'undefined' && 
    'BarcodeDetector' in window && 
    typeof window.BarcodeDetector === 'function';

  // Safe BarcodeDetector creation
  const createBarcodeDetector = (): BarcodeDetector | null => {
    if (isBarcodeDetectorSupported && window.BarcodeDetector) {
      return new window.BarcodeDetector({ formats: ['qr_code'] });
    }
    return null;
  };

  // Initialize camera
  const initializeCamera = async (): Promise<void> => {
    try {
      setError('');
      
      if (!navigator.mediaDevices?.getUserMedia) {
        setIsCameraSupported(false);
        throw new Error('Camera not supported on this device');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        await videoRef.current.play();
      }

      setIsCameraSupported(true);
      startScanning();
    } catch (err: unknown) {
      console.error('Camera error:', err);
      setIsCameraSupported(false);
      const errorMessage = err instanceof Error ? err.message : 'Camera access denied';
      setError(errorMessage);
    }
  };

  // Stop camera
  const stopCamera = (): void => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Scan for QR codes from camera
  const scanQRCode = async (): Promise<void> => {
    if (!videoRef.current || !canvasRef.current || !isScanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        if (isBarcodeDetectorSupported) {
          // Use native BarcodeDetector for camera
          const detector = createBarcodeDetector();
          if (detector) {
            const barcodes = await detector.detect(canvas);
            
            if (barcodes.length > 0) {
              const qrCode = barcodes[0];
              handleScanResult(qrCode.rawValue);
              return;
            }
          }
        }
        
        // Fallback: Use jsQR for camera scanning
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          handleScanResult(code.data);
          return;
        }
      } catch (err) {
        console.error('Scan error:', err);
      }
    }

    // Continue scanning
    if (isScanning) {
      animationRef.current = requestAnimationFrame(scanQRCode);
    }
  };

  const startScanning = (): void => {
    if (isScanning) {
      animationRef.current = requestAnimationFrame(scanQRCode);
    }
  };

  const handleScanResult = (result: string): void => {
    setScanResult(result);
    setIsScanning(false);
    stopCamera();
    
    setTimeout(() => {
      window.location.href = `/verify-product?verify=${result}`;
    }, 1500);
  };

  // Enhanced image scanning with multiple methods
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      await processImageFile(file);
      setIsLoading(false);
    }
  };

  const processImageFile = async (file: File): Promise<void> => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageUrl = e.target?.result as string;
      setSelectedImage(imageUrl);
      setError('');
      setScanResult('');

      try {
        // Method 1: Try BarcodeDetector first (if supported)
        if (isBarcodeDetectorSupported) {
          try {
            const detector = createBarcodeDetector();
            if (detector) {
              const image = new Image();
              
              await new Promise<void>((resolve, reject) => {
                image.onload = () => resolve();
                image.onerror = reject;
                image.src = imageUrl;
              });

              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              if (context) {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                
                const barcodes = await detector.detect(canvas);
                if (barcodes.length > 0) {
                  handleScanResult(barcodes[0].rawValue);
                  return;
                }
              }
            }
          } catch (barcodeErr) {
            console.log('BarcodeDetector failed, trying jsQR...');
          }
        }

        // Method 2: Use jsQR as fallback
        const image = new Image();
        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = reject;
          image.src = imageUrl;
        });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
          
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          
          if (code) {
            handleScanResult(code.data);
            return;
          }
        }

        // Method 3: If both methods fail
        setError('No QR code found in the image. Please ensure the image is clear and try again.');

      } catch (err) {
        console.error('Image scan error:', err);
        setError('Failed to scan QR code from image. Please try with a clearer image.');
      }
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setIsLoading(true);
      processImageFile(file).finally(() => setIsLoading(false));
    } else {
      setError('Please drop a valid image file (JPEG, PNG, etc.).');
    }
  };

  // Start/stop scanning
  const handleStartScanning = async (): Promise<void> => {
    setIsScanning(true);
    setError('');
    setScanResult('');
    setSelectedImage(null);
    await initializeCamera();
  };

  const handleStopScanning = (): void => {
    setIsScanning(false);
    stopCamera();
  };

  // Toggle camera
  const toggleCamera = (): void => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
    if (isScanning) {
      handleStopScanning();
      setTimeout(handleStartScanning, 100);
    }
  };

  // Manual verification
  const handleManualVerify = (): void => {
    if (manualCode.trim()) {
      window.location.href = `/verify-product?verify=${manualCode.trim()}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleManualVerify();
    }
  };

  const openFileSelector = (): void => {
    fileInputRef.current?.click();
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <section id="verify" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Verify Product
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Always choose the right product. Scan QR code to validate the product 
            authenticity and ensure you&apos;re getting genuine KHIRA CHOKADA feed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Custom QR Scanner Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-4">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Scan QR Code
              </h3>
              <p className="text-gray-600 text-sm">
                Use camera or upload image - works on all browsers
              </p>
            </div>

            {/* Scanner Area */}
            <div className="mb-6">
              {isScanning ? (
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-64 object-cover"
                  />
                  {/* Scanning overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-green-400 rounded-lg relative">
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-green-400"></div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-green-400"></div>
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-green-400"></div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-green-400"></div>
                    </div>
                  </div>
                  
                  {/* Camera controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                    <button
                      onClick={toggleCamera}
                      className="bg-white/90 text-gray-700 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center"
                      aria-label="Switch camera"
                    >
                      <SwitchCamera className="w-5 h-5"/>
                    </button>
                    <button
                      onClick={handleStopScanning}
                      className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 flex justify-center items-center"
                      aria-label="Stop scanning"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                    <p className="text-white bg-black/50 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      <Scan className="w-4 h-4 animate-pulse" />
                      Scanning...
                    </p>
                  </div>
                </div>
              ) : (
                <div 
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer ${
                    isDragOver 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-gray-300 bg-gray-50 hover:border-green-300 hover:bg-green-25'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={!isLoading ? openFileSelector : undefined}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      <p className="text-gray-600 text-sm">Processing image...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium mb-1">
                          Choose Image
                        </p>
                        <p className="text-gray-500 text-sm">
                          {selectedImage ? 'Image selected' : 'No image chosen'}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Or drop an image to scan
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isScanning && isCameraSupported && (
                <button
                  onClick={handleStartScanning}
                  disabled={isLoading}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <Camera className="w-5 h-5" />
                  Start Camera Scanner
                </button>
              )}

              {!isCameraSupported && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
                  <p className="text-sm text-yellow-800">
                    Camera not supported. Please use image upload or manual entry.
                  </p>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                disabled={isLoading}
                aria-label='image upload'
              />
              
              {!isScanning && (
                <button
                  onClick={openFileSelector}
                  disabled={isLoading}
                  className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl font-semibold border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <Upload className="w-5 h-5" />
                  {isLoading ? 'Processing...' : 'Upload QR Image'}
                </button>
              )}
            </div>

            {selectedImage && !isScanning && !isLoading && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-blue-800">Selected Image</p>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-blue-600 hover:text-blue-800"
                    disabled={isLoading}
                    aria-label='image upload'
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-20 h-20 mx-auto border-2 border-blue-300 rounded-lg overflow-hidden">
                  <img 
                    src={selectedImage} 
                    alt="Selected QR code" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center text-red-800">
                  <X className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {scanResult && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center text-green-800">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Product Verified!</p>
                    <p className="text-xs opacity-75">Code: {scanResult}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Manual Entry Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl mb-4">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Manual Entry
              </h3>
              <p className="text-gray-600 text-sm">
                Enter the product code manually if QR scanning is not available
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="productCode" className="block text-sm font-medium text-gray-700 mb-3">
                  Product Code
                </label>
                <input
                  type="text"
                  id="productCode"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter product code here..."
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200 text-lg"
                />
              </div>

              <button
                onClick={handleManualVerify}
                disabled={!manualCode.trim()}
                className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Verify Product
              </button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-3 text-sm">How to find your product code:</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Look for the QR code on the product packaging
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Check the label for a unique product identifier
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Contact us if you need assistance
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-yellow-800">
                Security Notice
              </h3>
              <div className="mt-1 text-sm text-yellow-700">
                <p>
                  All KHIRA CHOKADA products come with unique verification codes. 
                  Always verify your product to ensure authenticity and quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyProduct;