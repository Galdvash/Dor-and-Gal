"use client";

import { useState, useEffect } from "react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data);
    }

    fetchAppointments();
  }, []);

  async function bookAppointment(id) {
    const res = await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      const updated = await res.json();
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id ? { ...appt, status: "booked" } : appt
        )
      );
    }
  }

  return (
    <div>
      <h1>📅 רשימת תורים</h1>
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
