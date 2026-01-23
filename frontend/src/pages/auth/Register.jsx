import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerApi } from "../../api/authService";

const Register = async() => {
     const [step, setStep] = useState(1);

     const [formData, setFormData] = useState({
          fullName: "",
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          password: "",
          confirmPassword: "",
     });

     const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateStep1 = () => {
  if (!formData.fullName.trim()) {
    alert("Full Name is required");
    return false;
  }
  if (!formData.email.trim()) {
    alert("Email is required");
    return false;
  }
  if (!isValidEmail(formData.email)) {
    alert("Please enter a valid email address");
    return false;
  }
  return true;
};

const validateStep2 = () => {
  if (!formData.firstName.trim()) {
    alert("First Name is required");
    return false;
  }
  if (!formData.lastName.trim()) {
    alert("Last Name is required");
    return false;
  }
  if (!formData.phone.trim()) {
    alert("Phone number is required");
    return false;
  }
  if (!formData.password) {
    alert("Password is required");
    return false;
  }
  if (formData.password.length < 6) {
    alert("Password must be at least 6 characters");
    return false;
  }
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return false;
  }
  return true;
};

     const nextStep = () => {
  if (step === 1 && !validateStep1()) return;
  if (step === 2 && !validateStep2()) return;

  if (step < 3) setStep(step + 1);
};

     const prevStep = () => {
          if (step > 1) setStep(step - 1);
     };

const navigate = useNavigate();

const [isSubmitting, setIsSubmitting] = useState(false);

if (isSubmitting) return;

setIsSubmitting(true);

