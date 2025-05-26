import { Paperclip } from "lucide-react";
import { useRef } from "react";
import FilePreview from "./FilePreview";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  selectedFiles: File[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  onClearAllFiles: () => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  sendingMessage: boolean;
  formatFileSize: (bytes: number) => string;
  disabled?: boolean;
}

const MessageInput = ({
  message,
  setMessage,
  selectedFiles,
  onFileSelect,
  onRemoveFile,
  onClearAllFiles,
  onSendMessage,
  onKeyPress,
  sendingMessage,
  formatFileSize,
  disabled = false,
}: MessageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttachClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-none p-3 md:p-6 flex flex-col gap-2 w-full">
      {/* Selected Files Preview */}
      <FilePreview
        selectedFiles={selectedFiles}
        onRemoveFile={onRemoveFile}
        onClearAllFiles={onClearAllFiles}
        formatFileSize={formatFileSize}
      />

      <div className="flex justify-start items-center gap-2 md:gap-6 w-full">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
          multiple
          disabled={disabled}
        />
        <button
          onClick={handleAttachClick}
          className={`w-6 h-6 relative overflow-hidden flex-shrink-0 hover:text-blue-600 transition-colors ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Attach files"
          disabled={disabled}
        >
          <Paperclip className="w-6 h-6" />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyPress}
          placeholder="Type a message"
          disabled={disabled || sendingMessage}
          className={`w-full outline-none text-black text-sm font-normal font-['Libre_Baskerville'] placeholder:text-black/40 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
        <button
          onClick={onSendMessage}
          disabled={
            disabled ||
            sendingMessage ||
            (!message.trim() && selectedFiles.length === 0)
          }
          className={`w-6 h-6 relative overflow-hidden flex-shrink-0 transition-opacity ${
            disabled ||
            (!message.trim() && selectedFiles.length === 0) ||
            sendingMessage
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-80"
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.1401 2.96004L7.11012 5.96004C1.04012 7.99004 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.87004C22.3901 3.82004 20.1901 1.61004 16.1401 2.96004ZM16.4601 8.34004L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.4606 12.0189 11.3824 11.8285 11.3824 11.63C11.3824 11.4316 11.4606 11.2412 11.6001 11.1L15.4001 7.28004C15.6901 6.99004 16.1701 6.99004 16.4601 7.28004C16.7501 7.57004 16.7501 8.05004 16.4601 8.34004Z"
              fill="#25B4DE"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
