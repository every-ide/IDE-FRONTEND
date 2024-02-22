interface IAuthInput {
  label: string;
  name: string;
  type: string;
  registerOptions: any;
  placeholder: string;
  errors: any;
  isReadOnly?: boolean;
}

const AuthInput = ({
  label,
  name,
  type,
  registerOptions,
  placeholder,
  errors,
  isReadOnly = false,
}: IAuthInput) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm">{label}</label>
      <input
        type={type}
        name={name}
        readOnly={isReadOnly}
        {...registerOptions}
        placeholder={placeholder}
        className={`h-[44px] rounded-lg px-3 text-black focus:outline-0 ${!errors[name] ? 'mb-[28px]' : 'mb-0'}`}
      />
      {errors[name] && (
        <p className="mt-2 w-full text-right text-sm font-semibold text-accent">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default AuthInput;
