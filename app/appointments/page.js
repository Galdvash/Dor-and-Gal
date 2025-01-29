"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { path: "/api/socket" });

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data);
    }

    fetchAppointments();

    socket.on("appointmentUpdated", (updatedAppointments) => {
      setAppointments(updatedAppointments);
    });

    return () => {
      socket.off("appointmentUpdated");
    };
  }, []);

  async function bookAppointment(id) {
    await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  return (
    <div>
      <h1>📅 קביעת תור</h1>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            {appt.time} - {appt.status === "available" ? "🟢 פנוי" : "🔴 תפוס"}
            {appt.status === "available" && (
              <button onClick={() => bookAppointment(appt.id)}>קבע תור</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
