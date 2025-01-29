let appointments = [
  { id: 1, time: "10:00", status: "available" },
  { id: 2, time: "11:00", status: "booked" },
  { id: 3, time: "12:00", status: "available" },
];

// GET – החזרת רשימת התורים
export async function GET() {
  return Response.json(appointments);
}

// PATCH – קביעת תור
export async function PATCH(request) {
  const { id } = await request.json();

  // חיפוש התור המתאים
  const appointment = appointments.find((appt) => appt.id === id);

  if (!appointment || appointment.status !== "available") {
    return new Response(JSON.stringify({ error: "התור לא פנוי" }), {
      status: 400,
    });
  }

  appointment.status = "booked"; // שינוי סטטוס התור

  return Response.json({ success: true, appointment });
}
