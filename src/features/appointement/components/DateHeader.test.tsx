import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DateHeader from './DateHeader'

describe('DateHeader', () => {
    it('should render DateHeader component', () => {
        render(<DateHeader date={new Date('2024-06-15')} onDateChange={()=>{}}/>)
        expect(screen.getByText('samedi 15 juin 2024')).not.toBeNull()
    })
    it('should display "Aujourd\'hui" badge for today\'s date', () => {
        const today = new Date();
        render(<DateHeader date={today} onDateChange={()=>{}}/>)
        expect(screen.getByText("Aujourd'hui")).not.toBeNull()
    })
    it('should date change when the button suivant is clicked', () => {
        const mockOnDateChange = vi.fn();
        render(<DateHeader date={new Date('2024-06-15')} onDateChange={mockOnDateChange} />)
        const nextButton = screen.getByTitle('Jour suivant');
        nextButton.click();
        expect(mockOnDateChange).toHaveBeenCalled();
    })
    it('should date change when the button precedent is clicked', () => {
        const mockOnDateChange = vi.fn();
        render(<DateHeader date={new Date('2024-06-15')} onDateChange={mockOnDateChange} />)
        const previousButton = screen.getByTitle('Jour précédent');
        previousButton.click();
        expect(mockOnDateChange).toHaveBeenCalled();
    })
})