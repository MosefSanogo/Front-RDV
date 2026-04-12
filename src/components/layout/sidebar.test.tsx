import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Sidebar from './sidebar'

// Mock du contexte Auth
const mockAuthContext = {
  logout: vi.fn(),
  user: null,
  login: vi.fn(),
  isAuth: false,
  setUser: vi.fn(),
}

const renderSidebar = () => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthContext}>
        <Sidebar />
      </AuthContext.Provider>
    </MemoryRouter>
  )
}

describe('Sidebar', () => {
  it('renders sidebar items correctly', () => {
    renderSidebar()

    expect(screen.getByText('Dashboard')).not.toBeNull()
    expect(screen.getByText('Rendez-vous')).not.toBeNull()
    expect(screen.getByText('Services')).not.toBeNull()
    expect(screen.getByText('Créneaux')).not.toBeNull()
    expect(screen.getByText('Clients')).not.toBeNull()
    expect(screen.getByText('Statistiques')).not.toBeNull()
    expect(screen.getByText('Paramètres')).not.toBeNull()
  })

  it('renders logout button', () => {
    renderSidebar()
    expect(screen.getByText('Deconnexion')).not.toBeNull()
  })
})