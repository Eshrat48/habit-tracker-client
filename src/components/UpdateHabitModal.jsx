// src/components/UpdateHabitModal.jsx

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { updateHabit } from '../api/habitApi';
import useTheme from '../hooks/useTheme.js'; 

const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study']; 

const UpdateHabitModal = ({ habit, onClose, onUpdateSuccess }) => {
    const { user } = useAuth();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const modalBg = isDark ? '#1f2937' : '#fff';
    const borderColor = isDark ? '#374151' : '#e5e7eb';
    const inputBg = isDark ? '#374151' : '#f3f4f6';
    const inputBorder = isDark ? '#4b5563' : '#e9eef6';
    const titleColor = isDark ? '#e5e7eb' : '#111827';
    const textColor = isDark ? '#d1d5db' : '#6b7280';
    const primaryColor = '#6366f1';

    const [formData, setFormData] = useState({
        title: habit.title,
        description: habit.description,
        category: habit.category,
        reminderTime: habit.reminderTime,
        image: habit.image, 
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
            onUpdateSuccess(); 

        } catch (error) {
            toast.error('Update failed. Try again.', { id: updateToast });
            console.error('Update Habit Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // 1. Modal Backdrop
        <div 
            style={{ 
                position: 'fixed', 
                inset: '0', 
                background: isDark ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.5)', 
                display: 'flex', 
                alignItems: 'flex-start', 
                justifyContent: 'center', 
                zIndex: '50',
                overflowY: 'auto', 
                padding: '32px 16px',
            }} 
            onClick={onClose}
        >
            {/* 2. Modal Content */}
            <div 
                style={{ 
                    background: modalBg, 
                    borderRadius: '12px', 
                    boxShadow: isDark ? '0 20px 25px rgba(0,0,0,0.4)' : '0 20px 25px rgba(0,0,0,0.15)', 
                    width: '100%', 
                    maxWidth: '500px', 
                    maxHeight: '90vh', 
                    display: 'flex', 
                    flexDirection: 'column'
                }} 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    borderBottom: `1px solid ${borderColor}`, 
                    padding: '16px 24px', 
                    flexShrink: 0 
                }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: titleColor }}>Update Habit: {habit.title}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: textColor }}>
                        ✕
                    </button>
                </div>

                {/* 3. SCROLLABLE FORM AREA */}
                <form 
                    onSubmit={handleSubmit} 
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '16px', 
                        padding: '16px 24px', 
                        overflowY: 'auto', 
                        flexGrow: 1 
                    }}
                >
                    
                    {/* All form fields */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: titleColor, marginBottom: '8px' }}>Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            required 
                            style={{ 
                                width: '100%', 
                                padding: '10px 12px', 
                                borderRadius: '8px', 
                                border: `1px solid ${inputBorder}`, 
                                background: inputBg,
                                color: titleColor 
                            }} 
                            maxLength="100" 
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: titleColor, marginBottom: '8px' }}>Category</label>
                        <select 
                            name="category" 
                            value={formData.category} 
                            onChange={handleChange} 
                            required 
                            style={{ 
                                width: '100%', 
                                padding: '10px 12px', 
                                borderRadius: '8px', 
                                border: `1px solid ${inputBorder}`, 
                                background: inputBg,
                                color: titleColor 
                            }}
                        >
                            {categories.map(cat => <option key={cat} value={cat} style={{ backgroundColor: modalBg, color: titleColor }}>{cat}</option>)}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: titleColor, marginBottom: '8px' }}>Description</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required 
                            style={{ 
                                width: '100%', 
                                minHeight: '96px', 
                                padding: '12px', 
                                borderRadius: '8px', 
                                border: `1px solid ${inputBorder}`, 
                                background: inputBg,
                                color: titleColor 
                            }} 
                            maxLength="500">
                        </textarea>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: titleColor, marginBottom: '8px' }}>Reminder Time</label>
                        <input 
                            type="time" 
                            name="reminderTime" 
                            value={formData.reminderTime} 
                            onChange={handleChange} 
                            required 
                            style={{ 
                                width: '100%', 
                                padding: '10px 12px', 
                                borderRadius: '8px', 
                                border: `1px solid ${inputBorder}`, 
                                background: inputBg,
                                color: titleColor 
                            }} 
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: titleColor, marginBottom: '8px' }}>Image URL (Optional)</label>
                        <input 
                            type="url" 
                            name="image" 
                            value={formData.image || ''} 
                            onChange={handleChange} 
                            style={{ 
                                width: '100%', 
                                padding: '10px 12px', 
                                borderRadius: '8px', 
                                border: `1px solid ${inputBorder}`, 
                                background: inputBg,
                                color: titleColor 
                            }} 
                            placeholder="Enter new image URL" 
                        />
                        {formData.image && <p style={{ fontSize: '12px', marginTop: '8px', color: textColor }}>Current Image: <a href={formData.image} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'underline' }}>{formData.image.substring(0, 50)}...</a></p>}
                    </div>
                    
                    {/* Is Public Checkbox */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                            type="checkbox" 
                            name="isPublic" 
                            checked={formData.isPublic} 
                            onChange={handleChange} 
                            id="isPublicCheck" 
                            style={{ width: '18px', height: '18px', accentColor: primaryColor }} 
                        />
                        <label htmlFor="isPublicCheck" style={{ fontSize: '13px', color: titleColor, cursor: 'pointer', margin: 0 }}>Make Public (Allow others to browse)</label>
                    </div>

                    <p style={{ fontSize: '12px', color: textColor, margin: 0 }}>
                        <strong>Created By:</strong> {habit.userName} ({habit.userEmail})
                    </p>
                    
                    {/* Submit Button */}
                    <button type="submit" disabled={isSubmitting} style={{ 
                        padding: '12px 16px', 
                        marginTop: '12px', 
                        background: 'linear-gradient(90deg,#6366f1,#a855f7)', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '8px', 
                        fontSize: '14px', 
                        fontWeight: 600, 
                        cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                        opacity: isSubmitting ? 0.7 : 1 
                    }}>
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateHabitModal;