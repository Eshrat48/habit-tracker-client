// src/pages/AddHabit.jsx (Revised for specific styling)

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 
import useTheme from '../hooks/useTheme'; 
import { createHabit } from '../api/habitApi';

const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study']; 

const AddHabit = () => {
    const { user, loading: authLoading } = useAuth();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const navigate = useNavigate();

    const primaryColor = '#6366f1'; 
    const formBoxBg = isDark ? '#1f2937' : '#fff';
    const formBoxBorder = isDark ? '#374151' : '#eef2f7';
    const titleColor = isDark ? '#e5e7eb' : '#111827';
    const subTextColor = isDark ? '#9ca3af' : '#6b7280';
    const labelColor = isDark ? '#e5e7eb' : '#111827';
    const inputBg = isDark ? '#374151' : '#f3f4f6';
    const inputBorder = isDark ? '#4b5563' : '#e9eef6';
    const inputTextColor = isDark ? '#e5e7eb' : '#111827';
    const infoBoxBg = isDark ? '#374151' : '#f0f6ff';
    const infoBoxBorder = isDark ? '#4b5563' : '#e6eefc';
    const infoLabelColor = isDark ? '#9ca3af' : '#374151';
    const infoValueColor = isDark ? '#e5e7eb' : '#0f172a';
    const cancelBtnBg = isDark ? '#1f2937' : '#fff';
    const cancelBtnBorder = isDark ? '#4b5563' : '#e6e6f2';
    const cancelBtnColor = isDark ? '#e5e7eb' : '#374151';


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: categories[0], 
        reminderTime: '08:00',   
        image: '',               
        isPublic: false,         
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('=== AddHabit Form Submission ===');
        console.log('Auth Loading:', authLoading);
        console.log('User:', user);
        console.log('Form Data:', formData);

        if (authLoading || !user) {
            const msg = 'Authentication loading or user not found. Try logging in again.';
            console.error(msg);
            toast.error(msg);
            return;
        }

        // Validate form
        if (!formData.title.trim()) {
            toast.error('Habit title is required.');
            return;
        }
        if (!formData.description.trim()) {
            toast.error('Habit description is required.');
            return;
        }

        setIsSubmitting(true);
        const submitToastId = toast.loading('Adding your new habit...');

        try {
            const token = await user.getIdToken();
            console.log('Token obtained:', token ? 'YES' : 'NO');
            
            let imageUrl = formData.image || null;
            const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
            if (selectedFile && imgbbKey) {
                // upload and get URL
                try {
                    imageUrl = await uploadToImgbb(selectedFile, imgbbKey);
                } catch (uploadErr) {
                    console.warn('ImgBB upload failed, falling back to provided URL if any:', uploadErr);
                }
            }

            const habitData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                category: formData.category,
                reminderTime: formData.reminderTime,
                image: imageUrl,
                isPublic: formData.isPublic,
            };

            console.log('Sending to backend:', habitData);
            console.log('With token:', token.substring(0, 30) + '...');
            const response = await createHabit(habitData, token);
            console.log('Backend response:', response);
            
            toast.success('Habit added successfully! Time to get started.', { id: submitToastId });
            navigate('/my-habits');

        } catch (error) {
            console.error('Habit creation failed:', error);
            console.error('Error response:', error?.response?.data);
            console.error('Error status:', error?.response?.status);
            console.error('Error message:', error?.message);
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to create habit.';
            toast.error(errorMessage, { id: submitToastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Upload helper for ImgBB 
    const uploadToImgbb = (file, apiKey) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result.split(',')[1];
                try {
                    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({ image: base64 })
                    });
                    const data = await res.json();
                    if (data && data.data && data.data.url) {
                        resolve(data.data.url);
                    } else {
                        reject(new Error('ImgBB upload did not return a URL'));
                    }
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl('');
        }
    };

    const handleCancel = () => {
        navigate('/my-habits');
    };
    
    // --- Render ---
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '28px' }}>
            <div 
                style={{ 
                    width: 520, 
                    background: formBoxBg, 
                    borderRadius: 12, 
                    padding: 28, 
                    boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(17,24,39,0.06)', 
                    border: `1px solid ${formBoxBorder}` 
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 46, background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: primaryColor, fontSize: 20 }}>+</span>
                    </div>
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: titleColor }}>Create New Habit</div> 
                        <div style={{ fontSize: 13, color: subTextColor }}>Build a new habit to track daily</div> 
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                        {/* Title */}
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, color: labelColor, display: 'block', marginBottom: 8 }}>Habit Title *</label> 
                            <input name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Morning Exercise"
                                style={{ 
                                    width: '100%', 
                                    padding: '10px 12px', 
                                    borderRadius: 8, 
                                    border: `1px solid ${inputBorder}`,
                                    background: inputBg, 
                                    color: inputTextColor 
                                }} 
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, color: labelColor, display: 'block', marginBottom: 8 }}>Category *</label>
                            <select name="category" value={formData.category} onChange={handleChange} required
                                style={{ 
                                    width: '100%', 
                                    padding: '10px 12px', 
                                    borderRadius: 8, 
                                    border: `1px solid ${inputBorder}`, 
                                    background: inputBg, 
                                    color: inputTextColor 
                                }}>
                                {categories.map(cat => <option key={cat} value={cat} style={{ backgroundColor: formBoxBg, color: inputTextColor }}>{cat}</option>)}
                            </select>
                        </div>

                        {/* Reminder Time */}
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, color: labelColor, display: 'block', marginBottom: 8 }}>Reminder Time</label>
                            <input type="time" name="reminderTime" value={formData.reminderTime} onChange={handleChange}
                                style={{ 
                                    width: '100%', 
                                    padding: '10px 12px', 
                                    borderRadius: 8, 
                                    border: `1px solid ${inputBorder}`, 
                                    background: inputBg, 
                                    color: inputTextColor 
                                }} 
                            />
                        </div>

                        {/* Image URL + Upload */}
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, color: labelColor, display: 'block', marginBottom: 8 }}>Image URL (Optional)</label> 
                            <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg"
                                style={{ 
                                    width: '90%', 
                                    padding: '10px 12px', 
                                    borderRadius: 8, 
                                    border: `1px solid ${inputBorder}`, 
                                    background: inputBg, 
                                    color: inputTextColor, 
                                    marginBottom: 8 
                                }} 
                            />

                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    style={{ color: inputTextColor }}
                                />
                                {previewUrl && <div style={{ width: 56, height: 56, borderRadius: 8, overflow: 'hidden', border: `1px solid ${formBoxBorder}` }}><img src={previewUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div style={{ marginTop: 16 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, color: labelColor, display: 'block', marginBottom: 8 }}>Description</label> 
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your habit and why it's important to you..."
                            style={{ 
                                width: '95%', 
                                minHeight: 120, 
                                padding: '12px', 
                                borderRadius: 8, 
                                border: `1px solid ${inputBorder}`, 
                                background: inputBg, 
                                color: inputTextColor 
                            }} 
                        />
                    </div>

                    {/* User info and public toggle */}
                    <div 
                        style={{ 
                            marginTop: 16, 
                            padding: 14, 
                            borderRadius: 10, 
                            background: infoBoxBg, 
                            border: `1px solid ${infoBoxBorder}`, 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center' 
                        }}
                    >
                        <div style={{ flex: 1, minWidth: 160 }}>
                            <div style={{ fontSize: 12, color: infoLabelColor, fontWeight: 600 }}>User Name</div> 
                            <div style={{ fontSize: 14, color: infoValueColor, fontWeight: 600 }}>{user?.displayName || user?.email?.split('@')[0] || ''}</div> 
                            <div style={{ height: 8 }} />
                            <div style={{ fontSize: 12, color: infoLabelColor, fontWeight: 600 }}>User Email</div>
                            <div style={{ fontSize: 13, color: infoValueColor }}>{user?.email || ''}</div> 
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input 
                                id="isPublicCheck" 
                                type="checkbox" 
                                name="isPublic" 
                                checked={formData.isPublic} 
                                onChange={handleChange} 
                                style={{ width: 18, height: 18, accentColor: primaryColor }} 
                            />
                            <label htmlFor="isPublicCheck" style={{ fontSize: 13, color: infoValueColor }}>Make this habit public so others can see and get inspired</label> 
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
                        <button 
                            type="button" 
                            onClick={handleCancel} 
                            disabled={isSubmitting} 
                            style={{ 
                                flex: 1, 
                                padding: '10px 12px', 
                                borderRadius: 8, 
                                background: cancelBtnBg, 
                                border: `1px solid ${cancelBtnBorder}`, 
                                color: cancelBtnColor 
                            }}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting || authLoading || !user} 
                            style={{ 
                                flex: 1, 
                                padding: '10px 12px', 
                                borderRadius: 8, 
                                color: '#fff', 
                                background: 'linear-gradient(90deg,#6366f1,#a855f7)', 
                                border: 'none',
                                opacity: isSubmitting || authLoading || !user ? 0.7 : 1
                            }}
                        >
                            {isSubmitting ? 'Saving Habit...' : 'Create Habit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHabit;