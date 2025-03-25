import { getSiteURL } from '@/lib/get-site-url';
import { LogLevel } from '@/lib/logger';

// export const API_BASE_URL = "http://13.61.184.230:8000"; // Produktion Flask-backend's IP og port

export const API_BASE_URL = "http://localhost:8000"; // Lokal Flask-backend's IP og port

export interface Config {
  site: { name: string; description: string; themeColor: string; url: string };
  logLevel: keyof typeof LogLevel;
}

export const config: Config = {
  site: { name: 'Nexpertia', description: '', themeColor: '#090a0b', url: getSiteURL() },
  logLevel: (process.env.NEXT_PUBLIC_LOG_LEVEL as keyof typeof LogLevel) ?? LogLevel.ALL,
};
