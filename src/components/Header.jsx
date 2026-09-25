import { Bell, Menu, Search } from 'lucide-react'

function Header({ onMenuClick, search, onSearchChange, onSearchSubmit, }) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="text-sm text-slate-500">
            Overview
          </p>

          <h1 className="text-lg font-semibold text-slate-900">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">

        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search size={17} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                onSearchSubmit()
              }
            }}
           className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />

        </div>

        <button className="relative rounded-xl p-2.5 text-slate-600 hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-slate-900" />
        </button>

        <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white sm:flex">
          A
        </div>

      </div>
    </header>
  )
}

export default Header