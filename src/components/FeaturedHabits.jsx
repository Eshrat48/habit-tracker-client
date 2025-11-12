// src/components/FeaturedHabits.jsx

import React, { useState, useEffect } from 'react';
import { fetchFeaturedHabits } from '../api/habitApi';
// Assuming you use something like React Router for navigation
// import { Link } from 'react-router-dom'; 

const FeaturedHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadHabits = async () => {
            setLoading(true);
            try {
                const data = await fetchFeaturedHabits();
                setHabits(data);
                setError(null);
            } catch (err) {
                setError('Failed to load featured habits. Please check if the server is running on port 3000.');
            } finally {
                setLoading(false);
            }
        };

        loadHabits();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-lg font-medium">Loading featured habits...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600 font-semibold">{error}</div>;
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center border-b-2 border-indigo-500 pb-2 inline-block mx-auto">
                    🔥 Featured Public Habits
                </h2>
                
                {habits.length === 0 ? (
                    <p className="text-center text-gray-600">No public habits found yet. Add a public habit to see it featured here!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {habits.map((habit) => (
                            <div 
                                key={habit._id} 
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col"
                            >
                                {/* Habit Image Placeholder */}
                                <div className="h-40 bg-cover bg-center bg-indigo-100 flex items-center justify-center relative">
                                    <span className="text-4xl text-indigo-500">✨</span>
                                    {/* Optional: habit.image could go here */}
                                </div>
                                
                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Habit Name */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{habit.title}</h3>
                                    
                                    {/* Short Description */}
                                    <p className="text-gray-600 line-clamp-2 mb-4 flex-grow">{habit.description}</p>
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        {/* Creator Name */}
                                        <p className="text-sm text-gray-500 mb-3">
                                            **Creator:** <span className="font-semibold text-gray-700">{habit.userName}</span>
                                        </p>
                                        
                                        {/* "View Details" button */}
                                        {/* Use <Link> for real-world navigation */}
                                        <a 
                                            href={`/habit/${habit._id}`} // Example link path
                                            className="w-full block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-150 font-medium"
                                        >
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedHabits;