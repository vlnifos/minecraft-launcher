import { RootState } from '@renderer/store'
import { useSelectIsJavaInstalled } from '@renderer/store/hooks/selectors'
import { downloadFile } from '@renderer/store/slices/downloadsSlice'
import { updateInstalledJava } from '@renderer/store/slices/modpacks'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Java(): JSX.Element {
  const dispatch = useDispatch()
  const javaUrl = useSelector(
    (state: RootState) => state.modpacks.java && state.modpacks.java.fileUrl
  )

  const isJavaInstalled = useSelectIsJavaInstalled()

  const handleInstallJava = (): void => {
    dispatch(downloadFile({ url: javaUrl, isModpack: false }) as any)
  }

  useEffect(() => {
    dispatch(updateInstalledJava() as any)
  }, [dispatch])

  return (
    <div className="flex justify-center items-center h-full w-full">
      <button
        disabled={isJavaInstalled}
        className="bg-gray-700 hover:bg-gray-600 p-20 rounded-md m-20 w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white text-5xl font-bold"
        onClick={handleInstallJava}
      >
        Install Java
      </button>
    </div>
  )
}
