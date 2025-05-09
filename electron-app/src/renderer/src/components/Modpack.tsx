import { downloadFile } from '@renderer/store/slices/downloadsSlice'
import { ModpackFetchResponse, playModpack } from '@renderer/store/slices/modpacks'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAppDispatch } from '@renderer/store/hooks/dispatch'
import { useAppSelector } from '@renderer/store/hooks/selectors'

const modpackPlaceholderImage = 'https://cdn.vlnifos.work/minecraft-placeholder.png'

export default function Modpack({ modpack }: { modpack: ModpackFetchResponse }): JSX.Element {
  const dispatch = useAppDispatch()
  const [isInstalled, setIsInstalled] = useState(false)
  const currentDownload = useAppSelector((state) => state.downloads.currentDownload)
  const installedModpacks = useAppSelector((state) => state.modpacks.installedModpacks)
  const handleDownloadModpack = (): void => {
    dispatch(downloadFile({ url: modpack.fileUrl, isModpack: true }))
  }

  const handlePlayModpack = (): void => {
    dispatch(playModpack({ modpack }))
  }

  useEffect(() => {
    console.log('installedModpacks', installedModpacks)
    setIsInstalled(installedModpacks.some((folder) => folder.name === modpack.folderName))
  }, [installedModpacks, modpack])

  return (
    <div className="flex justify-between items-center bg-gray-800 rounded-none h-50">
      <div className="flex flex-col min-w-40 ml-8">
        <img
          src={modpack.imageUrl || modpackPlaceholderImage}
          alt={modpack.modpackName}
          className="w-40 h-40"
        />
      </div>
      <div className="flex w-full">
        <h2
          className={` text-5xl font-bold text-left ml-8 ${isInstalled ? 'text-gray-200' : 'text-gray-600'}`}
        >
          {modpack.modpackName}
        </h2>
      </div>

      <div className="h-full flex">
        {!isInstalled && (
          <button
            className="hover:bg-gray-600 px-4 rounded-none cursor-pointer h-full"
            onClick={handleDownloadModpack}
            disabled={!modpack.isAvailable || currentDownload.active || !modpack.fileUrl}
          >
            Download
          </button>
        )}

        <button
          className="bg-gray-700 hover:bg-gray-600 h-full rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white text-2xl font-bold px-16 min-w-80"
          onClick={handlePlayModpack}
          disabled={!isInstalled}
        >
          Play
        </button>
      </div>
    </div>
  )
}
