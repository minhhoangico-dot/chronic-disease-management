
'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    { name: 'Bảng điều khiển', href: '/' },
    { name: 'Danh mục ICD', href: '/danh-muc-icd' },
    { name: 'Bệnh nhân', href: '/benh-nhan' },
    { name: 'Dự báo thuốc', href: '/du-bao' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-slate-800 text-white min-h-screen p-4 flex flex-col">
            <div className="mb-8 p-2">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                    Quản Lý Bệnh Mạn Tính
                </h1>
            </div>
            <nav className="flex-1">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`block px-4 py-2 rounded transition-colors duration-200 ${isActive
                                            ? 'bg-emerald-600 text-white'
                                            : 'hover:bg-slate-700 text-slate-300'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="mt-auto p-4 border-t border-slate-700">
                <p className="text-xs text-slate-400">Phiên bản 1.0.0</p>
            </div>
        </div>
    );
}
