
import React from 'react';

// Mock data or fetch from Supabase later
const stats = [
  { label: 'Tổng bệnh nhân mạn tính', value: '1,234', color: 'bg-blue-500' },
  { label: 'Cần tái khám (7 ngày)', value: '42', color: 'bg-emerald-500' },
  { label: 'Cần tái khám (30 ngày)', value: '156', color: 'bg-cyan-500' },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Bảng điều khiển</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex items-center">
            <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white font-bold text-xl mr-4`}>
              {/* Icon placeholder */}
              {index + 1}
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-slate-700">Hoạt động gần đây</h2>
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 min-h-[300px] flex items-center justify-center text-slate-400">
          Chưa có dữ liệu hoạt động
        </div>
      </div>
    </div>
  );
}
