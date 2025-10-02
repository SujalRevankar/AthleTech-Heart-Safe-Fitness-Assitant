import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useWorkoutStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["workout-stats", user?.id],
    queryFn: async () => {
      if (!user) return null;

      // Get workout sessions from the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: sessions, error } = await supabase
        .from("workout_sessions")
        .select("*")
        .eq("user_id", user.id)
        .gte("started_at", sevenDaysAgo.toISOString())
        .order("started_at", { ascending: false });

      if (error) throw error;

      // Calculate stats
      const totalCalories = sessions?.reduce((sum, session) => sum + (session.calories_burned || 0), 0) || 0;
      const workoutCount = sessions?.length || 0;
      
      // Calculate streak (simplified - counts consecutive days with workouts)
      const uniqueDays = new Set(sessions?.map(s => new Date(s.started_at).toDateString()) || []);
      const streak = uniqueDays.size;

      return {
        weeklyCalories: totalCalories,
        workoutCount,
        streak,
        sessions: sessions || []
      };
    },
    enabled: !!user,
  });
};
