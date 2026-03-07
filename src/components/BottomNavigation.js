'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around py-2 max-w-md mx-auto">
        <button 
          onClick={() => router.push('/')} 
          className="flex flex-col items-center py-2 px-4"
        >
          <div className={`w-6 h-6 flex items-center justify-center mb-1 ${isActive('/') ? 'bg-black rounded-full p-1' : ''}`}>
            <Image 
              src="/icons/homeTaskBar.png" 
              alt="Home"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className={`text-xs ${isActive('/') ? 'text-black font-medium' : 'text-gray-400'}`}>Home</span>
        </button>
        
        <button 
          onClick={() => router.push('/tickets')} 
          className="flex flex-col items-center py-2 px-4"
        >
          <div className={`w-6 h-6 flex items-center justify-center mb-1 ${isActive('/tickets') ? 'bg-black rounded-full p-1' : ''}`}>
            <Image 
              src="/icons/ticketTaskBar.png" 
              alt="Tickets"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className={`text-xs ${isActive('/tickets') ? 'text-black font-medium' : 'text-gray-400'}`}>Tickets</span>
        </button>
        
        <button 
          onClick={() => router.push('/notifications')} 
          className="flex flex-col items-center py-2 px-4"
        >
          <div className={`w-6 h-6 flex items-center justify-center mb-1 ${isActive('/notifications') ? 'bg-black rounded-full p-1' : ''}`}>
            <Image 
              src="/icons/alertTaskBar.png" 
              alt="Alerts"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className={`text-xs ${isActive('/notifications') ? 'text-black font-medium' : 'text-gray-400'}`}>Alerts</span>
        </button>
        
        <button 
          onClick={() => router.push('/profile')} 
          className="flex flex-col items-center py-2 px-4"
        >
          <div className={`w-6 h-6 flex items-center justify-center mb-1 ${isActive('/profile') ? 'bg-black rounded-full p-1' : ''}`}>
            <Image 
              src="/icons/userTaskBar.png" 
              alt="Profile"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className={`text-xs ${isActive('/profile') ? 'text-black font-medium' : 'text-gray-400'}`}>Profile</span>
        </button>
      </div>
    </div>
  );
}
