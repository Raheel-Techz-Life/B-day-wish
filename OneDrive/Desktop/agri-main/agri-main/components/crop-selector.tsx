'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CROPS = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Tomato', 'Potato', 'Sugarcane', 'Soybean'];

interface CropSelectorProps {
  onSelect?: (crop: string) => void;
  defaultCrop?: string;
  placeholder?: string;
}

export function CropSelector({
  onSelect,
  defaultCrop = 'Rice',
  placeholder = 'Select a crop',
}: CropSelectorProps) {
  const [selectedCrop, setSelectedCrop] = useState(defaultCrop);

  const handleChange = (value: string) => {
    setSelectedCrop(value);
    onSelect?.(value);
  };

  return (
    <Select value={selectedCrop} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {CROPS.map((crop) => (
          <SelectItem key={crop} value={crop}>
            {crop}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
