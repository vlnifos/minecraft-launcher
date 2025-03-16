import { useAppDispatch } from '@renderer/store/hooks/dispatch'
import { useAppSelector, useSelectIsJavaInstalled } from '@renderer/store/hooks/selectors'
import { downloadFile } from '@renderer/store/slices/downloadsSlice'
import { updateInstalledJava } from '@renderer/store/slices/modpacks'
import { useEffect } from 'react'

export default function Java(): JSX.Element {
  const dispatch = useAppDispatch()
  const javaUrl = useAppSelector((state) => state.modpacks.java && state.modpacks.java.fileUrl)

  const isJavaInstalled = useSelectIsJavaInstalled()

  const handleInstallJava = (): void => {
    dispatch(downloadFile({ url: javaUrl || '', isModpack: false }))
  }

  useEffect(() => {
    dispatch(updateInstalledJava())
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
