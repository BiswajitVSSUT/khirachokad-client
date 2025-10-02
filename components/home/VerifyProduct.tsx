'use client';

import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Camera, CheckCircle, Upload, X, ImageUp, AlertCircle } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

// Type definitions for html5-qrcode
interface Html5QrcodeResult {
  decodedText: string;
  result: {
    text: string;
  };
}

interface Html5QrcodeError {
  errorMessage: string;
  type?: number;
}

const VerifyProduct = () => {
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const html5QrcodeScannerRef = useRef<Html5Qrcode | null>(null);
  const scannerElementId = 'qr-reader';
  const hasInitialized = useRef(false);

  // Handle scan result
  const handleScanSuccess = (decodedText: string, result: Html5QrcodeResult) => {
    console.log('QR Code detected:', decodedText);
    if (!decodedText || scanResult) return;
    
    setScanResult(decodedText);
    setError('');
    
    // Stop scanner
    if (html5QrcodeScannerRef.current) {
      html5QrcodeScannerRef.current.stop().catch(console.error);
    }
    
    setIsScanning(false);
    
    // Redirect after delay
      if(decodedText.includes("/verify-product?verify=")){
        window.location.href = `/verify-product?verify=${decodedText.split("verify=")[1]}`
      } else {
        setError("QR code not supported")
      }
  };

  // Handle scan error
  const handleScanError = (errorMessage: string, error: Html5QrcodeError) => {
    // Only show meaningful errors, ignore continuous scanning noise
    if (errorMessage.includes('No MultiFormat Readers') || 
        errorMessage.includes('NotFoundException')) {
      return; // These are normal during continuous scanning
    }
    console.debug('Scan error:', errorMessage);
  };

  // Check camera permission
  const checkCameraPermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (err) {
      console.error('Camera permission denied:', err);
      return false;
    }
  };

  // Initialize and start scanner
  const startScanner = async () => {
    if (hasInitialized.current) return;

    try {
      // Check camera permission first
      const hasPermission = await checkCameraPermission();
      setCameraPermission(hasPermission);
      
      if (!hasPermission) {
        throw new Error('Camera access denied. Please allow camera permissions to scan QR codes.');
      }

      hasInitialized.current = true;
      setError('');
      setScanResult('');
      setSelectedImage(null);

      // First set scanning to true to render the container
      setIsScanning(true);

      // Wait for the next render cycle to ensure DOM is updated
      await new Promise(resolve => setTimeout(resolve, 300));

      // Check if scanner element exists
      const scannerElement = document.getElementById(scannerElementId);
      if (!scannerElement) {
        throw new Error('Scanner element not found. Please try again.');
      }

      // Create new scanner instance with verbose logging
      html5QrcodeScannerRef.current = new Html5Qrcode(scannerElementId, true);

      // Get available cameras
      const devices = await Html5Qrcode.getCameras();
      console.log('Available cameras:', devices);
      
      if (devices.length === 0) {
        throw new Error('No cameras found on this device. Please ensure your camera is connected and accessible.');
      }

      // Camera selection logic - try to find the best camera
      let cameraId = devices[0].id;
      
      // Prefer back camera for mobile devices
      const backCamera = devices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('rear') ||
        device.label.toLowerCase().includes('environment') ||
        (device.label.includes('2') && !device.label.toLowerCase().includes('front'))
      );
      
      // Fallback: avoid front camera if possible
      const nonFrontCamera = devices.find(device => 
        !device.label.toLowerCase().includes('front') &&
        !device.label.toLowerCase().includes('facetime')
      );

      if (backCamera) {
        cameraId = backCamera.id;
        console.log('Using back camera:', backCamera.label);
      } else if (nonFrontCamera) {
        cameraId = nonFrontCamera.id;
        console.log('Using non-front camera:', nonFrontCamera.label);
      } else {
        console.log('Using default camera:', devices[0].label);
      }

      // Enhanced scanner configuration for better detection
      const config = {
        fps: 10, // Higher FPS for better responsiveness
        qrbox: { 
          width: 280, 
          height: 280 
        },
        aspectRatio: 1.0,
        // Remove unsupported focusMode and supportedScanTypes
      };

      console.log('Starting scanner with camera:', cameraId, 'and config:', config);

      // Start scanning with enhanced configuration
      await html5QrcodeScannerRef.current.start(
        cameraId,
        config,
        (decodedText: string, result: Html5QrcodeResult) => {
          console.log('QR Code successfully decoded:', decodedText);
          handleScanSuccess(decodedText, result);
        },
        (errorMessage: string, error: Html5QrcodeError) => {
          handleScanError(errorMessage, error);
        }
      );

      console.log('Scanner started successfully');

    } catch (err) {
      console.error('Scanner initialization error:', err);
      hasInitialized.current = false;
      setIsScanning(false);
      
      if (err instanceof Error) {
        if (err.message.includes('Permission')) {
          setError('Camera permission denied. Please allow camera access in your browser settings and try again.');
        } else if (err.message.includes('cameras') || err.message.includes('camera')) {
          setError('Camera not available. Please ensure your camera is connected and not being used by another application.');
        } else {
          setError(err.message || 'Failed to start camera scanner. Please try again.');
        }
      } else {
        setError('Failed to start camera scanner. Please try again.');
      }
    }
  };

  // Stop scanner
  const stopScanner = async () => {
    if (html5QrcodeScannerRef.current) {
      try {
        console.log('Stopping scanner...');
        await html5QrcodeScannerRef.current.stop();
        await html5QrcodeScannerRef.current.clear();
        console.log('Scanner stopped successfully');
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
      html5QrcodeScannerRef.current = null;
    }
    setIsScanning(false);
    hasInitialized.current = false;
  };

  // Handle start scanning button
  const handleStartScanning = async () => {
    await startScanner();
  };

  // Handle stop scanning button
  const handleStopScanning = async () => {
    await stopScanner();
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await processImageFile(file);
    }
  };

  // Process image file
  const processImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    setIsLoading(true);
    setError('');
    setScanResult('');

    try {
      // Show preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Scan with html5-qrcode
      const html5Qrcode = new Html5Qrcode('file-qr-reader', true);
      
      try {
        console.log('Scanning image file...');
        const decodedText = await html5Qrcode.scanFile(file, false);
        console.log('Image scan successful:', decodedText);
        handleScanSuccess(decodedText, { decodedText, result: { text: decodedText } });
      } catch (err) {
        console.error('Image scan error:', err);
        setError('No QR code found in the image. Please ensure the image is clear, well-lit, and contains a valid QR code.');
      } finally {
        await html5Qrcode.clear();
      }
    } catch (err) {
      console.error('Image processing error:', err);
      setError('Failed to process image. Please try again with a different image.');
    } finally {
      setIsLoading(false);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await processImageFile(file);
    } else {
      setError('Please drop a valid image file (JPEG, PNG, etc.).');
    }
  };

  // Manual verification
  const handleManualVerify = () => {
    if (manualCode.trim()) {
      window.location.href = `/verify-product?verify=${encodeURIComponent(manualCode.trim())}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleManualVerify();
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (html5QrcodeScannerRef.current) {
        stopScanner();
      }
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
          {/* QR Scanner Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-4">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Scan QR Code
              </h3>
              <p className="text-gray-600 text-sm">
                Use camera or upload image to verify your product
              </p>
            </div>

            {/* Scanner Area */}
            <div className="mb-6">
              {isScanning ? (
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
                  {/* Scanner container - this will be populated by html5-qrcode */}
                  <div 
                    id={scannerElementId} 
                    className="w-full min-h-[400px] flex items-center justify-center"
                  >
                    {/* Loading state while scanner initializes */}
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p>Initializing camera...</p>
                      <p className="text-sm text-gray-300 mt-2">Please allow camera access if prompted</p>
                    </div>
                  </div>
                  
                  {/* Stop button */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                    <button
                      onClick={handleStopScanning}
                      className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 flex items-center gap-2 text-sm"
                    >
                      <X className="w-5 h-5" />
                      Stop Scanning
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer ${
                    isDragOver 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-gray-300 bg-gray-50 hover:border-green-300'
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
                        <ImageUp className="w-8 h-8 text-gray-400" />
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
              
              {/* Hidden div for file scanning */}
              <div id="file-qr-reader" className="hidden"></div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isScanning && (
                <button
                  onClick={handleStartScanning}
                  disabled={isLoading}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <Camera className="w-5 h-5" />
                  Start Camera Scanner
                </button>
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
                    aria-label='Clear image'
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
                <div className="flex items-start text-red-800">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Scanning Error</p>
                    <p className="text-sm">{error}</p>
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