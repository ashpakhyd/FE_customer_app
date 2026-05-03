'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: { state: 'Maharashtra', country: 'India' }
  });
  const [error, setError] = useState('');
  const [areas, setAreas] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const router = useRouter();
  const password = watch('password');

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

  const onSubmit = (data) => {
    setError('');
    if (!cityInput) { setError('Please enter and search a city'); return; }
    if (areas.length > 0 && !data.area) { setError('Please select an area'); return; }
    sessionStorage.setItem('registerData', JSON.stringify({
      name: data.name,
      phone: data.phone,
      password: data.password,
      role: 'CUSTOMER',
      address: {
        house: data.house,
        colony: data.colony,
        city: cityInput,
        area: data.area || '',
        pincode: data.pincode || '',
        district: data.district || '',
        state: 'Maharashtra',
        country: 'India',
      }
    }));
    router.push(`/verify-phone?phone=${data.phone}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-black">S</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Create Account</h1>
          <p className="text-gray-600">Join our service platform</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            placeholder="Full Name"
            className="input-field"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          {/* Phone */}
          <input
            {...register('phone', {
              required: 'Phone number is required',
              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile number' }
            })}
            type="tel"
            placeholder="Phone Number"
            className="input-field"
            maxLength="10"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

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
          <input type="hidden" {...register('city')} value={cityInput} />

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

          {/* Pincode - auto filled */}
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

          {/* Password */}
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            type="password"
            placeholder="Password"
            className="input-field"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* Confirm Password */}
          <input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            type="password"
            placeholder="Confirm Password"
            className="input-field"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full">
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button onClick={() => router.push('/login')} className="text-yellow-600 font-semibold">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
