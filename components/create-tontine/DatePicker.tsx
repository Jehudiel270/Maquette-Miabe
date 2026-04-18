"use client";

import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  label?: string;
  minDate?: Date;
}

export function DatePicker({ date, onDateChange, label, minDate }: DatePickerProps) {
  const formatDate = (date: Date) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName} ${day} ${month} ${year}`;
  };

  return (
    <div className="space-y-2">
      {label && <Label className="text-gray-700">{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal h-11 rounded-xl border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all ${
              !date && 'text-gray-500'
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
            {date ? (
              <span className="text-gray-900">
                {formatDate(date)}
              </span>
            ) : (
              <span>Sélectionner une date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 shadow-lg" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            disabled={(date) => minDate ? date < minDate : false}
            initialFocus
            className="rounded-xl border-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
