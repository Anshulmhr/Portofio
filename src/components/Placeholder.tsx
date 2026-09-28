export function Placeholder({ value }: { value: string }) {
  return <p className="placeholder"><span className="placeholder-label">Editorial placeholder</span><code>{value}</code></p>;
}
