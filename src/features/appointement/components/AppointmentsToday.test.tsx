import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AppointmentsToday from './AppointmentsToday';

interface Appointment {
  id: number;
  heure: string;
  client: string;
  service: string;
  statut: string;
  isActive?: boolean;
}
const appointments: Appointment[] = [
  {
    id: 1, 
    heure: '10:00',
    client: 'John Doe',
    service: 'Service A',
    statut: 'pending',
  },
  {
    id: 2,
    heure: '11:00',
    client: 'Jane Smith',
    service: 'Service B',
    statut: 'served',
    isActive: true,
  },
    {
    id: 3,
    heure: '12:00',
    client: 'Bob Johnson',
    service: 'Service C',
    statut: 'absent',
  },
]

describe('AppointmentsToday', () => {
  it('should render AppointmentsToday component', () => {
    render(<AppointmentsToday appointments={appointments} />)
    expect(screen.getByText('Jane Smith')).not.toBeNull()
  })
  it('should render status badges correctly', () => {
    render(<AppointmentsToday appointments={appointments} />)
    expect(screen.getByText('pending')).not.toBeNull()
    expect(screen.getByText('served')).not.toBeNull()
    expect(screen.getByText('absent')).not.toBeNull()
  })
    it('should be empty when no appointments are provided', () => {
    render(<AppointmentsToday appointments={[]} />)
    expect(screen.getByText("Aucun rendez-vous aujourd’hui")).not.toBeNull()
  })
  it('should have the correct length', () => {
    render(<AppointmentsToday appointments={appointments} />)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(appointments.length + 1)
  })
})