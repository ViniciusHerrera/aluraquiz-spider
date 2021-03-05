import React from 'react';
import Lottie from 'react-lottie';
import animationData from './spinner.json';

// eslint-disable-next-line react/prop-types
export default function LoadingSpinner() {
  const [loadingState, setLoadingState] = React.useState({
    isStopped: false, isPaused: false,
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // setLoadingState({
  //   ...loadingState,
  //   isStopped: !loading,
  // });

  return (
    <Lottie
      options={defaultOptions}
      height={100}
      width={100}
      isStopped={loadingState.isStopped}
      isPaused={loadingState.isPaused}
    />
  );
}
