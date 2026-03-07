'use client';

import { useGetOfferByIdQuery, useRedeemOfferMutation } from '../../../store/slices/offersApi';
import { useRouter } from 'next/navigation';
import { useState, use } from 'react';
import ImageGallery from '../../../components/ImageGallery';
import FullScreenGallery from '../../../components/FullScreenGallery';

export default function OfferDetailsPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const { data, isLoading } = useGetOfferByIdQuery(id);
  const [redeemOffer, { isLoading: isRedeeming }] = useRedeemOfferMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [redemptionData, setRedemptionData] = useState(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleRedeem = async () => {
    try {
      const result = await redeemOffer(id).unwrap();
      setRedemptionData(result.redemption);
      setShowSuccess(true);
    } catch (error) {
      alert(error?.data?.message || 'Failed to redeem offer');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const offer = data?.offer;
  if (!offer) return null;

  const discount = offer.discountPercentage || Math.round(((offer.price.original - offer.price.discounted) / offer.price.original) * 100);

  if (showSuccess && redemptionData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Offer Redeemed!</h2>
          <p className="text-gray-600 mb-6">Your redemption code is ready</p>
          
          <div className="bg-yellow-50 rounded-2xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Redemption Code</p>
            <p className="text-3xl font-bold font-mono text-yellow-600">{redemptionData.redemptionCode}</p>
          </div>

          <div className="space-y-2 text-sm text-left mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Original Price:</span>
              <span className="line-through">{offer.price.currency} {offer.price.original}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discounted Price:</span>
              <span className="font-bold text-yellow-600">{offer.price.currency} {offer.price.discounted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Valid Until:</span>
              <span>{new Date(redemptionData.expiresAt).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/offers')}
            className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors"
          >
            View My Offers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-transparent">
        <div className="flex items-center justify-between p-4 max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-lg">←</span>
          </button>
          <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
            {discount}% OFF
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="relative">
        {offer.images && offer.images.length > 0 && (
          <ImageGallery 
            images={offer.images} 
            onImageClick={(index) => {
              setSelectedImageIndex(index);
              setFullScreenOpen(true);
            }}
          />
        )}
      </div>

      {/* Details Card with Overlap */}
      <div className="relative -mt-8 z-20">
        <div className="bg-white rounded-t-3xl p-6 shadow-xl max-w-md mx-auto min-h-screen">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-black mb-2">{offer.title}</h1>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                {offer.category}
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{offer.description}</p>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Original Price</p>
                <p className="text-lg line-through text-gray-400">{offer.price.currency} {offer.price.original}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Offer Price</p>
                <p className="text-3xl font-bold text-yellow-600">{offer.price.currency} {offer.price.discounted}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Valid From</span>
              <span className="font-medium text-sm">{new Date(offer.validFrom).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Valid Till</span>
              <span className="font-medium text-sm">{new Date(offer.validTill).toLocaleDateString()}</span>
            </div>
            {offer.maxRedemptions && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Available</span>
                <span className="font-medium text-sm">{offer.maxRedemptions - offer.currentRedemptions} / {offer.maxRedemptions}</span>
              </div>
            )}
          </div>

          {offer.termsConditions && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-black mb-2 text-sm">Terms & Conditions</h3>
              <p className="text-gray-600 text-xs">{offer.termsConditions}</p>
            </div>
          )}

          {offer.tags && offer.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {offer.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {!offer.isRedeemed ? (
            <button
              onClick={handleRedeem}
              disabled={isRedeeming || !offer.isValid}
              className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isRedeeming ? 'Redeeming...' : offer.isValid ? 'Redeem Offer' : 'Offer Expired'}
            </button>
          ) : (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
              <p className="text-green-600 font-semibold">✓ Already Redeemed</p>
              <button
                onClick={() => router.push('/offers?tab=my-offers')}
                className="text-green-600 text-sm underline mt-2"
              >
                View in My Offers
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      <FullScreenGallery 
        images={offer.images || []} 
        isOpen={fullScreenOpen} 
        onClose={() => setFullScreenOpen(false)}
        initialSlide={selectedImageIndex}
      />
    </div>
  );
}
