'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import type { ComplaintCategory, ComplaintPriority } from '@/types';

interface ComplaintFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ComplaintFormData) => void;
}

export interface ComplaintFormData {
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  priority: ComplaintPriority;
  photos: File[];
}

export function ComplaintForm({ isOpen, onClose, onSubmit }: ComplaintFormProps) {
  const [formData, setFormData] = useState<Partial<ComplaintFormData>>({
    title: '',
    description: '',
    category: 'facilities',
    location: '',
    priority: 'medium',
    photos: [],
  });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories: Array<{ value: ComplaintCategory; label: string }> = [
    { value: 'facilities', label: 'Facilities' },
    { value: 'it', label: 'IT & Technology' },
    { value: 'security', label: 'Security' },
    { value: 'academic', label: 'Academic' },
    { value: 'student-services', label: 'Student Services' },
    { value: 'other', label: 'Other' },
  ];

  const priorities: Array<{ value: ComplaintPriority; label: string }> = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files).slice(0, 5); // Max 5 photos
    setFormData((prev) => ({
      ...prev,
      photos: files,
    }));

    // Create preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData as ComplaintFormData);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'facilities',
        location: '',
        priority: 'medium',
        photos: [],
      });
      setPreviewUrls([]);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit New Complaint"
      description="Describe the issue you've encountered"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <Input
          label="Issue Title"
          name="title"
          placeholder="Brief description of the issue"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Description */}
        <Textarea
          label="Detailed Description"
          name="description"
          placeholder="Provide detailed information about the issue"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* Category & Location */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Category"
            name="category"
            options={categories}
            value={formData.category}
            onChange={handleChange}
            required
          />
          <Input
            label="Location"
            name="location"
            placeholder="Building/Room number"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Priority */}
        <Select
          label="Priority Level"
          name="priority"
          options={priorities}
          value={formData.priority}
          onChange={handleChange}
          required
        />

        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Upload Photos (up to 5)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoChange}
            disabled={isSubmitting}
            className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-5 gap-2 mt-2">
              {previewUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-20 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Submit Complaint
          </Button>
        </div>
      </form>
    </Modal>
  );
}
