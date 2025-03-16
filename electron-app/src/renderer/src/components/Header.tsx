import RouteItem from './RouteItem'
import Username from './Username'

export default function Header(): JSX.Element {
  return (
    <div className="flex justify-between items-center border-b border-gray-600 border-b-3">
      {/* Routes */}
      <div>
        <RouteItem to="/">Modpacks</RouteItem>
        <RouteItem to="/friends">Friends</RouteItem>
      </div>

      {/* username */}
      <Username />
    </div>
  )
}
