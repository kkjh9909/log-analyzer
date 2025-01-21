import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import LogTable from '../components/LogTable';
import LogChart from '../components/LogChart';

const SEARCH_LOGS = gql`
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

const Dashboard = () => {
    const [filter, setFilter] = useState('all');
    const [path, setPath] = useState('');
    const [range, setRange] = useState('all');
    const [searchPath, setSearchPath] = useState('')

    const getFilterVariables = () => {
        const variables = {
            filter: {},
            range: range !== 'all' ? range : null,
            page: 0,
            size: 10,
        };

        if (filter === 'error') {
            variables.filter.level = 'error'; // 에러 로그만 필터링
        } else if (filter === 'path' && path) {
            variables.filter.path = path; // 특정 경로만 필터링
        }

        return variables;
    };

    const { data, loading, error, refetch } = useQuery(SEARCH_LOGS, {
        variables: getFilterVariables(),
        fetchPolicy: 'network-only',
    });

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        refetch(getFilterVariables());
    };

    const handlePathChange = () => {
        setPath(searchPath);
        refetch(getFilterVariables());
    };

    const handleRangeChange = (newRange) => {
        setRange(newRange);
        refetch(getFilterVariables());
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>로그 대시보드</h1>
            <LogChart 
                logs={data?.searchLogs || []} 
                error={error} 
                loading={loading} 
                filter={filter}
                setFilter={handleFilterChange} 
                path={searchPath}
                setPath={setSearchPath}
                range={range}
                setRange={handleRangeChange}
                onApplyPath={handlePathChange}
            />
            <LogTable logs={data?.searchLogs || []} />
        </div>
    );
};

export default Dashboard;
