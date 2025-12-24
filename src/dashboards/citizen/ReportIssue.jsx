import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";

const ReportIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      return axiosSecure.post("/api/issues", data);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Issue reported successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/citizen/my-issues");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to report issue",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newIssue = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      image: form.image.value,
      location: form.address.value,
    };
console.log("Sending data:", newIssue);
    mutation.mutate(newIssue);
  };

  return (
    <div className="max-w-full sm:max-w-2xl mx-auto">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
          Report New Issue
        </h2>

        {user?.isBlocked && (
          <div className="alert alert-error mb-4 text-sm sm:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>You are blocked. Cannot report issues.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm sm:text-base font-medium">
                Issue Title <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter issue title (e.g., Broken streetlight)"
              className="input input-bordered input-sm sm:input-md w-full"
              required
              disabled={user?.isBlocked}
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm sm:text-base font-medium">
                Description <span className="text-red-500">*</span>
              </span>
            </label>
            <textarea
              name="description"
              placeholder="Describe the issue in detail..."
              className="textarea textarea-bordered textarea-sm sm:textarea-md w-full h-24 sm:h-32"
              required
              disabled={user?.isBlocked}
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm sm:text-base font-medium">
                Category <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              name="category"
              className="select select-bordered select-sm sm:select-md w-full"
              required
              disabled={user?.isBlocked}
            >
              <option value="">Select Category</option>
              <option value="Roads">Roads</option>
              <option value="Garbage">Garbage</option>
              <option value="Water">Water</option>
              <option value="Streetlights">Streetlights</option>
              <option value="Electricity">Electricity</option>
              <option value="Traffic">Traffic</option>
              <option value="Safety">Safety</option>
              <option value="Environment">Environment</option>
              <option value="Health">Health</option>
              <option value="Public Services">Public Services</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm sm:text-base font-medium">
                Image URL
              </span>
              <span className="label-text-alt text-xs">Optional</span>
            </label>
            <input
              name="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered input-sm sm:input-md w-full"
              disabled={user?.isBlocked}
            />
          </div>

          {/* Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm sm:text-base font-medium">
                Location <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              name="address"
              type="text"
              placeholder="Enter exact location or address"
              className="input input-bordered input-sm sm:input-md w-full"
              required
              disabled={user?.isBlocked}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="btn btn-primary btn-sm sm:btn-md w-full"
              disabled={user?.isBlocked || mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">Submit Issue</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;