'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface Props {
  onNotStudent: () => void;
}

export default function StepStudent({ onNotStudent }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">What&apos;s your most recent experience?</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium">School or College/University *</label>
        <Input placeholder="Enter your institution" required />

        <label className="text-sm font-medium">Degree</label>
        <Input placeholder="e.g. B.Tech, MBA" />

        <label className="text-sm font-medium">Field of Study</label>
        <Input placeholder="e.g. Computer Science" />

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium">Start Year *</label>
            <Input type="number" placeholder="e.g. 2021" required />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium">End Year *</label>
            <Input type="number" placeholder="e.g. 2025" required />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <span className="text-sm font-medium">I&apos;m over 16</span>
          <Switch defaultChecked />
        </div>
      </div>

      <Button variant="link" className="w-full" onClick={onNotStudent}>
        I&apos;m not a student
      </Button>
    </div>
  );
}
