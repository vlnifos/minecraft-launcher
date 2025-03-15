import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

// Define interfaces for your state
interface Modpack {
  // Add properties based on your modpack structure
  id: string
  name: string
  version: {
    number: string
    type: string
  }
  // Add other properties as needed
}

interface ModpackDirectory {
  name: string
  path: string
}

interface ModpacksState {
  modpacks: Modpack[]
  java: any | null
  installedModpacks: ModpackDirectory[]
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
    window.electron.ipcRenderer.send('start-minecraft', { username, ram, modpack: payload.modpack })
  }
)

export const extractZip = createAsyncThunk(
  'modpacks/extractZip',
  async (payload: { zipPath: string; filename: string }) => {
    const response = await (window as any).electronAPI.extractZip(payload.zipPath, payload.filename)
    return response
  }
)

export const updateInstalledModpacks = createAsyncThunk(
  'modpacks/updateInstalledModpacks',
  async () => {
    const response = await (window as any).electronAPI.getDirectories()
    return response
  }
)

export const modpacksSlice = createSlice({
  name: 'modpacks',
  initialState: {
    modpacks: [],
    java: null,
    installedModpacks: []
  } as ModpacksState,
  reducers: {
    setModpacks: (state, action: PayloadAction<Modpack[]>) => {
      state.modpacks = action.payload
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
  }
})

export const { setModpacks } = modpacksSlice.actions

export default modpacksSlice.reducer
