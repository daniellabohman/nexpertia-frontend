export const paths = {
  home: '/',
  landing: '/landing',
  auth: {
    login: '/auth/login',
    register: '/auth/signup',
    resetPassword: '/auth/reset-password',
  },
  dashboard: {
    overview: '/dashboard',
    profil: '/dashboard/profil',
    documents: '/dashboard/documents',
    analyze: '/dashboard/analyze',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/betaling' },
} as const;
