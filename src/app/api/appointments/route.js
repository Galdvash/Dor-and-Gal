let appointments = [
  { id: 1, time: "10:00", status: "available" },
  { id: 2, time: "11:00", status: "available" },
  { id: 3, time: "12:00", status: "available" },
];

// שליפת התורים
export async function GET() {
  return Response.json(appointments);
}

// קביעת תור ועדכון בזמן אמת
export async function PATCH(request) {
  const { id } = await request.json();
  const appointment = appointments.find((appt) => appt.id === id);

  if (!appointment || appointment.status !== "available") {
    return new Response(JSON.stringify({ error: "התור כבר נתפס" }), {
      status: 400,
    });
  }

  appointment.status = "booked";

  if (global.io) {
    global.io.emit("appointmentUpdated", appointments);
  }

  return Response.json({ success: true, appointment });
}

// איפוס כל התורים
export async function DELETE() {
  appointments = [
    { id: 1, time: "10:00", status: "available" },
    { id: 2, time: "11:00", status: "available" },
    { id: 3, time: "12:00", status: "available" },
  ];

  if (global.io) {
    global.io.emit("appointmentUpdated", appointments);
  }

  return Response.json({ success: true, message: "המערכת אופסה!" });
}
