export const DropDown = ({ defaultValue, onChange }) => {
  return (
    <select
      defaultValue={defaultValue}
      onChange={onChange}
      className="border-2 border-rose-500] ml-[20px]"
    >
      <option value="name">Name</option>
      <option value="create">Date of creation</option>
      <option value="change">Date of change</option>
      <option value="weight">By weight</option>
    </select>
  );
};
