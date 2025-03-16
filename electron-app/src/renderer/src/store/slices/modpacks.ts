import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface ModpackFetchResponse {
  modpackName: string
  isAvailable: boolean
  fileUrl: string
  folderName: string
  imageUrl: string
  version: {
    number: string
    type: string
  }
}

interface Modpack {
  id: string
  name: string
  version: {
    number: string
    type: string
  }
}

interface Java {
  fileUrl: string
}

interface Directory {
  name: string
  path: string
}

interface ModpacksState {
  modpacks: ModpackFetchResponse[]
  java: Java | null
  isInstallingInProgress: boolean
  installedModpacks: Directory[]
  installedJava: Directory[]
}

export const fetchModpacks = createAsyncThunk('modpacks/fetchModpacks', async () => {
  const response = await fetch('https://get-minecraft-modpacks.vl-korostelov.workers.dev/', {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
})

export const playModpack = createAsyncThunk(
  'modpacks/playModpack',
  async (payload: { modpack }, { getState }) => {
    const state = getState() as RootState
    const username = state.user.username
    const ram = '2048'
    const javaPath = state.modpacks.installedJava[0].path

    window.electron.ipcRenderer.send('start-minecraft', {
      username,
      ram,
      modpack: payload.modpack,
      javaPath
    })
  }
)

export const extractZip = createAsyncThunk(
  'modpacks/extractZip',
  async (payload: { zipPath: string; filename: string; isModpack: boolean }, { dispatch }) => {
    dispatch(setIsInstallingInProgress(true))
    const response = await window.electronAPI.extractZip(
      payload.zipPath,
      payload.filename,
      payload.isModpack
    )
    return response
  }
)

export const updateInstalledModpacks = createAsyncThunk(
  'modpacks/updateInstalledModpacks',
  async () => {
    const response = await window.electronAPI.getDirectories()
    return response
  }
)

export const updateInstalledJava = createAsyncThunk('modpacks/updateInstalledJava', async () => {
  const response = await window.electronAPI.getJavaDirectory()
  return response
})

export const modpacksSlice = createSlice({
  name: 'modpacks',
  initialState: {
    modpacks: [],
    java: null,
    isInstallingInProgress: false,
    installedModpacks: [],
    installedJava: []
  } as ModpacksState,
  reducers: {
    setIsInstallingInProgress: (state, action: PayloadAction<boolean>) => {
      state.isInstallingInProgress = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModpacks.fulfilled, (state, action) => {
        state.modpacks = action.payload.modpacks
        console.log('action.payload', action.payload)
        state.java = action.payload.java
      })
      .addCase(updateInstalledModpacks.fulfilled, (state, action) => {
        console.log('action.payload updateInstalledModpacks', action.payload)
        state.installedModpacks = action.payload
      })
      .addCase(updateInstalledJava.fulfilled, (state, action) => {
        console.log('action.payload updateInstalledJava', action.payload)
        state.installedJava = action.payload
      })
      .addCase(extractZip.fulfilled, (state, action) => {
        console.log('action.payload extractZip', action.payload)
        state.isInstallingInProgress = false
      })
  }
})

export const { setIsInstallingInProgress } = modpacksSlice.actions

export default modpacksSlice.reducer
