import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
      notFound(); // אם ה-API מחזיר שגיאה, נשלח לדף 404
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      notFound(); // אם ה-API לא מחזיר JSON תקין, מפנים ל-404
    }
    const product = await res.json();

    // אם התשובה ריקה או לא מכילה id, נפנה ל-404
    if (!product || !product.id) {
      notFound();
    }

    return (
      <div>
        <h1>{product.title}</h1>
        <p>🛒 קטגוריה: {product.category}</p>
        <p>💲 מחיר: ${product.price}</p>
      </div>
    );
  } catch (error) {
    console.error("שגיאה בהבאת הנתונים:", error);
    notFound(); // אם משהו לא תקין, מפנים לדף 404
  }
}
