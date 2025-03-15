import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUsername } from '@renderer/store/slices/user'

export default function Username(): JSX.Element {
  const [usernameRaw, setUsernameRaw] = useState('')
  const dispatch = useDispatch()

  const handleUsernameInputBlur = (): void => {
    dispatch(setUsername(usernameRaw))
    localStorage.setItem('username', usernameRaw)
  }

  useEffect(() => {
    const savedUsername = localStorage.getItem('username')
    if (savedUsername) {
      setUsernameRaw(savedUsername)
      dispatch(setUsername(savedUsername))
    }
  }, [dispatch])

  return (
    <div>
      <input
        className="p-4 rounded-md focus:bg-gray-600 bg-gray-700 border-none outline-none"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsernameRaw(e.target.value)}
        value={usernameRaw}
        onBlur={handleUsernameInputBlur}
      />
    </div>
  )
}
