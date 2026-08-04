'use client';

import React, { useEffect, useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useIntlayer, useLocale } from "next-intlayer";

interface ChartDataType {
    month: string;
    amount: number;
    cumulative: number;
}

const CustomTooltip = ({ active, payload, raised, cumulative, charitable, locale }: { active?: boolean; payload?: { payload: ChartDataType }[]; raised: string; cumulative: string; charitable: string; locale: string }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const charitableAmount = Math.round(data.amount * 0.1);
        
        const formatCurrency = (value: number) => {
            const isArabic = locale === 'ar';
            return new Intl.NumberFormat(isArabic ? 'ar-AE' : 'en-US', {
                style: 'currency',
                currency: isArabic ? 'AED' : 'USD',
                minimumFractionDigits: 0, maximumFractionDigits: 0,
            }).format(value);
        };

        return (
            <div className="bg-white border-2 border-[#C9A84C] rounded-2xl p-6 shadow-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{data.month}</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">{raised}</span>
                        <span className="font-semibold text-gray-900 ml-4">
                            {formatCurrency(data.amount)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">{cumulative}</span>
                        <span className="font-semibold text-[#C9A84C] ml-4">
                            {formatCurrency(data.cumulative)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">{charitable}</span>
                        <span className="font-semibold text-gray-900 ml-4">
                            {formatCurrency(charitableAmount)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const ChildWelfareImpact = () => {
    const { locale } = useLocale();
    const content = useIntlayer("impactsChildWelfare");
    
    // Graph Logic
    const goal = 1000000;
    const currentAmount = 327000;
    const progressPercentage = Math.round((currentAmount / goal) * 100);

    const [animatedProgress, setAnimatedProgress] = useState<number>(0);
    const [pulse, setPulse] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimatedProgress(progressPercentage), 300);
        return () => clearTimeout(timeout);
    }, [progressPercentage]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPulse(true);
            setTimeout(() => setPulse(false), 500);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const formatCurrency = (value: number) => {
        const isArabic = locale === 'ar';
        return new Intl.NumberFormat(isArabic ? 'ar-AE' : 'en-US', {
            style: 'currency',
            currency: isArabic ? 'AED' : 'USD',
            minimumFractionDigits: 0, maximumFractionDigits: 0,
        }).format(value);
    };

    const chartData = [
        { month: 'Jan 26', amount: 75000, cumulative: 75000 },
        { month: 'Feb 26', amount: 52000, cumulative: 127000 },
        { month: 'Mar 26', amount: 61000, cumulative: 206000 },
        { month: 'Apr 26', amount: 58000, cumulative: 264000 },
        { month: 'May 26', amount: 63000, cumulative: 327000 },
    ];

    const stats = [
        {
            value: content?.stats?.[0]?.value?.value,
            title: content?.stats?.[0]?.title?.value,
            description: content?.stats?.[0]?.description?.value
        },
        {
            value: content?.stats?.[1]?.value?.value,
            title: content?.stats?.[1]?.title?.value,
            description: content?.stats?.[1]?.description?.value
        },
        {
            value: content?.stats?.[2]?.value?.value,
            title: content?.stats?.[2]?.title?.value,
            description: content?.stats?.[2]?.description?.value
        }
    ];

    return (
        <section className="py-12 md:py-20 lg:py-24 px-6 md:px-12 bg-[#FFFBED]">
            <div className="max-w-6xl mx-auto">

                {/* Header - Original Donation Info */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {content?.headerTitle?.value} —{' '}
                        <span className="text-transparent bg-clip-text bg-[#C9A84C]">
                            {content?.goal?.value}
                        </span>
                    </h2>
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                        {content?.subheader?.value}
                    </p>
                </div>

                {/* Progress Bar Section */}
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row items-center md:justify-between mb-3 w-full text-center">
                        <div className="relative w-full md:max-w-4xl">
                            <div className="h-12 bg-white rounded-full relative overflow-hidden border border-gray-100">
                                <div
                                    className="absolute left-0 top-0 h-full bg-[#0D1B3E] transition-all duration-1500 ease-out"
                                    style={{ width: `${animatedProgress}%` }}
                                ></div>
                            </div>
                            <div
                                className="absolute top-1/2 -translate-y-1/2 text-[#C9A84C] font-bold text-lg transition-all duration-1000" 
                                style={{ left: `${Math.min(animatedProgress + 2, 95)}%` }}
                            >
                                {animatedProgress}%
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 w-full md:hidden mt-2">
                                <span>{formatCurrency(0)}</span>
                                <span>{formatCurrency(goal)}</span>
                            </div>
                        </div>
                        <div className={`flex items-center justify-center mt-4 md:mt-0 md:ml-8 bg-white px-6 py-3 rounded-full border border-[#C9A84C]/20 shadow-sm transition-transform duration-500 ${pulse ? 'scale-105' : 'scale-100'}`}>
                            <div className="flex items-center justify-center text-2xl font-bold text-[#C9A84C]">
                                {formatCurrency(currentAmount)} ↑
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block relative w-full md:max-w-4xl mt-2">
                        <span className="absolute left-0 text-sm text-gray-600">{formatCurrency(0)}</span>
                        <span className="absolute right-0 text-sm text-gray-600">{formatCurrency(goal)}</span>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-4 md:p-6 h-96 md:h-[420px] mb-20 shadow-sm border border-gray-100" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart 
                            data={chartData}
                            margin={{ 
                                top: 10, 
                                right: 30, 
                                left: 10, 
                                bottom: 0 
                            }}
                        >
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="rgba(201,168,76,0)" stopOpacity={0} />
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
                            <Tooltip content={<CustomTooltip raised={content?.raised?.value} cumulative={content?.cumulative?.value} charitable={content?.charitable?.value} locale={locale} />} />
                            <Area
                                type="monotone"
                                dataKey="cumulative"
                                stroke="#C9A84C"
                                strokeWidth={3}
                                fill="url(#colorAmount)"
                                fillOpacity={1}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Header 2 - Description for Stats */}
                <div className="text-center mb-12">
                     <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed italic">
                        {content?.headerDescription?.value}
                    </p>
                </div>

                {/* Stats Cards - Original Donation Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-3xl flex flex-col p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 items-center justify-center text-center"
                        >
                            <div className="text-5xl md:text-4xl font-semibold text-[#C9A84C] mb-4">
                                {stat.value}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {stat.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* NEW CSR SECTION - Merged from PDF */}
                <div className="border-t border-gray-200 pt-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                            {content?.csrTitle?.value}
                        </h2>
                        <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed italic">
                            {content?.csrDescription?.value}
                        </p>
                    </div>

                    {/* CSR Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content?.csrPillars?.map((pillar: any, index: number) => (
                            <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100">
                                <h4 className="text-[#C9A84C] font-bold text-xl mb-3">{pillar?.title?.value}</h4>
                                <p className="text-gray-600 text-sm">{pillar?.description?.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-[#C9A84C] font-semibold text-lg">
                            {content?.contactText?.value}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ChildWelfareImpact;
