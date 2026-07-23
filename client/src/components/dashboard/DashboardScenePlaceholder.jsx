export default function DashboardScenePlaceholder() {
  return (
    <div className="space-y-4">
      <h4 className="text-base font-bold text-white">
        3D Cognitive Environment
      </h4>
      <div className="relative flex h-96 flex-col items-center justify-center overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#141A29]/30 p-6 shadow-xl backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#5eead408_1px,transparent_1px)] bg-[size:16px_16px]" />

        <div
          className="relative flex h-40 w-40 animate-spin items-center justify-center rounded-2xl border border-purple-500/20"
          style={{ animationDuration: "40s" }}
        >
          <div className="absolute h-32 w-32 rounded-full border border-teal-500/20" />
          <div className="absolute h-24 w-24 rotate-45 rounded-2xl border border-purple-500/30" />
          <div className="absolute h-16 w-16 animate-pulse rounded-full border border-teal-500/40" />
        </div>

        <div className="relative z-10 mt-8 space-y-1 text-center">
          <h5 className="text-sm font-bold uppercase tracking-widest text-white">
            React Three Fiber Scene Placeholder
          </h5>
          <p className="mx-auto max-w-[280px] text-xs text-gray-500">
            Configure a 3D visual workspace network analyzer canvas here.
          </p>
        </div>

        <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 rounded-tl-3xl border-l-2 border-t-2 border-teal-400" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 rounded-br-3xl border-b-2 border-r-2 border-purple-400" />
      </div>
    </div>
  );
}
