'use client';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Marker {
  in: number;
  out: number;
}

export default function VideoEditor() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currentIn, setCurrentIn] = useState<number | undefined>(undefined);

  //in/out object pairs
  const [currentTimeWidthPercent, setCurrentTimeWidthPercent] =
    useState<number>(0);

  const keyPressHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'i') {
        const currentTime = videoRef.current?.currentTime;
        setCurrentIn(currentTime);
      } else if (event.key === 'o') {
        //check for previous in marker and make sure out point is later than in point
        const currentTime = videoRef.current?.currentTime;
        if (!currentTime) {
          return;
        } else if (!currentIn) {
          console.log("can't create out point before an in point");
        } else if (currentTime <= currentIn) {
          console.log("can't create out point before the in point");
        } else {
          const marker = {
            in: currentIn,
            out: currentTime,
          };
          setMarkers([...markers, marker]);
          setCurrentIn(undefined);
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
            setIsPlaying(false);
          } else {
            videoRef.current?.play();
            setIsPlaying(true);
          }
        }
      }
    },
    [markers, isPlaying, currentIn, videoRef]
  );

  const handleTimeUpdate = () => {
    if (videoRef?.current) {
      const percent =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setCurrentTimeWidthPercent(percent);
    }
  };

  const handleSeekBarClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!videoRef.current) {
      return;
    }
    const clickX = event.clientX;
    const seekBarStart = event.currentTarget.getBoundingClientRect().x;
    const seekBarWidth = event.currentTarget.getBoundingClientRect().width;
    const newMarkerX = clickX - seekBarStart;
    console.log(newMarkerX);
    videoRef.current.currentTime =
      videoRef.current.duration * (newMarkerX / seekBarWidth);
  };

  useEffect(() => {
    document.addEventListener('keypress', keyPressHandler);
    return () => {
      document.removeEventListener('keypress', keyPressHandler);
    };
  }, [keyPressHandler]);
  return (
    <div className="relative max-w-6xl mx-auto">
      <video
        controls
        ref={videoRef}
        className=" max-h-[600px] aspect-video w-full"
        onTimeUpdate={handleTimeUpdate}
      >
        <source
          id="video-source"
          src="https://us-east-1.storage.xata.sh/6bpi1tjjlh0sh41lpk563a56bk"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute bottom-0 w-full px-[10px] py-2">
        <div
          id="seek-bar"
          className="bg-gray-400 h-2 w-full rounded-full"
          onClick={handleSeekBarClick}
        >
          <div
            id="currentTime"
            className={`bg-gray-200 h-2 rounded-full`}
            style={{
              width: `${currentTimeWidthPercent}%`,
            }}
          ></div>
        </div>
        <div id="markers">
          {currentIn && (
            <div
              className={`h-[12px] w-[12px] bg-green-500 absolute bottom-[6px] rounded-full`}
              style={{
                left: `${(currentIn / videoRef?.current?.duration) * 100}%`,
              }}
            ></div>
          )}
          {markers.map((marker, i) => (
            <Fragment key={i}>
              <div
                className={`h-[12px] w-[12px] bg-green-500 absolute bottom-[6px] rounded-full`}
                style={{
                  left: `${(marker.in / videoRef?.current?.duration) * 100}%`,
                }}
              ></div>
              <div
                className={`h-[12px] w-[12px] bg-red-500 absolute bottom-[6px] rounded-full`}
                style={{
                  left: `${(marker.out / videoRef?.current?.duration) * 100}%`,
                }}
              ></div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
