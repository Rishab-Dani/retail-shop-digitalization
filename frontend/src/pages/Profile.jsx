import { useState } from "react";

import {
     FiCamera,
     FiShare2,
     FiEdit2,
     FiMail,
     FiLock,
     FiUser,
     FiCheckCircle,
     FiAlertTriangle,
     FiChevronRight,
     FiInfo,
} from "react-icons/fi";

const Profile = () => {
     const [activeSection, setActiveSection] = useState("general");
     const [avatar, setAvatar] = useState(null);

const Input = ({ label, value, className = "" }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      defaultValue={value}
      className={`w-full mt-1 p-2 rounded-lg border ${className}`}
    />
  </div>
);

     return (
          <div className="p-6  min-h-screen">
               <div className="max-w-6xl mx-auto space-y-6">

                    {/* ================= PROFILE HEADER ================= */}
                    <div className="relative rounded-xl border border-slate-300 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100 p-6 flex items-center justify-between">
                         <div className="flex items-center gap-6">
                              <div className="relative">
                                   <input
                                        type="file"
                                        accept="image/*"
                                        id="avatarUpload"
                                        className="hidden"
                                        onChange={(e) => {
  const file = e.target.files?.[0];
  if (file) setAvatar(URL.createObjectURL(file));
}}

                                   />

                                   <label htmlFor="avatarUpload" className="cursor-pointer">
                                        <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white overflow-hidden">
                                             {avatar && (
                                                  <img
                                                       src={avatar}
                                                       alt="avatar"
                                                       className="w-full h-full object-cover"
                                                  />
                                             )}
                                        </div>

                                        <span className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full shadow">
                                             <FiCamera size={14} />
                                        </span>
                                   </label>
                              </div>


                              <div>
                                   <h2 className="text-xl font-bold">Alex Johnson</h2>
                                   <p className="text-sm text-slate-500">Store Manager</p>
                                   <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                                        <span>📍 New York Branch</span>
                                        <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                                             Active
                                        </span>
                                   </div>
                              </div>
                         </div>

                         <div className="flex gap-3">
                              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 shadow-sm  rounded-lg text-sm">
                                   <FiShare2 /> Share
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                                   <FiEdit2 /> Edit Profile
                              </button>
                         </div>
                    </div>

                    {/* ================= MAIN GRID ================= */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                         {/* ================= LEFT COLUMN ================= */}
                         <div className="space-y-6">

                              {/* Profile Completion */}
                              <div className="bg-white border border-slate-300 shadow-sm rounded-xl p-5">
                                   <h3 className="font-semibold mb-3">Profile Completion</h3>

                                   <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full w-[85%] bg-blue-600 rounded-full" />
                                   </div>
                                   <p className="text-sm text-right text-slate-500 mt-1">
                                        85% Complete
                                   </p>

                                   <div className="mt-4 space-y-3">
                                        <div className="flex items-center gap-3 bg-green-50 border border-green-100 p-3 rounded-lg">
                                             <FiCheckCircle className="text-green-600" />
                                             <span className="text-sm font-medium text-green-700">
                                                  Email Verified
                                             </span>
                                        </div>

                                        <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 p-3 rounded-lg">
                                             <FiAlertTriangle className="text-amber-600" />
                                             <div>
                                                  <p className="text-sm font-medium text-amber-700">
                                                       2FA Setup Pending
                                                  </p>
                                                  <button className="text-xs text-amber-700 underline">
                                                       Setup now
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* Account Settings */}
                              <div className="bg-white border border-slate-300 shadow-sm rounded-xl overflow-hidden">
                                   <div className="px-4 py-3 border-b border-slate-300 font-semibold text-sm">
                                        ACCOUNT SETTINGS
                                   </div>

                                   {[
                                        { id: "general", label: "General Info" },
                                        { id: "notifications", label: "Notifications" },
                                        { id: "billing", label: "Billing & Plan" },
                                        { id: "api", label: "API Keys" },
                                   ].map((item) => (
                                        <button
                                             key={item.id}
                                             onClick={() => setActiveSection(item.id)}
                                             className={`w-full flex items-center justify-between px-4 py-3 text-sm transition
        ${activeSection === item.id
                                                       ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                                                       : "text-slate-600 hover:bg-slate-50"
                                                  }`}
                                        >
                                             {item.label}
                                             <FiChevronRight className="text-slate-400" />
                                        </button>
                                   ))}</div>
                         </div>



                         {/* ================= RIGHT COLUMN ================= */}
                         <div className="lg:col-span-2 space-y-6">

                              {activeSection === "general" && (
                                   <>
                                        {/* Personal Information */}
                                        <div className="bg-white border border-slate-300 shadow-sm rounded-xl overflow-hidden">
                                             <div className="px-6 py-4 border-b border-slate-300 flex justify-between items-center">
                                                  <h3 className="font-semibold">Personal Information</h3>
                                                  <FiUser className="text-slate-400" />
                                             </div>

                                             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Input label="First Name" value="Alex" className="border-slate-300" />
                                               <Input label="Last Name" value="Johnson" className="border-slate-300" />


                                                  <div className="md:col-span-2">
                                                       <label className="text-sm font-medium">Email Address</label>
                                                       <div className="relative">
                                                            <FiMail className="absolute left-3 top-3 text-slate-400" />
                                                            <input
                                                                 className="w-full pl-10 p-2 border border-slate-300 rounded-lg"
                                                                 defaultValue="alex.j@retailshop.com"
                                                            />
                                                       </div>
                                                  </div>

                                                  <Input label="Phone Number" value="+1 (555) 123-4567" className="border-slate-300" />
                                                  <Input label="Role" value="Store Manager" className="border-slate-300"/>

                                                  <div className="md:col-span-2">
                                                       <label className="text-sm font-medium">Bio</label>
                                                       <textarea
                                                            className="w-full p-3 border border-slate-300 rounded-lg resize-none"
                                                            rows={4}
                                                            defaultValue="Managing the New York branch with a focus on customer satisfaction and inventory efficiency."
                                                       />
                                                  </div>
                                             </div>

                                             <div className="px-6 py-4 bg-slate-50 border-t border-slate-300 flex justify-end gap-3">
                                                  <button className="px-4 py-2 border border-slate-300 shadow-sm rounded-lg text-sm">
                                                       Cancel
                                                  </button>
                                                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                                                       Save Changes
                                                  </button>
                                             </div>
                                        </div>

                                        {/* Sign-in Method */}
                                        <div className="bg-white border border-slate-300 shadow-sm rounded-xl overflow-hidden">
                                             <div className="px-6 py-4 border-b border-slate-300 flex justify-between items-center">
                                                  <h3 className="font-semibold">Sign-in Method</h3>
                                                  <FiLock className="text-slate-400" />
                                             </div>

                                             <div className="p-6 space-y-4">
                                                  <Input label="Current Password" type="password"  className="border-slate-300"/>
                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                       <Input label="New Password" type="password" className="border-slate-300"/>
                                                       <Input label="Confirm New Password" type="password" className="border-slate-300" />
                                                  </div>

                                                  <div className="flex gap-3 bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm">
                                                       <FiInfo className="text-blue-600 mt-1" />
                                                       <ul className="list-disc ml-4 text-slate-600">
                                                            <li>Minimum 8 characters</li>
                                                            <li>At least one lowercase character</li>
                                                            <li>At least one number or symbol</li>
                                                       </ul>
                                                  </div>
                                             </div>

                                             <div className="px-6 py-4  bg-slate-50 border-t border-slate-300 flex justify-end gap-3 ">
                                                  <button className="px-4 py-2 border border-slate-300 shadow-sm rounded-lg text-sm">
                                                       Cancel
                                                  </button>
                                                  <button className="px-4 py-2 border border-slate-300 bg-blue-600 shadow-sm rounded-lg text-sm text-white">
                                                       Update Password
                                                  </button>
                                             </div>
                                        </div>
                                   </>
                              )}

                              {activeSection === "notifications" && <Notifications />}
                              {activeSection === "billing" && <Billing />}
                              {activeSection === "api" && <ApiKeys />}

                         </div>




                         <p className="text-center text-xs text-slate-400 pt-6">
                              © 2026 RetailOS Platform. All rights reserved.
                         </p>

                    </div>
               </div>
          </div>
     );
};

