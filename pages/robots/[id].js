import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/DisplayRobot.module.scss";
import LongRunner from "@/components/LongRunner";

const fetchDummy = async () => {
  // create a promise that resolves after 1 second
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Dummy", image: "https://i.imgur.com/3ZQ3X9M.png" });
    }, 1000);
  });

  return promise;
};

const DisplayRobot = ({ robot }) => {
  const [dummy, setDummy] = useState(null);
  const [dummy2, setDummy2] = useState(null);
  const [dummy3, setDummy3] = useState(null);

  useEffect(() => {
    async function doAThing() {
      const { data, otherData } = await fetchDummy();
      setDummy2(data);
      setDummy3(otherData);
    }

    doAThing();
  }, []);

  return (
    <div className={styles.robot_container}>
      <h1>{robot.name}</h1>
      <Image
        priority
        src={robot.image}
        alt={robot.name}
        width={350}
        height={350}
      />
      <div className={styles.robot_info}>
        {robot.attributes?.map((attribute) => (
          <div key={attribute.trait_type}>
            <h3>{attribute.trait_type}</h3>
            <p>{attribute.value}</p>
          </div>
        ))}
      </div>
      <LongRunner />
    </div>
  );
};

export default DisplayRobot;

export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const robot = await fetch(
    `https://sportsbot.rollbit.com/metadata/${id}`
  ).then((res) => res.json());

  return {
    props: {
      robot,
    },
  };
};
