'use client';

import { useForm } from 'react-hook-form';
import { useCreateTicketMutation } from '../../store/slices/ticketsApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import BottomNavigation from '../../components/BottomNavigation';
import { useGetAddressesQuery } from '../../store/slices/addressesApi';

function CreateTicketForm() {
  const searchParams = useSearchParams();
  const serviceName = searchParams.get('serviceName');
  const categoryName = searchParams.get('categoryName');
  const subcategoryName = searchParams.get('subcategoryName');

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: { priority: 'MEDIUM', timeSlot: 'morning' }
  });

  useEffect(() => {
    if (serviceName && categoryName && subcategoryName) {
      setValue('title', `${categoryName} - ${subcategoryName}`);
      setValue('appliance', categoryName);
      setValue('issue', subcategoryName);
      setValue('serviceCategory', serviceName);
    }
  }, [serviceName, categoryName, subcategoryName, setValue]);

  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const { data: addresses = [] } = useGetAddressesQuery();
  const selectedAddress = addresses.find(a => a.isSelected) || addresses.find(a => a.isDefault) || addresses[0];
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [uploadController, setUploadController] = useState(null);
  const router = useRouter();

  const uploadToCloudinary = async (file, controller) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ticket_uploads');
    const response = await fetch(`https://api.cloudinary.com/v1_1/dsrmkwxbm/image/upload`, {
      method: 'POST', body: formData, signal: controller.signal
    });
    return response.json();
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const controller = new AbortController();
    setUploadController(controller);
    setUploadingFiles(true);
    const uploadedFiles = [];
    try {
      for (const file of files) {
        const result = await uploadToCloudinary(file, controller);
        uploadedFiles.push({ name: file.name, url: result.secure_url, type: file.type });
      }
      setSelectedFiles(prev => [...prev, ...uploadedFiles]);
    } catch (err) {
      setError(err.name === 'AbortError' ? 'Upload cancelled' : 'Failed to upload files.');
    } finally {
      setUploadingFiles(false);
      setUploadController(null);
    }
  };

  const onSubmit = async (data) => {
    setError('');
    try {
      const addressStr = selectedAddress
        ? `${selectedAddress.house}, ${selectedAddress.area || selectedAddress.colony}, ${selectedAddress.city} - ${selectedAddress.pincode}`
        : '';
      await createTicket({
        ...data,
        address: addressStr,
        ...(selectedAddress?.latitude && selectedAddress?.longitude && {
          latitude: selectedAddress.latitude,
          longitude: selectedAddress.longitude,
        }),
        attachments: selectedFiles,
      }).unwrap();
      setSuccess(true);
      reset();
      setTimeout(() => router.push('/tickets'), 3000);
    } catch {
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
          <p className="text-gray-600 mb-4">Your service request has been submitted successfully.</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-600 mb-3">For urgent requests, call us directly</p>
            <a href="tel:+919172605997" className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center space-x-2">
              <span>📞</span><span>+91 9172605997</span>
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

      <div className="p-4 max-w-md mx-auto space-y-4">
        {/* Selected Service Info - readonly display */}
        {serviceName && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h3 className="font-semibold text-black mb-2">Selected Service</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-700"><span className="font-medium">Service:</span> {serviceName}</p>
              <p className="text-sm text-gray-700"><span className="font-medium">Category:</span> {categoryName}</p>
              <p className="text-sm text-gray-700"><span className="font-medium">Issue:</span> {subcategoryName}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Hidden fields */}
          <input type="hidden" {...register('title')} />
          <input type="hidden" {...register('appliance')} />
          <input type="hidden" {...register('issue')} />
          <input type="hidden" {...register('serviceCategory')} />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Describe the Problem</label>
            <textarea
              {...register('description', { required: 'Please describe the issue' })}
              placeholder="Explain what's wrong in detail..."
              className="input-field h-24 resize-none"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Priority</label>
            <select {...register('priority')} className="input-field">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Preferred Time</label>
            <select {...register('timeSlot')} className="input-field">
              <option value="morning">Morning (9AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 4PM)</option>
              <option value="evening">Evening (4PM - 8PM)</option>
            </select>
          </div>

          {/* Alternate Phone */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Alternate Phone <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              {...register('alternatePhone', {
                pattern: { value: /^[0-9]{10}$/, message: 'Enter valid 10 digit number' }
              })}
              type="tel"
              placeholder="9876543210"
              className="input-field"
              maxLength="10"
            />
            {errors.alternatePhone && <p className="text-red-500 text-sm mt-1">{errors.alternatePhone.message}</p>}
          </div>

          {/* Selected Address - readonly */}
          {selectedAddress && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">Service Address</p>
              <div className="flex items-start space-x-2">
                <span>📍</span>
                <p className="text-sm text-black">{selectedAddress.house}, {selectedAddress.area || selectedAddress.colony}, {selectedAddress.city} - {selectedAddress.pincode}</p>
              </div>
            </div>
          )}

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Photos <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="file"
              accept="image/*,application/pdf"
              multiple
              onChange={handleFileSelect}
              className="input-field"
              disabled={uploadingFiles}
            />
            {uploadingFiles && (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Uploading...</span>
                </div>
                <button type="button" onClick={() => { uploadController?.abort(); setUploadingFiles(false); }}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">✕</button>
              </div>
            )}
            {selectedFiles.length > 0 && (
              <div className="space-y-2 mt-2">
                {selectedFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm text-gray-700 truncate">📎 {file.name}</span>
                    <button type="button" onClick={() => setSelectedFiles(prev => prev.filter((_, idx) => idx !== i))}
                      className="text-red-500 text-sm ml-2">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading || uploadingFiles}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Ticket...' : uploadingFiles ? 'Uploading...' : 'Create Ticket'}
          </button>
        </form>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default function CreateTicket() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CreateTicketForm />
    </Suspense>
  );
}
