export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column (Image) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="w-full aspect-video bg-[#1F2937] rounded-2xl animate-pulse shadow-lg border border-white/5"></div>
        </div>

        {/* Right Column (Details) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Badge */}
          <div className="w-24 h-6 bg-[#1F2937] rounded animate-pulse"></div>
          
          {/* Title */}
          <div className="flex flex-col gap-3">
            <div className="w-full h-10 bg-[#1F2937] rounded animate-pulse"></div>
            <div className="w-3/4 h-10 bg-[#1F2937] rounded animate-pulse"></div>
          </div>
          
          {/* Price & Status */}
          <div className="flex items-center gap-4 mt-2">
            <div className="w-20 h-8 bg-[#1F2937] rounded animate-pulse"></div>
            <div className="w-16 h-8 bg-[#1F2937] rounded animate-pulse"></div>
          </div>
          
          {/* Description */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="w-full h-4 bg-[#1F2937] rounded animate-pulse"></div>
            <div className="w-full h-4 bg-[#1F2937] rounded animate-pulse"></div>
            <div className="w-full h-4 bg-[#1F2937] rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-[#1F2937] rounded animate-pulse"></div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-8">
            <div className="w-full h-14 bg-[#1F2937] rounded-xl animate-pulse"></div>
            <div className="w-full h-12 bg-[#1F2937] rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
