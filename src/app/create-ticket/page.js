'use client';

import { useForm } from 'react-hook-form';
import { useCreateTicketMutation } from '../../store/slices/ticketsApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

function CreateTicketForm() {
  const searchParams = useSearchParams();
  const serviceName = searchParams.get('serviceName');
  const categoryName = searchParams.get('categoryName');
  const subcategoryName = searchParams.get('subcategoryName');
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      priority: 'MEDIUM',
      serviceType: 'REPAIR',
      urgency: 'normal',
      timeSlot: 'morning'
    }
  });
  
  useEffect(() => {
    if (serviceName && categoryName && subcategoryName) {
      setValue('title', `${categoryName} - ${subcategoryName}`);
      setValue('serviceCategory', serviceName);
      setValue('appliance', categoryName);
      setValue('issue', subcategoryName);
    }
  }, [serviceName, categoryName, subcategoryName, setValue]);
  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const router = useRouter();

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ticket_uploads'); // Create this preset in Cloudinary
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dsrmkwxbm/image/upload`,
      { method: 'POST', body: formData }
    );
    
    return response.json();
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setUploadingFiles(true);
    const uploadedFiles = [];
    
    try {
      for (const file of files) {
        const result = await uploadToCloudinary(file);
        uploadedFiles.push({
          name: file.name,
          url: result.secure_url,
          type: file.type
        });
      }
      setSelectedFiles([...selectedFiles, ...uploadedFiles]);
    } catch (error) {
      setError('Failed to upload files. Please try again.');
    } finally {
      setUploadingFiles(false);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    setLoadingLocation(true);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          );
          const data = await response.json();
          
          // Extract detailed address components
          const address = data.address;
          const detailedAddress = [
            address.house_number || '',
            address.road || address.street || '',
            address.neighbourhood || address.suburb || '',
            address.village || address.town || address.city || '',
            address.state_district || '',
            address.state || '',
            address.postcode || '',
            address.country || ''
          ].filter(Boolean).join(', ');
          
          // Store coordinates for admin panel
          const fullLocationData = {
            address: detailedAddress,
            latitude: latitude,
            longitude: longitude,
            city: address.city || address.town || address.village,
            state: address.state,
            pincode: address.postcode,
            country: address.country
          };
          
          setValue('address', detailedAddress);
          setValue('latitude', latitude);
          setValue('longitude', longitude);
          setLoadingLocation(false);
        } catch (error) {
          setError('Failed to get address from location');
          setLoadingLocation(false);
        }
      },
      (error) => {
        setError('Unable to get your location. Please enter address manually.');
        setLoadingLocation(false);
      },
      { timeout: 10000 }
    );
  };

  const onSubmit = async (data) => {
    setError('');
    
    // Combine house details with address if provided
    const finalAddress = data.houseDetails 
      ? `${data.houseDetails}, ${data.address}`
      : data.address;
    
    const ticketData = {
      ...data,
      address: finalAddress,
      attachments: selectedFiles
    };
    
    try {
      await createTicket(ticketData).unwrap();
      setSuccess(true);
      reset();
      setTimeout(() => {
        router.push('/tickets');
      }, 3000);
    } catch (error) {
      setError('Failed to create ticket. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Ticket Created!</h1>
          <p className="text-gray-600 mb-4">
            Your service request has been submitted successfully.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-black mb-2">Need Fast Service?</h3>
            <p className="text-sm text-gray-600 mb-3">For urgent requests, call us directly</p>
            <a 
              href="tel:+919172605997"
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center space-x-2 hover:bg-yellow-500 transition-colors"
            >
              <span>📞</span>
              <span>+91 9172605997</span>
            </a>
          </div>
          
          <p className="text-sm text-gray-500">Redirecting to tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">Create Ticket</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 max-w-md mx-auto">
        {serviceName && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-black mb-2">Selected Service</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-700"><span className="font-medium">Service:</span> {serviceName}</p>
              <p className="text-sm text-gray-700"><span className="font-medium">Category:</span> {categoryName}</p>
              <p className="text-sm text-gray-700"><span className="font-medium">Type:</span> {subcategoryName}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              placeholder="e.g., AC Not Cooling"
              className="input-field"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Describe the issue in detail..."
              className="input-field h-24 resize-none"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Issue</label>
            <input
              {...register('issue', { required: 'Issue is required' })}
              type="text"
              placeholder="e.g., Not cooling, Making noise"
              className="input-field"
            />
            {errors.issue && <p className="text-red-500 text-sm mt-1">{errors.issue.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Priority</label>
            <select
              {...register('priority')}
              className="input-field"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Appliance</label>
            <input
              {...register('appliance', { required: 'Appliance is required' })}
              type="text"
              placeholder="e.g., Air Conditioner, Washing Machine"
              className="input-field"
            />
            {errors.appliance && <p className="text-red-500 text-sm mt-1">{errors.appliance.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Time Slot</label>
            <select
              {...register('timeSlot')}
              className="input-field"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Service Address</label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={loadingLocation}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>📍</span>
                <span>{loadingLocation ? 'Getting Location...' : 'Use Current Location'}</span>
              </button>
              <input
                {...register('houseDetails', { required: 'House details are required' })}
                type="text"
                placeholder="House/Flat No, Colony/Society Name"
                className="input-field"
              />
              {errors.houseDetails && <p className="text-red-500 text-sm mt-1">{errors.houseDetails.message}</p>}
              <textarea
                {...register('address', { required: 'Address is required' })}
                placeholder="Enter your complete address or use current location..."
                className="input-field h-20 resize-none"
              />
            </div>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Upload Photos/Documents</label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={handleFileSelect}
                className="input-field"
                disabled={uploadingFiles}
              />
              
              {uploadingFiles && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Uploading files...</span>
                </div>
              )}
              
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">📎</span>
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hidden fields for coordinates */}
          <input type="hidden" {...register('latitude')} />
          <input type="hidden" {...register('longitude')} />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? 'Creating Ticket...' : 'Create Ticket'}
          </button>
        </form>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2 max-w-md mx-auto">
          <button onClick={() => router.push('/')} className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">🏠</span>
            </div>
            <span className="text-xs text-gray-400">Home</span>
          </button>
          <button onClick={() => router.push('/tickets')} className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">📋</span>
            </div>
            <span className="text-xs text-gray-400">Tickets</span>
          </button>
          <button onClick={() => router.push('/notifications')} className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">🔔</span>
            </div>
            <span className="text-xs text-gray-400">Alerts</span>
          </button>
          <button onClick={() => router.push('/profile')} className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">👤</span>
            </div>
            <span className="text-xs text-gray-400">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CreateTicket() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CreateTicketForm />
    </Suspense>
  );
}