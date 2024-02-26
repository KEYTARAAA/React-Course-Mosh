import { useRef, useState } from "react";
import Item from "../Item";
import { FaWindowClose } from "react-icons/fa";
import { categories } from "../Categories";

interface Props {
  items: Item[];
  handleDeleteItem: (item: Item) => void;
}
function OrganisedTable({ items, handleDeleteItem }: Props) {
  //const [itemsFiltered, setItemsFiltered] = useState<Item[]>(items);
  const [category, setCategory] = useState<string>("");
  let itemsFiltered: Item[] = [];

  const getItems = () => {
    return category === ""
      ? items
      : items.filter((item: Item) => item.category === category);
  };
  // getItems();

  const handleCategorySelect = (c: string) => {
    setCategory(c);
    //setItemsFiltered(items.filter((item: Item) => item.category === category));
    getItems();
  };

  return (
    <>
      <label htmlFor="category" className="form-label">
        <strong>Category Filter</strong>
      </label>
      <select
        className="dropdown-item"
        name="category"
        id="category"
        defaultValue={""}
        onChange={(obj) => {
          handleCategorySelect(obj.target.value);
        }}
      >
        <option value="">All Categories</option>
        {categories.map((item, index) => (
          <option className="dropdown-item" value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      <table className="table table-striped-columns table-bordered">
        <thead>
          <tr className="tr">
            <th className="th">Description</th>
            <th className="th">Amount</th>
            <th className="th">Category</th>
            <th className="th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {getItems().map((item, index) => (
            <tr key={index} className="tr">
              <td className="td">{item.description}</td>
              <td className="td">€ {item.amount.toFixed(2)}</td>
              <td className="td">{item.category}</td>
              <td className=" text-center">
                <FaWindowClose
                  color="red"
                  size={30}
                  onClick={() => handleDeleteItem(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="tr">
            <td className="td">Total:</td>
            <td className="td">
              €{" "}
              {getItems()
                .reduce((total, item) => item.amount + total, 0)
                .toFixed(2)}
            </td>
            <td className="td"></td>
            <td className=" text-center"></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
export default OrganisedTable;
