"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface ManagedUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default function UserManagementPage() {
  const { user, loading, canAccessAdminPages } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // New user form
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("author");
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  // Invite user
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

  // Change own password
  const [ownPassword, setOwnPassword] = useState("");
  const [ownPasswordConfirm, setOwnPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
    if (!loading && user && !canAccessAdminPages) router.replace("/");
  }, [user, loading, router]);

  async function getAuthHeaders(): Promise<Record<string, string>> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    const headers = await getAuthHeaders();
    const res = await fetch("/api/admin/users", { headers });
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
    setLoadingUsers(false);
  }, []);

  useEffect(() => {
    if (user) fetchUsers();
  }, [user, fetchUsers]);

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(null);

    const authHeaders = await getAuthHeaders();
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify({ email: newEmail, password: newPassword, role: newRole }),
    });

    const data = await res.json();
    if (!res.ok) {
      setCreateError(data.error);
    } else {
      setCreateSuccess(`User ${newEmail} created successfully.`);
      setNewEmail("");
      setNewPassword("");
      setNewRole("author");
      fetchUsers();
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (ownPassword !== ownPasswordConfirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: ownPassword });
    if (error) {
      setPasswordError(error.message);
    } else {
      setPasswordSuccess("Password updated successfully.");
      setOwnPassword("");
      setOwnPasswordConfirm("");
    }
  }

  async function handleInviteUser(e: React.FormEvent) {
    e.preventDefault();
    setInviteError(null);
    setInviteSuccess(null);

    const authHeaders = await getAuthHeaders();
    const res = await fetch("/api/admin/users/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify({ email: inviteEmail }),
    });

    const data = await res.json();
    if (!res.ok) {
      setInviteError(data.error);
    } else {
      setInviteSuccess(`Invitation sent to ${inviteEmail}.`);
      setInviteEmail("");
    }
  }

  async function handleDeleteUser(userId: string, email: string) {
    if (!confirm(`Are you sure you want to delete ${email}?`)) return;

    const authHeaders = await getAuthHeaders();
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "DELETE",
      headers: authHeaders,
    });

    if (res.ok) {
      fetchUsers();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to delete user");
    }
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">User Management</h1>

        <h2 className="text-lg font-semibold text-gray-900 mb-3">Create New User</h2>
        <form onSubmit={handleCreateUser} className="space-y-3">
          <div>
            <label htmlFor="new-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="new-email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              placeholder="newuser@example.com"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              placeholder="Minimum 8 characters"
            />
          </div>
          <div>
            <label htmlFor="new-role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
            <select
              id="new-role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            >
              <option value="author">Author</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {createError && <p className="text-sm text-red-600">{createError}</p>}
          {createSuccess && <p className="text-sm text-green-600">{createSuccess}</p>}
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors"
          >
            Create User
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Invite User</h2>
        <p className="text-sm text-gray-500 mb-3">Send an email invitation so the user can set their own password.</p>
        <form onSubmit={handleInviteUser} className="space-y-3">
          <div>
            <label htmlFor="invite-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="invite-email"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              placeholder="invite@example.com"
            />
          </div>
          {inviteError && <p className="text-sm text-red-600">{inviteError}</p>}
          {inviteSuccess && <p className="text-sm text-green-600">{inviteSuccess}</p>}
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-gray hover:bg-brand-gray/90 transition-colors"
          >
            Send Invitation
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Existing Users</h2>
        {loadingUsers ? (
          <p className="text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-gray-700">Email</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700">Role</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700">Created</th>
                  <th className="px-4 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-gray-100">
                    <td className="px-4 py-2 text-gray-900">{u.email}</td>
                    <td className="px-4 py-2 text-gray-600 capitalize">{u.role}</td>
                    <td className="px-4 py-2 text-gray-500">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(u.id, u.email)}
                        title={`Delete ${u.email}`}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Change Your Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <div>
            <label htmlFor="own-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              id="own-password"
              type="password"
              value={ownPassword}
              onChange={(e) => setOwnPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="own-password-confirm" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              id="own-password-confirm"
              type="password"
              value={ownPasswordConfirm}
              onChange={(e) => setOwnPasswordConfirm(e.target.value)}
              required
              minLength={8}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            />
          </div>
          {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
          {passwordSuccess && <p className="text-sm text-green-600">{passwordSuccess}</p>}
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
