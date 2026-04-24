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
import { useIntlayer } from "next-intlayer";

export default function DrivingImpactDashboard() {
    const content = useIntlayer("drivingimpactsDashboard");
    const goal = 1000000;
    const currentAmount = 420500;
    const progressPercentage = Math.round((currentAmount / goal) * 100);

    const chartData = [
        { month: 'Jan 25', amount: 75000, cumulative: 75000 },
        { month: 'Feb 25', amount: 52000, cumulative: 127000 },
        { month: 'Mar 25', amount: 61000, cumulative: 206000 },
        { month: 'Apr 25', amount: 58000, cumulative: 264000 },
        { month: 'May 25', amount: 63000, cumulative: 327000 },
        { month: 'Jun 25', amount: 55000, cumulative: 382000 },
        { month: 'Jul 25', amount: 38500, cumulative: 420500 },
        { month: 'Aug 25', amount: 0, cumulative: 420500 },
    ];

    const [animatedProgress, setAnimatedProgress] = useState<number>(0);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimatedProgress(progressPercentage), 300);
        return () => clearTimeout(timeout);
    }, [progressPercentage]);

    const [pulse, setPulse] = useState<boolean>(false);

    // Pulse animation every 1 minute
    useEffect(() => {
        const interval = setInterval(() => {
            setPulse(true);
            setTimeout(() => setPulse(false), 500);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    interface ChartDataType {
        month: string;
        amount: number;
        cumulative: number;
    }

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: readonly { payload: ChartDataType }[] }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const charitableAmount = Math.round(data.amount * 0.1);

            return (
                <div className="bg-white border-2 border-[#D4AF37] rounded-2xl p-6 shadow-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">{data.month}</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">{content.raised}</span>
                            <span className="font-semibold text-gray-900">
                                ₹{data.amount.toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">{content.cumulative}</span>
                            <span className="font-semibold text-yellow-600">
                                ₹{data.cumulative.toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">{content.charitable}</span>
                            <span className="font-semibold text-gray-900">
                                ₹{charitableAmount.toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="bg-white py-4 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {content.header} —{' '}
                        <span className="text-transparent bg-clip-text bg-[#D4AF37]">
                            {content.goal}
                        </span>
                    </h2>
                    <p className="text-[#000000] text-lg">
                        {content.subheader}
                    </p>
                </div>

                {/* Progress Bar Section */}
                <div className="mb-16">

                    {/* MAIN ROW */}
                    <div
                        className="flex flex-col md:flex-row 
        items-center md:items-center md:justify-between 
        mb-3 w-full text-center"
                    >

                        {/* Progress Bar */}
                        <div className="relative w-full md:max-w-4xl">

                            {/* BAR */}
                            <div className="h-12 bg-[#FFFBED] rounded-full relative overflow-hidden">
                                <div
                                    className="absolute left-0 top-0 h-full bg-[#0F1E4D] transition-all duration-1500 ease-out"
                                    style={{ width: `${animatedProgress}%` }}
                                ></div>
                            </div>

                            {/* Percentage Text */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 text-[#D4AF37] font-bold text-lg transition-all duration-1000"
                                style={{ left: `${Math.min(animatedProgress + 2, 95)}%` }}
                            >
                                {animatedProgress}%
                            </div>

                            {/* Labels Under Bar – Mobile Only */}
                            <div className="flex justify-between text-sm text-gray-600 w-full md:hidden mt-2">
                                <span>₹0</span>
                                <span>₹{goal.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        {/* Current Amount Box */}
                        <div
                            className={`
            flex items-center justify-center 
            mt-4 md:mt-0 md:ml-8 
            bg-gradient-to-br from-yellow-50 to-orange-50 
            px-6 py-3 rounded-full 
            transition-transform duration-500 
            ${pulse ? 'scale-105' : 'scale-100'}
        `}
                        >
                            <div className="flex items-center justify-center text-2xl font-bold text-transparent bg-clip-text bg-[#D4AF37]">
                                ₹{currentAmount.toLocaleString('en-IN')} ↑
                            </div>
                        </div>

                    </div>

                    {/* DESKTOP LABELS — Goal aligned to bar end */}
                    <div className="hidden md:block relative w-full md:max-w-4xl mt-2">

                        {/* ₹0 on left */}
                        <span className="absolute left-0 text-sm text-gray-600">₹0</span>

                        {/* Goal at bar end */}
                        <span className="absolute right-0 text-sm text-gray-600">
                            ₹{goal.toLocaleString('en-IN')}
                        </span>

                    </div>

                </div>


                {/* Chart */}
                <div className="bg-white rounded-3xl p-2 h-96 md:h-[420px] ">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="rgba(217,217,217,0)" stopOpacity={0} />
                                    <stop offset="100%" stopColor="#D4AF37" stopOpacity={1} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 14 }} />
                            <YAxis
                                tick={{ fill: '#666', fontSize: 14 }}
                                tickFormatter={(value) => `₹${value / 1000}K`}
                                domain={[0, 600000]}
                                ticks={[0, 150000, 300000, 450000, 600000]}
                            />

                            <Tooltip content={CustomTooltip} />

                            <Area
                                type="monotone"
                                dataKey="cumulative"
                                stroke="#D4AF37"
                                strokeWidth={3}
                                fill="url(#colorAmount)"
                                fillOpacity={1}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}