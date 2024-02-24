/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import {
  getOldProduct,
  sellProduct,
  updateProduct,
} from "../../apicalls/product";

const ManageProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
  setEditMode,
}) => {
  const [form] = Form.useForm();
  const [sellerId, setSellerId] = useState(null);

  const options = [
    {
      value: "electronics",
      label: "Electronics",
    },
    {
      value: "clothing",
      label: "Clothing",
    },
    {
      value: "books",
      label: "Books",
    },
    {
      value: "home_appliances",
      label: "Home Appliances",
    },
    {
      value: "beauty",
      label: "Beauty Products",
    },
    {
      value: "toys",
      label: "Toys & Games",
    },
    {
      value: "sports",
      label: "Sports & Outdoors",
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

  useEffect(() => {
    if (editMode) {
      getOldProductData();
    } else {
      form.resetFields();
    }
  }, [editMode]);

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

        <button className="flex items-center gap-1 px-6 py-1 mx-auto my-2 text-lg font-medium text-white bg-blue-500 rounded-md">
          <TbCategoryPlus />
          {editMode ? "Update Product" : "sell Product"}
        </button>
      </Form>
    </section>
  );
};

export default ManageProduct;
