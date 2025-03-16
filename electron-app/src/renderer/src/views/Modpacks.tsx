import { setupProgressListener } from '@renderer/services/progressListener'
import store from '@renderer/store'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store'
import { fetchModpacks, updateInstalledModpacks } from '@renderer/store/slices/modpacks'
import Modpack from '@renderer/components/Modpack'
import Java from '@renderer/components/Java'
import {
  useSelectIsJavaInstalled,
  useSelectIsDownloading,
  useSelectIsInstallingInProgress
} from '@renderer/store/hooks/selectors'

export default function Modpacks(): JSX.Element {
  const dispatch = useDispatch()
  const modpacks = useSelector((state: RootState) => state.modpacks.modpacks)

  const isJavaInstalled = useSelectIsJavaInstalled()
  const isDownloading = useSelectIsDownloading()
  const isInstallingInProgress = useSelectIsInstallingInProgress()
  console.log('isJavaInstalled', isJavaInstalled)

  const handleFetchModpacks = useCallback((): void => {
    dispatch(fetchModpacks() as any)
  }, [dispatch])

  useEffect(() => {
    const progressListener = setupProgressListener(store)
    progressListener.subscribe()

    return (): void => {
      progressListener.unsubscribe()
    }
  }, [])

  useEffect(() => {
    dispatch(updateInstalledModpacks() as any)
    handleFetchModpacks()
  }, [dispatch, handleFetchModpacks])

  return (
    <div className="w-full h-full mt-24">
      {!isDownloading && !isInstallingInProgress && (
        <div className="w-full h-full flex flex-col flex-start">
          {isJavaInstalled ? (
            modpacks.map((modpack: any) => <Modpack key={modpack.modpackName} modpack={modpack} />)
          ) : (
            <Java />
          )}
        </div>
      )}
    </div>
  )
}
