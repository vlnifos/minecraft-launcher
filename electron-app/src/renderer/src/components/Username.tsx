import { useState } from 'react'
import { useEffect } from 'react'
import { setUsername } from '@renderer/store/slices/user'
import { useAppDispatch } from '@renderer/store/hooks/dispatch'

export default function Username(): JSX.Element {
  const [usernameRaw, setUsernameRaw] = useState('')
  const dispatch = useAppDispatch()

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
        className="p-8 pr-0 rounded-none focus:bg-gray-600 bg-gray-700 border-none outline-none w-80 text-white text-2xl font-bold"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsernameRaw(e.target.value)}
        value={usernameRaw}
        onBlur={handleUsernameInputBlur}
      />
    </div>
  )
}
