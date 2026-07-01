"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-2">
        Logged in as <span className="font-medium">{user.email}</span>
      </p>
      <p className="text-gray-500">Use the sidebar to manage resources and users.</p>
    </div>
  );
}
