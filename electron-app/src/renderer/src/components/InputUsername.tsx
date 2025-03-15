import { RootState } from "@renderer/store";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "@renderer/store/slices/user";
import { useState } from "react";
export default function InputUsername() {
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const [inputUsername, setInputUsername] = useState('');

  const handleBlur = () => {
    dispatch(setUsername(inputUsername));
  }

  return (
    <input type="text" placeholder="Username" onChange={(e) => setInputUsername(e.target.value)} value={inputUsername} onBlur={handleBlur} />
  )
}
