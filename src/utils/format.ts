const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

/** 180 -> "R$ 180" */
export function formatCurrency(value: number): string {
  return `R$ ${value.toLocaleString('pt-BR')}`;
}

/** 90 -> "1h30" · 75 -> "1h15" · 60 -> "1h" · 45 -> "45 min" */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`;
}

/** "2026-10-12" -> "12 out 2026". Manual de propósito: Intl varia entre plataformas. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

/** 1 -> "1 experiência" · 3 -> "3 experiências" */
export function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

/** "2026-11-06" -> "sex, 6 nov" */
export function formatWeekdayDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${weekday}, ${day} ${MONTHS[month - 1]}`;
}

/** "19:00" -> "19h" · "19:30" -> "19h30" */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  return minutes === '00' ? `${Number(hours)}h` : `${Number(hours)}h${minutes}`;
}

/** "2026-03-14" -> "mar 2026" */
export function formatMonthYear(iso: string): string {
  const [year, month] = iso.slice(0, 10).split('-').map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "Ana Souza" -> "AS" · "Ana" -> "A" */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}
