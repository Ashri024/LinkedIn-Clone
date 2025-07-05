"use client";
import { useDialogStore } from "@/store/dialogStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { ConnectionCardProps } from "./ConnectionCard";

export function RemoveConnectionDialog({ userId, userName , setSafeInvitationsState}: { userId: string, userName: string, setSafeInvitationsState: React.Dispatch<React.SetStateAction<ConnectionCardProps[]>> }) {
  const [loading, setLoading] = useState(false);
  const handleRemove = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/connection/remove/${userId}`, { method: 'DELETE' });
      if (res.ok) {
        // console.log("Connection removed successfully");
        useDialogStore.getState().closeDialog();

        setSafeInvitationsState((prev) => prev.filter((connection) => connection._id !== userId));
      }else {
        const errorData = await res.json();
        console.error("Error removing connection:", errorData.error || "Failed to remove connection");
        toast.error('Failed to remove connection: ' + (errorData.error || "An error occurred"));
      }
    } catch (e) {
      console.error("Failed to remove connection", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold">Remove Connection</h2>
      <p className="text-sm text-muted-foreground mt-2">
        Are you sure you want to remove <span className="font-semibold">{userName}</span> as a connection?
        Don&apos;t worry, {userName} won&apos;t be notified by LinkedIn.
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <button className="linkedIn-button-outline" onClick={() => useDialogStore.getState().closeDialog() } disabled={loading}>Cancel</button>
        <button className="linkedIn-button-filled" onClick={handleRemove} disabled={loading} >Remove</button>
      </div>
    </div>
  );
}
