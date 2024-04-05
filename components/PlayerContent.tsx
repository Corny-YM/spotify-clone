"use client";

import useSound from "use-sound";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types/common";
import usePlayer from "@/hooks/usePlayer";
import Slider from "./Slider";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";

interface Props {
  song: Song;
  songUrl: string;
}

const PlayerContent = ({ song, songUrl }: Props) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayPrevious = () => {
    if (!player.ids.length) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    if (!prevSong) return player.setId(player.ids[player.ids.length - 1]);

    player.setId(prevSong);
  };
  const onPlayNext = () => {
    if (!player.ids.length) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) return player.setId(player.ids[0]);

    player.setId(nextSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    format: ["mp3"],
    onplay: () => setIsPlaying(true),
    onopen: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) return play();
    pause();
  };

  const toggleMute = () => {
    if (volume === 0) return setVolume(1);
    setVolume(0);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden h-full w-full max-w-[722px] md:flex justify-center items-center gap-x-6">
        <AiFillStepBackward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onPlayPrevious}
        />
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onPlayNext}
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            className="cursor-pointer"
            size={34}
            onClick={toggleMute}
          />
          <Slider value={volume} onChange={(val) => setVolume(val)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
