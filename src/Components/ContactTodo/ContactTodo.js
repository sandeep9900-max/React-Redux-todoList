import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function ContactTodo(props) {
  const { setIsModalVisible } = props;

  const [inputValue, setInputValue] = useState({
    fName: "",
    lName: "",
    cNumber: "",
  });

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const saveContactHandle = (e) => {
    const data = {
      id: contacts[contacts.length - 1].id + 1,
      firstName: inputValue.fName,
      lastName: inputValue.lName,
      contactNumber: inputValue.cNumber,
    };

    dispatch({ type: "ADD_CONTACT", payload: data });
    setInputValue({ fName: "", lName: "", cNumber: "" });
    setIsModalVisible(false);
  };
  return (
    <>
      <div>
        <Form initialValues={inputValue} onFinish={saveContactHandle}>
          <Form.Item label="First name">
            <Input
              placeholder="Enter first name"
              name="fName"
              value={inputValue.fName}
              onChange={handleSubmit}
              required
            />
          </Form.Item>
          <Form.Item label="Last name">
            <Input
              placeholder="Enter last name"
              name="lName"
              required
              value={inputValue.lName}
              onChange={handleSubmit}
            />
          </Form.Item>
          <Form.Item label="Contact number">
            <Input
              placeholder="Enter contact number"
              name="cNumber"
              value={inputValue.cNumber}
              onChange={handleSubmit}
              required
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default ContactTodo;
