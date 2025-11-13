# HabitTracker 🚀

A modern web application designed to help users create, track, and manage daily habits to build streaks and boost productivity. Build better habits, one day at a time.

**Live Site:** [HabitTracker Live](https://habittracker.netlify.app) *(Deploy to Netlify)*

---

## 🌟 Key Features

- **User Authentication** – Secure login/registration with email-password and Google OAuth. Password validation ensures strength (uppercase, lowercase, 6+ characters).
- **Habit Management** – Create, read, update, and delete habits with full CRUD operations. Private/public habit sharing with the community.
- **Streak Tracking** – Automatic streak calculation and 30-day completion percentage display on habit details with visual badges.
- **Community Habits** – Browse public habits shared by other users with powerful search and category-based filtering.
- **Task Completion** – Mark habits complete daily with duplicate prevention. Completion history tracked in MongoDB with timestamps.
- **Protected Routes** – Secure private routes (Add Habit, My Habits, Habit Details) with persistent authentication on page reload.
- **Responsive Design** – Fully responsive UI for mobile, tablet, and desktop. Tailwind CSS and DaisyUI for modern styling.
- **Real-time Notifications** – Toast notifications for user feedback (success, error, loading states) powered by React Hot Toast.
- **Smooth Animations** – Framer Motion animations for hero banner and section transitions enhancing user experience.

---

## 🛠️ Tech Stack

**Frontend:**
- React 19 + Vite
- Tailwind CSS v4 + DaisyUI
- React Router v7 for navigation
- Axios for API calls
- Firebase Authentication
- Framer Motion for animations
- React Hot Toast for notifications
- Lucide React & React Icons for UI icons

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- Firebase Admin SDK
- CORS enabled for cross-origin requests

---

## 📋 Requirements Met

✅ **Authentication:** Email/password + Google login with password validation  
✅ **CRUD Operations:** Full Create, Read, Update, Delete for habits  
✅ **Home Page:** Hero banner, 6 featured habits, Why Build Habits section, extra sections with animations  
✅ **Habit Tracking:** Streak calculation, completion history, 30-day progress  
✅ **Search & Filter:** Category-based filtering and keyword search on Browse Habits  
✅ **Protected Routes:** Private routes with auth persistence  
✅ **Error Handling:** Custom error messages via toast (no Lorem ipsum, no default alerts)  
✅ **404 Page:** Custom error page for not found routes  
✅ **Responsive Design:** Mobile, tablet, desktop views  
✅ **Loading Spinner:** Loading states throughout the app  
✅ **GitHub Commits:** 15+ client commits, 9 server commits

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Firebase project setup

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/habit-tracker.git
   cd habit-tracker
   ```

2. **Setup Client:**
   ```bash
   cd habit-tracker-client
   npm install
   ```

3. **Setup Server:**
   ```bash
   cd ../habit-tracker-server
   npm install
   ```

4. **Environment Variables:**

   **Client (.env.local):**
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

   **Server (.env):**
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   FIREBASE_SERVICE_ACCOUNT_KEY=your_firebase_key
   ```

### Running the App

**Start the development server:**

```bash
# Terminal 1 - Backend
cd habit-tracker-server
npm run dev

# Terminal 2 - Frontend
cd habit-tracker-client
npm run dev
```

Visit `http://localhost:5173` for the client and `http://localhost:3000` for the API.

---

## 📱 API Endpoints

### Public Routes
- `GET /api/v1/habits/featured` – Get 6 newest public habits
- `GET /api/v1/habits/public` – Get all public habits

### Protected Routes (Requires JWT Token)
- `POST /api/v1/habits` – Create a new habit
- `GET /api/v1/habits/my` – Get user's habits
- `GET /api/v1/habits/:id` – Get habit details
- `PATCH /api/v1/habits/:id` – Update habit
- `DELETE /api/v1/habits/:id` – Delete habit
- `PATCH /api/v1/habits/:id/complete` – Mark habit complete

---

## 🎨 Deployment

**Frontend (Netlify):**
1. Build: `npm run build`
2. Deploy the `dist/` folder to Netlify
3. Add your domain to Firebase authorized domains

**Backend (Vercel):**
1. Connect your GitHub repo to Vercel
2. Set environment variables
3. Deploy with one click

---

## 🧪 Testing

Test the app with these scenarios:
- ✅ Register with email and password
- ✅ Login with Google OAuth
- ✅ Add a new habit and mark it complete
- ✅ View habit details and streak
- ✅ Update and delete habits
- ✅ Search and filter public habits
- ✅ Verify protected routes redirect properly
- ✅ Test on mobile/tablet/desktop responsiveness
- ✅ Reload page on private routes (user stays logged in)

---

## 🤝 Contributing

Pull requests are welcome! Please follow the commit message format:
- `feat: Add feature name`
- `fix: Fix bug description`
- `docs: Update documentation`

---

## 📄 License

This project is licensed under the ISC License.

---

## 📧 Contact

For questions or feedback, reach out to [your-email@example.com](mailto:your-email@example.com)

---

**Made with ❤️ for better habits and productivity.**

