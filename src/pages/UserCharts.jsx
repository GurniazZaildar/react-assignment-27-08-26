import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserCharts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from DummyJSON API
  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading user charts...</div>;

  // 1. Process data for Blood Group Bar Chart
  const bloodGroupCounts = users.reduce((acc, user) => {
    const group = user.bloodGroup || 'Unknown';
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {});

  const bloodGroupData = Object.keys(bloodGroupCounts).map((group) => ({
    bloodGroup: group,
    count: bloodGroupCounts[group]
  }));

  // 2. Process data for Age Groups Line Chart
  const ageGroupCounts = {
    '18-25': 0,
    '26-35': 0,
    '36-45': 0,
    '46-55': 0
  };

  users.forEach((user) => {
    const age = user.age;
    if (age >= 18 && age <= 25) ageGroupCounts['18-25']++;
    else if (age >= 26 && age <= 35) ageGroupCounts['26-35']++;
    else if (age >= 36 && age <= 45) ageGroupCounts['36-45']++;
    else if (age >= 46 && age <= 55) ageGroupCounts['46-55']++;
  });

  const ageGroupData = Object.keys(ageGroupCounts).map((range) => ({
    ageGroup: range,
    count: ageGroupCounts[range]
  }));

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>5. User Charts</h2>

      {/* Bar Chart: Users per Blood Group */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Number of Users by Blood Group</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bloodGroupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bloodGroup" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart: Users per Age Group */}
      <div>
        <h3>Users by Age Group</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ageGroupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ageGroup" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                name="Users"
                stroke="#82ca9d"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserCharts;