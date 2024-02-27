/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { message } from "antd";
import { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import {
  deletedSavedProductImages,
  getSavedImages,
  uploadImage,
} from "../apicalls/product";

const Upload = ({ editProductId, setActiveTabKey, setActiveKey }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);

  const getImages = async (product_images) => {
    try {
      const response = await getSavedImages(product_images);
      if (response.isSuccess) {
        setSavedImages(response.data.images);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getImages(editProductId);
  }, []);

  const handleOnchange = (event) => {
    const selectedImages = event.target.files;
    setImages(selectedImages);
    const selectedImagesArray = Array.from(selectedImages);
    const previewImagesArray = selectedImagesArray.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("product_images", images[i]);
    }
    formData.append("product_id", editProductId);
    try {
      const response = await uploadImage(formData);
      if (response.isSuccess) {
        message.success(response.message);
        setActiveTabKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = (img) => {
    const indexForDelete = previewImages.findIndex((e) => e === img);
    if (indexForDelete !== -1) {
      const updatedSelectedImages = [...images];
      updatedSelectedImages.splice(indexForDelete, 1);
      setImages(updatedSelectedImages);
      setPreviewImages(previewImages.filter((image) => image !== img));
      URL.revokeObjectURL(img);
    }
  };

  const handleSavedImagesDelete = async (img) => {
    setSavedImages((prev) => prev.filter((e) => e !== img));
    try {
      const response = await deletedSavedProductImages({
        productId: editProductId,
        imgToDelete: img,
      });
      if (response.isSuccess) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold pb-7">
        Upload your product's images here.
      </h1>
      <div>
        <h1 className={`${savedImages.length > 0 || "pb-7"}`}>
          {savedImages.length > 0 ? "Saved" : "No"} Images in cloud
        </h1>

        {!!savedImages.length && (
          <div className="flex flex-grow gap-4 py-7 ">
            {savedImages.map((img, index) => (
              <div key={index} className="relative basis-1/6">
                <TiDeleteOutline
                  className="absolute right-0 text-2xl text-blue-600 cursor-pointer -top-6"
                  onClick={() => handleSavedImagesDelete(img)}
                />
                <img
                  src={img}
                  alt={index}
                  className="w-full h-full rounded-md "
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <label
          htmlFor="upload"
          className="p-2 font-medium border-2 border-blue-600 border-dashed rounded-md cursor-pointer"
        >
          Upload from device
        </label>
        <input
          type="file"
          hidden
          id="upload"
          name="product_images"
          multiple
          accept="image/png,image/jpeg,image/jpg"
          onChange={(e) => handleOnchange(e)}
        />
        <div className="flex flex-grow gap-2 pt-9 ">
          {previewImages &&
            previewImages.map((image, index) => (
              <div key={index} className="relative basis-1/6">
                <TiDeleteOutline
                  className="absolute right-0 text-2xl text-blue-600 cursor-pointer -top-6"
                  onClick={() => handleDelete(image)}
                />
                <img
                  src={image}
                  alt={index}
                  className="w-full h-full rounded-md "
                />
              </div>
            ))}
        </div>
        <button
          className="block px-3 py-2 mt-3 font-semibold text-white bg-blue-600 rounded-md"
          type="submit"
        >
          Upload the product image
        </button>
      </form>
    </section>
  );
};

export default Upload;
