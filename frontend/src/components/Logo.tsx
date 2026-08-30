interface Props {
  className?: string
  size?: number
}

export default function Logo({ className = '', size = 36 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield body */}
      <path
        d="M18 3L5 8.5V18c0 7.18 5.58 13.89 13 15.5C25.42 31.89 31 25.18 31 18V8.5L18 3Z"
        fill="url(#shield-grad)"
      />
      {/* Inner shield highlight */}
      <path
        d="M18 7L9 11.25V18c0 5.04 3.92 9.75 9 11.08C23.08 27.75 27 23.04 27 18V11.25L18 7Z"
        fill="white"
        fillOpacity="0.15"
      />
      {/* Checkmark */}
      <path
        d="M12.5 18.5L16 22L23.5 14"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Star / certificate dot accent */}
      <circle cx="18" cy="11" r="1.5" fill="white" fillOpacity="0.7" />
      <defs>
        <linearGradient id="shield-grad" x1="5" y1="3" x2="31" y2="33.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

