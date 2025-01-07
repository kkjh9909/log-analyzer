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
            // GraphQL 쿼리
            const query = `
                query SearchLogs($filter: LogFilterInput, $range: String, $page: Int, $size: Int) {
                    searchLogs(filter: $filter, range: $range, page: $page, size: $size) {
                        id
                        ip
                        status
                        uri
                        message
                        parameters
                        timestamp
                        method
                    }
                }
            `;
    
            // 기본 변수 설정
            const variables = {
                filter: {},
                range: range !== 'all' ? range : null, // 'all'이면 range 제외
                page: 0,
                size: 10,
            };
    
            // 필터링 조건 동적으로 설정
            if (filter === 'error')
                variables.filter.level = 'error'; // 에러 상태의 로그만
            else if (filter === 'path' && path)
                variables.filter.path = path; // 특정 경로에 대한 로그만
            
    
            // 디버깅용
            console.log('GraphQL 요청 변수:', variables);
    
            // GraphQL 요청
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, variables }),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text(); // 에러 메시지 확인
                throw new Error(`HTTP Error: ${response.status}, ${errorMessage}`);
            }
    
            const responseData = await response.json();
            console.log('응답 데이터:', responseData);
    
            if (responseData.errors) {
                throw new Error(responseData.errors.map((err) => err.message).join(', '));
            }
    
            setLogs(responseData.data.searchLogs); // 서버 응답 데이터를 상태로 설정
        } catch (err) {
            console.error('fetchLogs 에러 발생:', err.message); // 에러 상세 로그
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
                path={path}
                setPath={setPath}
                range={range}
                setRange={setRange}
            />
            <LogTable logs={logs} />
        </div>
        
    );
};

export default Dashboard;
