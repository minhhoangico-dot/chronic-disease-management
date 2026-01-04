
import { supabase } from '@/lib/supabase';

// Helper to fetch data (Server Component)
async function getICDCodes() {
    const { data, error } = await supabase
        .from('chronic_disease_codes')
        .select('*')
        .order('icd_code', { ascending: true });

    if (error) {
        console.error('Error fetching ICD codes:', error);
        return [];
    }
    return data;
}

export default async function ICDManagement() {
    const codes = await getICDCodes();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Danh mục ICD Bệnh mạn tính</h1>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors">
                    + Thêm mã bệnh
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-xs border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Mã ICD</th>
                                <th className="px-6 py-4">Tên bệnh (Tiếng Việt)</th>
                                <th className="px-6 py-4">Tên bệnh (Tiếng Anh)</th>
                                <th className="px-6 py-4">Nhóm bệnh</th>
                                <th className="px-6 py-4">Pattern</th>
                                <th className="px-6 py-4 text-center">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {codes.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                                        Chưa có dữ liệu danh mục
                                    </td>
                                </tr>
                            ) : (
                                codes.map((code) => (
                                    <tr key={code.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{code.icd_code}</td>
                                        <td className="px-6 py-4">{code.disease_name_vi}</td>
                                        <td className="px-6 py-4 text-slate-500">{code.disease_name_en}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {code.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">{code.icd_pattern}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-block w-2.5 h-2.5 rounded-full ${code.is_active ? 'bg-emerald-500' : 'bg-slate-300'
                                                    }`}
                                            ></span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500">
                    Hiển thị {codes.length} mã bệnh
                </div>
            </div>
        </div>
    );
}
