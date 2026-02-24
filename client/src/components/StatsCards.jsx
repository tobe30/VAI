import { Code2 } from "lucide-react";

const StatsCards = () => {
  return (
    <div className="card bg-gray-950 border border-blue-600 rounded-2xl">
      <div className="card-body p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-900 rounded-xl">
              <Code2 className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold">Live Sessions</h2>
          </div>

          <span className="text-sm text-blue-600">● 1 active</span>
        </div>

        {/* Session Card */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-5 flex items-center justify-between">
          
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="bg-gray-900 p-4 rounded-xl">
              <Code2 className="text-blue-600 w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">Two Sum</h3>
                <span className="badge badge-primary badge-sm">Easy</span>
              </div>
              <p className="text-sm text-white/60 mt-1">
                Tobechukwu Marizu • 2/2 • OPEN
              </p>
            </div>
          </div>

          {/* Right */}
          <button className="btn btn-primary btn-sm">
            Rejoin →
          </button>
        </div>

      </div>
    </div>
  );
};

export default StatsCards;