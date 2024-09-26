"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // get token from localstorage

    if (!token) {
      router.push('/auth'); // redirect to login if no token
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name); 
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <h1>Welcome, {name}</h1>;
};

export default Dashboard;
