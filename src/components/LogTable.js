import React, { useState } from 'react';

const LogTable = ({ logs }) => {
    const [expandedRowId, setExpandedRowId] = useState(null);

    const handleRowClick = (id) => {
        setExpandedRowId(expandedRowId === id ? null : id);
    };

    console.log(logs)

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>status</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>method</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>path</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>IP</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>timestamp</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>parameters</th>
                </tr>
            </thead>
            <tbody>
                {logs.map((log, index) => (
                    <React.Fragment key={index}>
                        <tr onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.status}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.method}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.uri}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.ip}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {new Date(log.timestamp).toLocaleString()}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {log.parameters ? 'Show Parameters' : 'No Parameters'}
                            </td>
                        </tr>
                        {expandedRowId === index && log.parameters && (
                            <tr>
                                <td colSpan="6" style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f9f9f9' }}>
                                    <pre>{JSON.stringify(log.parameters, null, 2)}</pre>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default LogTable;
