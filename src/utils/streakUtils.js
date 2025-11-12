// src/utils/streakUtils.js

/**
 * Calculates the current consecutive streak (in days) based on completion history.
 * @param {Array<string>} completionHistory - Array of ISO date strings for completion.
 * @returns {number} The current streak in days.
 */
export const calculateStreak = (completionHistory) => {
    if (!completionHistory || completionHistory.length === 0) {
        return 0;
    }

    // 1. Convert to timestamps and sort descending (newest first)
    const timestamps = completionHistory
        .map(dateStr => new Date(dateStr).setHours(0, 0, 0, 0))
        .sort((a, b) => b - a);
    
    // 2. Filter out duplicates (multiple completions on the same day)
    const uniqueDays = [...new Set(timestamps)];

    let streak = 0;
    let expectedDay = new Date().setHours(0, 0, 0, 0); 
    let yesterday = expectedDay - 86400000; // Milliseconds in a day

    // 3. Check if the habit was completed today
    if (uniqueDays[0] === expectedDay) {
        streak = 1;
        expectedDay = yesterday;
    } else if (uniqueDays[0] > expectedDay) {
        // If the newest completion is in the future (bad data), start checking from yesterday
        expectedDay = yesterday; 
    } else {
        // Not completed today and the last completion was before today: streak is 0
        return 0;
    }

    // 4. Iterate backward through the unique completion days
    for (let i = 1; i < uniqueDays.length; i++) {
        const currentDay = uniqueDays[i];
        
        if (currentDay === expectedDay) {
            streak++;
            expectedDay -= 86400000; // Move to the day before
        } else if (currentDay < expectedDay) {
            // Found a gap, streak ends
            break;
        }
        // If currentDay > expectedDay (e.g., duplicate dates after sorting/filtering) or bad data, just ignore and continue
    }

    return streak;
};