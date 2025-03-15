import { useDispatch, useSelector } from "react-redux";
import { downloadFile } from "@renderer/store/slices/downloadsSlice";
import { RootState } from "@renderer/store";
import { useEffect } from "react";
import { useState } from "react";
import { playModpack } from "@renderer/store/slices/modpacks";

export default function Modpack({ modpack }: { modpack: any }) {
  const dispatch = useDispatch();
  const [isInstalled, setIsInstalled] = useState(false)
  const currentDownload = useSelector((state: RootState) => state.downloads.currentDownload)
  const installedModpacks = useSelector((state: RootState) => state.modpacks.installedModpacks)

  const handleDownloadModpack = (): void => {
    dispatch(downloadFile({ url: modpack.fileUrl }));
  }

  const handlePlayModpack = (): void => {
    dispatch(playModpack({ modpack }))
  }

  useEffect(() => {
    console.log('installedModpacks', installedModpacks)
    setIsInstalled(installedModpacks.some(folder => folder.name === modpack.folderName))
  }, [installedModpacks])

  return (
    <div className="flex justify-between items-center p-4">
      <h2>{modpack.modpackName}</h2>

      <div>
        {!isInstalled &&
          (<button className="hover:bg-gray-600 p-2 rounded-md m-4 cursor-pointer" onClick={handleDownloadModpack} disabled={!modpack.isAvailable || currentDownload.active || !modpack.fileUrl}>Download</button>)
        }

        <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md m-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={handlePlayModpack} disabled={!isInstalled}>Play</button>
      </div>
    </div>
  )
}