import React from 'react';
import { useFetch } from '../hooks/useFetch';

const DataFetcher = ({ endpoint = 'https://dummyjson.com/users' }) => {
    const { data, loading, error, retry } = useFetch(endpoint);

    if (loading) {
        return <div className="p-4 text-gray-600">Loading data...</div>;
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 space-y-3">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Failed to load data:</span>
                    <span>{error}</span>
                </div>
                <button
                    onClick={retry}
                    className="px-4 py-1.5 bg-red-600 text-white rounded font-medium text-sm hover:bg-red-700 transition-colors"
                >
                    Retry Request
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold mb-2">Data Loaded Successfully</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

export default DataFetcher;