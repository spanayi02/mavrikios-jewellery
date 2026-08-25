import { siteConfig } from "@/lib/site-config";

const TIME_ZONE = "Asia/Nicosia";
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export interface StoreStatus {
  isOpen: boolean;
  label: string;
}

/** Computes live open/closed status from siteConfig.hours in the store's local timezone. */
export function getStoreStatus(now: Date = new Date()): StoreStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? dayNames[now.getDay()];
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const nowMinutes = hour * 60 + minute;

  const todayIndex = siteConfig.hours.findIndex((h) => h.day === weekday);
  const today = siteConfig.hours[todayIndex];

  if (today && !today.closed && today.open && today.close) {
    if (nowMinutes >= toMinutes(today.open) && nowMinutes < toMinutes(today.close)) {
      return { isOpen: true, label: `Open now · Closes ${formatTime(today.close)}` };
    }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = siteConfig.hours[(todayIndex + offset) % siteConfig.hours.length];
    if (nextDay && !nextDay.closed && nextDay.open) {
      const dayLabel = offset === 1 ? "Tomorrow" : nextDay.day;
      return { isOpen: false, label: `Closed · Opens ${formatTime(nextDay.open)} ${dayLabel}` };
    }
  }

  return { isOpen: false, label: "Closed" };
}

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${period}` : `${hour12}:${String(m).padStart(2, "0")}${period}`;
}
