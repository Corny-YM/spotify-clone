"use client";

import uniqid from "uniqid";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useUser } from "@/hooks/userUser";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const UploadModal = () => {
  const supabaseClient = useSupabaseClient();
  const uploadModal = useUploadModal();
  const router = useRouter();
  const { user } = useUser();
  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (val: boolean) => {
    if (!val) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imgFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imgFile || !songFile || !user) return toast.error("Missing fields");

      const uniId = uniqid();

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      // Upload image
      const { data: imgData, error: imgError } = await supabaseClient.storage
        .from("images")
        .upload(`image-${values.title}-${uniId}`, imgFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imgError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imgData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created");
      reset();
      uploadModal.onClose();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={uploadModal.isOpen}
      title="Add a song"
      description="Upload an mp3 file"
      onChange={onChange}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          placeholder="Song title"
          disabled={isLoading}
          {...register("title", { required: true })}
        />
        <Input
          id="author"
          placeholder="Song author"
          disabled={isLoading}
          {...register("author", { required: true })}
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select a image</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
