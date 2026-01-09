'use client';

import { useForm } from 'react-hook-form';
import { useCreateTicketMutation } from '../store/slices/ticketsApi';

export default function CreateTicket() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      priority: 'MEDIUM',
      serviceType: 'REPAIR',
      urgency: 'NORMAL'
    }
  });
  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const onSubmit = async (data) => {
    try {
      await createTicket(data).unwrap();
      reset();
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Service Ticket</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('title', { required: 'Title is required' })}
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded-lg"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        
        <textarea
          {...register('description', { required: 'Description is required' })}
          placeholder="Description"
          className="w-full p-3 border rounded-lg h-24"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        
        <select
          {...register('priority')}
          className="w-full p-3 border rounded-lg"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        
        <input
          {...register('appliance', { required: 'Appliance is required' })}
          type="text"
          placeholder="Appliance"
          className="w-full p-3 border rounded-lg"
        />
        {errors.appliance && <p className="text-red-500 text-sm">{errors.appliance.message}</p>}
        
        <textarea
          {...register('address', { required: 'Address is required' })}
          placeholder="Address"
          className="w-full p-3 border rounded-lg h-20"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        
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