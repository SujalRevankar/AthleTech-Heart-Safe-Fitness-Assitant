# AthleTech - AI-Powered Fitness Training PWA

AthleTech is a comprehensive Progressive Web App designed to revolutionize personal fitness through intelligent workout planning and safety-focused training. The app leverages AI to create personalized workout routines while prioritizing user safety through real-time monitoring and smart recommendations.

## 🚀 Features

### ✅ Completed Features (All 8 Phases)

#### Authentication & User Management
- Email/password authentication with Supabase
- Protected routes with session management
- Password reset functionality
- Secure session storage with auto-refresh
- Automatic profile creation on signup

#### Onboarding Flow
- Welcome carousel with app introduction
- Fitness assessment (experience level, goals, activity)
- Body metrics tracking (age, height, weight, BMI)
- Workout preferences (muscle groups, equipment, duration)
- Notification preferences configuration

#### Workout Planning & Tracking
- **AI-Powered Workout Generation** using Google Gemini 2.5 Flash
- Workout filtering by category, muscle group, and difficulty
- Active workout session tracking with:
  - Set/rep/weight logging
  - Rest timer with customizable duration
  - Exercise instructions and safety tips
  - Progress tracking through workout
- Comprehensive workout summaries
- Workout history and repeat functionality

#### Progress Tracking & Analytics
- Progress overview dashboard with key metrics
- Weight progression charts
- Strength gains by muscle group
- Workout frequency analytics
- Calorie burn trends
- Performance metrics visualization
- Progress photo management

#### Health & Safety Monitoring
- Heart health score and trends
- Heart rate zone analysis
- Safety alert system
- Injury prevention tips
- Recovery status tracking
- Customizable safety settings

#### Premium Features
- Feature comparison table
- Subscription plan options
- Free trial offering
- Upgrade functionality ready

## 🛠️ Technology Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with semantic design tokens
- **UI Components:** Radix UI (shadcn/ui)
- **Backend:** Supabase (Database + Auth + Edge Functions)
- **AI:** Lovable AI Gateway (Google Gemini 2.5 Flash - FREE until Oct 6, 2025)
- **State Management:** TanStack Query (React Query)
- **Form Validation:** Zod
- **Routing:** React Router v6
- **Charts:** Recharts
- **PWA:** Vite PWA Plugin

## 🎨 Design System

AthleTech uses a cohesive design system with HSL-based semantic color tokens:

