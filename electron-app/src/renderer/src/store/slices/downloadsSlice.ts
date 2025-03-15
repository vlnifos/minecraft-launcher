import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchDownloadsPath = createAsyncThunk('downloads/fetchDownloadsPath', async () => {
  const response = await (window as any).electronAPI.getDownloadsPath()
  return response
})

export const fetchDownloadedFiles = createAsyncThunk('downloads/fetchDownloadedFiles', async () => {
  const response = await (window as any).electronAPI.getDownloadedFiles()
  return response
})

export const downloadFile = createAsyncThunk(
  'downloads/downloadFile',
  async (payload: { url: string; filename?: string; isModpack?: boolean }, { rejectWithValue }) => {
    try {
      const response = await (window as any).electronAPI.downloadFile(
        payload.url,
        payload.filename || '',
        payload.isModpack || true
      )

      console.log('response', response)
      if (!response.success) {
        return rejectWithValue(response.message)
      }

      return response
    } catch (error) {
      console.log('error', error)
      return rejectWithValue(error)
    }
  }
)

const downloadsSlice = createSlice({
  name: 'downloads',
  initialState: {
    downloads: [],
    downloadPath: '',
    status: 'idle',
    currentDownload: {
      active: false,
      url: '',
      type: 'modpack', // modpack, java
      filename: '',
      progress: null as any,
      error: ''
    },
    error: ''
  },
  reducers: {
    setDownloadUrl: (state, action) => {
      state.currentDownload.url = action.payload
    },
    setDownloadFilename: (state, action) => {
      state.currentDownload.filename = action.payload
    },
    setDownloadType: (state, action) => {
      state.currentDownload.type = action.payload
    },
    updateDownloadProgress: (state, action) => {
      state.currentDownload.progress = action.payload

      if (action.payload.completed) {
        state.status = 'completed'
      }
    },
    resetCurrentDownload: (state) => {
      state.currentDownload = {
        active: false,
        url: '',
        filename: '',
        progress: null,
        error: '',
        type: ''
      }
      state.status = 'idle'
      state.error = ''
    },
    clearError: (state) => {
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDownloadsPath.fulfilled, (state, action) => {
        state.downloadPath = action.payload
      })
      .addCase(fetchDownloadedFiles.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.downloads = action.payload
      })
      .addCase(fetchDownloadedFiles.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDownloadedFiles.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error'
      })
      // download file
      .addCase(downloadFile.pending, (state, action: any) => {
        state.status = 'loading'
        state.currentDownload.active = true
        if (action.payload) {
          state.currentDownload.type = action.payload.isModpack ? 'modpack' : 'java'
        }
        state.currentDownload.progress = { percent: 0, transferredBytes: 0, totalBytes: 0 }
      })
      .addCase(downloadFile.fulfilled, (state) => {
        state.status = 'succeeded'
        state.currentDownload.active = false
        state.currentDownload.type = ''
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error'
        state.currentDownload.progress = null
        state.currentDownload.active = false
      })
  }
})

export const {
  setDownloadUrl,
  setDownloadFilename,
  updateDownloadProgress,
  resetCurrentDownload,
  clearError,
  setDownloadType
} = downloadsSlice.actions

export const downloadsReducer = downloadsSlice.reducer
export default downloadsSlice.reducer
