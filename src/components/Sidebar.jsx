import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Users,
  Settings,
  X,
} from 'lucide-react'

function Sidebar({ isOpen, onClose, onNavigate }) {
  const menuItems = [
    {
      label: 'Overview',
      icon: LayoutDashboard,
      target: 'overview',
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      target: 'analytics',
    },
    {
      label: 'Orders',
      icon: ShoppingCart,
      target: 'orders',
    },
    {
      label: 'Customers',
      icon: Users,
      target: 'customers',
    },
    {
      label: 'Settings',
      icon: Settings,
      target: 'settings',
    },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">
              AW Insights
            </p>

            <p className="text-xs text-slate-400">
              Business Dashboard
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.target)
                  onClose()
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]"
              >
                <Icon size={18} />
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar