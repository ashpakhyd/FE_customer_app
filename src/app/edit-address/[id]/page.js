'use client';

import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useGetAddressesQuery, useEditAddressMutation } from '../../../store/slices/addressesApi';

export default function EditAddress({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: addresses = [] } = useGetAddressesQuery();
  const [editAddress, { isLoading }] = useEditAddressMutation();
  const [areas, setAreas] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [error, setError] = useState('');

  const addr = addresses.find(a => a._id === id);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { type: 'Home' }
  });
  const selectedType = watch('type');

  useEffect(() => {
    if (addr) {
      setValue('type', addr.type || 'Home');
      setValue('house', addr.house);
      setValue('colony', addr.colony);
      setValue('area', addr.area);
      setValue('pincode', addr.pincode);
      setValue('district', addr.district);
      setCityInput(addr.city || '');
    }
  }, [addr, setValue]);

  const fetchAreas = async (city) => {
    if (!city || city.length < 3) return;
    setLoadingAreas(true);
    setAreas([]);
    try {
      const res = await fetch(`https://api.postalpincode.in/postoffice/${encodeURIComponent(city)}`);
      const data = await res.json();
      if (data[0].Status === 'Success') {
        const mhAreas = data[0].PostOffice
          .filter(p => p.State === 'Maharashtra')
          .map((p, i) => ({ id: i + 1, area: p.Name, pincode: p.Pincode, district: p.District }));
        setAreas(mhAreas);
      } else {
        setError('City not found.');
      }
    } catch {
      setError('Failed to fetch areas.');
    } finally {
      setLoadingAreas(false);
    }
  };

  const handleAreaChange = (e) => {
    const selected = areas.find(a => a.area === e.target.value);
    if (selected) {
      setValue('pincode', selected.pincode);
      setValue('district', selected.district);
    }
  };

  const onSubmit = async (data) => {
    setError('');
    if (!cityInput) { setError('Please enter a city'); return; }
    try {
      await editAddress({
        id,
        type: data.type,
        house: data.house,
        colony: data.colony,
        city: cityInput,
        area: data.area || '',
        pincode: data.pincode || '',
        district: data.district || '',
        state: 'Maharashtra',
        country: 'India',
      }).unwrap();
      router.back();
    } catch (err) {
      setError(err?.data?.message || 'Failed to update address');
    }
  };

  if (!addr) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-10">
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">Edit Address</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-4 mt-4">
        {/* Type selector */}
        <div>
          <p className="text-sm font-medium text-black mb-2">Address Type</p>
          <div className="flex gap-2">
            {[{ value: 'Home', icon: '🏠' }, { value: 'Office', icon: '💼' }, { value: 'Other', icon: '📍' }].map(({ value, icon }) => (
              <label key={value} className="flex-1 cursor-pointer">
                <input {...register('type')} type="radio" value={value} className="sr-only" />
                <div className={`text-center py-2 rounded-xl border-2 text-sm font-medium transition-colors ${
                  selectedType === value ? 'border-yellow-400 bg-yellow-50 text-black' : 'border-gray-200 text-gray-600'
                }`}>
                  {icon} {value}
                </div>
              </label>
            ))}
          </div>
        </div>

        <input {...register('house', { required: 'Required' })} type="text" placeholder="House / Flat No." className="input-field" />
        {errors.house && <p className="text-red-500 text-sm">{errors.house.message}</p>}

        <input {...register('colony', { required: 'Required' })} type="text" placeholder="Colony / Society / Street" className="input-field" />
        {errors.colony && <p className="text-red-500 text-sm">{errors.colony.message}</p>}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter City"
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

        {areas.length > 0 && (
          <select
            {...register('area')}
            className="input-field"
            onChange={(e) => { register('area').onChange(e); handleAreaChange(e); }}
          >
            <option value="">Select Area</option>
            {areas.map(a => <option key={a.id} value={a.area}>{a.area}</option>)}
          </select>
        )}

        <input {...register('pincode')} type="text" placeholder="Pincode" className="input-field bg-gray-100 text-gray-500 cursor-not-allowed" disabled />

        <div className="grid grid-cols-2 gap-3">
          <input value="Maharashtra" readOnly className="input-field bg-gray-100 text-gray-500 cursor-not-allowed" />
          <input value="India" readOnly className="input-field bg-gray-100 text-gray-500 cursor-not-allowed" />
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

        <button onClick={handleSubmit(onSubmit)} disabled={isLoading} className="btn-primary w-full">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
