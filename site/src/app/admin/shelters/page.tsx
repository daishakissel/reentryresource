"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Shelter {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export default function ManageSheltersPage() {
  const { user, loading: authLoading, canAccessAdminPages } = useAuth();
  const router = useRouter();
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loadingShelters, setLoadingShelters] = useState(true);

  const [newName, setNewName] = useState("");
  const [newShortName, setNewShortName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newOrgName, setNewOrgName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newStreetAddress, setNewStreetAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZip, setNewZip] = useState("");
  const [newLatitude, setNewLatitude] = useState("");
  const [newLongitude, setNewLongitude] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newGeocoding, setNewGeocoding] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
    if (!authLoading && user && !canAccessAdminPages) router.replace("/");
  }, [user, authLoading, router]);

  async function getAuthHeaders(): Promise<Record<string, string>> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  const fetchShelters = useCallback(async () => {
    const headers = await getAuthHeaders();
    const res = await fetch("/api/admin/shelters", { headers });
    if (res.ok) {
      const data = await res.json();
      setShelters(data.shelters);
    }
    setLoadingShelters(false);
  }, []);

  useEffect(() => {
    if (user) fetchShelters();
  }, [user, fetchShelters]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(null);

    const headers = await getAuthHeaders();
    const res = await fetch("/api/admin/shelters", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({
        name: newName, short_name: newShortName, slug: newSlug, password: newPassword,
        organization_name: newOrgName, phone: newPhone, email: newEmail, website: newWebsite,
        street_address: newStreetAddress, city: newCity, state: newState, zip: newZip,
        latitude: newLatitude ? parseFloat(newLatitude) : null,
        longitude: newLongitude ? parseFloat(newLongitude) : null,
      }),
    });

    if (res.ok) {
      setCreateSuccess(`Shelter "${newName}" created.`);
      setNewName(""); setNewShortName(""); setNewSlug(""); setNewOrgName("");
      setNewPhone(""); setNewEmail(""); setNewWebsite("");
      setNewStreetAddress(""); setNewCity(""); setNewState(""); setNewZip("");
      setNewLatitude(""); setNewLongitude(""); setNewPassword("");
      fetchShelters();
    } else {
      const data = await res.json();
      setCreateError(data.error);
    }
  }

  const [editPasswordId, setEditPasswordId] = useState<string | null>(null);
  const [editPasswordValue, setEditPasswordValue] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  async function handleSetPassword(id: string) {
    if (!editPasswordValue) return;
    const headers = await getAuthHeaders();
    const res = await fetch(`/api/admin/shelters/${id}/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ password: editPasswordValue }),
    });
    if (res.ok) {
      setPasswordSuccess("Password updated.");
      setEditPasswordId(null);
      setEditPasswordValue("");
      setTimeout(() => setPasswordSuccess(null), 3000);
    } else {
      alert("Failed to update password");
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete shelter "${name}" and all its pages?`)) return;
    const headers = await getAuthHeaders();
    const res = await fetch(`/api/admin/shelters/${id}`, { method: "DELETE", headers });
    if (res.ok) fetchShelters();
    else alert("Failed to delete shelter");
  }

  async function handleNewGeocode() {
    const addr = [newStreetAddress, newCity, newState, newZip].filter(Boolean).join(", ");
    if (!addr) return;
    setNewGeocoding(true);
    const res = await fetch(`/api/geocode?address=${encodeURIComponent(addr)}`);
    if (res.ok) {
      const data = await res.json();
      setNewLatitude(data.latitude.toString());
      setNewLongitude(data.longitude.toString());
    }
    setNewGeocoding(false);
  }

  if (authLoading) return <p className="text-gray-500">Loading...</p>;
  if (!user) return null;

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent";

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Manage Shelters</h1>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">Add Shelter</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name <span className="text-red-500">*</span></label>
              <input type="text" value={newName} onChange={(e) => { setNewName(e.target.value); setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")); }} required className={inputClass} placeholder="Bybee Lakes Hope Center" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Name (dropdown)</label>
              <input type="text" value={newShortName} onChange={(e) => setNewShortName(e.target.value)} className={inputClass} placeholder="Bybee" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug <span className="text-red-500">*</span></label>
              <input type="text" value={newSlug} onChange={(e) => setNewSlug(e.target.value)} required className={inputClass} placeholder="bybee-lakes" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization Name</label>
              <input type="text" value={newOrgName} onChange={(e) => setNewOrgName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <input type="tel" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
              <input type="url" value={newWebsite} onChange={(e) => setNewWebsite(e.target.value)} className={inputClass} placeholder="https://..." />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street Address</label>
              <input type="text" value={newStreetAddress} onChange={(e) => setNewStreetAddress(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
                <input type="text" value={newState} onChange={(e) => setNewState(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP</label>
                <input type="text" value={newZip} onChange={(e) => setNewZip(e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Latitude</label>
                <input type="number" step="any" value={newLatitude} onChange={(e) => setNewLatitude(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Longitude</label>
                <input type="number" step="any" value={newLongitude} onChange={(e) => setNewLongitude(e.target.value)} className={inputClass} />
              </div>
            </div>
            <button type="button" onClick={handleNewGeocode} disabled={newGeocoding} className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-brand-gray hover:bg-brand-gray/90 transition-colors disabled:opacity-50">
              {newGeocoding ? "Looking up..." : "Lookup Coordinates"}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password <span className="text-red-500">*</span></label>
            <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className={inputClass} placeholder="Shelter access password" />
          </div>

          {createError && <p className="text-sm text-red-600">{createError}</p>}
          {createSuccess && <p className="text-sm text-green-600">{createSuccess}</p>}
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors">
            Create Shelter
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">Existing Shelters</h2>
        {passwordSuccess && <p className="text-sm text-green-600 mb-3">{passwordSuccess}</p>}
        {loadingShelters ? (
          <p className="text-gray-500">Loading...</p>
        ) : shelters.length === 0 ? (
          <p className="text-gray-500">No shelters yet.</p>
        ) : (
          <div className="border border-gray-200 dark:border-ocean-light rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-ocean-dark">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Slug</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Password</th>
                  <th className="px-4 py-3 w-24"></th>
                </tr>
              </thead>
              <tbody>
                {shelters.map((s) => (
                  <tr key={s.id} className="border-t border-gray-100 dark:border-ocean-light hover:bg-gray-50 dark:hover:bg-ocean-light">
                    <td className="px-4 py-3 font-medium">{s.name}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{s.slug}</td>
                    <td className="px-4 py-3">
                      {editPasswordId === s.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={editPasswordValue}
                            onChange={(e) => setEditPasswordValue(e.target.value)}
                            className="w-28 px-2 py-1 rounded border border-gray-300 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                            placeholder="New password"
                            autoFocus
                            onKeyDown={(e) => e.key === "Enter" && handleSetPassword(s.id)}
                          />
                          <button onClick={() => handleSetPassword(s.id)} className="text-xs text-brand-gold hover:underline">Save</button>
                          <button onClick={() => { setEditPasswordId(null); setEditPasswordValue(""); }} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setEditPasswordId(s.id); setEditPasswordValue(""); }}
                          className="text-xs text-brand-gold hover:underline"
                        >
                          Change
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/shelter/${s.id}/edit`}
                          title="Edit shelter"
                          className="text-gray-400 hover:text-brand-gold transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/shelter/${s.id}/pages`}
                          title="Manage pages"
                          className="text-gray-400 hover:text-brand-gold transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(s.id, s.name)}
                          title="Delete"
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
