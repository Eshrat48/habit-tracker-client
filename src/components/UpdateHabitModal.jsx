// src/components/UpdateHabitModal.jsx

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { updateHabit } from '../api/habitApi';

const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study']; // Match your Habit.js model

const UpdateHabitModal = ({ habit, onClose, onUpdateSuccess }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: habit.title,
        description: habit.description,
        category: habit.category,
        reminderTime: habit.reminderTime,
        image: habit.image, // Current image URL
        isPublic: habit.isPublic,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const updateToast = toast.loading('Updating habit...');

        try {
            const token = await user.getIdToken();
            
            // Only send the fields that can be updated
            const habitData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                reminderTime: formData.reminderTime,
                image: formData.image,
                isPublic: formData.isPublic,
            };
            
            await updateHabit(habit._id, habitData, token);
            
            toast.success('Habit updated successfully!', { id: updateToast });
            onUpdateSuccess(); // Close modal and trigger data refresh

        } catch (error) {
            toast.error('Update failed. Try again.', { id: updateToast });
            console.error('Update Habit Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // Modal Backdrop
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold">Update Habit: {habit.title}</h2>
                    <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Title */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Title</span></label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="input input-bordered w-full" maxLength="100" />
                    </div>

                    {/* Category */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Category</span></label>
                        <select name="category" value={formData.category} onChange={handleChange} required className="select select-bordered w-full">
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Description</span></label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required className="textarea textarea-bordered h-24 w-full" maxLength="500"></textarea>
                    </div>

                    {/* Reminder Time */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Reminder Time</span></label>
                        <input type="time" name="reminderTime" value={formData.reminderTime} onChange={handleChange} required className="input input-bordered w-full" />
                    </div>
                    
                    {/* Image URL (Simple update for URL - for file upload, you'd need a separate handler) */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Image URL (Optional)</span></label>
                        <input type="url" name="image" value={formData.image || ''} onChange={handleChange} className="input input-bordered w-full" placeholder="Enter new image URL" />
                        {formData.image && <p className="text-xs mt-1 text-gray-500">Current Image: <a href={formData.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 truncate">{formData.image.substring(0, 50)}...</a></p>}
                    </div>
                    
                    {/* Is Public Checkbox */}
                    <div className="form-control flex flex-row items-center space-x-2">
                        <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} className="checkbox checkbox-primary" id="isPublicCheck" />
                        <label htmlFor="isPublicCheck" className="label cursor-pointer"><span className="label-text">Make Public (Allow others to browse)</span></label>
                    </div>

                    {/* Non-editable User Info (Display only) */}
                    <p className="text-sm text-gray-500">
                        **Created By:** {habit.userName} ({habit.userEmail})
                    </p>

                    {/* Submit Button */}
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full mt-6">
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateHabitModal;