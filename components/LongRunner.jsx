import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LongRunner = () => {
  const router = useRouter();
  const { id } = router.query;

  const [longData, setLongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/robots/${id}`);
        const data = await response.json();
        setLongData(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <div>{JSON.stringify(longData)}</div>;
};

export default LongRunner;
