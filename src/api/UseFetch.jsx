import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        async function fetchData() {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const result = await response.json();
                setData(result);
            }
            catch (err) {
                setError(err.message || 'Something Went Worng')
            }
            finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [url]);
    return { data, loading, error };
}
