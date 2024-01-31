interface IAuthInput {
  label: string;
  name: string;
  type: string;
  registerOptions: any;
  placeholder: string;
  errors: any;
}

const AuthInput = ({
  label,
  name,
  type,
  registerOptions,
  placeholder,
  errors,
}: IAuthInput) => {
  return (
    <div className="flex flex-col h-[100px]">
      <label className="mb-2 text-md">{label}</label>
      <input
        type={type}
        name={name}
        {...registerOptions}
        placeholder={placeholder}
        className={`h-[44px] rounded-lg px-3 text-black`}
      />
      {errors[name] && (
        <p className="w-full text-right mt-2 text-accentBlue font-semibold">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default AuthInput;
