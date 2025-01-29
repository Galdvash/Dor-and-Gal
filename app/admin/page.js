"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { path: "/api/socket" });

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data.filter((appt) => appt.status === "booked"));
    }

    fetchAppointments();

    socket.on("appointmentUpdated", (updatedAppointments) => {
      setAppointments(
        updatedAppointments.filter((appt) => appt.status === "booked")
      );
    });

    return () => {
      socket.off("appointmentUpdated");
    };
  }, []);

  return (
    <div>
      <h1>📅 יומן תורים של האדמין</h1>
      <ul>
        {appointments.length === 0 ? (
          <p>אין עדיין תורים שנקבעו.</p>
        ) : (
          appointments.map((appt) => (
            <li key={appt.id}>{appt.time} - 🛑 תפוס</li>
          ))
        )}
      </ul>
    </div>
  );
}
