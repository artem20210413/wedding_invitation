import React from 'react';
import { Calendar } from 'lucide-react';

interface CalendarButtonProps {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO format
  endDate: string;   // ISO format
}

export const CalendarButton: React.FC<CalendarButtonProps> = ({
  title,
  description,
  location,
  startDate,
  endDate
}) => {
  const formatGoogleDate = (dateStr: string) => {
    return dateStr.replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;

  const handleIcsDownload = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatGoogleDate(startDate)}`,
      `DTEND:${formatGoogleDate(endDate)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wedding-event.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-full text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
      >
        <Calendar className="w-5 h-5 text-blue-500" />
        Google Календар
      </a>
      <button
        onClick={handleIcsDownload}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-full text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
      >
        <Calendar className="w-5 h-5 text-stone-500" />
        Apple / Outlook
      </button>
    </div>
  );
};
