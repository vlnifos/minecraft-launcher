import { createListenerMiddleware } from "@reduxjs/toolkit";
import { downloadFile } from "@renderer/store/slices/downloadsSlice";
import { extractZip } from "@renderer/store/slices/modpacks";
import { updateInstalledModpacks } from "@renderer/store/slices/modpacks";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: downloadFile.fulfilled,
  effect: async (action, listenerApi) => {
    console.log('action downloadFile.fulfilled', action);
    listenerApi.dispatch(extractZip({ zipPath: action.payload.path, filename: action.payload.filename }));
  }
})

listenerMiddleware.startListening({
  actionCreator: extractZip.fulfilled,
  effect: async (action, listenerApi) => {
    console.log('action extractZip.fulfilled', action);
    listenerApi.dispatch(updateInstalledModpacks());
  }
})
