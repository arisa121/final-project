import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";

const ManageStaff = () => {
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    password: "",
  });

  // Fetch All Staff
  const { data: staffList, isLoading } = useQuery({
    queryKey: ["all-staff"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/staff");
      return res.data;
    },
  });

  // Create Staff Mutation
  const createStaffMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/api/admin/staff", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-staff"]);
      setShowAddModal(false);
      resetForm();
      Swal.fire({
        icon: "success",
        title: "Staff Created!",
        text: "New staff member has been added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to create staff.",
      });
    },
  });

  // Update Staff Mutation
  const updateStaffMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosSecure.put(`/api/admin/staff/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-staff"]);
      setShowEditModal(false);
      setEditingStaff(null);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Staff information has been updated.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to update staff.",
      });
    },
  });

  // Delete Staff Mutation
  const deleteStaffMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/api/admin/staff/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-staff"]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Staff member has been removed.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete staff.",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      photo: "",
      password: "",
    });
  };

  const handleAddStaff = () => {
    if (!formData.name || !formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Name, email, and password are required!",
      });
      return;
    }

    createStaffMutation.mutate(formData);
  };

  const handleEditClick = (staff) => {
    setEditingStaff(staff);
    setShowEditModal(true);
  };

  const handleUpdateStaff = () => {
    if (!editingStaff.name || !editingStaff.email) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Name and email are required!",
      });
      return;
    }

    updateStaffMutation.mutate({
      id: editingStaff._id,
      data: editingStaff,
    });
  };

  const handleDeleteStaff = (staff) => {
    Swal.fire({
      title: "Delete Staff?",
      html: `
        <p>Are you sure you want to delete <strong>${staff.name}</strong>?</p>
        <p class="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStaffMutation.mutate(staff._id);
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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Manage Staff
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Add, update, or remove staff members
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm sm:btn-md gap-2 w-full sm:w-auto"
        >
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
          Add Staff
        </button>
      </div>

      {/* Staff Table */}
      <div className="card bg-white shadow-lg">
        <div className="card-body p-0">
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <table className="table table-xs sm:table-sm md:table-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-xs sm:text-sm">Staff Member</th>
                  <th className="text-xs sm:text-sm hidden md:table-cell">
                    Email
                  </th>
                  <th className="text-xs sm:text-sm hidden lg:table-cell">
                    Phone
                  </th>
                  <th className="text-xs sm:text-sm hidden lg:table-cell">
                    Joined
                  </th>
                  <th className="text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 sm:py-8 text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <p className="text-base sm:text-lg font-semibold">
                          No staff members yet
                        </p>
                        <p className="text-xs sm:text-sm">
                          Click "Add Staff" to create a new staff account
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  staffList?.map((staff) => (
                    <tr key={staff._id} className="hover">
                      <td>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="avatar">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full ring ring-green-500 ring-offset-2">
                              <img src={staff.photo} alt={staff.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm md:text-base">
                              {staff.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 md:hidden">
                              {staff.email}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <span className="badge badge-success badge-xs"></span>
                              Staff
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell">
                        <div className="text-xs sm:text-sm break-all">
                          {staff.email}
                        </div>
                      </td>
                      <td className="hidden lg:table-cell">
                        <div className="text-xs sm:text-sm">
                          {staff.phone || (
                            <span className="text-gray-400">{staff.phone}</span>
                          )}
                        </div>
                      </td>
                      <td className="hidden lg:table-cell">
                        <div className="text-xs sm:text-sm text-gray-600">
                          {new Date(staff.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <button
                            onClick={() => handleEditClick(staff)}
                            className="btn btn-xs sm:btn-sm btn-warning"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-4 sm:w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteStaff(staff)}
                            className="btn btn-xs sm:btn-sm btn-error"
                            disabled={deleteStaffMutation.isPending}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-4 sm:w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs sm:text-sm">
                Total Staff Members
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {staffList?.length || 0}
              </h2>
            </div>
            <div className="bg-white/20 p-3 sm:p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <dialog open className="modal" onClick={() => setShowAddModal(false)}>
          <div
            className="modal-box max-w-full sm:max-w-lg md:max-w-2xl mx-3 sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
              Add New Staff
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-xs sm:text-sm">
                    Name *
                  </span>
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="input input-bordered input-sm sm:input-md"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-xs sm:text-sm">
                    Email *
                  </span>
                </label>
                <br />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered input-sm sm:input-md"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-xs sm:text-sm">
                    Password *
                  </span>
                </label>
                <br />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="input input-bordered input-sm sm:input-md"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-xs sm:text-sm">
                    Phone
                  </span>
                </label>
                <br />
                <input
                  type="tel"
                  placeholder="+880 1234567890"
                  className="input input-bordered input-sm sm:input-md"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-xs sm:text-sm">
                    Photo URL
                  </span>
                </label>
                <br />
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered input-sm sm:input-md"
                  value={formData.photo}
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.value })
                  }
                />
              </div>

              <div className="modal-action flex-col sm:flex-row gap-2">
                <button
                  className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto"
                  onClick={handleAddStaff}
                  disabled={createStaffMutation.isPending}
                >
                  {createStaffMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Staff"
                  )}
                </button>
                <button
                  className="btn btn-ghost btn-sm sm:btn-md w-full sm:w-auto"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  disabled={createStaffMutation.isPending}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}

      {/* Edit Staff Modal */}
      {showEditModal && editingStaff && (
        <dialog open className="modal" onClick={() => setShowEditModal(false)}>
          <div
            className="modal-box max-w-full sm:max-w-lg md:max-w-2xl mx-3 sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
              Edit Staff
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-xs sm:text-sm">
                    Name *
                  </span>
                </label>
                <br />
                <input
                  type="text"
                  className="input input-bordered input-sm sm:input-md"
                  value={editingStaff.name}
                  onChange={(e) =>
                    setEditingStaff({ ...editingStaff, name: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-xs sm:text-sm">
                    Email *
                  </span>
                </label>
                <br />
                <input
                  type="email"
                  className="input input-bordered input-sm sm:input-md"
                  value={editingStaff.email}
                  onChange={(e) =>
                    setEditingStaff({ ...editingStaff, email: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-xs sm:text-sm">
                    Phone
                  </span>
                </label>
                <br />
                <input
                  type="tel"
                  className="input input-bordered input-sm sm:input-md"
                  value={editingStaff.phone || ""}
                  onChange={(e) =>
                    setEditingStaff({ ...editingStaff, phone: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-xs sm:text-sm">
                    Photo URL
                  </span>
                </label>
                <br />
                <input
                  type="url"
                  className="input input-bordered input-sm sm:input-md"
                  value={editingStaff.photo || ""}
                  onChange={(e) =>
                    setEditingStaff({ ...editingStaff, photo: e.target.value })
                  }
                />
              </div>

              <div className="modal-action flex-col sm:flex-row gap-2">
                <button
                  className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto"
                  onClick={handleUpdateStaff}
                  disabled={updateStaffMutation.isPending}
                >
                  {updateStaffMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating...
                    </>
                  ) : (
                    "Update Staff"
                  )}
                </button>
                <button
                  className="btn btn-ghost btn-sm sm:btn-md w-full sm:w-auto"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingStaff(null);
                  }}
                  disabled={updateStaffMutation.isPending}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageStaff;