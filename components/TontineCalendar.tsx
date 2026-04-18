"use client";
import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CalendarEvent {
  date: Date;
  type: 'contribution' | 'distribution';
  status: 'completed' | 'upcoming';
  beneficiary?: string;
  paidCount?: number;
  totalMembers?: number;
}

const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const DAYS_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export function TontineCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3)); // April 2026

  // Mock calendar events
  const events: CalendarEvent[] = [
    // Past contributions
    { date: new Date(2026, 3, 5), type: 'contribution', status: 'completed', paidCount: 25, totalMembers: 25 },
    { date: new Date(2026, 2, 26), type: 'contribution', status: 'completed', paidCount: 25, totalMembers: 25 },
    { date: new Date(2026, 2, 16), type: 'contribution', status: 'completed', paidCount: 24, totalMembers: 25 },
    
    // Past distribution
    { date: new Date(2026, 3, 5), type: 'distribution', status: 'completed', beneficiary: 'Kwame Asante' },
    
    // Current/Upcoming contributions
    { date: new Date(2026, 3, 15), type: 'contribution', status: 'upcoming', paidCount: 22, totalMembers: 25 },
    { date: new Date(2026, 3, 25), type: 'contribution', status: 'upcoming', paidCount: 0, totalMembers: 25 },
    
    // Future distributions
    { date: new Date(2026, 3, 25), type: 'distribution', status: 'upcoming', beneficiary: 'Fatou Diallo' },
    { date: new Date(2026, 4, 5), type: 'distribution', status: 'upcoming', beneficiary: 'Ibrahim Touré' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventForDate = (day: number) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return events.filter(event => 
      event.date.getDate() === day &&
      event.date.getMonth() === checkDate.getMonth() &&
      event.date.getFullYear() === checkDate.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date(2026, 3, 15); // Current date in our mock
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  return (
    <Card className="border-gray-200 shadow-sm">
      <div className="p-5">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base text-gray-900">Calendrier de la tontine</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Mois précédent"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm min-w-[140px] text-center text-gray-900">
              {MONTHS_FR[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Mois suivant"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-gray-600">Cotisation payée</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span className="text-gray-600">Distribution</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-amber-400 rounded-sm"></div>
            <span className="text-gray-600">À venir</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {DAYS_FR.map(day => (
            <div key={day} className="text-center text-xs text-gray-500 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells for alignment */}
          {emptyDays.map(i => (
            <div key={`empty-${i}`} className="aspect-square"></div>
          ))}

          {/* Calendar days */}
          {days.map(day => {
            const dayEvents = getEventForDate(day);
            const hasContribution = dayEvents.find(e => e.type === 'contribution');
            const hasDistribution = dayEvents.find(e => e.type === 'distribution');
            const today = isToday(day);

            return (
              <div
                key={day}
                className={`
                  aspect-square p-1 rounded-lg relative
                  ${today ? 'bg-blue-50 ring-2 ring-blue-400' : ''}
                `}
              >
                <div className="text-center text-sm text-gray-700 mb-1">
                  {day}
                </div>

                {/* Event indicators */}
                <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
                  {hasContribution && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        hasContribution.status === 'completed'
                          ? 'bg-green-500'
                          : hasContribution.paidCount && hasContribution.paidCount > 0
                          ? 'bg-amber-400'
                          : 'bg-gray-300'
                      }`}
                      title={`Cotisation ${hasContribution.status === 'completed' ? 'complétée' : 'en cours'}`}
                    />
                  )}
                  {hasDistribution && (
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-blue-500"
                      title={`Distribution - ${hasDistribution.beneficiary}`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Event Details for Current View */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm text-gray-700 mb-3">Événements du mois</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
            {events
              .filter(event => 
                event.date.getMonth() === currentDate.getMonth() &&
                event.date.getFullYear() === currentDate.getFullYear()
              )
              .sort((a, b) => a.date.getDate() - b.date.getDate())
              .map((event, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    event.status === 'completed'
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {event.type === 'contribution' ? (
                      <div className={`p-2 rounded-lg ${
                        event.status === 'completed' ? 'bg-green-100' : 'bg-amber-100'
                      }`}>
                        {event.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-700" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-700" />
                        )}
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-blue-100">
                        <TrendingUp className="w-4 h-4 text-blue-700" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-900">
                        {event.type === 'contribution' ? 'Cotisation' : 'Distribution'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {event.date.getDate()} {MONTHS_FR[event.date.getMonth()]}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {event.type === 'contribution' && event.paidCount !== undefined ? (
                      <Badge className={`${
                        event.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      } hover:bg-green-100`}>
                        {event.paidCount}/{event.totalMembers}
                      </Badge>
                    ) : event.beneficiary ? (
                      <p className="text-xs text-gray-600">{event.beneficiary}</p>
                    ) : null}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
