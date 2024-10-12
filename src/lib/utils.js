import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into "MM/DD/YYYY" format.
 * @param {string} dateStr - The date string to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}