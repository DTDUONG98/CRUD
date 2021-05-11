import { useLoading, Audio } from '@agney/react-loading';

export const Loading = () => {
  const { containerProps, BallTriangle } = useLoading({
    loading: true,
    indicator: <Audio width="50" />,
  });

  return (
    <section {...containerProps}>
      {BallTriangle}
    </section>
  );
}