"use client";

import { useState } from 'react';
import { Calendar, Settings } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FrequencySelectorProps {
  value: {
    type: 'hebdomadaire' | 'mensuelle' | 'personnalisée';
    customInterval?: number;
    customUnit?: 'jours' | 'semaines' | 'mois';
  };
  onChange: (value: any) => void;
}

export function FrequencySelector({ value, onChange }: FrequencySelectorProps) {
  const [showCustom, setShowCustom] = useState(value.type === 'personnalisée');

  const handleTypeChange = (type: string) => {
    if (type === 'personnalisée') {
      setShowCustom(true);
      onChange({
        type: 'personnalisée',
        customInterval: 1,
        customUnit: 'semaines',
      });
    } else {
      setShowCustom(false);
      onChange({ type });
    }
  };

  const handleCustomIntervalChange = (interval: string) => {
    onChange({
      ...value,
      customInterval: parseInt(interval) || 1,
    });
  };

  const handleCustomUnitChange = (unit: string) => {
    onChange({
      ...value,
      customUnit: unit,
    });
  };

  return (
    <div className="space-y-3">
      <Label className="text-gray-700">
        Fréquence des cotisations
      </Label>

      <RadioGroup value={value.type} onValueChange={handleTypeChange}>
        <div className="grid grid-cols-2 gap-3">
          <label
            htmlFor="freq-hebdo"
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              value.type === 'hebdomadaire'
                ? 'border-blue-600 bg-blue-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <RadioGroupItem value="hebdomadaire" id="freq-hebdo" className="sr-only" />
            <Calendar className="w-4 h-4" />
            <span className="font-medium text-sm">Hebdomadaire</span>
          </label>

          <label
            htmlFor="freq-mens"
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              value.type === 'mensuelle'
                ? 'border-blue-600 bg-blue-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <RadioGroupItem value="mensuelle" id="freq-mens" className="sr-only" />
            <Calendar className="w-4 h-4" />
            <span className="font-medium text-sm">Mensuelle</span>
          </label>
        </div>

        {/* Custom Frequency Option */}
        <label
          htmlFor="freq-custom"
          className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            value.type === 'personnalisée'
              ? 'border-blue-600 bg-blue-50 shadow-sm'
              : 'border-gray-200 bg-white hover:border-blue-300'
          }`}
        >
          <RadioGroupItem value="personnalisée" id="freq-custom" className="mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4" />
              <span className="font-medium text-sm">Fréquence personnalisée</span>
            </div>

            {showCustom && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-gray-600 whitespace-nowrap">Tous les</span>
                <Input
                  type="number"
                  min="1"
                  max="365"
                  value={value.customInterval || 1}
                  onChange={(e) => handleCustomIntervalChange(e.target.value)}
                  className="w-16 h-9 text-center border-gray-300 rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
                <Select
                  value={value.customUnit || 'semaines'}
                  onValueChange={handleCustomUnitChange}
                >
                  <SelectTrigger className="w-28 h-9 border-gray-300 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jours">jours</SelectItem>
                    <SelectItem value="semaines">semaines</SelectItem>
                    <SelectItem value="mois">mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </label>
      </RadioGroup>
    </div>
  );
}
