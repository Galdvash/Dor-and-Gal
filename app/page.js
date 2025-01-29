import { cache } from "react";

const getTime = cache(async () => {
  return new Date().toLocaleTimeString();
});

export default async function Home() {
  const time = await getTime();
  return <h1>הזמן בזמן בנייה (SSG): {time}</h1>;
}

export const dynamic = "force-static"; // גורם ל-SSG – נתונים לא יתעדכנו ברענון
