"use client";
import React, { useState } from "react";
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
import { StarOutline } from "./Icons/Star";

export default function AddFav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [rating, setRating] = useState<number>(3);

  const handleStarClick = (star: number) => {
    // onRatingChange(star);
    setRating(star);
  };

  const handleStarHover = (star: number) => {
    setHoveredRating(star);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <>
      {/* <Button
        variant="flat"
        color="warning"
        onPress={onOpen}
        className="capitalize"
      >
        OPen
      </Button> */}
      <Button
        onPress={onOpen}
        className="gap-4 w-full bg-white bg-opacity-[0.08] text-[#5799ef] px-4 py-2 rounded-lg hover:bg-[#5799ef2e]"
      >
        <StarOutline color="#5799ef" />
        Add to favorite.
      </Button>

      <Modal
        backdrop={"opaque"}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="outside"
        // className="scrollbar-default"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Guardians of the Galaxy Vol. 2
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-5 flex-col sm:flex-row items-center sm:items-start">
                  <Image
                    src={"/movieThub.png"}
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
                        placeholder="Write a review..."
                        className="w-full"
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
                  onPress={onClose}
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
}
