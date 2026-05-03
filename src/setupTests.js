import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Global Firebase Mock
vi.mock('./firebase', () => ({
  db: {},
  auth: {},
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  doc: vi.fn(),
  setDoc: vi.fn(),
  getDoc: vi.fn(),
  onSnapshot: vi.fn(() => vi.fn()),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
}));
