'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  onStudentToggle: () => void;
}

export default function StepExperience({ onStudentToggle }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">What&apos;s your most recent experience?</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium">Most recent job title *</label>
        <Input placeholder="e.g. Project Manager" required />

        <label className="text-sm font-medium">Employment type *</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
            <SelectItem value="freelance">Freelance</SelectItem>
          </SelectContent>
        </Select>

        <label className="text-sm font-medium">Most recent company *</label>
        <Input placeholder="e.g. My own2092" required />
      </div>

      <div className="space-y-2">
        <Button variant="link" className="w-full" onClick={onStudentToggle}>
          I&apos;m a student
        </Button>
      </div>
    </div>
  );
}
