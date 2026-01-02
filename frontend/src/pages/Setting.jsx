import { useState } from "react";

const Settings = () => {

  const [activeTab, setActiveTab] = useState("General");
  const tabs = ["General", "Notifications", "Security", "Billing", "Integrations"];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-sm text-slate-500">
              Manage your store details and preferences.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm border border-slate-200 shadow-sm rounded-lg bg-white">
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg">
              Save Changes
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="border-b border-slate-300 mb-6">
          <div className="flex gap-6 text-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-medium transition ${activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TAB CONTENT */}
        {activeTab === "General" && <GeneralTab />}
        {activeTab === "Notifications" && <NotificationsTab />}
        {activeTab === "Security" && <SecurityTab />}
        {activeTab === "Billing" && <BillingTab />}
        {activeTab === "Integrations" && <IntegrationsTab />}




        <p className="text-center text-xs text-slate-400 pt-6">
          © 2024 RetailOS Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
};

const GeneralTab = () => {
  const [logo, setLogo] = useState(null);

  const [twoFA, setTwoFA] = useState(true);

  const [emailNotif, setEmailNotif] = useState(true);
  const [desktopPush, setDesktopPush] = useState(false);
  const [monthlyReport, setMonthlyReport] = useState(true);

  const Toggle = ({ enabled, onChange }) => {
    return (
      <button
        onClick={onChange}
        className={`w-11 h-6 rounded-full relative transition ${enabled ? "bg-blue-600" : "bg-slate-300"
          }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition ${enabled ? "right-1" : "left-1"
            }`}
        />
      </button>
    );
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT COLUMN */}
      <div className="lg:col-span-2 space-y-6">

        {/* STORE PROFILE */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-sm">
          <div className="p-4 border-b border-slate-300 bg-slate-50">
            <h3 className="font-semibold">Store Profile</h3>
            <p className="text-xs text-slate-500">
              This information will be displayed publicly.
            </p>
          </div>

          <div className="p-6 space-y-6">

            {/* LOGO UPLOAD */}
            <div className="flex items-center gap-6">
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setLogo(URL.createObjectURL(e.target.files[0]))
                  }
                />


                <div className="w-20 h-20 bg-slate-100 rounded-full border-2 border-slate-400 border-dashed flex items-center justify-center overflow-hidden">
                  {logo ? (
                    <img src={logo} alt="logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-slate-400 text-3xl">
                      storefront
                    </span>
                  )}
                </div>


                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-slate-300 shadow">
                  <span className="material-symbols-outlined text-blue-600 text-sm">
                    edit
                  </span>
                </div>
              </label>

              <div>
                <p className="text-sm text-slate-950 font-medium">Store Logo</p>
                <p className="text-xs text-slate-500">
                  Recommended size 400×400px
                </p>
                <span className="text-sm text-blue-600 font-semibold">
                  Upload new
                </span>
              </div>
            </div>


            {/* FORM */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-zinc-800 font-medium">Store Name</label>
                <input
                  defaultValue="Fashion Forward"
                  className="w-full mt-1 rounded-lg text-slate-700 p-2 border border-slate-300 "
                />

              </div>

              <div>
                <label className="text-sm text-zinc-800 font-medium">Public Email</label>
                <input
                  className="w-full mt-1 rounded-lg text-slate-700  p-2 border border-slate-300"
                  defaultValue="hello@fashionforward.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-zinc-800 font-medium">
                  Store Description
                </label>
                <textarea
                  className="w-full mt-1 rounded-lg text-slate-700 border border-slate-300 p-2 resize-none"
                  rows="3"
                  defaultValue="Premium retail clothing for the modern individual."
                />
                <p className="text-xs text-slate-400 text-right">
                  0/150 characters
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* REGIONAL SETTINGS */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-sm">
          <div className="p-4 border-b border-slate-300 bg-slate-50">
            <h3 className="font-semibold">Regional Settings</h3>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium">Currency</label>
              <select className="w-full mt-1 rounded-lg p-2 border border-slate-300">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Timezone</label>
              <select className="w-full mt-1 rounded-lg p-2 border border-slate-300">
                <option>(GMT-08:00) Pacific Time</option>
                <option>(GMT-05:00) Eastern Time</option>
                <option>(GMT+00:00) London</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6">

        {/* PLAN */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-green-600 text-3xl">
              verified_user
            </span>
          </div>
          <h3 className="font-bold mt-3">Pro Plan Active</h3>
          <p className="text-sm text-slate-500 mb-4">
            Next billing: Oct 24, 2024
          </p>
          <button className="w-full border border-slate-300 rounded-lg py-2 text-sm">
            Manage Subscription
          </button>
        </div>

        {/* SECURITY */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              Security
              <span className="material-symbols-outlined text-slate-400">
                lock
              </span>
            </h3>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Two-Factor Auth</p>
              <p className="text-xs text-slate-500">
                Add an extra layer of security
              </p>
            </div>

            <Toggle
              enabled={twoFA}
              onChange={() => setTwoFA(!twoFA)}
            />
          </div>

          <button className="flex items-center gap-2 mt-6 text-sm text-slate-600 hover:text-primary">
            <span className="material-symbols-outlined text-[18px]">key</span>
            Change Password
          </button>
        </div>


        {/* PREFERENCES */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6">
          <h3 className="font-semibold mb-4">Preferences</h3>

          <div className="space-y-4">

            <div className="flex justify-between items-center">
              <span className="text-sm">Email Notifications</span>
              <Toggle
                enabled={emailNotif}
                onChange={() => setEmailNotif(!emailNotif)}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Desktop Push</span>
              <Toggle
                enabled={desktopPush}
                onChange={() => setDesktopPush(!desktopPush)}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Monthly Reports</span>
              <Toggle
                enabled={monthlyReport}
                onChange={() => setMonthlyReport(!monthlyReport)}
              />
            </div>

          </div>
        </div>


      </div>
    </div>
  );
};




const BillingTab = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 space-y-3">
      <h3 className="font-semibold">Billing</h3>
      <p>Plan: <b>Pro</b></p>
      <p>Next billing date: Oct 24, 2024</p>
      <button className="border border-slate-300  px-4 py-2 rounded-lg">
        Manage Subscription
      </button>
    </div>
  );
};


const NotificationsTab = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 space-y-4">
      <h3 className="font-semibold">Notifications</h3>
      <p className="text-sm text-slate-500">
        Control how you receive alerts.
      </p>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Email Alerts</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="flex justify-between">
          <span>Order Updates</span>
          <input type="checkbox" />
        </div>
        <div className="flex justify-between">
          <span>Weekly Summary</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
    </div>
  );
};

const SecurityTab = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 space-y-4">
      <h3 className="font-semibold">Security Settings</h3>

      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Two-Factor Authentication</p>
          <p className="text-xs text-slate-500">
            Protect your account with OTP
          </p>
        </div>
        <input type="checkbox" defaultChecked />
      </div>

      <button className="text-primary text-sm">Change Password</button>
    </div>
  );
};

const IntegrationsTab = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {["Stripe", "Google", "Shopify"].map((tool) => (
        <div
          key={tool}
          className="bg-white border border-slate-300 shadow-sm rounded-xl p-4 flex justify-between"
        >
          <span>{tool}</span>
          <button className="text-primary text-sm hover:text-blue-700  hover:font-medium ">Configure</button>
        </div>
      ))}
    </div>
  );
};


export default Settings;
