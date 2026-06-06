"use client";
import ButtonAlt from "./button_alt";
import ButtonSubmit from "./button_submit";
import ButtonDanger from "./button_danger";
import { useState } from "react";

export default function AccountPanel({ user }) {
  const [error, setError] = useState("");
  const [passerror, setPassError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    id: user[0].id,
    name: user[0].name,
    username: user[0].username,
    email: user[0].email,
    bio: user[0].bio,
  });
  const [passform, setPassForm] = useState({
    id: user[0].id,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/account/profile_info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    setSuccess(true);
  }
  async function handlePassSubmit(e) {
    e.preventDefault();
    setPassError("");
    const res = await fetch("/api/account/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passform),
    });
    const data = await res.json();
    if (!res.ok) return setPassError(data.error);
    const res2 = await fetch("/api/auth/signout", {
      method: "POST",
    });
    const data2 = await res2.json();
    if (!res2.ok) return setPassError(data2.error);
    window.location.href = "/auth";
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      {user && (
        <div className="max-w-2xl mx-auto px-6 py-16">
          <h1
            className="text-4xl font-black uppercase tracking-tight mb-12"
            style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
          >
            Account
          </h1>

          {/* Profile Info Section */}
          <section className="mb-16">
            <div className="border-t-2 border-black mb-8">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/40 block mt-3">
                Profile Information
              </span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="divide-y divide-black border-y border-black">
                {[
                  {
                    label: "name",
                    type: "text",
                    placeholder: "Your name",
                    value: user[0].name,
                  },
                  {
                    label: "username",
                    type: "text",
                    placeholder: "Your username",
                    value: user[0].username,
                  },
                  {
                    label: "email",
                    type: "email",
                    placeholder: "you@domain.com",
                    value: user[0].email,
                  },
                  {
                    label: "bio",
                    type: "text",
                    placeholder: "A short bio",
                    value: user[0].bio ? user[0].bio : " ",
                  },
                ].map(({ label, type, placeholder, value }) => (
                  <div key={label} className="py-6 flex flex-col gap-1">
                    <label className="text-[9px] tracking-[0.2em] uppercase text-neutral-400">
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      defaultValue={value}
                      onChange={(e) =>
                        setForm({ ...form, [label]: e.target.value })
                      }
                      required
                      className="bg-transparent outline-none text-sm placeholder:text-neutral-300"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button type="submit" className="w-full">
                  <ButtonAlt text="Save Changes" />
                </button>
                <br />
                {success && (
                  <p className="text-green-500 text-xs mt-3">
                    Profile updated!
                  </p>
                )}
                {error && <p className="text-red-600 text-xs mt-3">{error}</p>}
              </div>
            </form>
          </section>

          {/* Change Password Section */}
          <section>
            <div className="border-t-2 border-black mb-8">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/40 block mt-3">
                Change Password
              </span>
            </div>
            <form onSubmit={handlePassSubmit}>
              <div className="divide-y divide-black border-y border-black">
                {[
                  {
                    label: "currentPassword",
                    placeholder: "Your current password",
                  },
                  { label: "newPassword", placeholder: "Your new password" },
                  {
                    label: "confirmNewPassword",
                    placeholder: "Confirm New Password",
                  },
                ].map(({ label, placeholder }) => (
                  <div key={label} className="py-6 flex flex-col gap-1">
                    <label className="text-[9px] tracking-[0.2em] uppercase text-neutral-400">
                      {label}
                    </label>
                    <input
                      type="password"
                      placeholder={placeholder}
                      className="bg-transparent outline-none text-sm placeholder:text-neutral-300"
                      onChange={(e) =>
                        setPassForm({ ...passform, [label]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-8">
                <button type="submit">
                  <ButtonSubmit text="Update Password" />
                </button>
                <ButtonDanger text="Delete Account" />
              </div>
              <br />
              {passerror && (
                <p className="text-red-600 text-xs mt-3">{passerror}</p>
              )}
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
