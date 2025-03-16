import { AppDispatch } from '@renderer/store'
import { useDispatch } from 'react-redux'

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
