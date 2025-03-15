import { setupProgressListener } from "@renderer/services/progressListener";
import store from "@renderer/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@renderer/store";
import { fetchModpacks, updateInstalledModpacks } from "@renderer/store/slices/modpacks";
import Modpack from "@renderer/components/Modpack";

export default function Modpacks() {
  const dispatch = useDispatch();

  const handleFetchModpacks = (): void => {
    dispatch(fetchModpacks());
  }

  const modpacks = useSelector((state: RootState) => state.modpacks.modpacks);

  useEffect(() => {
    const progressListener = setupProgressListener(store)
    progressListener.subscribe()

    return () => {
      progressListener.unsubscribe()
    }
  }, [])

  useEffect(() => {
    dispatch(updateInstalledModpacks())
  }, [])

  return (
    <div>
      <button onClick={handleFetchModpacks}>Fetch Modpacks</button>
      {modpacks.map((modpack: any) => (
        <Modpack key={modpack.modpackName} modpack={modpack} />
      ))}
    </div>
  )
}