"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [personKey, setPersonKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personKey }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      router.push(searchParams.get("from") || "/members");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container container-narrow">
      <h1>Member Login</h1>
      <p>
        Enter your personal Warwick SU membership key to access the Warwick
        Law Society members area. Generate your key from the Membership API
        section of the Warwick Law Society page on the Warwick SU website.
      </p>
      <form onSubmit={handleSubmit} className="stack">
        <label htmlFor="personKey">Membership key</label>
        <input
          id="personKey"
          name="personKey"
          type="text"
          autoComplete="off"
          value={personKey}
          onChange={(event) => setPersonKey(event.target.value)}
          required
        />
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? "Checking..." : "Log in"}
        </button>
      </form>
    </main>
  );
}
