import RouteItem from './RouteItem'
import Username from './Username'

export default function Header(): JSX.Element {
  return (
    <div className="flex justify-between items-center fixed w-screen z-1 bg-gray-800/50 backdrop-blur-sm">
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
