import { NavLink } from 'react-router-dom'
import * as clsx from 'clsx'

export default function RouteItem({
  to,
  children
}: {
  to: string
  children: React.ReactNode
}): JSX.Element {
  const baseStyles = 'text-2xl font-bold bg-gray-700 hover:bg-gray-600 p-2 rounded-md m-4'
  const activeStyles = 'text-blue-500'

  return (
    <NavLink to={to} className={({ isActive }) => clsx(baseStyles, isActive && activeStyles)}>
      {children}
    </NavLink>
  )
}
