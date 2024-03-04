/* eslint-disable react-hooks/exhaustive-deps */
import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../apicalls/public";
import defaultImg from "../image/trade.png";

const Details = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const params = useParams();

  const getProduct = async () => {
    try {
      const response = await getProductById(params.id);
      if (response.isSuccess) {
        setProduct(response.productDoc);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section className="flex mt-10">
      {product && product.images && product.images.length === 0 && (
        <div className="w-1/3">
          <img
            src={defaultImg}
            alt="default Img"
            className="w-full h-[400px] rounded-lg object-cover "
          />
          <p className="mt-2 font-medium text-red-600 ">
            This product doesn't include images.
          </p>
        </div>
      )}
      {product && product.images && product.images.length !== 0 && (
        <div className="w-1/3">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-[400px] rounded-lg object-fill object-center"
          />
          <div className="flex items-center gap-3 pt-3">
            {product.images.map((i, index) => (
              <div
                key={i}
                className={`${
                  selectedImage === index && "bg-blue-500"
                } p-1 rounded-md `}
              >
                <img
                  src={i}
                  alt={product.name}
                  className="object-cover w-24 h-24 rounded-md cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="w-2/3 px-20">
        <h1 className="mb-2 text-4xl font-semibold">{product.name}</h1>
        <p className="mb-4 font-medium leading-6 text-gray-500">
          {product.description}
        </p>
        <hr />
        <div className="mb-4">
          <h2 className="my-2 text-2xl font-semibold">Information</h2>
          <div className="flex justify-between ">
            <div className="space-y-2 font-medium">
              <p>Type</p>
              <p>Used for</p>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>{product.category?.replaceAll("_", " ").toUpperCase()}</p>
              <p>{product.usedFor}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="mb-4">
          <h2 className="my-2 text-2xl font-semibold">
            Quality Assurance Package
          </h2>
          {product?.details?.map((d) => (
            <div key={d} className="flex justify-between space-y-1">
              <p className="font-medium">{d}</p>
              <p className="text-gray-600"> includes</p>
            </div>
          ))}
        </div>
        <hr />
        <div className="mb-4">
          <h2 className="my-2 text-2xl font-semibold">Seller Information</h2>
          <div className="flex justify-between ">
            <div className="space-y-2 font-medium">
              <p>Name</p>
              <p>Email</p>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>{product?.seller?.name}</p>
              <p>{product?.seller?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
