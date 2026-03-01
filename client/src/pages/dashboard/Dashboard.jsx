import React, { useState } from "react";
import {
  Code2,
  LogOut,
  Play,
  TrendingUp,
  Target,
  CheckCircle2,
  XCircle,
  BarChart3,
  Clock,
  Users,
  UsersIcon,
  TrophyIcon,
  Trophy,
} from "lucide-react";
import StatsCards from "../../components/StatsCards";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

// Mock stats — replace with real API data later
function useInterviewStats() {
  const [stats] = useState({
    totalQuestions: 47,
    passRate: 72,
    failRate: 28,
    streak: 5,
    avgTime: "18:32",
    sessionsCompleted: 12,
    recentScores: [65, 70, 80, 75, 85, 90, 72, 88],
    byCategory: [
      { label: "Arrays & Strings", solved: 12, total: 15 },
      { label: "Trees & Graphs", solved: 6, total: 10 },
      { label: "Dynamic Programming", solved: 4, total: 8 },
      { label: "System Design", solved: 8, total: 10 },
    ],
  });
  return stats;
}

const Dashboard = () => {
  const stats = useInterviewStats();
  const user = { name: "Tobe" }; // dummy user
  const onStart = () => alert("Start Interview clicked!"); // dummy handler
  const navigate = useNavigate();
  

  return (
    <div className="min-h-screen">
        <Navbar/>
      <main className="flex-1 px-6 py-25  max-w-6xl mx-auto w-full">
        {/* Welcome + Start */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {user?.name || "there"}
            </h1>
            <p className="text-white/60 mt-1">
              Your interview prep dashboard — track progress and start a new session.
            </p>
          </div>
          <button
            className="btn btn-primary gap-2 shadow-lg shadow-primary/30"
            onClick={() => {
              navigate("/interview");
            }}
          >
            <Play size={18} />
            Start Interview
          </button>
        </div>

        {/* Stat cards row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/** Card Template: bg-gray-800 + border-blue-500 */}
          <div className="stat bg-gray-950 rounded-xl border border-blue-600 p-5">
            <div className="stat-figure text-blue-400">
              <CheckCircle2 size={24} />
            </div>
            <div className="text-xs text-white/70 uppercase tracking-wide font-medium">
              Questions Answered
            </div>
            <div className="text-3xl font-bold text-white mt-1">
              {stats.totalQuestions}
            </div>
          </div>

          <div className="stat bg-gray-950 rounded-xl border border-blue-600 p-5">
            <div className="stat-figure text-green-400">
              <TrendingUp size={24} />
            </div>
            <div className="text-xs text-white/70 uppercase tracking-wide font-medium">
              Pass Rate
            </div>
            <div className="text-3xl font-bold text-green-400 mt-1">{stats.passRate}%</div>
          </div>

          <div className="stat bg-gray-950 rounded-xl border border-blue-600 p-5">
            <div className="stat-figure text-red-400">
              <XCircle size={24} />
            </div>
            <div className="text-xs text-white/70 uppercase tracking-wide font-medium">
              Fail Rate
            </div>
            <div className="text-3xl font-bold text-red-400 mt-1">{stats.failRate}%</div>
          </div>

          <div className="stat bg-gray-950 rounded-xl border border-blue-600 p-5">
            <div className="stat-figure text-blue-600">
              <Users size={24} />
            </div>
            <div className="text-xs text-white/70 uppercase tracking-wide font-medium">
              Active Session
            </div>
            <div className="text-3xl font-bold text-white mt-1">1</div>
          </div>
        </div>

               <div className="container mx-auto px-6 pb-16">
  <div className="grid grid-cols-1  gap-6">
    <StatsCards/>
  </div>
</div>

        {/* Middle row: Pass/Fail + Recent Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pass vs Fail */}
          <div className="card bg-gray-950 border border-blue-600">
            <div className="card-body p-6">
              <h2 className="card-title text-sm font-semibold text-white/80 gap-2">
                <BarChart3 size={16} className="text-blue-600" />
                Pass vs Fail
              </h2>
              <div className="flex items-center gap-6 mt-4">
                {/* Radial progress */}
                <div
                  className="radial-progress text-blue-600"
                  style={{
                    "--value": stats.passRate,
                    "--size": "7rem",
                    "--thickness": "8px",
                  }}
                  role="progressbar"
                >
                  <span className="text-lg font-bold text-white">{stats.passRate}%</span>
                </div>

                <div className="flex-1 space-y-3">
                  {/* Passed */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Passed</span>
                      <span className="font-medium text-green-400">
                        {Math.round((stats.totalQuestions * stats.passRate) / 100)}
                      </span>
                    </div>
                    <progress
                      className="progress progress-success w-full h-2"
                      value={stats.passRate}
                      max="100"
                    />
                  </div>

                  {/* Failed */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Failed</span>
                      <span className="font-medium text-red-400">
                        {Math.round((stats.totalQuestions * stats.failRate) / 100)}
                      </span>
                    </div>
                    <progress
                      className="progress progress-error w-full h-2"
                      value={stats.failRate}
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

                <div className="card bg-gray-950 border border-blue-600">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-gray-900 rounded-2xl">
              <TrophyIcon className="w-7 h-7 text-primary" />
            </div>
          </div>
          <div className="text-4xl font-black mb-1">3</div>
          <div className="text-sm opacity-60">Total Sessions</div>
        </div>
      </div>

          {/* Recent Scores */}
    
        </div>
     

         <div className="card bg-gray-950 border-2 border-blue-600 mt-8">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600 from-accent to-secondary rounded-xl">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-black">Your Past Sessions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Static Card Example */}
          <div className="card bg-gray-950 border border-blue-600">
            <div className="card-body p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-600 from-primary to-secondary">
                  <Code2 className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="font-bold text-base mb-1">
                    Two Sum Problem
                  </h3>
                  <span className="badge badge-sm badge-primary">
                    Easy
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm opacity-80 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>2 days ago</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>2 participants</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-blue-600">
                <span className="text-xs font-semibold opacity-80 uppercase">
                  Completed
                </span>
                <span className="text-xs opacity-40">
                  12/02/2026
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Empty State Example */}
        {/* <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl flex items-center justify-center">
            <Trophy className="w-10 h-10 text-accent/50" />
          </div>
          <p className="text-lg font-semibold opacity-70 mb-1">
            No sessions yet
          </p>
          <p className="text-sm opacity-50">
            Start your coding journey today!
          </p>
        </div> */}

      </div>
    </div>

        {/* Bottom stats row */}
        <div className="flex gap-4 mt-6">
          <div className="badge badge-lg badge-outline gap-1.5 py-3 px-4 text-white/60 border-blue-600">
            <Target size={14} />
            {stats.streak} day streak
          </div>
          <div className="badge badge-lg badge-outline gap-1.5 py-3 px-4 text-white/60 border-blue-600">
            <BarChart3 size={14} />
            {stats.sessionsCompleted} sessions
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;