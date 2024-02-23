import { Checkbox, Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { TbCategoryPlus } from "react-icons/tb";

const AddProduct = () => {
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
  return (
    <section>
      <h1 className="py-3 text-2xl font-bold">What do you want to sell?</h1>
      <Form layout="vertical">
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
          sell
        </button>
      </Form>
    </section>
  );
};

export default AddProduct;
