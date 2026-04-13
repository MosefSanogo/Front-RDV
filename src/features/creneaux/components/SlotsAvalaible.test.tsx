import { it, expect,vi } from "vitest";
import {render, screen } from "@testing-library/react";
import type { TimeSlot, TimeSlotsCardProps } from "./SlotsAvalaible";
import SlotsCard from "./SlotsAvalaible";

const mockTimeSlots: TimeSlot[] = [
    { id: 1, time: "08:00", capacity: 5, isCompleted: false, available: 5, percentage: 100, isPeakHour: false },
    { id: 2, time: "09:00", capacity: 3, isCompleted: true, available: 0, percentage: 0, isPeakHour: false },
    { id: 3, time: "10:00", capacity: 4, isCompleted: false, available: 4, percentage: 100, isPeakHour: false },
];

const defaultProps: TimeSlotsCardProps = {
    value: new Date(),
    onDateChange: vi.fn(),
    timeSlots: mockTimeSlots,
    isLoading: false,
    localName: "Test Local"
}

it('Should render the component correctly',()=>{
    render(<SlotsCard {...defaultProps} />)
    expect(screen.getByText('08h00')).not.toBeNull()
    expect(screen.getByText('09h00')).not.toBeNull()
    expect(screen.getByText('10h00')).not.toBeNull()
})

it('Should show loading',()=>{
    render(<SlotsCard {...defaultProps} isLoading={true} />)
    expect(screen.getByTestId('loader')).not.toBeNull()
})

it('Should show empty case',()=>{
    render(<SlotsCard {...defaultProps} timeSlots={[]} />)
    expect(screen.getByTestId('empty-value')).not.toBeNull()
})  
it('Should show length correctly',()=>{
    render(<SlotsCard {...defaultProps}  />)
    expect(screen.getAllByTestId('hour-slot').length).toBe(3)
})  