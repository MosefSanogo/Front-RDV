import { it, expect,vi } from "vitest";
import {render, screen } from "@testing-library/react";
import type { Client } from "../../../config/Types";
import type { newClient } from "./NewClientDrawer";
import NewClientDrawer from "./NewClientDrawer";

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
interface NewClientProps {
  onClose: () => void;
  onSave?: (data: newClient) => void;
  client: Client;
}
const props:NewClientProps = {
    onClose: vi.fn(),
    onSave: vi.fn(),
    client: mockClient,
}

it('renders NewClientDrawer component', () => {
    render(<NewClientDrawer {...props} />)
    expect(screen.getByText('Nom')).not.toBeNull()
    expect(screen.getByText('Prénom')).not.toBeNull()
    expect(screen.getByText('Téléphone')).not.toBeNull()
    expect(screen.getByText('John Doe')).not.toBeNull()
})

it('Should call onSave', () => {
    const onSaveMock = vi.fn();
    render(<NewClientDrawer {...props} onSave={onSaveMock} />)
    const saveButton = screen.getByText('Enregistrer')
    saveButton.click()
    expect(onSaveMock).toHaveBeenCalled()
})

it('Should call onClose', () => {
    const onCloseMock = vi.fn();
    render(<NewClientDrawer {...props} onClose={onCloseMock} />)
    const closeButton = screen.getByTestId('close-btn')
    closeButton.click()
    expect(onCloseMock).toHaveBeenCalled()
})

