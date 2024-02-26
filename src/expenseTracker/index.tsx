import { useState } from "react";
import ItemForm from "./components/ItemForm";
import OrganisedTable from "./components/OrganisedTable";
import { FieldValues, useForm } from "react-hook-form";
import Item from "./Item";
function Application() {
  const [items, setItems] = useState<Item[]>([]);
  const handleItemFormSubmit = (data: FieldValues) => {
    setItems([
      ...items,
      {
        description: data.description,
        amount: data.amount,
        category: data.category,
        id: items.length + 1,
      },
    ]);
  };
  const handleItemDelete = (item: Item) => {
    setItems((l) => l.filter((i) => i.id !== item.id));
  };
  return (
    <div>
      <ItemForm onSubmit={handleItemFormSubmit} />
      <OrganisedTable items={items} handleDeleteItem={handleItemDelete} />
    </div>
  );
}
export default Application;
