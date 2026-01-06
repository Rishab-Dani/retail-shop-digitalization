import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // later API call
    setSent(true);
  };

  return (
    <div className="font-display bg-neutral-50 min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-blue-500/5">
      
      {/* LOGO */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
          <span className="material-symbols-outlined">storefront</span>
        </div>
        <span className="text-xl font-bold text-slate-900">RetailFlow</span>
      </div>

      {/* CARD */}
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-xl p-8 flex flex-col gap-6">

        {/* ========== SUCCESS SCREEN ========== */}
        {sent ? (
          <>
            {/* ICON */}
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-3xl">
                  mark_email_read
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">
                Check your email
              </h1>
              <p className="text-slate-500 mt-2 text-sm">
                We sent a password reset link to
              </p>
              <p className="font-medium text-slate-900 mt-1">
                {email}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-3 mt-2">
              <a
                href="/login"
                className="w-full text-center rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Back to login
              </a>

              <button
                onClick={() => setSent(false)}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                Didn’t receive the email? Try again
              </button>
            </div>
          </>
        ) : (
          <>
            {/* ========== FORM SCREEN ========== */}

             {/* ICON */}
        <div className="flex justify-center">
           <div className="h-18 w-18 rounded-full bg-blue-50 flex items-center justify-center">
            <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center">
             <span className="material-symbols-outlined text-blue-600 text-9xl">
               lock_reset
            </span>
            </div>
          </div>
        </div>

            {/* TITLE */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-3">
                Forgot password?
              </h1>
              <p className="text-slate-500 mt-1 text-sm">
                No worries, we&apos;ll send you reset instructions.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Reset password
              </button>
            </form>

            {/* BACK */}
            <div className="text-center mt-2">
              <a
                href="/login"
                className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                <span className="material-symbols-outlined text-base">
                  arrow_back
                </span>
                Back to log in
              </a>
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      <p className="mt-8 text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-blue-600 font-medium hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default ForgotPassword;

