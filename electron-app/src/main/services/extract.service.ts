import AdmZip from 'adm-zip'
import { PATHS } from '../config/paths'

export interface ExtractOptions {
  zipPath: string
  filename: string
  isModpack?: boolean
}

export interface ExtractResult {
  success: boolean
  message: string
  extractedTo?: string
}

export class ExtractService {
  constructor() {
    console.log('ExtractService constructor')
  }

  async extractZip(options: ExtractOptions): Promise<ExtractResult> {
    try {
      const { zipPath, isModpack } = options
      const extractDir = isModpack ? PATHS.instances : PATHS.java

      const zip = new AdmZip(zipPath)
      await zip.extractAllToAsync(extractDir, true)

      return {
        success: true,
        message: 'File successfully extracted',
        extractedTo: extractDir
      }
    } catch (error) {
      return {
        success: false,
        message: `Error extracting file: ${error.message}`
      }
    }
  }
}
