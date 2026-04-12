import { vi } from 'vitest';

// On intercepte les modules AVANT qu'ils ne soient chargés par MUI
vi.mock('@asamuzakjp/css-color', () => ({
  default: {} 
}));

vi.mock('@csstools/css-calc', () => ({
  default: {}
}));