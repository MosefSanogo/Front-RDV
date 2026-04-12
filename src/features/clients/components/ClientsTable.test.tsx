import { it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { Client } from "../../../config/Types";
import ClientsTable from "./ClientsTable";

const mockClient: Client[] = [
  {
    id: "1",
    fullName: "John Doe",
    phone: "123456",
    email: "john@test.com",
    status: "active",
    createdAt: "2024-01-01",
    totalAppointments: 5,
    lastAppointment: "2024-05-12T10:30:00Z",
    absences: 1,
    services: ["consultation"],
    notes: "Client fidèle",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    phone: "654321",
    email: "jane@test.com",
    status: "active",
    createdAt: "2024-01-01",
    totalAppointments: 5,
    lastAppointment: "2024-05-12T10:30:00Z",
    absences: 1,
    services: ["consultation"],
    notes: "Client fidèle",
  },
];

const clientsTableProps = {
  clients: mockClient,
  onViewClient: vi.fn(),
  onSort: vi.fn(),
  sortBy: "fullName",
  sortOrder: "asc" as "asc" | "desc",
};

it("renders ClientsTable component", () => {
  render(<ClientsTable {...clientsTableProps} />);
  expect(screen.getByText("John Doe")).not.toBeNull();
  expect(screen.getByText("Jane Smith")).not.toBeNull();
});

it("should fullname be null", () => {
  const clientTableProps = {
    clients: [],
    onViewClient: vi.fn(),
    onSort: vi.fn(),
    sortBy: "fullName",
    sortOrder: "asc" as "asc" | "desc",
  };
  render(<ClientsTable {...clientTableProps} />);
  expect(screen.getByText("Aucun client trouvé")).not.toBeNull();
});

it("should call onViewClient when view button is clicked", () => {
  render(<ClientsTable {...clientsTableProps} />);
  const button = screen.getAllByTitle("Voir le détail")[0];
  fireEvent.click(button);
  expect(clientsTableProps.onViewClient).toHaveBeenCalledWith(
    mockClient[0],
    "consultation"
  );
});
it("should call onSort when sort header is clicked", () => {
  render(<ClientsTable {...clientsTableProps} />);
  const sortHeader = screen.getByTitle("sort");
  fireEvent.click(sortHeader);
  expect(clientsTableProps.onSort).toHaveBeenCalledWith("name");
});
