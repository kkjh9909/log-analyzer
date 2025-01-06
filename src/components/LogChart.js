import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

const LogChart = ({ logs, error, loading, filter, setFilter, path, setPath, range, setRange }) => {
    const changeTimeRange = (newRange) => {
        console.log(logs)
        console.log(setRange)
        console.log(range)
        setRange(newRange); // 새로운 timeRange 값으로 상태 업데이트
    };
    // 시간 데이터 필터링
    const chartData = logs.reduce((acc, log) => {
        console.log("chartData err")

        const time = new Date(log.timestamp).toISOString(); // ISO 문자열로 변환
        const existingEntry = acc.find((entry) => entry.timestamp === time);

        if (existingEntry) 
            existingEntry.count += 1;
        else 
            acc.push({ timestamp: time, count: 1 });
        
        return acc;
    }, []);

    // 데이터 정렬
    const reversedChartData = [...chartData].reverse();

    // 시간 형식 포맷터
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toTimeString().slice(0, 8); // HH:mm:ss 형식
    };

    // 로딩 또는 에러 상태 처리
    if (loading) return <p>데이터를 로딩 중입니다...</p>;
    if (error) return <p>에러가 발생했습니다: {error}</p>;

    return (
        <div>
            {/* 필터링 UI */}
            <div style={{ marginBottom: '20px' }}>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="all"
                        checked={filter === 'all'}
                        onChange={() => setFilter('all')}
                    />
                    전체 로그
                </label>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="radio"
                        name="filter"
                        value="error"
                        checked={filter === 'error'}
                        onChange={() => setFilter('error')}
                    />
                    에러 로그만
                </label>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="radio"
                        name="filter"
                        value="path"
                        checked={filter === 'path'}
                        onChange={() => setFilter('path')}
                    />
                    특정 경로 로그
                </label>
                {filter === 'path' && (
                    <input
                        type="text"
                        placeholder="경로 입력 (예: /api/login)"
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                )}
            </div>

            {/* 시간 범위 선택 */}
            <div style={{ marginBottom: '20px' }}>
                <label>
                    시간 범위:
                    <select value={range} onChange={(e) => changeTimeRange(e.target.value)}>
                        <option value="1h">지난 1시간</option>
                        <option value="6h">지난 6시간</option>
                        <option value="24h">지난 24시간</option>
                        <option value="7d">일주일</option>
                        <option value="1m">한달</option>
                        <option value="all">전체</option>
                    </select>
                </label>
            </div>

            {/* 차트 */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reversedChartData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={(timestamp) => formatTime(timestamp)}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="linear" dataKey="count" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LogChart;
