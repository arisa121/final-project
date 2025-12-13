// import { toast } from "react-toastify";
// import axiosSecure from "../../api/axiosSecure";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";


// const ReportIssue = () => {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [category, setCategory] = useState("Road");
//     const [imageFile, setImageFile] = useState(null);
//     const [location, setLocation] = useState("");

//     const qc = useQueryClient();

//     const uploadImageToCloudinary = async (file) => {
//       if (!file) return null;
//       const form = new FormData();
//       form.append("file", file);
//       form.append(
//         "upload_preset",
//         import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
//       );
//       const url = `https://api.cloudinary.com/v1_1/${
//         import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
//       }/image/upload`;
//       const res = await fetch(url, { method: "POST", body: form });
//       const data = await res.json();
//       if (!data.secure_url) throw new Error("Image upload failed");
//       return data.secure_url;
//     };

//     const mutation = useMutation({
//       mutationFn: async (payload) => {
//         const res = await axiosSecure.post("/issues", payload);
//         return res.data;
//       },
//       onSuccess: () => {
//         toast.success("Issue reported");
//         qc.invalidateQueries(["my-issues"]);
//         setTitle("");
//         setDescription("");
//         setCategory("Road");
//         setImageFile(null);
//         setLocation("");
//       },
//       onError: (err) => {
//         toast.error(err?.response?.data?.message || "Failed");
//       },
//     });

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         toast.loading("Uploading...");
//         const imageUrl = imageFile
//           ? await uploadImageToCloudinary(imageFile)
//           : null;
//         toast.dismiss();
//         mutation.mutate({
//           title,
//           description,
//           category,
//           image: imageUrl,
//           location,
//         });
//       } catch (err) {
//         console.log(err);
//         toast.dismiss();
//         toast.error("Image upload failed");
//       }
//     };


//     return (
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Report New Issue</h2>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4 bg-white p-6 rounded shadow"
//         >
//           <input
//             className="input w-full"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <select
//             className="select w-full"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option>Road</option>
//             <option>Streetlight</option>
//             <option>Drainage</option>
//             <option>Garbage</option>
//             <option>Footpath</option>
//           </select>

//           <textarea
//             className="textarea w-full"
//             rows="5"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />

//           <input
//             type="text"
//             className="input w-full"
//             placeholder="Location (address)"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Photo (optional)
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImageFile(e.target.files[0])}
//             />
//           </div>

//           <div className="flex gap-3">
//             <button type="submit" className="btn btn-primary">
//               Submit Issue
//             </button>
//             <button
//               type="button"
//               className="btn btn-ghost"
//               onClick={() => {
//                 setTitle("");
//                 setDescription("");
//                 setCategory("Road");
//                 setImageFile(null);
//                 setLocation("");
//               }}
//             >
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>
//     );
// };

// export default ReportIssue;


// src/dashboards/citizen/ReportIssue.jsx
// import React, { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import axiosSecure from "../../api/axiosSecure";
// import { useNavigate } from "react-router";

// const ReportIssue = () => {
//   const qc = useQueryClient();
//   const navigate = useNavigate();
//   const { data: userStats } = useQuery({ queryKey: ["user-data"], queryFn: async ()=> (await axiosSecure.get("/auth/me")).data });
//   // userStats should contain isPremium and totalIssuesCount

//   const [form, setForm] = useState({ title:"", description:"", category:"road", location:"" });
//   const [image, setImage] = useState(null);
//   const create = useMutation({
//     mutationFn: async (payload) => {
//       const fd = new FormData();
//       Object.keys(payload).forEach(k => fd.append(k, payload[k]));
//       const res = await axiosSecure.post("/issues", fd, { headers: { "Content-Type": "multipart/form-data" }});
//       return res.data;
//     },
//     onSuccess: () => {
//       qc.invalidateQueries(["my-issues"]);
//       navigate("/dashboard/my-issues");
//     }
//   });

//   // User limit enforcement
//   const isBlocked = userStats?.isBlocked;
//   const isPremium = userStats?.isPremium;
//   const userIssueCount = userStats?.issueCount || 0;
//   const reachedLimit = !isPremium && userIssueCount >= 3;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isBlocked) return alert("Your account is blocked.");
//     if (reachedLimit) return alert("Free plan limit reached. Subscribe to continue.");
//     const payload = { ...form };
//     if (image) payload.image = image;
//     create.mutate(payload);
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Report New Issue</h2>
//       <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-lg">
//         <input required value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="input w-full mb-2" placeholder="Title" />
//         <textarea required value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="input w-full mb-2" placeholder="Description" rows={4} />
//         <select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className="input w-full mb-2">
//           <option value="road">Road</option><option value="water">Water</option><option value="electricity">Electricity</option><option value="garbage">Garbage</option><option value="other">Other</option>
//         </select>
//         <input value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} className="input w-full mb-2" placeholder="Location (address or coords)" />
//         <input type="file" onChange={e=>setImage(e.target.files[0])} className="mb-2" />
//         {reachedLimit && (
//           <div className="p-2 bg-yellow-100 mb-2 rounded">
//             Free plan limit reached. <button type="button" className="underline" onClick={()=>navigate("/dashboard/profile")}>Subscribe Now</button>
//           </div>
//         )}
//         <div className="flex justify-end gap-2">
//           <button type="submit" disabled={reachedLimit || isBlocked} className={`btn ${ (reachedLimit || isBlocked) ? "opacity-50 cursor-not-allowed" : "" }`}>Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ReportIssue;
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import axiosSecure from "../../api/axiosSecure";

const ReportIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      return axiosSecure.post("/api/issues", data);
    },
    onSuccess: () => navigate("/dashboard/my-issues"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const newIssue = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      image: form.image.value,
      location: form.location.value,
    };

    mutation.mutate(newIssue);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Report New Issue</h2>

      {user.isBlocked && (
        <p className="p-3 bg-red-200 text-red-700 rounded mb-4">
          You are blocked. Cannot report issues.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          type="text"
          placeholder="Issue Title"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Issue Description"
          className="textarea textarea-bordered w-full"
          required
        />

        <select
          name="category"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="Road">Road</option>
          <option value="Garbage">Garbage</option>
          <option value="Water">Water</option>
          <option value="Water">Others</option>
        </select>

        <input
          name="image"
          type="text"
          placeholder="Image URL"
          className="input input-bordered w-full"
        />

        <input
          name="location"
          type="text"
          placeholder="Location"
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full">Submit Issue</button>
      </form>
    </div>
  );
};

export default ReportIssue;
