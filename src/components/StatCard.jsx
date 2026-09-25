import { ArrowUpRight } from 'lucide-react'

function StatCard({ title, value, change, icon: Icon }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md active:scale-[0.98] active:bg-slate-50 sm:p-5">
      
      <div className="flex items-start justify-between">
        
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            {value}
          </h3>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-white sm:h-10 sm:w-10">
          <Icon size={19} />
        </div>

      </div>

      <div className="mt-4 flex items-center gap-1.5">
        <span className="flex items-center gap-0.5 text-sm font-medium text-emerald-600">
          <ArrowUpRight size={15} />
          {change}
        </span>

        <span className="text-xs text-slate-400">
          vs last month
        </span>
      </div>

    </div>
  )
}

export default StatCard
