"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import Star, { StarOutline } from "./Icons/Star";

import { FC } from "react";
import UpdateFavList, { RemoveFromFavorite } from "@/lib/UpdateFavList";
import { useForm } from "react-hook-form";

interface AddFavProps {
  movieId: string;
  imageUrl: string;
  title: string;
}

type Inputs = {
  review: string;
};

const AddFav: FC<AddFavProps> = ({ movieId, imageUrl, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFav, setIsFav] = useState<boolean>(false);

  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = (data) => {

  // };

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const handleStarHover = (star: number) => {
    setHoveredRating(star);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  useEffect(() => {
    function checkFavMovies() {
      const favData = localStorage.getItem("favMovies");
      if (favData) {
        const { _movieIds } = JSON.parse(favData);
        setIsFav(_movieIds.includes(movieId));
      }
    }
    checkFavMovies();
  }, []);

  function removeFavorite() {
    setIsFav(false);
    RemoveFromFavorite({ movieId: movieId });
  }

  function addToFavorite() {
    onClose();
    setIsFav(true);
    UpdateFavList({
      movieId: movieId,
      rating: rating,
      review: getValues("review"),
    });
  }

  return (
    <>
      <Button
        onPress={() => (isFav ? removeFavorite() : onOpen())}
        className="gap-4 w-full bg-white bg-opacity-[0.08] text-[#5799ef] px-4 py-2 rounded-lg hover:bg-[#5799ef2e]"
      >
        {isFav ? (
          <>
            <Star color="#5799ef" />
            Remove from favorite.
          </>
        ) : (
          <>
            <StarOutline color="#5799ef" />
            Add to favorite.
          </>
        )}
      </Button>

      <Modal
        backdrop={"opaque"}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <div className="flex gap-5 flex-col sm:flex-row items-center sm:items-start">
                  <Image
                    src={imageUrl != "N/A" ? imageUrl : "/noImage.png"}
                    width={250}
                    height={250}
                    alt="Movie Thumb"
                    className="rounded-lg"
                  />
                  <div className="w-full space-y-5">
                    <div>
                      <h1 className="headingSectionSecondary">Add a rating</h1>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                          return (
                            <button
                              key={star}
                              className={`text-xl font-bold ${
                                star <= (hoveredRating || rating)
                                  ? "text-primary"
                                  : ""
                              }`}
                              onClick={() => handleStarClick(star)}
                              onMouseEnter={() => handleStarHover(star)}
                              onMouseLeave={handleStarLeave}
                            >
                              ★
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h1 className="headingSectionSecondary">Add a review</h1>
                      <Textarea
                        {...register("review")}
                        placeholder="Write a review..."
                        className="w-full"
                        // onChange={(e) => setReview()}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={addToFavorite}
                  className="text-black"
                >
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFav;
