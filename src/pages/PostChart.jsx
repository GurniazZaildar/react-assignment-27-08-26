import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const PostsChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('https://dummyjson.com/users').then((r) => r.json()),
            fetch('https://dummyjson.com/posts?limit=150').then((r) => r.json())
        ]).then(([usersData, postsData]) => {
            const usersMap = {};
            (usersData.users || []).forEach((u) => {
                usersMap[u.id] = `${u.firstName}`;
            });

            const counts = {};
            (postsData.posts || []).forEach((p) => {
                const userName = usersMap[p.userId] || `User ${p.userId}`;
                counts[userName] = (counts[userName] || 0) + 1;
            });

            const formattedData = Object.keys(counts).map((name) => ({
                userName: name,
                postsCount: counts[name]
            }));

            setChartData(formattedData);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading posts chart...</div>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Posts Count Per User</h2>
            <div className="w-full h-80 bg-white p-4 rounded-lg shadow border">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="userName" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="postsCount" name="Total Posts" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PostsChart;