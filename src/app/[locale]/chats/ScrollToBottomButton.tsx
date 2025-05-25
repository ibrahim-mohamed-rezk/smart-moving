interface ScrollToBottomButtonProps {
  autoScroll: boolean;
  onScrollToBottom: () => void;
}

const ScrollToBottomButton = ({
  autoScroll,
  onScrollToBottom,
}: ScrollToBottomButtonProps) => {
  if (autoScroll) return null;

  return (
    <button
      onClick={onScrollToBottom}
      className="absolute bottom-4 right-4 bg-blue-950 text-white rounded-full p-2 shadow-md hover:bg-blue-800 transition-colors z-10"
      aria-label="Scroll to bottom"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 15L12 21L6 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 9L12 15L6 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ScrollToBottomButton;