export default Profile;

/* ===== REUSABLE INPUT ===== */
const Input = ({ label, value, type = "text", disabled }) => (
     <div>
          <label className="text-sm font-medium">{label}</label>
          <input
               type={type}
               defaultValue={value}
               disabled={disabled}
               className={`w-full mt-1 p-2 border rounded-lg ${disabled ? "bg-slate-100 text-slate-400" : ""
                    }`}
          />
     </div>
);

const Notifications = () => (
     <div className="bg-white border border-slate-300 shadow-sm rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">Notifications</h3>

          <ToggleRow label="Email Alerts" />
          <ToggleRow label="Order Updates" />
          <ToggleRow label="Weekly Summary" />
     </div>
);

const Billing = () => (
     <div className="bg-white border border-slate-300 shadow-sm rounded-xl p-6 space-y-3">
          <h3 className="font-semibold">Billing & Plan</h3>
          <p className="text-sm text-slate-500">
               You are currently on <b>Pro Plan</b>
          </p>
          <button className="px-4 py-2 border border-slate-300 shadow-sm rounded-lg text-sm">
               Manage Subscription
          </button>
     </div>
);

const ApiKeys = () => (
     <div className="bg-white border border-slate-300 shadow-sm rounded-xl p-6 space-y-3">
          <h3 className="font-semibold">API Keys</h3>
          <p className="text-sm text-slate-500">
               Generate and manage your API keys.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
               Generate New Key
          </button>
     </div>
);

const ToggleRow = ({ label }) => (
     <div className="flex justify-between items-center">
          <span className="text-sm">{label}</span>
          <input type="checkbox" className="w-4 h-4" />
     </div>
);
