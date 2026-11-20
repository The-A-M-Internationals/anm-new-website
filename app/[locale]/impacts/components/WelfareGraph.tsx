'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIntlayer, useLocale } from "next-intlayer";

type Point = { month: string; amount: number; cumulative: number };

// PLACEHOLDER FIGURES: the same numbers the graph showed before it was removed. Replace with confirmed amounts.
const DATA: Point[] = [
    { month: 'Jan 26', amount: 75000, cumulative: 75000 },
    { month: 'Feb 26', amount: 52000, cumulative: 127000 },
    { month: 'Mar 26', amount: 61000, cumulative: 206000 },
    { month: 'Apr 26', amount: 58000, cumulative: 264000 },
    { month: 'May 26', amount: 63000, cumulative: 327000 },
];

const money = (value: number, locale: string) => {
    const isArabic = locale === 'ar';
    return new Intl.NumberFormat(isArabic ? 'ar-AE' : 'en-US', {
        style: 'currency', currency: isArabic ? 'AED' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(value);
};

function GraphTooltip({ active, payload, labels, locale }: { active?: boolean; payload?: { payload: Point }[]; labels: [string, string, string]; locale: string }) {
    if (!active || !payload?.length) return null;
    const point = payload[0].payload;
    const rows: [string, number, string][] = [
        [labels[0], point.amount, 'text-gray-900'],
        [labels[1], point.cumulative, 'text-[#C9A84C]'],
        [labels[2], Math.round(point.amount * 0.1), 'text-gray-900'],
    ];
    return (
        <div className="rounded-2xl border-2 border-[#C9A84C] bg-white p-6 shadow-xl">
            <h3 className="mb-3 text-lg font-bold text-gray-900">{point.month}</h3>
            <div className="space-y-2 text-sm">
                {rows.map(([label, value, tone]) => (
                    <div key={label} className="flex justify-between gap-4">
                        <span className="text-gray-600">{label}</span>
                        <span className={`font-semibold ${tone}`}>{money(value, locale)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/** Child welfare contribution graph: cumulative amount by month, with a detail card on hover. */
export default function WelfareGraph() {
    const { locale } = useLocale();
    const content = useIntlayer("impactsChildWelfare");
    const labels: [string, string, string] = [content.raised.value, content.cumulative.value, content.charitable.value];

    return (
        <div className="mb-20 h-96 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm md:h-[420px] md:p-6" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="welfareFill" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="#C9A84C" stopOpacity={0} />
                            <stop offset="100%" stopColor="#C9A84C" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 12 }} />
                    <YAxis
                        tick={{ fill: '#666', fontSize: 12 }}
                        tickFormatter={(value) => `${locale === 'ar' ? 'د.إ' : '$'}${value / 1000}K`}
                        domain={[0, 600000]}
                        ticks={[0, 150000, 300000, 450000, 600000]}
                        width={80}
                    />
                    <Tooltip content={<GraphTooltip labels={labels} locale={locale} />} />
                    <Area type="monotone" dataKey="cumulative" stroke="#C9A84C" strokeWidth={3} fill="url(#welfareFill)" fillOpacity={1} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
