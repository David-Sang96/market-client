/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { TbCategoryPlus, TbFidgetSpinner } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  getOldProduct,
  sellProduct,
  updateProduct,
} from "../../apicalls/product";
import { setLoader } from "../../store/slices/loaderSlice";

const ProductForm = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
  setEditMode,
}) => {
  const [form] = Form.useForm();
  const [sellerId, setSellerId] = useState(null);
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((store) => store.reducer.loader);

  useEffect(() => {
    if (editMode) {
      getOldProductData();
    } else {
      form.resetFields();
    }
  }, [editMode]);

  const options = [
    {
      value: "electronics_and_devices",
      label: "Electronics And Devices",
    },
    {
      value: "clothing_and_fashion",
      label: "Clothing And Fashion",
    },
    {
      value: "books_and_poems",
      label: "Books And Poems",
    },
    {
      value: "home_appliances",
      label: "Home Appliances",
    },
    {
      value: "beauty_products",
      label: "Beauty Products",
    },
    {
      value: "toys_and_games",
      label: "Toys And Games",
    },
    {
      value: "sports_and_outdoors",
      label: "Sports And Outdoors",
    },
  ];

  const checkBoxOptions = [
    {
      label: "Accessories",
      value: "Accessories",
    },
    {
      label: "Warranty",
      value: "Warranty",
    },
    {
      label: "Voucher",
      value: "Voucher",
    },
  ];

  const handleOnFinish = async (values) => {
    dispatch(setLoader(true));
    try {
      const response = editMode
        ? await updateProduct({
            ...values,
            seller_id: sellerId,
            product_id: editProductId,
          })
        : await sellProduct(values);
      if (response.isSuccess) {
        form.resetFields();
        message.success(response.message);
        getProducts();
        setActiveTabKey("1");
        setEditMode(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    dispatch(setLoader(false));
  };

  const getOldProductData = async () => {
    try {
      const response = await getOldProduct(editProductId);
      if (response.isSuccess) {
        message.success("Edit Mode On");
        const { name, description, price, category, usedFor, details, seller } =
          response.productDoc;
        setSellerId(seller);

        const modifiedProducts = {
          product_name: name,
          product_description: description,
          product_price: price,
          product_category: category,
          product_used_for: usedFor,
          product_details: details,
        };
        form.setFieldsValue(modifiedProducts);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <section>
      <h1 className="py-3 text-3xl font-semibold">
        {editMode ? "Update your product here" : "What do you want to sell?"}
      </h1>
      <Form layout="vertical" onFinish={handleOnFinish} form={form}>
        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Product name is required.",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Product name ..." />
        </Form.Item>
        <Form.Item
          name="product_description"
          label="Product Description"
          rules={[
            {
              required: true,
              message: "Product description is required.",
            },
          ]}
          hasFeedback
        >
          <TextArea rows={4} />
        </Form.Item>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="product_price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Price is required.",
                },
              ]}
              hasFeedback
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_category"
              label="Choose one category"
              rules={[
                {
                  required: true,
                  message: "Category is required.",
                },
              ]}
              hasFeedback
            >
              <Select defaultValue={""} options={options} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_used_for"
              label="Used for"
              rules={[
                {
                  required: true,
                  message: "Product's used time is required.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="eg. 3 months ago" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="product_details" label="Check if you have">
          <Checkbox.Group options={checkBoxOptions} defaultValue={[""]} />
        </Form.Item>

        <button
          className="flex items-center gap-1 px-6 py-1 mx-auto my-2 text-lg font-medium text-white bg-blue-500 rounded-md"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <TbFidgetSpinner className="loading-icon" />
              Processing...
            </>
          ) : (
            <>
              <TbCategoryPlus />
              {editMode ? "Update Product" : "Sell Product"}
            </>
          )}
        </button>
      </Form>
    </section>
  );
};

export default ProductForm;
