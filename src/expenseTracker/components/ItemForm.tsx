import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "../Categories";

const schema = z.object({
  description: z.string().min(1),
  amount: z.number().min(0.01),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Please selecy a category." }),
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FieldValues) => void;
}

function ItemForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          <strong>Description</strong>
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">
            <strong>{errors.description.message}</strong>
          </p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          <strong>Amount</strong>
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
          step="0.01"
        />
        {errors.amount && (
          <p className="text-danger">
            <strong>{errors.amount.message}</strong>
          </p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          <strong>Category</strong>
        </label>
        <select
          {...register("category")}
          className="form-select"
          name="category"
          id="category"
          defaultValue={""}
        >
          <option value="" disabled hidden>
            All Categories
          </option>
          {categories.map((item, index) => (
            <option className="dropdown-item" value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <button disabled={!isValid} className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
export default ItemForm;
