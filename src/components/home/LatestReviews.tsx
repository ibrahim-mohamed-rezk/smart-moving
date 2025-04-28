"use client";

const LatestReviews = () => {
  return (
    <section className="px-[clamp(1rem,5vw,4rem)] pb-[clamp(2rem,6vw,4rem)]">
      <h3 className="text-2xl font-bold mb-4">Latest reviews</h3>
      <div className="relative">
        <div
          id="review-slider"
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 bg-white rounded-xl p-4 shadow-[4px_4px_20px_rgba(0,0,0,0.1)]"
            >
              <div className="flex justify-between items-center text-center">
                <p className="text-sm font-semibold">Gert</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, index) => (
                    <span key={index}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={index < 4 ? "#facc15" : "#e5e7eb"}
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.179L12 18.897l-7.336 3.858 1.402-8.179L.132 9.21l8.2-1.192z" />
                      </svg>
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                wrote a review for CR Logistic ApS
                <br />
                about a Private Moving task in Næstved
              </p>
              <p className="text-sm font-semibold mt-4">Review:</p>
              <p className="text-sm text-gray-700">Absolutely perfect move</p>
            </div>
          ))}
        </div>
        {/* Navigation */}
        <button
          onClick={() =>
            document
              .getElementById("review-slider")
              ?.scrollBy({ left: -300, behavior: "smooth" })
          }
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full"
        >
          ←
        </button>
        <button
          onClick={() =>
            document
              .getElementById("review-slider")
              ?.scrollBy({ left: 300, behavior: "smooth" })
          }
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default LatestReviews