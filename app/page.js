import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <nav>
        <Link href="/appointments">📅 קביעת תורים</Link> |
        <Link href="/admin">🔧 ניהול תורים</Link>
      </nav>
      <hr />
      {children}
    </div>
  );
}
