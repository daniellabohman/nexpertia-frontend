export const paths = {
  home: '/',
  landing: '/landing',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    resetPassword: '/auth/reset-password',
  },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/profil',
    dokumenter: '/dashboard/dokumenter',
    analyse: '/dashboard/analyse',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
