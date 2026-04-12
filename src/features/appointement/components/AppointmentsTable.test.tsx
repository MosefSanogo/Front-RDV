import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { Appointment } from './AppointmentsTable'
import AppointmentsTable from './AppointmentsTable'
const tab:Appointment[]= [
    {
        id: '1',
        time: '10:00',
        fullName: 'John Doe',
        phone: '1234567890',
        service: 'Service A',
        status: 'pending', 
    },
    {
        id: '2',
        time: '11:00',
        fullName: 'Jane Smith',
        phone: '0987654321',
        service: 'Service B',
        status: 'served', 
    },
    {
        id: '3',
        time: '12:00',
        fullName: 'Bob Johnson',
        phone: '5555555555',
        service: 'Service C',
        status: 'absent', 
    },    

]
describe('Appointement', () => {
    it('should render Appointement component', () => {
        render(<AppointmentsTable appointments={tab} onCall={() => {}} />)
        expect(screen.getByText('Jane Smith')).not.toBeNull()
    })

    it('should render status badges correctly', () => {
        render(<AppointmentsTable appointments={tab} onCall={() => {}} />)
        expect(screen.getByText('À VENIR')).not.toBeNull()
        expect(screen.getByText('SERVI')).not.toBeNull()
        expect(screen.getByText('ABSENT')).not.toBeNull()
    })

    it('should be empty when no appointments are provided', () => {
        const mockOnCall = vi.fn()
        render(<AppointmentsTable appointments={[]} onCall={mockOnCall} />)
        expect(screen.queryByText('Jane Smith')).toBeNull()
    })

    it('should have the correct length', () => {
        const mockOnCall = vi.fn()
        render(<AppointmentsTable appointments={tab} onCall={mockOnCall} />)
        const rows = screen.getAllByRole('row')
        expect(rows).toHaveLength(tab.length + 1)
    })

})
