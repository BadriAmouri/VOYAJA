export default function Filters({ filters, setFilters }) {
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters({ ...filters, [name]: value });
    };
  
    return (
      <div className="bg-transparent p-6 max-w-md mx-auto rounded-lg border border-gray-300">
        {/* Filters Title */}
        <h3 className="text-xl font-semibold mb-6">Filters</h3>
  
        {/* Price Filter */}
        <div className="mb-8"> {/* Increased height */}
          <label className="block text-sm font-medium mb-10">Price</label>
          <div className="relative w-full">
            <input
              type="range"
              name="price"
              min="50"
              max="1200"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #4EB7AC ${(filters.price - 50) / 1150 * 100}%, #e0e0e0 0%)`,
              }}
            />
            <div
              className="absolute top-[-28px] left-0 w-full text-center text-sm"
              style={{
                left: `${((filters.price - 50) / 1150) * 100}%`,
                transform: 'translateX(-50%)',
              }}
            >
              {filters.price}$
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm">50$</div>
            <div className="text-sm">1200$</div>
          </div>
          <div className="border-t-2 border-gray-300 mt-4"></div>
        </div>
  
        {/* Duration Filter */}
        <div className="mb-8"> {/* Increased height */}
          <label className="block text-sm font-medium mb-10">Duration</label>
          <div className="relative w-full">
            <input
              type="range"
              name="duration"
              min="1"
              max="60"
              value={filters.duration}
              onChange={handleFilterChange}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #4EB7AC ${(filters.duration - 1) / 59 * 100}%, #e0e0e0 0%)`,
              }}
            />
            <div
              className="absolute top-[-28px] left-0 w-full text-center text-sm"
              style={{
                left: `${((filters.duration - 1) / 59) * 100}%`,
                transform: 'translateX(-50%)',
              }}
            >
              {filters.duration} Day(s)
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm">1 Day</div>
            <div className="text-sm">2 Months</div>
          </div>
          <div className="border-t-2 border-gray-300 mt-4"></div>
        </div>
  
        {/* Rating Filter */}
        <div className="mb-2"> {/* Increased height */}
          <label className="block text-sm font-medium mb-10">Rating</label>
          <div className="flex space-x-6 mb-2">
            {["0", "1", "2", "3", "4"].map((rating) => (
              <button
                key={rating}
                name="rating"
                value={rating}
                onClick={handleFilterChange}
                className={`px-1 py-1 rounded-lg border-2 ${
                  filters.rating === rating
                    ? "border-[#4EB7AC] text-[#4EB7AC] font-medium"
                    : "border-gray-300 text-gray-500 hover:text-black"
                }`}
              >
                {rating}+
              </button>
            ))}
          </div>
          <div className="border-t-2 border-gray-300 mt-4"></div>
        </div>
      </div>
    );
  }
  