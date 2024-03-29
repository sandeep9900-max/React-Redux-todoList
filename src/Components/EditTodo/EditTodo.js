import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


function EditTodo(props) {
  const { contactId, setIsEditModalVisible } = props;

  const [inputValue, setInputValue] = useState({
    fName: "",
    lName: "",
    cNumber: "",
  });

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();

  const currentContact = contacts.find(
    (data) => data.id === parseInt(contactId)
  );

  const inputHandle = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  useEffect(() => {
    if (currentContact) {
      setInputValue({
        fName: currentContact.firstName,
        lName: currentContact.lastName,
        cNumber: currentContact.contactNumber,
      });
    }
  }, [currentContact]);

  const updateContactHandle = () => {
    const data = {
      id: parseInt(contactId),
      firstName: inputValue.fName,
      lastName: inputValue.lName,
      contactNumber: inputValue.cNumber,
    };
    dispatch({ type: "UPDATE_CONTACT", payload: data });
    setIsEditModalVisible(false);
  };

  return (
    <>
        <Form onFinish={updateContactHandle}>
          <Form.Item label="First name">
            <Input
              placeholder="Enter first name"
              name="fName"
              value={inputValue.fName}
              onChange={inputHandle}
              required
            />
          </Form.Item>
          <Form.Item label="Last name">
            <Input
              placeholder="Enter last name"
              name="lName"
              required
              value={inputValue.lName}
              onChange={inputHandle}
            />
          </Form.Item>
          <Form.Item label="Contact number">
            <Input
              placeholder="Enter contact number"
              name="cNumber"
              value={inputValue.cNumber}
              onChange={inputHandle}
              required
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
    </>
  );
}

export default EditTodo;
