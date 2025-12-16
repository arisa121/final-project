import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch All Users
  const { data: users, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/users");
      return res.data;
    },
  });

  // Block/Unblock Mutation
  const blockUserMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/api/admin/users/${userId}/block`);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["all-users"]);
      Swal.fire({
        icon: "success",
        title: data.user.isBlocked ? "User Blocked!" : "User Unblocked!",
        text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to update user status.",
      });
    },
  });

  // Handle Block/Unblock
  const handleBlockUnblock = (user) => {
    Swal.fire({
      title: user.isBlocked ? "Unblock User?" : "Block User?",
      text: user.isBlocked
        ? `${user.name} will be able to use the platform again.`
        : `${user.name} will not be able to submit or upvote issues.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: user.isBlocked ? "#3085d6" : "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: user.isBlocked ? "Yes, Unblock" : "Yes, Block",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        blockUserMutation.mutate(user._id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Filter users by search
  const filteredUsers = users?.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
          <p className="text-gray-600">View and manage citizen accounts</p>
        </div>
        <div className="badge badge-lg badge-primary">
          Total Users: {users?.length || 0}
        </div>
      </div>

      {/* Search Bar */}
      <div className="card bg-white shadow-lg">
        <div className="card-body">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="input input-bordered flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card bg-white shadow-lg">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-gray-50">
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Subscription</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers?.map((user) => (
                    <tr key={user._id} className="hover">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-2">
                              <img
                                src={
                                  user.photo
                                 
                                }
                                alt={user.name}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{user.name}</div>
                            <div className="text-sm text-gray-500">
                              ID: {user._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">{user.email}</div>
                      </td>
                      <td>
                        {user.isPremium ? (
                          <div className="flex items-center gap-2">
                            <span className="badge badge-warning gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                className="w-4 h-4"
                              >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                              </svg>
                              Premium
                            </span>
                            <span className="text-xs text-gray-500">
                              1000 TK
                            </span>
                          </div>
                        ) : (
                          <span className="badge badge-ghost">Free</span>
                        )}
                      </td>
                      <td>
                        {user.isBlocked ? (
                          <span className="badge badge-error gap-2">
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
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                              />
                            </svg>
                            Blocked
                          </span>
                        ) : (
                          <span className="badge badge-success gap-2">
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Active
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleBlockUnblock(user)}
                          className={`btn btn-sm ${
                            user.isBlocked ? "btn-success" : "btn-error"
                          }`}
                          disabled={blockUserMutation.isPending}
                        >
                          {blockUserMutation.isPending ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : user.isBlocked ? (
                            <>
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
                                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                />
                              </svg>
                              Unblock
                            </>
                          ) : (
                            <>
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
                                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                />
                              </svg>
                              Block
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-sm opacity-90">Total Users</h3>
            <p className="text-4xl font-bold">{users?.length || 0}</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-sm opacity-90">Premium Users</h3>
            <p className="text-4xl font-bold">
              {users?.filter((u) => u.isPremium).length || 0}
            </p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-sm opacity-90">Blocked Users</h3>
            <p className="text-4xl font-bold">
              {users?.filter((u) => u.isBlocked).length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