try {
  await registerApi(payload);
  alert("Account created successfully. Please login.");
  navigate("/login");
} catch (error) {
  alert("Registration failed. Please try again.");
} finally {
  setIsSubmitting(false);
}


     return (
          <div className="font-display bg-neutral-50 min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-blue-500/5">
               <div className="w-full max-w-[640px] bg-white rounded-xl shadow-2xl p-8 md:p-12 flex flex-col gap-8">

                    {/* STEPPER */}
                    <div className="relative mb-10">

                         {/* LINE TRACK */}
                         <div className="absolute left-1/6 right-1/6 top-5 h-0.5 bg-slate-200 overflow-hidden rounded">
                              <div
                                   className="h-full bg-blue-600 transition-all duration-300"
                                   style={{
                                        width:
                                             step === 1 ? "0%" :
                                                  step === 2 ? "50%" :
                                                       "100%",
                                   }}
                              />
                         </div>

                         {/* STEPS */}
                         <div className="flex justify-between relative">
                              {[
                                   "Account Details",
                                   "Security Info",
                                   "Review & Create",
                              ].map((label, index) => {
                                   const num = index + 1;
                                   const active = step >= num;

                                   return (
                                        <div key={num} className="flex flex-col items-center w-1/3">
                                             <div
                                                  className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold border-2
    ${active
                                                            ? "bg-blue-600 text-white border-blue-600"
                                                            : "bg-white text-slate-400 border-slate-300"
                                                       }`}
                                             >
                                                  {num}
                                             </div>


                                             <span
                                                  className={`mt-2 text-sm text-center
              ${active
                                                            ? "text-blue-600 font-medium"
                                                            : "text-slate-400"
                                                       }`}
                                             >
                                                  {label}
                                             </span>
                                        </div>
                                   );
                              })}
                         </div>
                    </div>



                    {/* STEP 1 */}
                    {step === 1 && (
                         <>
                              <div className="text-center">
                                   <h1 className="text-3xl font-bold mb-2">Your Account Details</h1>
                                   <p className="text-slate-500">
                                        Let's start with the basics to set up your profile.
                                   </p>
                              </div>

                              <div className="flex flex-col gap-5">
                                   <input
                                        required
                                        className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={(e) =>
                                        setFormData({ ...formData, fullName: e.target.value })
                                        }
                                   />


                                   <input
                                        type="email"
                                        className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Work Email"
                                        value={formData.email}
                                        onChange={(e) =>
                                             setFormData({ ...formData, email: e.target.value })
                                        }
                                   />

                                   <button
                                        type="button"
                                        onClick={nextStep}
                                        className="mt-4 w-full rounded-lg bg-blue-600 py-3.5 text-base font-semibold text-white hover:bg-blue-700"
                                   >
                                        Next: Security Information
                                   </button>
                              </div>

                              {/* DIVIDER */}
                              <div className="relative flex items-center py-2">
                                   <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
                                   <span className="mx-4 text-sm text-slate-500">
                                        Or sign up with
                                   </span>
                                   <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
                              </div>

                              {/* GOOGLE SIGNUP */}
                              <button
                                   type="button"
                                   className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                              >
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
                                   Sign up with Google
                              </button>

                              {/* LOGIN LINK */}
                              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                                   Already have an account?{" "}
                                   <a
                                        href="/login"
                                        className="font-semibold text-blue-600 hover:text-blue-600-hover"
                                   >
                                        Log in
                                   </a>
                              </p>
                         </>

                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                         <>
                              <div className="text-center">
                                   <h1 className="text-3xl font-bold">Security Information</h1>
                                   <p className="text-slate-500">
                                        Secure your account with personal and password details.
                                   </p>
                              </div>

                              <div className="flex flex-col gap-5">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                             className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                             placeholder="First Name"
                                             onChange={(e) =>
                                                  setFormData({ ...formData, firstName: e.target.value })
                                             }
                                        />
                                        <input
                                             className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                             placeholder="Last Name"
                                             onChange={(e) =>
                                                  setFormData({ ...formData, lastName: e.target.value })
                                             }
                                        />
                                   </div>

                                   <input
                                        className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Phone Number"
                                        onChange={(e) =>
                                             setFormData({ ...formData, phone: e.target.value })
                                        }
                                   />

                                   <input
                                        type="password"
                                        className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Password"
                                        onChange={(e) =>
                                             setFormData({ ...formData, password: e.target.value })
                                        }
                                   />

                                   <input
                                        type="password"
                                        className="form-input rounded-lg px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Confirm Password"
                                        onChange={(e) =>
                                             setFormData({
                                                  ...formData,
                                                  confirmPassword: e.target.value,
                                             })
                                        }
                                   />

                                   <div className="flex gap-4 mt-4">
                                        <button
                                             type="button"
                                             onClick={prevStep}
                                             className="w-1/2 rounded-lg border border-slate-300 py-3 text-base font-medium hover:bg-slate-50"
                                        >
                                             Back
                                        </button>

                                        <button
                                             type="button"
                                             onClick={nextStep}
                                             className="w-1/2 rounded-lg bg-blue-600 py-3 text-base font-semibold text-white hover:bg-blue-700"
                                        >
                                             Next: Review
                                        </button>
                                   </div>

                              </div>
                         </>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                         <>
                              <div className="text-center">
                                   <h1 className="text-3xl font-bold">Review & Create Account</h1>
                                   <p className="text-slate-500">
                                        Please review your information before creating the account.
                                   </p>
                              </div>

                              <div className="bg-slate-50 rounded-lg p-6 flex flex-col gap-3 text-sm">
                                   <div><b>Full Name:</b> {formData.fullName}</div>
                                   <div><b>Email:</b> {formData.email}</div>
                                   <div><b>First Name:</b> {formData.firstName}</div>
                                   <div><b>Last Name:</b> {formData.lastName}</div>
                                   <div><b>Phone:</b> {formData.phone}</div>
                              </div>

                              <div className="flex gap-4 mt-6">
                                   <button
                                        type="button"
                                        onClick={prevStep}
                                        className="w-1/2 rounded-lg border border-slate-300 py-3 font-medium hover:bg-slate-50"
                                   >
                                        Back
                                   </button>

                                 <button
  className="w-1/2 bg-blue-600 text-white font-semibold py-3 rounded-lg"
  onClick={async () => {
    if (!validateStep1()) return;
    if (!validateStep2()) return;

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: "CUSTOMER",
      };

      await registerApi(payload);

      alert("Account created successfully. Please login.");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  }}
>
  Create Account
</button>


                              </div>

                         </>

                    )}

                    <footer className="fixed bottom-6 left-6 text-sm text-slate-400">
                         © 2023 Retail Shop Digitalization Platform
                    </footer>
               </div>
          </div>

     );
};

export default Register;
