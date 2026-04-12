import {it, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import axios from 'axios';
import ClientDrawer from './ClientDrawer';
import type { Client } from '../../../config/Types';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true)

const mockClient:Client = {
  id: '1',
  fullName: 'John Doe',
  phone: '123456',
  email: 'john@test.com',
  status: 'active',
  createdAt: '2024-01-01',
  totalAppointments: 5,
  lastAppointment: '2024-05-12T10:30:00Z',
  absences: 1,
  services: ['consultation'],
  notes: 'Client fidèle'
}

const defaultProps = {
  client: mockClient,
  onClose: vi.fn(),
  onUpdate: vi.fn(),
  onInfoUpdate: vi.fn(),
  sousService: 'consultation'
}

it('affiche les infos client et historique', async () => {

  mockedAxios.get.mockResolvedValue({
    data: [
      {
        date: '12/05/2024',
        time: '10:30:00',
        service: 'consultation',
        status: 'served'
      }
    ]
  })

  render(<ClientDrawer {...defaultProps} />)

  // Vérifie le nom
  expect(screen.getByText('John Doe')).not.toBeNull()

  // Vérifie téléphone
  expect(screen.getByText('123456')).not.toBeNull()

  // Vérifie historique après chargement
  await waitFor(() => {
    expect(screen.getByText('consultation')).not.toBeNull()
  })
})

it('active le mode édition', () => {

  render(<ClientDrawer {...defaultProps} />)

  const btn = screen.getByText('Modifier')
  fireEvent.click(btn)

  expect(screen.getByText('Enregistrer')).not.toBeNull()
})

it('appelle onUpdate et onInfoUpdate', () => {

  render(<ClientDrawer {...defaultProps} />)

  fireEvent.click(screen.getByText('Modifier'))
  fireEvent.click(screen.getByText('Enregistrer'))

  expect(defaultProps.onUpdate).toHaveBeenCalled()
  expect(defaultProps.onInfoUpdate).toHaveBeenCalled()
})

it('ferme le drawer', () => {

  render(<ClientDrawer {...defaultProps} />)

  const closeBtn = screen.getByTestId('close-btn')

  fireEvent.click(closeBtn)

  expect(defaultProps.onClose).toHaveBeenCalled()
})