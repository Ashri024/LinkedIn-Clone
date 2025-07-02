// /components/global/GlobalDialog.tsx
'use client';

import { useDialogStore } from '@/store/dialogStore';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

export default function GlobalDialog() {
  const isOpen = useDialogStore((state) => state.isOpen);
  const content = useDialogStore((state) => state.content);
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const [hasMounted, setHasMounted] = useState(false);

  // ✅ Prevent any rendering on server
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // ⛔ Avoid SSR issues

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogTitle className="hidden">Dialog</DialogTitle>
        {content}
      </DialogContent>
    </Dialog>
  );
}
