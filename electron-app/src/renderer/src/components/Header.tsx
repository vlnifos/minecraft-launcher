import RouteItem from './RouteItem';
import Username from './Username';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4">
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