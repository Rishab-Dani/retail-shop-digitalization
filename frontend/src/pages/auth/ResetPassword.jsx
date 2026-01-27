// import { useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { resetPasswordApi } from "../../api/authService";


// const [params] = useSearchParams();
// const token = params.get("token");
// const navigate = useNavigate();
// const [error, setError] = useState("");

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [success, setSuccess] = useState(false);

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   if (password !== confirm) {
//   //     alert("Passwords do not match");
//   //     return;
//   //   }

//   //   // later → API call with token
//   //   setSuccess(true);
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");

//   if (!token) {
//     setError("Invalid or missing reset token");
//     return;
//   }

//   if (password !== confirm) {
//     setError("Passwords do not match");
//     return;
//   }

//   try {
//     await resetPasswordApi(token, password);
//     setSuccess(true);
//   } catch (err) {
//     setError(
//       err.response?.data?.message || "Reset link expired or invalid"
//     );
//   }
// };


//   return (
//     <div className="font-display bg-neutral-50 min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-blue-500/5">

//       {/* CARD */}
//       <div className="w-full max-w-[420px] bg-white rounded-xl shadow-xl p-8 flex flex-col gap-6">

//         {success ? (
//           <>
//             {/* SUCCESS */}
//             <div className="flex justify-center">
//               <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
//                 <span className="material-symbols-outlined text-green-600 text-3xl">
//                   check_circle
//                 </span>
//               </div>
//             </div>

//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-slate-900">
//                 Password reset successful
//               </h1>
//               <p className="text-slate-500 mt-2 text-sm">
//                 You can now log in with your new password.
//               </p>
//             </div>

//             <a
//               href="/login"
//               className="w-full text-center rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
//             >
//               Back to login
//             </a>
//           </>
//         ) : (
//           <>
//             {/* ICON */}
//             <div className="flex justify-center">
//               <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
//                 <span className="material-symbols-outlined text-blue-600 text-3xl">
//                   lock
//                 </span>
//               </div>
//             </div>

//             {/* TITLE */}
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-slate-900">
//                 Reset your password
//               </h1>
//               <p className="text-slate-500 mt-1 text-sm">
//                 Enter a new password below.
//               </p>
//             </div>

//             {/* FORM */}
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <input
//                 type="password"
//                 placeholder="New password"
//                 className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />

//               <input
//                 type="password"
//                 placeholder="Confirm password"
//                 className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                 value={confirm}
//                 onChange={(e) => setConfirm(e.target.value)}
//                 required
//               />

//               {error && (
//   <p className="text-sm text-red-500 text-center">{error}</p>
// )}


//               <button
//                 type="submit"
//                 className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
//               >
//                 Reset password
//               </button>
//             </form>

//             {/* BACK */}
//             <div className="text-center">
//               <a
//                 href="/login"
//                 className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
//               >
//                 Back to login
//               </a>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;


import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../../api/authService";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPasswordApi(token, password);
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Reset link expired or invalid"
      );
    }
  };

  return (
    <div className="font-display bg-neutral-50 min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-blue-500/5">
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-xl p-8 flex flex-col gap-6">

        {success ? (
          <>
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-3xl">
                  check_circle
                </span>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">
                Password reset successful
              </h1>
              <p className="text-slate-500 mt-2 text-sm">
                You can now log in with your new password.
              </p>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Back to login
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600 text-3xl">
                  lock
                </span>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">
                Reset your password
              </h1>
              <p className="text-slate-500 mt-1 text-sm">
                Enter a new password below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="New password"
                className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Confirm password"
                className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Reset password
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Back to login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;



