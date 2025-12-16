import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axiosSecure from "../../../api/axiosSecure";


const LatestResolvedIssues = () => {
  // Fetch Latest Resolved Issues
  const { data: issues, isLoading } = useQuery({
    queryKey: ["latest-resolved-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/issues/latest-resolved");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!issues || issues.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Latest Resolved Issues</h2>
            <p className="text-gray-600 mb-12">
              Check out the issues that have been successfully resolved
            </p>
            <div className="text-center py-10 text-gray-500">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-semibold">No resolved issues yet</p>
              <p className="text-sm">
                Be the first to report and resolve an issue!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Latest Resolved Issues
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how we're making a difference in our community, one issue at a
            time
          </p>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              {/* Issue Image */}
              <figure className="h-48 overflow-hidden relative">
                <img
                  src={
                    issue.images?.[0]
                  }
                  alt={issue.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Resolved Badge */}
                <div className="absolute top-4 right-4">
                  <div className="badge badge-success gap-2 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Resolved
                  </div>
                </div>
                {/* Priority Badge if High */}
                {issue.priority === "high" && (
                  <div className="absolute top-4 left-4">
                    <div className="badge badge-error gap-2 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      High Priority
                    </div>
                  </div>
                )}
              </figure>

              {/* Card Body */}
              <div className="card-body">
                {/* Title */}
                <h3 className="card-title text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {issue.title}
                </h3>

                {/* Category Badge */}
                <div className="flex gap-2 mb-2">
                  <span className="badge badge-outline">{issue.category}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {issue.description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="line-clamp-1">
                    {issue.location?.address ||
                      issue.location ||
                      "Location not specified"}
                  </span>
                </div>

                {/* Reporter Info */}
                <div className="flex items-center gap-2 mb-4 pt-3 border-t">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full ring ring-green-500 ring-offset-2">
                      <img
                        src={
                          issue.reporter?.photo
                         
                        }
                        alt={issue.reporter?.name}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {issue.reporter?.name || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Resolved {new Date(issue.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="card-actions">
                  <Link
                    to={`/issue-details/${issue._id}`}
                    className="btn btn-primary btn-sm w-full group-hover:btn-accent transition-all"
                  >
                    View Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestResolvedIssues;