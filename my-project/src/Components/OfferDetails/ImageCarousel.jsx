import { useState } from "react";
const ImageCarousel = ({ images }) => {
  const firstImage = images[0];

  const [currentImage, setCurrentImage] = useState(firstImage);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const OnClickLeftArrow = () => {
    const newIndex =
      selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
    setCurrentImage(images[newIndex]);
    setSelectedImageIndex(newIndex);
  };

  const OnClickRightArrow = () => {
    const newIndex =
      selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
    setCurrentImage(images[newIndex]);
    setSelectedImageIndex(newIndex);
  };

  const handleImageClick = (index) => {
    setCurrentImage(images[index]);
    setSelectedImageIndex(index);
  };

  return (
    <div className="flex flex-col gap-3 w-full z-0">
      <div className="relative w-full">
        <img
          src={currentImage}
          alt={currentImage}
          className="w-full h-[400px] rounded-md object-cover"
        />

        <div className="flex justify-between absolute w-full top-1/2 p-1">
          <span
            class="material-icons text-2xl text-white bg-black bg-opacity-40 rounded-full py-2 px-3 cursor-pointer"
            onClick={OnClickLeftArrow}
          >
            chevron_left
          </span>
          <span
            class="material-icons text-2xl text-white bg-black bg-opacity-40 rounded-full py-2 px-3 cursor-pointer"
            onClick={OnClickRightArrow}
          >
            chevron_right
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image}
              alt={image}
              className={`w-[120px] h-[120px] rounded-md object-cover cursor-pointer ${
                selectedImageIndex === index ? "opacity-50" : ""
              }`}
            />
            {selectedImageIndex === index && (
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
