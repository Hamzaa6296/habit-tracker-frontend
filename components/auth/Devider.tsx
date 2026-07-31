export default function Divider() {
  return (
    <div className="flex items-center">
      <div className="h-px flex-1 bg-gray-200" />

      <span className="mx-4 text-sm font-medium uppercase tracking-wider text-gray-400">
        OR
      </span>

      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}
