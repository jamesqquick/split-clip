'use client';
import { Video, getXataClient } from '@/xata';
import React, {
  Fragment,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Marker {
  start: number;
  end: number;
}

export default function VideoEditor({ src }: { src: string }) {
  const [isPlaying, setIsPlaystartg] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [timer, setTimer] = useState<undefined | NodeJS.Timeout>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currentStart, setCurrentStart] = useState<number | undefined>(
    undefined
  );

  //start/end object pairs
  const [currentTimeWidthPercent, setCurrentTimeWidthPercent] =
    useState<number>(0);

  const keyPressHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'i') {
        const currentTime = videoRef.current?.currentTime;
        setCurrentStart(currentTime);
      } else if (event.key === 'o') {
        //check for previous start marker and make sure end postartt is later than start postartt
        const currentTime = videoRef.current?.currentTime;
        if (!currentTime) {
          return;
        } else if (!currentStart) {
          console.log("can't create end postartt before an start postartt");
        } else if (currentTime <= currentStart) {
          console.log("can't create end postartt before the start postartt");
        } else {
          const marker = {
            start: currentStart,
            end: currentTime,
          };
          setMarkers([...markers, marker]);
          setCurrentStart(undefined);
        }
      } else if (videoRef?.current) {
        if (event.key === '=') {
          if (videoRef?.current?.playbackRate <= 3.5) {
            videoRef.current.playbackRate =
              videoRef.current.playbackRate + 0.25;
          }
        } else if (event.key === '-') {
          if (videoRef.current.playbackRate > 0.25) {
            videoRef.current.playbackRate =
              videoRef.current.playbackRate - 0.25;
          }
        } else if (event.code === 'Space') {
          videoRef.current.muted = true;
          if (isPlaying) {
            videoRef.current?.pause();
            setIsPlaystartg(false);
          } else {
            videoRef.current?.play();
            setIsPlaystartg(true);
          }
        }
      }
    },
    [markers, isPlaying, currentStart, videoRef]
  );

  //   const handleTimeUpdate = () => {
  //     if (videoRef?.current) {
  //       const percent =
  //         (videoRef.current.currentTime / videoRef.current.duration) * 100;
  //       setCurrentTimeWidthPercent(percent);
  //     }
  //   };

  //   const handleSeekBarClick = (event: React.MouseEvent<HTMLElement>) => {
  //     if (!videoRef.current) {
  //       return;
  //     }
  //     const clickX = event.clientX;
  //     const seekBarStart = event.currentTarget.getBoundingClientRect().x;
  //     const seekBarWidth = event.currentTarget.getBoundingClientRect().width;
  //     const newMarkerX = clickX - seekBarStart;
  //     videoRef.current.currentTime =
  //       videoRef.current.duration * (newMarkerX / seekBarWidth);
  //   };

  useEffect(() => {
    document.addEventListener('keypress', keyPressHandler);
    return () => {
      document.removeEventListener('keypress', keyPressHandler);
    };
  }, [keyPressHandler]);

  const onSubmitHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const formattedMarkers = markers.map((marker) => {
      return {
        start: Math.floor(marker.start) * 1000,
        end: Math.ceil(marker.end) * 1000,
      };
    });
    fetch('http://localhost:3030/api/video/split', {
      method: 'POST',
      body: JSON.stringify({ markers: formattedMarkers }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const handleVideoMouseEnter = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    console.log(event.currentTarget.src);
    setShowControls(true);
    clearInterval(timer);
  };

  const handleVideoMouseLeave = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    console.log(event);
    setTimer(
      setTimeout(() => {
        setShowControls(false);
      }, 3000)
    );
  };

  return (
    <Fragment>
      <div className="relative mb-10">
        <video
          controls={showControls}
          ref={videoRef}
          className=" max-h-[600px] aspect-video w-full rounded-xl border-gray-200 border-2 mb-4"
          onMouseEnter={handleVideoMouseEnter}
          onMouseLeave={handleVideoMouseLeave}
          muted
        >
          <source id="video-source" src={src} />
          Your browser does not support the video tag.
        </video>
        <div className=" w-full px-[10px] py-2 bg-gray-200 h-[40px] rounded-md">
          <div>
            {currentStart && (
              <div
                className={`h-[50px] w-[6px] bg-purple-500 absolute bottom-[-5px] rounded-md`}
                style={{
                  left: `${
                    (currentStart / videoRef?.current?.duration) * 100
                  }%`,
                }}
              ></div>
            )}
            {markers.map((marker, i) => (
              <Fragment key={i}>
                <div
                  className={`h-[50px] rounded-lg w-[60px] bg-purple-300 border-2 border-purple-700 opacity-75 absolute bottom-[-5px] `}
                  style={{
                    left: `${
                      (marker.start / videoRef?.current?.duration) * 100
                    }%`,
                    width: `${
                      ((marker.end - marker.start) /
                        videoRef?.current?.duration) *
                      videoRef?.current?.getBoundingClientRect().width
                    }px`,
                  }}
                >
                  <div className="rounded-l-lg absolute w-2 -left-2 bg-purple-700 top-[4px] bottom-[4px]"></div>
                  <div className="rounded-r-lg absolute w-2 -right-2 bg-purple-700 top-[4px] bottom-[4px]"></div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <button
        className="bg-blue-500 px-4 py-2 rounded-md"
        onClick={onSubmitHandler}
      >
        Submit
      </button>
    </Fragment>
  );
}
