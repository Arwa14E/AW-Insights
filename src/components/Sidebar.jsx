import {
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  Settings,
  X,
} from 'lucide-react'

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    label: 'Customers',
    icon: Users,
  },
  {
    label: 'Products',
    icon: Package,
  },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-200
          bg-white transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-full flex-col">
          
          {/* Logo */}
          <div className="flex h-20 items-center justify-between px-6">
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-900">
                AW
              </div>
              <div className="text-xs text-slate-400">
                Insights
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Overview
            </p>

            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon

                return (
                  <button
                    key={item.label}
                    className={`
                      flex w-full items-center gap-3 rounded-xl px-3 py-3
                      text-sm font-medium transition
                      ${
                        item.active
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }
                    `}
                  >
                    <Icon size={19} strokeWidth={1.8} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Settings */}
          <div className="border-t border-slate-200 p-4">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              <Settings size={19} strokeWidth={1.8} />
              Settings
            </button>
          </div>

        </div>
      </aside>
    </>
  )
}

export default Sidebar