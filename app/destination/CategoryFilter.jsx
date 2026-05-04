"use client";
const CategoryFilter = ({ category }) => {
  return (
    <form className="my-5">
      <select
        name="category"
        defaultValue={category}
        className="border px-5 py-2 "
        onChange={(e) => {
          e.preventDefault();
          e.target.form.submit();
        }}
      >
        <option value={""} disabled>
          Category
        </option>
        <option value="">All</option>
        <option value="Beach">Beach</option>
        <option value="Mountain">Mountain</option>
        <option value="Luxury">Luxury</option>
        <option value="adventure">Adventure</option>
      </select>
    </form>
  );
};

export default CategoryFilter;
