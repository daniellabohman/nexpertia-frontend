'use client';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  // En indstilling for at vælge mellem dummy data og backend
  private useDummyData: boolean;

  constructor(useDummyData: boolean = true) {
    this.useDummyData = useDummyData; // Brug dummy data som standard
  }

  // Skift mellem dummy data og backend, når du er klar til at integrere
  private async sendToBackend<T>(endpoint: string, params: T) {
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      return response.json();
    } catch (error) {
      return { error: 'API request failed' };
    }
  }

  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    if (this.useDummyData) {
      const token = generateToken();
      localStorage.setItem('custom-auth-token', token);
      return {};
    }

    // Send til backend
    return this.sendToBackend('/register', params);
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    if (this.useDummyData) {
      const { email, password } = params;

      // Dummy login check
      if (email !== 'sofia@devias.io' || password !== 'Secret1') {
        return { error: 'Invalid credentials' };
      }

      const token = generateToken();
      localStorage.setItem('custom-auth-token', token);
      return {};
    }

    // Send til backend
    return this.sendToBackend('/login', params);
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    if (this.useDummyData) {
      const token = localStorage.getItem('custom-auth-token');
      if (!token) {
        return { data: null };
      }
      return { data: user };
    }

    // Send til backend
    return this.sendToBackend('/user', {});
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    return {};
  }
}

export const authClient = new AuthClient(true); // Brug dummy data som standard
