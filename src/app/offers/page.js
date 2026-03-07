'use client';

import { useGetOffersQuery } from '../../store/slices/offersApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ImageGallery from '../../components/ImageGallery';

export default function OffersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('available');
  const { data, isLoading } = useGetOffersQuery({ type: activeTab, limit: 20 });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const offers = data?.offers || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto mb-4">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">Special Offers</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex gap-2 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'available' ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setActiveTab('my-offers')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'my-offers' ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-600'
            }`}
          >
            My Offers
          </button>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-4 mt-4">
        {offers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎁</span>
            </div>
            <p className="text-gray-500 text-sm">No offers available</p>
          </div>
        ) : (
          offers.map((offer) => {
            const offerData = activeTab === 'my-offers' ? offer.offer : offer;
            if (!offerData || !offerData.price) return null;
            const discount = offerData.discountPercentage || Math.round(((offerData.price.original - offerData.price.discounted) / offerData.price.original) * 100);
            
            return (
              <div
                key={offer._id}
                onClick={() => router.push(`/offers/${activeTab === 'my-offers' ? offerData._id : offer._id}`)}
                className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              >
                {offerData.images && offerData.images.length > 0 && (
                  <div className="relative">
                    <ImageGallery images={offerData.images} />
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                      {discount}% OFF
                    </div>
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="font-bold text-black text-lg mb-2">{offerData.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{offerData.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-gray-400 line-through text-sm">{offerData.price.currency} {offerData.price.original}</span>
                      <span className="text-yellow-600 font-bold text-xl ml-2">{offerData.price.currency} {offerData.price.discounted}</span>
                    </div>
                  </div>

                  {activeTab === 'my-offers' && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Code</p>
                        <p className="font-mono font-bold text-sm">{offer.redemptionCode}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        offer.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {offer.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
