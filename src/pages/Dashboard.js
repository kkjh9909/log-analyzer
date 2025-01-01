import React, { useState, useEffect } from 'react';
import LogTable from '../components/LogTable';
import LogChart from '../components/LogChart';

const Dashboard = () => {
    const [logs, setLogs] = useState([]); // 서버에서 가져온 로그 데이터
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const [filter, setFilter] = useState('all'); // all, error, path
    const [path, setPath] = useState('');
    const [range, setRange] = useState('all'); 

    // 서버로부터 로그 데이터를 가져오는 함수
    const fetchLogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
        
            // 조건별 파라미터 추가
            if (range) params.append('range', range);
            if (filter === 'error') params.append('level', 'error');
            if (filter === 'path' && path) params.append('path', path);
        
            console.log('쿼리 파라미터:', params.toString()); // 디버깅용
        
            // API 요청
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/logs?${params}`);
            if (!response.ok) {
                const errorMessage = await response.text(); // 에러 메시지 확인
                throw new Error(`HTTP Error: ${response.status}, ${errorMessage}`);
            }
        
            const data = await response.json();
            setLogs(data.content); // 서버 응답 데이터를 상태로 설정
        } catch (err) {
            console.error('에러 발생:', err.message); // 에러 상세 로그
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("useEffect")
        fetchLogs();
    }, [filter, path, range]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>로그 대시보드</h1>
            <LogChart 
                logs={logs} 
                error={error} 
                loading={loading} 
                filter={filter}
                setFilter={setFilter} 
                spePath={path}
                setPath={setPath}
                range={range}
                setRange={setRange}
            />
            <LogTable logs={logs} />
        </div>
    );
};

export default Dashboard;
