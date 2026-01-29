import React, { useState } from "react";
import { User } from "../types/types";
import defaultUser from "@/utils/default-user";

interface SignUpProps {
  onComplete: (user: User) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onComplete }) => {
  const [form, setForm] = useState({
    username: defaultUser().username,
    email: defaultUser().email,
    password: defaultUser().password,
  });
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    agreed
      ? onComplete({ username: form.username, email: form.email })
      : alert("agree first to terms and conditions");
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg shadow-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-white">
          PATTERWATCH
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Relationship Pattern Intelligence System
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">
            Username
          </label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:border-green-500 outline-none rounded transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:border-green-500 outline-none rounded transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:border-green-500 outline-none rounded transition-colors"
          />
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded text-xs text-zinc-400 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 accent-green-500"
            />
            <span>
              By signing up, you agree that:
              <ul className="mt-2 list-disc list-inside space-y-1 opacity-70">
                <li>You will only bind accounts you legally own</li>
                <li>All monitoring is mutual and revocable</li>
                <li>Abuse may result in account termination</li>
                <li>System operates on patterns, not emotional guarantees</li>
              </ul>
            </span>
          </label>
        </div>

        <button
          disabled={!agreed}
          className="w-full bg-white text-black font-bold py-4 rounded hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest text-sm"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-zinc-500 text-xs">
        Already have an account?{" "}
        <span className="text-zinc-300 hover:text-white cursor-pointer underline">
          Login
        </span>
      </p>
    </div>
  );
};

export default SignUp;
