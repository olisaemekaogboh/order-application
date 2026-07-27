export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-12 w-72 rounded bg-slate-200 animate-pulse" />

      <div className="grid lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}

            className="h-40 rounded-2xl bg-slate-100 animate-pulse"
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[380px] rounded-2xl bg-slate-100 animate-pulse" />

        <div className="h-[380px] rounded-2xl bg-slate-100 animate-pulse" />
      </div>

      <div className="h-[380px] rounded-2xl bg-slate-100 animate-pulse" />
    </div>
  )
}
