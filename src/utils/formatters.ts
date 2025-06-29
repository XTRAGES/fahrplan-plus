import { format, isToday, isTomorrow, addDays } from 'date-fns';
import { de } from 'date-fns/locale';

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm');
};

export const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return 'Heute';
  } else if (isTomorrow(date)) {
    return 'Morgen';
  } else {
    return format(date, 'dd.MM.yyyy', { locale: de });
  }
};

export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)}, ${formatTime(date)}`;
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}min`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}min`;
  }
};

export const formatDelay = (delay: number): string => {
  if (delay === 0) return 'Pünktlich';
  return `+${delay}min`;
};

export const formatPrice = (price: number): string => {
  return `€${price.toFixed(2)}`;
};

export const getDelayColor = (delay?: number): string => {
  if (!delay || delay === 0) return 'text-success-600';
  if (delay <= 5) return 'text-warning-600';
  return 'text-error-600';
};

export const getDelayBgColor = (delay?: number): string => {
  if (!delay || delay === 0) return 'bg-success-50 text-success-700';
  if (delay <= 5) return 'bg-warning-50 text-warning-700';
  return 'bg-error-50 text-error-700';
};