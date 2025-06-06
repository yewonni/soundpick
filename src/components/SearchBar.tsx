interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholderText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
}

export default function SearchBar({
  placeholderText,
  value,
  onChange,
  onSubmit,
  ...rest
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        className="w-full min-w-[300px] p-2 pl-0 text-sm border-b-2 bg-transparent border-b-white text-white placeholder:text-gray-100 focus:outline-none appearance-none rounded-none"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        {...rest}
      />

      <svg
        className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer"
        width="26"
        height="28"
        viewBox="0 0 26 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onSubmit}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4 5.60002C9.02085 5.60002 7.69821 6.19002 6.72302 7.24023C5.74783 8.29043 5.19998 9.71481 5.19998 11.2C5.19998 12.6852 5.74783 14.1096 6.72302 15.1598C7.69821 16.21 9.02085 16.8 10.4 16.8C11.7791 16.8 13.1017 16.21 14.0769 15.1598C15.0521 14.1096 15.6 12.6852 15.6 11.2C15.6 9.71481 15.0521 8.29043 14.0769 7.24023C13.1017 6.19002 11.7791 5.60002 10.4 5.60002ZM2.59998 11.2C2.59982 9.87801 2.88941 8.57462 3.4452 7.39586C4.00099 6.2171 4.80727 5.19626 5.79849 4.41636C6.78971 3.63646 7.93786 3.11952 9.14957 2.90759C10.3613 2.69566 11.6023 2.79472 12.7718 3.19671C13.9412 3.59871 15.0061 4.29229 15.8797 5.22104C16.7533 6.14979 17.411 7.28749 17.7994 8.54161C18.1877 9.79573 18.2957 11.1309 18.1146 12.4384C17.9335 13.7459 17.4683 14.989 16.757 16.0664L23.0191 22.8102C23.2559 23.0743 23.3869 23.4279 23.384 23.795C23.381 24.1621 23.2443 24.5132 23.0032 24.7728C22.7622 25.0323 22.4362 25.1796 22.0953 25.1828C21.7544 25.186 21.4261 25.0448 21.1809 24.7898L14.9201 18.0474C13.7531 18.941 12.3803 19.4714 10.9521 19.5806C9.52378 19.6897 8.09517 19.3734 6.82277 18.6662C5.55036 17.959 4.48327 16.8883 3.73842 15.5713C2.99356 14.2544 2.5997 12.742 2.59998 11.2Z"
          fill="white"
        />
      </svg>
    </form>
  );
}
