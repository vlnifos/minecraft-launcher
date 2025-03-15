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
    <div>
      <h2>{modpack.modpackName}</h2>
      <button onClick={handleDownloadModpack} disabled={!modpack.isAvailable || currentDownload.active || !modpack.fileUrl}>Download</button>
      <button onClick={handlePlayModpack} disabled={!isInstalled}>Play</button>
    </div>
  )
}