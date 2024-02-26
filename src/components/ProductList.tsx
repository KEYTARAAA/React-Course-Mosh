import { useEffect, useState } from "react";
interface Prop {
  category: string;
}
function ProducList({ category }: Prop) {
  const [products, setProducts] = useState<string[]>([]);
  useEffect(() => {
    console.log("Fetching producs in " + category + "...");
    setProducts(["Bag", "Hat"]);
  }, [category]);
  return (
    <h1>
      <strong>{category}</strong>
    </h1>
  );
}
export default ProducList;
