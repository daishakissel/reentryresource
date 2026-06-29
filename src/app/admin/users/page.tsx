"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";

interface ManagedUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

const ALL_COLUMNS: { key: string; label: string; defaultVisible: boolean }[] = [
  { key: "email", label: "Email", defaultVisible: true },
  { key: "role", label: "Role", defaultVisible: true },
  { key: "created_at", label: "Created", defaultVisible: true },
];

export default function UserManagementPage() {
  const { user, loading, canAccessAdminPages } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    () => new Set(ALL_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key))
  );
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [showColumnPicker, setShowColumnPicker] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("author");
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

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

  function getCellValue(u: ManagedUser, key: string): string {
    if (key === "created_at") return new Date(u.created_at).toLocaleDateString();
    return (u as any)[key] ?? "—";
  }

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      for (const [key, filter] of Object.entries(columnFilters)) {
        if (!filter.trim()) continue;
        const val = getCellValue(u, key);
        if (!val.toLowerCase().includes(filter.toLowerCase())) return false;
      }
      return true;
    });
  }, [users, columnFilters]);

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

  const activeColumns = ALL_COLUMNS.filter((c) => visibleColumns.has(c.key));

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Management</h1>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">Create New User</h2>
        <form onSubmit={handleCreateUser} className="space-y-3">
          <div>
            <label htmlFor="new-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
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
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
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
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">Invite User</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Send an email invitation so the user can set their own password.</p>
        <form onSubmit={handleInviteUser} className="space-y-3">
          <div>
            <label htmlFor="invite-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
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
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Existing Users</h2>
          <div className="relative">
            <button
              onClick={() => setShowColumnPicker((v) => !v)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              Columns
            </button>
            {showColumnPicker && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowColumnPicker(false)} />
                <div className="absolute right-0 top-full mt-1 z-40 bg-white dark:bg-ocean-dark border border-gray-200 dark:border-ocean-light rounded-lg shadow-lg p-3 w-48">
                  {ALL_COLUMNS.map((col) => (
                    <label key={col.key} className="flex items-center gap-2 py-1 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-ocean-light px-1 rounded">
                      <input
                        type="checkbox"
                        checked={visibleColumns.has(col.key)}
                        onChange={() => {
                          setVisibleColumns((prev) => {
                            const next = new Set(prev);
                            if (next.has(col.key)) next.delete(col.key);
                            else next.add(col.key);
                            return next;
                          });
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                      />
                      {col.label}
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {filteredUsers.length} of {users.length} users
        </p>
        {loadingUsers ? (
          <p className="text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="border border-gray-200 dark:border-ocean-light rounded-lg overflow-x-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-ocean-dark">
                <tr>
                  {activeColumns.map((col) => (
                    <th key={col.key} className="text-left px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
                      <div className="flex flex-col gap-1">
                        <span>{col.label}</span>
                        <input
                          type="text"
                          placeholder="Filter..."
                          value={columnFilters[col.key] ?? ""}
                          onChange={(e) => setColumnFilters((prev) => ({ ...prev, [col.key]: e.target.value }))}
                          className="w-full px-2 py-1 text-xs rounded border border-gray-300 dark:border-ocean-light bg-white dark:bg-ocean-deeper text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                        />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-t border-gray-100 dark:border-ocean-light hover:bg-gray-50 dark:hover:bg-ocean-light">
                    {activeColumns.map((col) => (
                      <td key={col.key} className="px-4 py-2 text-gray-300 dark:text-gray-300">
                        {col.key === "role" ? (
                          <span className="capitalize">{u.role}</span>
                        ) : (
                          getCellValue(u, col.key)
                        )}
                      </td>
                    ))}
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
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-1">Change Your Password</h2>
        <div className="mb-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Logged in as:</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email ?? "Guest"}</p>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <div>
            <label htmlFor="own-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
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
            <label htmlFor="own-password-confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
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
