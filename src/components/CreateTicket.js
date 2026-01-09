'use client';

import { useState } from 'react';
import { useCreateTicketMutation } from '../store/slices/ticketsApi';

export default function CreateTicket() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    serviceType: 'REPAIR',
    appliance: '',
    issue: '',
    address: '',
    timeSlot: '',
    urgency: 'NORMAL'
  });
  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTicket(formData).unwrap();
      setFormData({
        title: '',
        description: '',
        priority: 'MEDIUM',
        serviceType: 'REPAIR',
        appliance: '',
        issue: '',
        address: '',
        timeSlot: '',
        urgency: 'NORMAL'
      });
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Service Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full p-3 border rounded-lg"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full p-3 border rounded-lg h-24"
          required
        />
        <select
          value={formData.priority}
          onChange={(e) => setFormData({...formData, priority: e.target.value})}
          className="w-full p-3 border rounded-lg"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <input
          type="text"
          placeholder="Appliance"
          value={formData.appliance}
          onChange={(e) => setFormData({...formData, appliance: e.target.value})}
          className="w-full p-3 border rounded-lg"
          required
        />
        <textarea
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="w-full p-3 border rounded-lg h-20"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-3 bg-green-600 text-white rounded-lg font-medium disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Ticket'}
        </button>
      </form>
    </div>
  );
}