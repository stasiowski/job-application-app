type InputTypeProps = {
  title: string;
  placeholder: string;
  type: "text" | "date" | "select";
  value: string;
  onChange: (value: string) => void;
};

// returns the rendering of the input element, can either be text | select | date input based on their types
export function InputType({
  title,
  placeholder,
  type,
  value,
  onChange,
}: InputTypeProps) {
  function handleChange(value: string) {
    onChange(value);
  }

  if (type === "select") {
    return (
      <select
        id="status"
        required
        value={value}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        className="border bg-white text-[19px] border-slate-500 shadow-sm rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Select a status</option>
        <option value="Saved">Saved</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offered">Offered</option>
        <option value="Rejected">Rejected</option>
      </select>
    );
  }
  return (
    <input
      id={`${title}`}
      className="border bg-white text-[19px] border-slate-500 shadow-sm rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
      type={`${type}`}
      placeholder={`${placeholder}`}
      required={true}
      value={value}
      onChange={(event) => {
        handleChange(event.target.value);
      }}
    />
  );
}
