import Link from "next/link";

export function NavBar() {
    return (
        <nav>
            <Link href="/appointments">📅 קביעת תורים</Link> |
            <Link href="/admin">🔧 ניהול תורים</Link>
        </nav>
    );
};