const Timeline = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">No timeline entries yet</p>
    );
  }

  return (
    <div className="container-responsive space-y-4">
      {timeline.map((entry, index) => (
        <div key={entry._id} className="flex gap-4">
          {/* Timeline Line */}
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                entry.status === "pending"
                  ? "bg-yellow-500"
                  : entry.status === "in-progress"
                  ? "bg-blue-500"
                  : entry.status === "resolved"
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            ></div>
            {index < timeline.length - 1 && (
              <div className="w-0.5 h-full bg-gray-300 flex-1 mt-2"></div>
            )}
          </div>

          {/* Timeline Content */}
          <div className="flex-1 pb-8">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`badge ${
                  entry.status === "pending"
                    ? "badge-warning"
                    : entry.status === "in-progress"
                    ? "badge-info"
                    : entry.status === "resolved"
                    ? "badge-success"
                    : "badge-neutral"
                }`}
              >
                {entry.status}
              </span>
              <span className="text-sm text-gray-500">{entry.role}</span>
            </div>
            <p className="text-gray-800 font-medium mb-1">{entry.message}</p>
            <div className="text-sm text-gray-500">
              <span>
                By:{" "}
                {entry.updatedBy?.name || entry.updatedBy?.email || "System"}
              </span>
              <span className="mx-2">•</span>
              <span>{new Date(entry.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
