import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'oversigt', title: 'Oversigt', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'dokuments', title: 'Dokumenter', href: paths.dashboard.dokumenter, icon: 'filer' },
  { key: 'scan-dokumenter', title: 'Scan&Analyse', href: paths.dashboard.analyse, icon: 'plugs-connected' },
  { key: 'profil', title: 'Profil', href: paths.dashboard.account, icon: 'user' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'betaling', title: 'Betaling', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
