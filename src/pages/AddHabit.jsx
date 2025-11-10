// src/pages/AddHabit.jsx

import React from 'react';

const AddHabit = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add Habit Form</h1>
      <p>This page is protected by PrivateRoute.</p>
    </div>
  );
};

// CRITICAL FIX: The component must be exported as default
export default AddHabit;