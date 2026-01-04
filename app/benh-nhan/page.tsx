
import { supabase } from '@/lib/supabase';

async function getPatients() {
    const { data, error } = await supabase
        .from('patients')
        .select(`
      *,
      patient_conditions (
        diagnosis_name,
        icd_code
      )
    `)
        .limit(50); // Pagination needed for real app

    if (error) {
        console.error('Error fetching patients:', error);
        return [];
    }
    return data;
}

export default async function PatientList() {
    const patients = await getPatients();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Danh sách bệnh nhân</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Tìm kiếm mã BN, tên..."
                        className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500 w-64"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors">
                        Tìm kiếm
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-xs border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Mã HIS</th>
                                <th className="px-6 py-4">Họ và Tên</th>
                                <th className="px-6 py-4">Năm sinh</th>
                                <th className="px-6 py-4">SĐT</th>
                                <th className="px-6 py-4">Chẩn đoán mạn tính</th>
                                <th className="px-6 py-4">Ngày cập nhật</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {patients.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-slate-500 font-medium mb-1">Chưa có dữ liệu bệnh nhân</p>
                                            <p className="text-slate-400 text-xs">Dữ liệu sẽ xuất hiện sau khi đồng bộ từ HIS</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                patients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-mono font-medium text-slate-900">{patient.his_patient_code}</td>
                                        <td className="px-6 py-4 font-medium">{patient.patient_name}</td>
                                        <td className="px-6 py-4">{patient.birth_year}</td>
                                        <td className="px-6 py-4">{patient.phone || '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {patient.patient_conditions && patient.patient_conditions.length > 0 ? (
                                                    patient.patient_conditions.map((cond: any, idx: number) => (
                                                        <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-700 border border-orange-100">
                                                            {cond.icd_code}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-400 italic">Chưa có ghi nhận</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 text-xs">
                                            {new Date(patient.last_synced_at).toLocaleDateString('vi-VN')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
