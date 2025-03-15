import { setUsername } from '@renderer/store/slices/user'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function InputUsername(): JSX.Element {
  const dispatch = useDispatch()
  const [inputUsername, setInputUsername] = useState('')

  const handleBlur = (): void => {
    dispatch(setUsername(inputUsername))
  }

  return (
    <input
      type="text"
      placeholder="Username"
      onChange={(e) => setInputUsername(e.target.value)}
      value={inputUsername}
      onBlur={handleBlur}
    />
  )
}
