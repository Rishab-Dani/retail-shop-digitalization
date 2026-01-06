import { useState, useEffect } from "react";

const Login = () => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [rememberMe, setRememberMe] = useState(false);
     const [showPassword, setShowPassword] = useState(false);

     useEffect(() => {
          const savedEmail = localStorage.getItem("rememberEmail");
          if (savedEmail) {
               setEmail(savedEmail);
               setRememberMe(true);
          }
     }, []);

     return (
          <div className="font-display bg-neutral-50  text-slate-900 min-h-screen flex flex-col ">
               <div className="relative flex min-h-screen w-full overflow-hidden">

                    {/* LEFT PANEL */}
                    <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-800 dark:to-slate-950">
                         <div className="absolute inset-0 opacity-40">
                              <svg className="h-full w-full" viewBox="0 0 120 120">
                                   <defs>
                                        <linearGradient id="g1">
                                             <stop offset="0%" stopColor="#3b4d66" stopOpacity="0.1" />
                                             <stop offset="50%" stopColor="#4e607b" stopOpacity="0.15" />
                                             <stop offset="100%" stopColor="#3b4d66" stopOpacity="0.1" />
                                        </linearGradient>
                                        <linearGradient id="g2">
                                             <stop offset="0%" stopColor="#5a6f8b" stopOpacity="0.08" />
                                             <stop offset="50%" stopColor="#6b809a" stopOpacity="0.12" />
                                             <stop offset="100%" stopColor="#5a6f8b" stopOpacity="0.08" />
                                        </linearGradient>
                                   </defs>
                                   <path d="M0 20 C 30 0, 70 40, 100 20 L100 0 L0 0 Z" fill="url(#g1)" />
                                   <path d="M0 40 C 25 60, 65 30, 95 50 L95 20 L0 20 Z" fill="url(#g2)" />
                                   <path d="M0 80 C 40 100, 80 70, 120 90 L120 60 L0 60 Z" fill="url(#g1)" />
                                   <path d="M0 100 C 35 120, 75 90, 110 110 L110 80 L0 80 Z" fill="url(#g2)" />
                              </svg>
                         </div>

                         <div className="relative flex items-center gap-2 z-10">
                              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                                   <span className="material-symbols-outlined text-white">storefront</span>
                              </div>
                              <span className="text-xl font-bold text-white">RetailFlow</span>
                         </div>

                         <div className="relative z-10 max-w-lg">
                              <blockquote className="text-2xl font-medium text-white mb-6">
                                   "This platform revolutionized how we manage our inventory. We've seen a 40% increase in efficiency since switching."
                              </blockquote>

                              <div className="flex items-center gap-4">
                                   <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white">person</span>
                                   </div>
                                   <div>
                                        <p className="text-white font-semibold">Ravi Rishab</p>
                                        <p className="text-blue-100 text-sm">
                                             Frontend Developer, Backend Developer
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-24 dark:bg-slate-900 bg-white">
                         <div className="w-full max-w-[440px] flex flex-col gap-8">

                              <div>
                                   <h1 className="text-3xl font-bold mb-2">Sign In to RetailFlow</h1>
                                   <p className="text-sm text-slate-400">
                                        Please enter your details to access the dashboard.
                                   </p>
                              </div>

                              {/* OAuth */}
                              <div className="grid grid-cols-2 gap-4">
                                   <button className="flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 dark:border-input-border-dark rounded-lg hover:bg-slate-50 transition-colors bg-white">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                                             <path
                                                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                  fill="#4285F4"
                                             />
                                             <path
                                                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                  fill="#34A853"
                                             />
                                             <path
                                                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"
                                                  fill="#FBBC05"
                                             />
                                             <path
                                                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                  fill="#EA4335"
                                             />
                                        </svg>

                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                             Google
                                        </span>
                                   </button>

                                   <button className="flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 dark:border-input-border-dark rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-800">
                                        <svg
                                             className="h-5 w-5 fill-[#1877F2]"
                                             viewBox="0 0 24 24"
                                        >
                                             <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>

                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                             Facebook
                                        </span>
                                   </button>
                              </div>



                              {/* Divider */}
                              <div className="relative">
                                   <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-300"></div>
                                   </div>
                                   <div className="relative flex justify-center text-xs">
                                        <span className="bg-white px-4 text-slate-400">
                                             Or sign in with email
                                        </span>
                                   </div>
                              </div>

                              {/* Form */}
                              <form
                                   className="flex flex-col gap-5"
                                   onSubmit={(e) => {
                                        e.preventDefault();

                                        if (rememberMe) {
                                             localStorage.setItem("rememberEmail", email);
                                        } else {
                                             localStorage.removeItem("rememberEmail");
                                        }

                                        // TODO: Call backend login API here
                                        console.log("Login submitted", { email, password, rememberMe });
                                   }}
                              >

                                   <div className="flex flex-col gap-1.5">
                                        <label className="text-slate-900 dark:text-white text-xs font-medium">
                                             Email
                                        </label>

                                        <div className="relative">
                                             <input
                                                  type="email"
                                                  value={email}
                                                  onChange={(e) => setEmail(e.target.value)}
                                                  placeholder="name@company.com"
                                                  className="form-input block w-full rounded-lg h-11 px-3.5 pr-10 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                             />


                                             {/* Email Icon */}
                                             <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                                                  mail
                                             </span>
                                        </div>
                                   </div>


                                   <div className="flex flex-col gap-1.5">
                                        <label className="text-slate-900 dark:text-white text-xs font-medium">
                                             Password
                                        </label>

                                        <div className="relative">
                                             <input
                                                  type={showPassword ? "text" : "password"}
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                                  placeholder="••••••••"
                                                  className="form-input block w-full rounded-lg h-11 px-3.5 pr-10 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                             />


                                             {/* Eye Toggle Button */}
                                             <button
                                                  type="button"
                                                  onClick={() => setShowPassword(!showPassword)}
                                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                             >
                                                  <span className="material-symbols-outlined text-[18px]">
                                                       {showPassword ? "visibility" : "visibility_off"}
                                                  </span>
                                             </button>
                                        </div>
                                   </div>


                                   <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                             <input
                                                  type="checkbox"
                                                  checked={rememberMe}
                                                  onChange={(e) => setRememberMe(e.target.checked)}
                                                  className="h-4 w-4 rounded border-input-border-light text-primary"
                                             />
                                             <label className="text-xs font-medium text-slate-600">
                                                  Remember for 30 days
                                             </label>
                                        </div>

                                        <a
                                             href="/forgot-password"
                                             className="text-xs text-blue-600 font-semibold cursor-pointer"
                                        >
                                             Forgot password?
                                        </a>

                                   </div>




                                   <button className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                                        <a
                                             href="/customer/productlist" 
                                        >
                                             Sign In
                                        </a>
                                   </button>
                              </form>

                              <div className="text-center text-sm">
                                   Don&apos;t have an account?{" "}
                                   <a href="/register" className="text-blue-600 font-semibold cursor-pointer">
                                        Create account
                                   </a>
                              </div>

                              <div className="flex justify-center gap-4 text-xs text-slate-400">
                                   <span>Privacy Policy</span>
                                   <span>•</span>
                                   <span>Terms of Service</span>
                              </div>

                         </div>
                    </div>

               </div>
          </div>
     );
};

export default Login;