- **Primary:** Deep Blue (#1E40AF) - Trust and stability
- **Secondary:** Vibrant Green (#10B981) - Health and progress  
- **Accent:** Energetic Orange (#F59E0B) - Call-to-action
- **Destructive:** Alert Red (#EF4444) - Safety alerts
- **Typography:** Inter for headings, system fonts for optimal device performance

All colors use semantic tokens from `index.css` ensuring consistent theming across light/dark modes.

## 📱 Application Routes

### Public Routes
- `/auth/login` - User login
- `/auth/signup` - New user registration  
- `/auth/forgot-password` - Password reset

### Protected Routes (Require Authentication)

**Onboarding:**
- `/onboarding/welcome` - Welcome carousel
- `/onboarding/fitness-assessment` - Experience & goals
- `/onboarding/body-metrics` - Physical measurements
- `/onboarding/preferences` - Workout preferences

**Main Application:**
- `/` - Dashboard with stats and quick actions
- `/workout/plan` - AI workout generation and browsing
- `/workout/active/:workoutId` - Live workout tracking
- `/workout/summary/:sessionId` - Post-workout summary
- `/progress/overview` - Progress tracking dashboard
- `/progress/analytics` - Detailed performance analytics
- `/progress/photos` - Progress photo management
- `/health/dashboard` - Health monitoring overview
- `/health/heart-health` - Cardiovascular fitness tracking
- `/safety/alerts` - Safety notifications management
- `/premium/subscription` - Premium plan comparison

## 🔐 Security Implementation

### Database Security
- Row Level Security (RLS) enabled on all user tables
- User-specific data access policies
- Secure foreign key relationships
- Input validation on client and server
- Security definer functions for triggers

### Authentication Security
- Secure password hashing via Supabase Auth
- Session tokens with auto-refresh
- Protected routes with ProtectedRoute wrapper
- Email verification support
- Password reset with secure tokens

### API Security
- CORS-protected edge functions
- Rate limiting on AI endpoints
- Error handling for 429 and 402 responses
- No exposed API keys in client code
- JWT verification on edge functions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Supabase project (already configured)

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to directory
cd athletech

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or  
bun run dev
```

### Supabase Configuration

The app is connected to Supabase. For optimal testing experience:

1. **Disable Email Confirmation** (Optional for testing):
   - Navigate to: Authentication → Providers
   - Disable "Confirm email" for faster testing
   - [Configure here](https://supabase.com/dashboard/project/oxaigmlrphymgrfuiiwh/auth/providers)

2. **Configure URL Settings**:
   - Set Site URL to your production domain  
   - Add redirect URLs for auth callbacks
   - [Configure here](https://supabase.com/dashboard/project/oxaigmlrphymgrfuiiwh/auth/url-configuration)

3. **View Edge Functions**:
   - Monitor `generate-workout` function
   - Monitor `generate-safety-tip` function
   - [View functions](https://supabase.com/dashboard/project/oxaigmlrphymgrfuiiwh/functions)

## 🤖 AI Integration Details

### Lovable AI Gateway
AthleTech uses Lovable AI Gateway with Google Gemini 2.5 Flash for intelligent features:

**Workout Generation:**
- Input: User preferences (experience, goals, equipment, duration)
- Output: Personalized workout plan with 5-8 exercises
- Includes: Sets, reps, rest times, safety tips, warmup/cooldown

**Safety Recommendations:**
- Input: Exercise name, user context, health conditions
- Output: Exercise-specific safety tips
- Considers: Experience level, injury history, proper form

### AI Cost & Usage
- **FREE**: All Gemini models free Sept 29 - Oct 6, 2025
- After free period: Usage-based pricing
- Rate limits: Handle 429 (rate limit) and 402 (credits exhausted) gracefully
- Monitor usage in workspace settings

## 📊 Database Schema

### User Tables
```sql
profiles - User profile info (extends auth.users)
user_metrics - Body measurements over time
user_preferences - Workout preferences and settings
user_health_conditions - Health history and injuries
```

### Workout Tables
```sql
exercises - Exercise library (public read access)
workout_sessions - Completed workout tracking
exercise_sets - Individual set/rep/weight logs
```

### Progress & Achievement Tables
```sql
progress_photos - Progress photo storage
achievements - User badges and milestones
safety_alerts - Safety notifications and warnings
```

### Custom Types
- `experience_level` - beginner | intermediate | advanced
- `fitness_goal` - strength | weight_loss | endurance | general_fitness | muscle_gain
- `difficulty_level` - beginner | intermediate | advanced
- `workout_category` - strength | cardio | flexibility

## 🔄 Edge Functions

### generate-workout
**Purpose:** AI-powered personalized workout generation

**Input:**
```json
{
  "preferences": {
    "experienceLevel": "beginner",
    "fitnessGoals": ["strength", "muscle_gain"],
    "preferredMuscleGroups": ["Chest", "Back"],
    "availableEquipment": ["Dumbbells", "Bench"],
    "typicalWorkoutDuration": 45
  },
  "userMetrics": {
    "weight": 75,
    "height": 180
  }
}
```

**Output:**
```json
{
  "workout": {
    "workoutName": "Upper Body Builder",
    "category": "strength",
    "estimatedDuration": 45,
    "estimatedCalories": 320,
    "exercises": [...],
    "warmup": "...",
    "cooldown": "..."
  }
}
```

### generate-safety-tip
**Purpose:** Exercise-specific safety recommendations

**Input:**
```json
{
  "exerciseName": "Bench Press",
  "userContext": {
    "experienceLevel": "beginner",
    "healthConditions": ["lower back pain"]
  }
}
```

**Output:**
```json
{
  "safetyTip": "Keep your back flat on the bench throughout..."
}
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Header, Nav, Layout)
│   ├── ui/              # Reusable UI components (shadcn)
│   ├── LoadingSpinner.tsx
│   └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx  # Authentication context
├── hooks/
│   ├── use-toast.ts
│   ├── use-mobile.tsx
│   ├── useUserPreferences.ts
│   └── useWorkoutStats.ts
├── integrations/
│   └── supabase/        # Supabase client and types
├── pages/
│   ├── auth/            # Authentication screens
│   ├── onboarding/      # Onboarding flow
│   ├── workout/         # Workout planning and tracking
│   ├── progress/        # Progress and analytics
│   ├── health/          # Health monitoring
│   ├── safety/          # Safety alerts
│   ├── profile/         # Profile management
│   ├── settings/        # App settings
│   └── premium/         # Premium features
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app with routing
└── main.tsx             # App entry point

supabase/
├── functions/
│   ├── generate-workout/     # AI workout generation
│   └── generate-safety-tip/  # AI safety tips
└── config.toml               # Supabase configuration
```

## 🎯 Key Implementation Highlights

### Authentication Pattern
```typescript
// Using AuthContext for secure authentication
const { user, session, signIn, signUp, signOut } = useAuth();

// Protected routes automatically redirect unauthenticated users
<Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
```

### AI Integration Pattern
```typescript
// Secure AI calls through edge functions
const { data } = await supabase.functions.invoke('generate-workout', {
  body: { preferences, userMetrics }
});
```

### Data Fetching Pattern
```typescript
// Using React Query for efficient data fetching
const { data: stats } = useWorkoutStats();
const { data: preferences } = useUserPreferences();
```

## 📈 Performance Optimizations

- React Query for intelligent caching and refetching
- Code splitting with lazy-loaded routes
- Optimized bundle size with tree shaking
- Service worker for offline support
- Responsive images with proper sizing
- Debounced input handlers
- Memoized expensive calculations

## 🐛 Troubleshooting

### Authentication Issues

**"requested path is invalid"**
- Configure Site URL in Supabase Auth settings
- Add your domain to allowed redirect URLs

**Email not confirmed**
- Disable email confirmation in Auth providers for testing
- Or check spam folder for verification email

**Session not persisting**
- Check browser localStorage is enabled
- Verify Supabase client configuration

### AI Generation Issues

**429 Rate Limit Exceeded**
- Wait a moment before retrying
- Implement exponential backoff
- Consider caching recent generations

**402 Payment Required**
- Free Gemini usage until Oct 6, 2025
- After: Add credits in workspace settings
- Contact support for rate limit increases

**Invalid workout format**
- Check edge function logs
- Verify AI response parsing
- Ensure prompt returns valid JSON

### Database Issues

**RLS policy violations**
- Ensure user is authenticated
- Check user_id is set correctly
- Verify policies match your access patterns

**Type errors with Supabase**
- Types may be stale after migrations
- Use `as any` temporarily
- Types will regenerate on next build

## 📚 Additional Resources

- [Lovable Documentation](https://docs.lovable.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Project Dashboard](https://lovable.dev/projects/3b5b4a87-9fee-4e22-a8de-b8d70b52de74)

## 🎓 How to Use

1. **Sign Up**: Create an account at `/auth/signup`
2. **Complete Onboarding**: Set your fitness profile
3. **Generate AI Workout**: Click "Generate AI Workout" on workout plan screen
4. **Track Workouts**: Start a workout and log your sets
5. **Monitor Progress**: View analytics and progress photos
6. **Stay Safe**: Check safety alerts and heart health

## 🔮 Future Roadmap

- [ ] Heart rate monitor device integration
- [ ] Nutrition tracking and meal planning
- [ ] Social features and community challenges
- [ ] Video form analysis
- [ ] Personal trainer video consultations
- [ ] Advanced ML predictions for plateau prevention
- [ ] Apple Health & Google Fit sync
- [ ] Offline-first workout mode
- [ ] Voice-guided workouts

## 📄 License

This project is part of the AthleTech fitness platform.

## 🙏 Built With

- [React](https://react.dev) - UI Framework
- [Vite](https://vitejs.dev) - Build tool
- [Supabase](https://supabase.com) - Backend infrastructure
- [Lovable AI](https://lovable.dev) - AI integration
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Recharts](https://recharts.org) - Data visualization
- [React Query](https://tanstack.com/query) - Data fetching
- [Zod](https://zod.dev) - Schema validation

---

**Ready to transform your fitness journey? Start by running the app and creating your account!**
