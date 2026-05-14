type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning";
};

const variants = {
  default: "bg-gray-100 text-gray-600",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
};

export default function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-md capitalize ${variants[variant]}`}
    >
      {children}
    </span>
  );
}