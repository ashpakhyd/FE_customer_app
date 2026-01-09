'use client';

import { useGetCustomersQuery } from '../store/slices/customerApi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: customers, error, isLoading } = useGetCustomersQuery();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-red-600">Error loading customers</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <header className="bg-white shadow-sm border-b border-yellow-200 p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-xl font-bold text-black">Service App</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/login');
            }}
            className="text-sm text-gray-600"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="p-4 max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-black mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-yellow-400 text-black p-4 rounded-lg font-medium">
              Create Ticket
            </button>
            <button className="bg-yellow-100 text-black p-4 rounded-lg font-medium">
              My Tickets
            </button>
          </div>
        </div>

        {customers?.length ? (
          <div className="space-y-3">
            <h3 className="font-semibold text-black">Recent Activity</h3>
            {customers.map((customer) => (
              <div key={customer.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-semibold text-black">{customer.name}</h4>
                <p className="text-sm text-gray-600">{customer.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </main>
    </div>
  );
}
