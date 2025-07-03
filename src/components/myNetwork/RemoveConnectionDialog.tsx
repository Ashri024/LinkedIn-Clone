import { useDialogStore } from "@/store/dialogStore";

export function RemoveConnectionDialog({ userId, userName }: { userId: string, userName: string }) {
  const handleRemove = async () => {
    try {
      // call your backend to remove connection
      await fetch(`/api/connections/remove`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
        headers: { 'Content-Type': 'application/json' },
      });
      // optionally refetch connections
      useDialogStore.getState().closeDialog();
    } catch (e) {
      console.error("Failed to remove connection", e);
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
        <button className="linkedIn-button-outline" onClick={() => useDialogStore.getState().closeDialog()}>Cancel</button>
        <button className="linkedIn-button-filled" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
}
