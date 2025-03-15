import { useState } from 'react';
import { Link } from 'react-router-dom';
import { setUsername } from '@renderer/store/slices/user';
import { useDispatch } from 'react-redux';

export default function Header() {
  const [usernameRaw, setUsernameRaw] = useState('');
  const dispatch = useDispatch();

  const handleUsernameInputBlur = () => {
    dispatch(setUsername(usernameRaw));
  }

  return (
    <div className="flex justify-between items-center p-4">
      {/* Routes */}
      <div>
        <Link to="/">Modpacks</Link>
        <Link to="/friends">Friends</Link>
      </div>

      {/* user */}
      <div>
        <input type="text" placeholder="Username" onChange={(e) => setUsernameRaw(e.target.value)} value={usernameRaw} onBlur={handleUsernameInputBlur} />
      </div>
    </div>
  )
}