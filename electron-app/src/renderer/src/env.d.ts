/// <reference types="vite/client" />

declare namespace ElectronAPI {
  function downloadFile(
    url: string,
    filename: string
  ): Promise<{ success: boolean; message: string; path: string }>
  function downloadFileManual(
    url: string,
    filename: string
  ): Promise<{ success: boolean; message: string; path: string }>
  function getDownloadsPath(): Promise<string>
  function getDownloadedFiles(): Promise<{
    success: boolean
    message: string
    files: { name: string; path: string }[]
  }>
}
