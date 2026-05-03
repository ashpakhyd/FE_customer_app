'use client';

import { useForm } from 'react-hook-form';
import { useAddAddressMutation } from '../../store/slices/addressesApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiHome, HiBriefcase, HiLocationMarker } from 'react-icons/hi';

export default function AddAddress() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { type: 'Home' }
  });
  const [addAddress, { isLoading }] = useAddAddressMutation();
  const [areas, setAreas] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const selectedType = watch('type');

  const fetchCurrentLocation = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) { setLoadingLocation(false); return; }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`);
          const data = await res.json();
          const a = data.address;
          if (a.city || a.town || a.village) setCityInput(a.city || a.town || a.village);
          setValue('latitude', latitude);
          setValue('longitude', longitude);
        } catch {}
        finally { setLoadingLocation(false); }
      },
      () => setLoadingLocation(false),
      { timeout: 10000 }
    );
  };

  const fetchAreas = async (city) => {
    if (!city || city.length < 3) return;
    setLoadingAreas(true);
    setAreas([]);
    setValue('area', '');
    setValue('pincode', '');
    try {
      const res = await fetch(`https://api.postalpincode.in/postoffice/${encodeURIComponent(city)}`);
      const data = await res.json();
      if (data[0].Status === 'Success') {
        const mhAreas = data[0].PostOffice
          .filter(p => p.State === 'Maharashtra')
          .map((p, i) => ({ id: i + 1, area: p.Name, pincode: p.Pincode, district: p.District }));
        setAreas(mhAreas);
        if (mhAreas.length === 0) setError('No Maharashtra areas found for this city');
        else setError('');
      } else {
        setError('City not found. Try another name.');
      }
    } catch {
      setError('Failed to fetch areas. Check internet connection.');
    } finally {
      setLoadingAreas(false);
    }
  };

  const handleAreaChange = (e) => {
    const selected = areas.find(a => a.area === e.target.value);
    if (selected) {
      setValue('pincode', selected.pincode);
      setValue('district', selected.district);
    } else {
      setValue('pincode', '');
    }
  };

  const onSubmit = async (data) => {
    setError('');
    if (!cityInput) { setError('Please enter and search a city'); return; }
    try {
      await addAddress({
        type: data.type,
        house: data.house,
        colony: data.colony,
        city: cityInput,
        area: data.area || '',
        pincode: data.pincode || '',
        district: data.district || '',
        state: 'Maharashtra',
        country: 'India',
        isDefault: false,
        ...(data.latitude && data.longitude && {
          latitude: data.latitude,
          longitude: data.longitude,
        }),
      }).unwrap();
      router.back();
    } catch (err) {
      setError(err?.data?.message || 'Failed to add address');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-10">
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">Add New Address</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-4 mt-4">
        {/* Current Location Button */}
        <button
          type="button"
          onClick={fetchCurrentLocation}
          disabled={loadingLocation}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl font-medium text-sm disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <span>📍</span>
          <span>{loadingLocation ? 'Fetching Location...' : 'Use Current Location (optional)'}</span>
        </button>

        <input type="hidden" {...register('latitude')} />
        <input type="hidden" {...register('longitude')} />

        {/* Type selector */}
        <div>
          <p className="text-sm font-medium text-black mb-2">Address Type</p>
          <div className="flex gap-2">
            {[
              { value: 'Home', icon: <HiHome className="text-base" /> },
              { value: 'Office', icon: <HiBriefcase className="text-base" /> },
              { value: 'Other', icon: <HiLocationMarker className="text-base" /> },
            ].map(({ value, icon }) => (
              <label key={value} className="flex-1 cursor-pointer">
                <input {...register('type')} type="radio" value={value} className="sr-only" />
                <div className={`text-center py-2 rounded-xl border-2 text-sm font-medium transition-colors ${
                  selectedType === value
                    ? 'border-yellow-400 bg-yellow-50 text-black'
                    : 'border-gray-200 text-gray-600'
                }`}>
                  {icon} {value}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* House */}
        <input
          {...register('house', { required: 'House/Flat No is required' })}
          type="text"
          placeholder="House / Flat No."
          className="input-field"
        />
        {errors.house && <p className="text-red-500 text-sm">{errors.house.message}</p>}

        {/* Colony */}
        <input
          {...register('colony', { required: 'Colony/Society is required' })}
          type="text"
          placeholder="Colony / Society / Street"
          className="input-field"
        />
        {errors.colony && <p className="text-red-500 text-sm">{errors.colony.message}</p>}

        {/* City + Search */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter City (e.g. Pune)"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className="input-field flex-1"
          />
          <button
            type="button"
            onClick={() => fetchAreas(cityInput)}
            disabled={loadingAreas || cityInput.length < 3}
            className="bg-yellow-400 text-black px-4 rounded-xl font-medium text-sm disabled:opacity-50 whitespace-nowrap"
          >
            {loadingAreas ? '...' : 'Search'}
          </button>
        </div>

        {/* Area dropdown */}
        {areas.length > 0 && (
          <select
            {...register('area')}
            className="input-field"
            onChange={(e) => { register('area').onChange(e); handleAreaChange(e); }}
          >
            <option value="">Select Area</option>
            {areas.map(a => (
              <option key={a.id} value={a.area}>{a.area}</option>
            ))}
          </select>
        )}

        {/* Pincode */}
        <input
          {...register('pincode')}
          type="text"
          placeholder="Pincode (auto-filled)"
          className="input-field bg-gray-100 text-gray-500 cursor-not-allowed"
          disabled
        />

        {/* State & Country */}
        <div className="grid grid-cols-2 gap-3">
          <input value="Maharashtra" readOnly className="input-field bg-gray-100 text-gray-500 cursor-not-allowed" />
          <input value="India" readOnly className="input-field bg-gray-100 text-gray-500 cursor-not-allowed" />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="btn-primary w-full"
        >
          {isLoading ? 'Saving...' : 'Save Address'}
        </button>
      </div>
    </div>
  );
}
