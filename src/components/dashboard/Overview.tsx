'use client';
import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Eye,
  Heart,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface MetricData {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ComponentType<Record<string, unknown>>;
  color: string;
  bgColor: string;
}

interface Order {
  id: string;
  status: string;
  customer: string;
  product: string;
  amount: string;
  date: string;
}

export default function Overview() {
  const [userInfo, setUserInfo] = useState({ name: 'Admin', email: '' });

  useEffect(() => {
    // Get user info from token
    const token = localStorage.getItem('admin-token');
    if (token) {
      fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.valid && data.email) {
          const name = getUserNameFromEmail(data.email);
          setUserInfo({ name, email: data.email });
        }
      })
      .catch(() => {});
    }
  }, []);

  const getUserNameFromEmail = (email: string): string => {
    switch (email) {
      case 'gemsutopia@gmail.com':
      case 'reeseroberge10@gmail.com':
        return 'Reese';
      case 'wilson.asher00@gmail.com':
        return 'Asher';
      default:
        return 'Admin';
    }
  };
  const [metrics] = useState<MetricData[]>([
    {
      title: 'Total Revenue',
      value: '$0.00',
      change: 0,
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Orders',
      value: '0',
      change: 0,
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Customers',
      value: '0',
      change: 0,
      trend: 'up',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Page Views',
      value: '0',
      change: 0,
      trend: 'up',
      icon: Eye,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      title: 'Products',
      value: '0',
      change: 0,
      trend: 'up',
      icon: Package,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'Cart Abandonment',
      value: '0%',
      change: 0,
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10 border-yellow-500/20'
    }
  ]);

  const [recentOrders] = useState<Order[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'processing':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'shipped':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-black rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back, {userInfo.name}! ✨
            </h1>
            <p className="text-slate-400">
              Here&apos;s what&apos;s happening with Gemsutopia today
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Today</p>
            <p className="text-xl font-semibold text-white">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.change > 0 ? ArrowUpRight : ArrowDownRight;
          
          return (
            <div
              key={index}
              className={`
                p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer
                ${metric.bgColor}
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`
                  flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
                  ${metric.change > 0 
                    ? 'text-emerald-400 bg-emerald-500/10' 
                    : 'text-red-400 bg-red-500/10'
                  }
                `}>
                  <TrendIcon className="h-3 w-3" />
                  {Math.abs(metric.change)}%
                </div>
              </div>
              
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">
                  {metric.title}
                </h3>
                <p className="text-2xl font-bold text-white">
                  {metric.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-black rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
            <button className="text-white hover:text-white/80 text-sm font-medium">
              View all →
            </button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingCart className="h-12 w-12 text-slate-500 mb-4" />
                <p className="text-slate-400 font-medium">No recent orders</p>
                <p className="text-sm text-slate-500">Orders will appear here once customers start purchasing</p>
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-white">{order.id}</span>
                      <span className={`
                        px-2 py-1 rounded-lg text-xs font-medium border
                        ${getStatusColor(order.status)}
                      `}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{order.customer}</p>
                    <p className="text-sm text-slate-300">{order.product}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-white">{order.amount}</p>
                    <p className="text-xs text-slate-400">{order.date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-black rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Stats</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Heart className="h-4 w-4 text-red-400" />
                </div>
                <span className="text-slate-300">Top Product</span>
              </div>
              <span className="text-slate-500 font-medium">No products yet</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-slate-300">Conversion Rate</span>
              </div>
              <span className="text-white font-medium">0%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Users className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-slate-300">New Customers</span>
              </div>
              <span className="text-white font-medium">0 this week</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Package className="h-4 w-4 text-yellow-400" />
                </div>
                <span className="text-slate-300">Stock Status</span>
              </div>
              <span className="text-white font-medium">All good</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}