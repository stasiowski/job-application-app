import { InputType } from "./InputType";

type FormProps = {
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function AddApplicationFormRow({
  title,
  placeholder,
  value,
  onChange,
}: FormProps) {
  let type: "text" | "date" | "select";

  if (title === "Date") {
    type = "date";
  } else if (title === "Status") {
    type = "select";
  } else {
    type = "text";
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        <div className="flex">
          <label className="text-[20px]" htmlFor={`${title}`}>
            {title}
          </label>
          <span className="text-red-600 ml-1">*</span>
        </div>
        <InputType
          title={title}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
