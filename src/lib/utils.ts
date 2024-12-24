import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const DUMMY_AVATAR = `https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg`
export function setTitle (title: string) {
  document.title = title
}
export function isValidUrl(url: string): boolean {
  const urlPattern = /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([/?].*)?$/;
  return urlPattern.test(url);
}