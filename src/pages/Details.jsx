/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../apicalls/public";
import Loader from "../components/loader";
import defaultImg from "../image/trade.png";
import { setLoader } from "../store/slices/loaderSlice";

const Details = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const params = useParams();
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((store) => store.reducer.loader);
  const { user } = useSelector((store) => store.reducer.user);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      dispatch(setLoader(true));
      try {
        const response = await getProductById(params.id);
        if (response.isSuccess) {
          setProduct(response.productDoc);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      } finally {
        dispatch(setLoader(false));
      }
    };

    getProduct();
  }, [params.id]);

  return (
    <>
      {isProcessing && (
        <div className="flex items-center justify-center pt-20">
          <Loader />
        </div>
      )}
      <section className="flex pt-10 ">
        {!isProcessing && (
          <>
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
              <div className="flex justify-between">
                <div className="w-3/4">
                  <h1 className="mb-2 text-4xl font-semibold">
                    {product.name}
                  </h1>
                  <p className="mb-4 font-medium leading-6 text-gray-500">
                    {product.description}
                  </p>
                </div>
                <div
                  className="text-3xl text-blue-500 cursor-pointer "
                  onClick={() => navigate(-1)} // -1 redirect to previous page | 1 redirect to next page
                >
                  <IoMdArrowBack className="" />
                </div>
              </div>
              <hr />
              <div className="mb-4">
                <h2 className="my-2 text-2xl font-semibold">Information</h2>
                <div className="flex justify-between ">
                  <div className="space-y-2 font-medium">
                    <p>Price</p>
                    <p>Category</p>
                    <p>Used for</p>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <p>RM {product.price}</p>
                    <p>
                      {product.category?.replaceAll("_", " ").toUpperCase()}
                    </p>
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
                <h2 className="my-2 text-2xl font-semibold">
                  Seller Information
                </h2>
                <div className="flex justify-between ">
                  <div className="space-y-2 font-medium">
                    <p>Name</p>
                    <p>E-mail</p>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <p>{product?.seller?.name}</p>
                    <p>{product?.seller?.email}</p>
                  </div>
                </div>
              </div>
              <hr />
              <h1 className="space-y-2 font-medium">Bids</h1>
              {!user && (
                <p className="font-medium text-red-500">
                  <Link to={"/login"} className="underline">
                    Login
                  </Link>{" "}
                  or{" "}
                  <Link to={"/register"} className="underline">
                    Register
                  </Link>{" "}
                  to bid this product.
                </p>
              )}
              {user && (
                <div className="mt-2">
                  <Form
                    onFinish={() => window.alert("commented")}
                    layout="vertical"
                  >
                    <Form.Item
                      name="comment"
                      label="Comment"
                      rules={[
                        {
                          required: true,
                          message: "Please write your comment.",
                        },
                        {
                          min: 3,
                          message: "Comment must have at least 3 characters.",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input placeholder="comment here ..." type="text" />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: "Please write your phone number.",
                        },
                        {
                          min: 9,
                          message: "phone must have at least 9 characters.",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input placeholder="phone number ..." type="number" />
                    </Form.Item>

                    <button className="flex items-center float-right gap-1 px-2 py-1 font-medium text-white bg-blue-500 rounded-md">
                      <span>Submit</span>
                      <BsFillSendFill className="text-md" />
                    </button>
                  </Form>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Details;
