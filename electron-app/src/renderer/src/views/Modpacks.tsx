import { setupProgressListener } from '@renderer/services/progressListener'
import store from '@renderer/store'
import { useCallback, useEffect } from 'react'
import { fetchModpacks, updateInstalledModpacks } from '@renderer/store/slices/modpacks'
import Modpack from '@renderer/components/Modpack'
import Java from '@renderer/components/Java'
import {
  useSelectIsJavaInstalled,
  useSelectIsDownloading,
  useSelectIsInstallingInProgress,
  useAppSelector
} from '@renderer/store/hooks/selectors'
import { useAppDispatch } from '@renderer/store/hooks/dispatch'

export default function Modpacks(): JSX.Element {
  const dispatch = useAppDispatch()
  const modpacks = useAppSelector((state) => state.modpacks.modpacks)

  const isJavaInstalled = useSelectIsJavaInstalled()
  const isDownloading = useSelectIsDownloading()
  const isInstallingInProgress = useSelectIsInstallingInProgress()
  console.log('isJavaInstalled', isJavaInstalled)

  const handleFetchModpacks = useCallback((): void => {
    dispatch(fetchModpacks())
  }, [dispatch])

  useEffect(() => {
    const progressListener = setupProgressListener(store)
    progressListener.subscribe()

    return (): void => {
      progressListener.unsubscribe()
    }
  }, [])

  useEffect(() => {
    dispatch(updateInstalledModpacks())
    handleFetchModpacks()
  }, [dispatch, handleFetchModpacks])

  return (
    <div className="w-full h-full mt-24">
      {!isDownloading && !isInstallingInProgress && (
        <div className="w-full h-full flex flex-col flex-start">
          {isJavaInstalled ? (
            modpacks.map((modpack) => <Modpack key={modpack.modpackName} modpack={modpack} />)
          ) : (
            <Java />
          )}
        </div>
      )}
    </div>
  )
}
