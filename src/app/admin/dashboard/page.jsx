import React from 'react';
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Truck,
  Clock,
} from 'lucide-react';

const data = [
  { title: 'Total Users', value: '12,450', icon: <Users className="text-blue-500" />, color: 'bg-blue-100' },
  { title: 'Total Products', value: '1,240', icon: <Package className="text-green-500" />, color: 'bg-green-100' },
  { title: 'Total Orders', value: '3,820', icon: <ShoppingCart className="text-purple-500" />, color: 'bg-purple-100' },
  { title: 'Total Revenue', value: '$158,000', icon: <DollarSign className="text-yellow-500" />, color: 'bg-yellow-100' },
  { title: 'Delivered Orders', value: '3,600', icon: <Truck className="text-emerald-500" />, color: 'bg-emerald-100' },
  { title: 'Pending Delivery', value: '220', icon: <Clock className="text-red-500" />, color: 'bg-red-100' },
];

function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mt-0 mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {data.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <div className={`p-4 rounded-full ${item.color} mr-4`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-xl font-semibold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Dashboard;
