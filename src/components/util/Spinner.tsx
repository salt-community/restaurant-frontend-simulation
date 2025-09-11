interface SpinnerProps {
  size?: string;
  color?: string;
}

export default function Spinner({ size = "w-8 h-8", color = "border-blue-600" }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${size} border-4 ${color} border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}