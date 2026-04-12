import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import QuickStats from './QuickStats'

describe('QuickStats', () => {
    it('should render QuickStats component', () => {
        render(<QuickStats total={5} served={2} absent={4} pending={10}/>)
        expect(screen.getByText('5')).not.toBeNull()
        expect(screen.getByText('2')).not.toBeNull()
        expect(screen.getByText('4')).not.toBeNull()
        expect(screen.getByText('10')).not.toBeNull()
    })
})