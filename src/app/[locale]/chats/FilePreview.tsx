import { FileText, Image, X } from "lucide-react";

interface FilePreviewProps {
  selectedFiles: File[];
  onRemoveFile: (index: number) => void;
  onClearAllFiles: () => void;
  formatFileSize: (bytes: number) => string;
}

const FilePreview = ({
  selectedFiles,
  onRemoveFile,
  onClearAllFiles,
  formatFileSize,
}: FilePreviewProps) => {
  if (selectedFiles.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {selectedFiles.length} file{selectedFiles.length !== 1 ? "s" : ""}{" "}
          selected
        </span>
        <button
          onClick={onClearAllFiles}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Clear all
        </button>
      </div>
      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-2 py-1 bg-white rounded border text-sm"
          >
            {file.type.startsWith("image/") ? (
              <Image size={16} className="text-green-600" />
            ) : (
              <FileText size={16} className="text-blue-600" />
            )}
            <span className="truncate max-w-32" title={file.name}>
              {file.name}
            </span>
            <span className="text-xs text-gray-500">
              ({formatFileSize(file.size)})
            </span>
            <button
              onClick={() => onRemoveFile(index)}
              className="text-gray-400 hover:text-red-500 ml-1"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilePreview;
