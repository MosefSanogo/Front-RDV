import { it, expect } from "vitest";
import {render, screen } from "@testing-library/react";
import ClientStats from "./ClientStats";

it('Should be render the component correctly',()=>{
    render(<ClientStats totalClients={5} activeClients={3} newClients={6} totalAppointments={2} />)
    expect(screen.getByText('5')).not.toBeNull()
    expect(screen.getByText('3')).not.toBeNull()
    expect(screen.getByText('6')).not.toBeNull()
    expect(screen.getByText('2')).not.toBeNull()
})