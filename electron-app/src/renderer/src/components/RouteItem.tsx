import { Link } from "react-router-dom";

export default function RouteItem({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <Link to={to} className="text-2xl font-bold">{children}</Link>
  )
}