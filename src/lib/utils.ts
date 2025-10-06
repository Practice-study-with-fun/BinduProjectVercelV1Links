import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Normalize name function for better-auth
export function normalizeName(name: string): string {
  if (!name) return "";
  
  // Remove extra spaces and capitalize first letter of each word
  return name
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Valid email domains for registration
export function VALID_DOMAINS(): string[] {
  // In development, allow all domains
  if (process.env.NODE_ENV === "development") {
    return ["*"];
  }
  
  // In production, you can specify allowed domains
  const allowedDomains = process.env.ALLOWED_EMAIL_DOMAINS?.split(",") || [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com"
  ];
  
  return allowedDomains.map(domain => domain.trim());
}
