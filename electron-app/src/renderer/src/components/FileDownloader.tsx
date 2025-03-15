import { downloadFile, setDownloadUrl } from "@renderer/store/slices/downloadsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";

export default function FileDownloader() {
  const currentDownload = useSelector((state: RootState) => state.downloads.currentDownload)

  return (
    <div>
      {/* Progress */}
      <div>
        <span>progress</span>
        {currentDownload.progress && currentDownload.active && (
          <>
            <span>{Math.round(currentDownload.progress.percent * 100)}%</span>
            <div></div>
          </>
        )}
      </div>
    </div>
  );
}
