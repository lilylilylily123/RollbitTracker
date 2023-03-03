import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Loader from "@/components/Loader";

const InitialState = {
  attributes: [],
  external_url: "",
  image: "",
  name: "",
};

const DisplayRobot = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [robot, setRobot] = useState(InitialState);

  useEffect(() => {
    setLoading(true);
    if (!id) return;
    fetch(`https://sportsbot.rollbit.com/metadata/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRobot(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader loading={loading} />;

  return (
    <div>
      <h1>{robot.name}</h1>

      <Image
        priority
        src={robot.image}
        alt={robot.name}
        width={300}
        height={300}
      />
      {robot.attributes?.map((attribute) => (
        <div key={attribute.trait_type}>
          <h3>{attribute.trait_type}</h3>
          <p>{attribute.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayRobot;
