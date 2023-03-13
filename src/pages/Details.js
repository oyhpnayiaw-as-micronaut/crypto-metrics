import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

import MarketCard from 'src/components/MarketCard';
import Title from 'src/components/Title';
import { useGetCoinQuery } from 'src/redux/services/api';
import styles from './Details.module.css';

function Details() {
  const { id } = useParams();
  const {
    data, isLoading, isError, error,
  } = useGetCoinQuery(id);

  console.log({ isError, error });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error.status === 404) {
    return <Navigate to="/404" />;
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <MarketCard market={data} expanded />
      <Title>Market Volumes</Title>
      <div>
        {data.tickers.map((ticker) => (
          <div key={`${ticker.exchange}-${ticker.volume}`} className={styles.row}>
            <p className={styles.exchange}>{ticker.exchange}</p>
            <p className={styles.volume}>{ticker.volume}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;
