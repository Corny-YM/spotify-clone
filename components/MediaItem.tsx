"use client";

import Image from "next/image";

import { Song } from "@/types/common";
import useLoadImage from "@/hooks/useLoadImage";

interface Props {
  data: Song;
  onClick?: (id: string) => void;
}
const MediaItem = ({ data, onClick }: Props) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    onClick?.(data.id);

    // TODO: Default turn on player
  };

  return (
    <div
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
      onClick={handleClick}
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          className="object-cover"
          alt="Media Item"
          src={imageUrl || "/images/liked.png"}
          fill
          sizes="min-w-[48px]"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
