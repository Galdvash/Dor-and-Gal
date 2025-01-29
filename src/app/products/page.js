export default async function productsPage() {
  const fetchProducs = await fetch(`https://fakestoreapi.com/products`);
  const products = await fetchProducs.json();

  if (!products) {
    return <h1>cant finnd product</h1>;
  }

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
