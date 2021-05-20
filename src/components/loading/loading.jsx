import { useLoading, Circles } from '@agney/react-loading';
import React from 'react';
export const Loading = () => {
  const { containerProps, indicatorEl  } = useLoading({
    loading: true,
    indicator: <Circles width="200" />,
  });

  return (
    <section {...containerProps}>
      {indicatorEl }
    </section>
  );
}