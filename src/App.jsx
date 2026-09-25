import { useRef, useState } from 'react'
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import { revenueData, recentOrders } from './data/dashboardData'


const stats = [
  {
    title: 'Total Revenue',
    value: '$36,100',
    change: '+12.8%',
    description: 'vs last month',
    icon: DollarSign,
  },
  {
    title: 'Total Orders',
    value: '1,284',
    change: '+8.4%',
    description: 'vs last month',
    icon: ShoppingCart,
  },
  {
    title: 'Customers',
    value: '842',
    change: '+5.7%',
    description: 'vs last month',
    icon: Users,
  },
  {
    title: 'Growth Rate',
    value: '18.6%',
    change: '+4.2%',
    description: 'vs last month',
    icon: TrendingUp,
  },
]


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [period, setPeriod] = useState('Last 9 months')
  const [search, setSearch] = useState('')
  const ordersRef = useRef(null)

  const currentRevenueData = revenueData[period]

  const filteredOrders = recentOrders.filter((order) =>{
    const searchText = search.toLowerCase().trim()
     
    if (!searchText) return true

    return (
      order.id.toLowerCase().includes(searchText) ||
      order.customer.toLowerCase().includes(searchText) ||
      order.product.toLowerCase().includes(searchText)
    )
})

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64">

        <Header 
         onMenuClick={() => setSidebarOpen(true)}
         search={search}
         onSearchChange={setSearch}
         onSearchSubmit={() => {
           ordersRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start',
        })
      }}
         />

        <main className="p-4 sm:p-6 lg:p-8">

          {/* Welcome */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-slate-500">
                September 2026
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Good afternoon, Arwa
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Here's what's happening with your business today.
              </p>
            </div>

            <button 
            onClick={() => {
              ordersRef.current?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start',
            })
            }}
            className="flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
              View reports
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                {...stat}
              />
            ))}
          </div>

          {/* Chart + Performance */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">

            {/* Revenue Chart */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Revenue Overview
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    $36,100
                  </h3>
                </div>

                <select  
                  value={period} 
                  onChange={(e) => setPeriod(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none">
                 
                  <option>Last 9 months</option>
                  <option>Last 6 months</option>
                  <option>Last 3 months</option>
                </select>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentRevenueData} >
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#0f172a"
                          stopOpacity={0.18}
                        />
                        <stop
                          offset="100%"
                          stopColor="#0f172a"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />

                    <Tooltip
                      formatter={(value) => [`$${value}`, 'Revenue']}
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)',
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0f172a"
                      strokeWidth={2.5}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <p className="text-sm font-medium text-slate-500">
                  Performance
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  This month
                </h3>
              </div>

              <div className="space-y-6">

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Sales target
                    </span>

                    <span className="font-semibold text-slate-900">
                      82%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[82%] rounded-full bg-slate-900" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Customer growth
                    </span>

                    <span className="font-semibold text-slate-900">
                      68%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[68%] rounded-full bg-slate-900" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Retention
                    </span>

                    <span className="font-semibold text-slate-900">
                      91%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[91%] rounded-full bg-slate-900" />
                  </div>
                </div>

              </div>

              <div className="mt-8 rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Overall performance
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  84.2%
                </p>

                <p className="mt-1 text-xs text-emerald-600">
                  +6.4% from last month
                </p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div 
             ref={ordersRef}
             className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Activity
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Recent orders
                </h3>
              </div>

              <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
                View all
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                    <th className="px-5 py-4 font-medium sm:px-6">
                      Order
                    </th>
                    <th className="px-5 py-4 font-medium sm:px-6">
                      Customer
                    </th>
                    <th className="px-5 py-4 font-medium sm:px-6">
                      Product
                    </th>
                    <th className="px-5 py-4 font-medium sm:px-6">
                      Amount
                    </th>
                    <th className="px-5 py-4 font-medium sm:px-6">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900 sm:px-6">
                        {order.id}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600 sm:px-6">
                        {order.customer}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600 sm:px-6">
                        {order.product}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-900 sm:px-6">
                        {order.amount}
                      </td>

                      <td className="px-5 py-4 sm:px-6">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            order.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default App