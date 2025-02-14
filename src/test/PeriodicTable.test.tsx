import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import type { ElementData } from '../types/elements'
import PeriodicTable from '../components/PeriodicTable'

// Mock data matching your ElementData interface
const mockElements: ElementData[] = [
  {
    atomic_number: 1,
    element: 'Hydrogen',
    symbol: 'H',
    atomic_mass: '1.008'
  },
  {
    atomic_number: 2,
    element: 'Helium',
    symbol: 'He',
    atomic_mass: '4.0026'
  }
]

// Mock the fetch API
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockElements),
  } as Response)
)

describe('PeriodicTable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the table with elements', async () => {
    render(<PeriodicTable />)
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Hydrogen')).toBeInTheDocument()
    })

    // Verify table structure
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Atomic Number')).toBeInTheDocument()
    expect(screen.getByText('Symbol')).toBeInTheDocument()
    
    // Verify mock data is displayed
    mockElements.forEach(element => {
      expect(screen.getByText(element.element)).toBeInTheDocument()
      expect(screen.getByText(element.symbol)).toBeInTheDocument()
    })
  })

  it('handles search input', async () => {
    render(<PeriodicTable />)
    
    const searchInput = screen.getByPlaceholderText('Search...')
    fireEvent.change(searchInput, { target: { value: 'Helium' } })

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('search=Helium')
      )
    })
  })

  it('handles pagination', async () => {
    render(<PeriodicTable />)
    
    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('offset=10')
      )
    })
  })
})