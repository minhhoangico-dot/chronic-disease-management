
import { supabase } from '@/lib/supabase';

async function getPredictions() {
    const { data, error } = await supabase
        .from('medicine_predictions')
        .select(`
      *,
      patients (
        his_patient_code,
        patient_name
      )
    `)
        .limit(50);

    if (error) {
        console.error('Error fetching predictions:', error);
        return [];
    }
    return data;
}

export default async function PredictionReport() {
    const predictions = await getPredictions();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Dự báo nhu cầu thuốc</h1>
                <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                    {['7 ngày tới', '14 ngày tới', '30 ngày tới'].map((filter, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${i === 0 ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-xs border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Bệnh nhân</th>
                                <th className="px-6 py-4">Tên thuốc</th>
                                <th className="px-6 py-4 text-right">Số lượng dự kiến</th>
                                <th className="px-6 py-4 text-center">Độ tin cậy</th>
                                <th className="px-6 py-4">Ngày dự báo</th>
                                <th className="px-6 py-4 text-right">Dự kiến nhận</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {predictions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                        Chưa có dữ liệu dự báo nào trong khoảng thời gian này
                                    </td>
                                </tr>
                            ) : (
                                predictions.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{(item.patients as any)?.patient_name}</div>
                                            <div className="text-xs text-slate-400 font-mono">{(item.patients as any)?.his_patient_code}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-blue-600">{item.medicine_name}</td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-800">
                                            {item.avg_quantity} <span className="text-xs font-normal text-slate-500">{item.unit}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit mx-auto ${item.prediction_confidence === 'High' ? 'bg-emerald-100 text-emerald-800' :
                                                    item.prediction_confidence === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {item.prediction_confidence || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-500">
                                            {new Date(item.created_at).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-6 py-4 text-right text-emerald-600 font-medium">
                                            {item.predicted_next_date ? new Date(item.predicted_next_date).toLocaleDateString('vi-VN') : '-'}
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
