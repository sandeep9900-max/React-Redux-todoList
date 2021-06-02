import React, { useState } from "react";
import { Modal, Button, Typography, Table, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ContactTodo from "../ContactTodo/ContactTodo";
import EditTodo from "../EditTodo/EditTodo";

const { Title } = Typography;

function TableData() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModal, setIsEditModalVisible] = useState(false);
  const [contactId, setContactId] = useState("");

  const contacts = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
  };

  function cancel(e) {}

  const removeContactHandle = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  const todoHandle = () => {
    setIsModalVisible(true);
  };

  const showEditModalHandle = (id) => {
    setIsEditModalVisible(true);
    setContactId(id);
  };

  const columns = [
    {
      title: "First name",
      dataIndex: "fName",
      key: "fName",
      render: (text, record) =>
        (record && record.firstName) || record.lastName ? (
          <span>
            {record.firstName} {record.lastName}
          </span>
        ) : null,
    },
    {
      title: "Last name",
      dataIndex: "lName",
      key: "lName",
      render: (text, record) =>
        record && record.lastName ? (
          <span>
            {record.lastName}
          </span>
        ) : null,
    },
    {
      title: "Contact number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      render: (text, record) =>
        record && record.contactNumber ? (
          <span>{record.contactNumber}</span>
        ) : null,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <span className="edit_icon">
            {
              <EditOutlined
                onClick={() => showEditModalHandle(parseInt(record.id))}
              />
            }
          </span>
          <span>
            <Popconfirm
              title="Are you sure you want to continue?"
              onConfirm={() => removeContactHandle(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          </span>
        </div>
      ),
    },
  ];

  const data =
    contacts && contacts.length
      ? contacts.map((info) => {
          return {
            ...info,
          };
        })
      : [];

  return (
    <>
      <div>
        <div className="container">
          <div className="heading">
            <Title className="header" level={5}>
              Contact List
            </Title>
          </div>
          <div className="add-button">
            <Button className="contact_btn" onClick={todoHandle} type="primary">
              Add contact <PlusOutlined />
            </Button>
          </div>
        </div>
        <div className="contact_table">
          <Table columns={columns} dataSource={data}></Table>
        </div>
        <Modal
          footer={null}
          title="Add Contact"
          visible={isModalVisible}
          onCancel={handleCancel}
        >
          <ContactTodo setIsModalVisible={setIsModalVisible} />
        </Modal>

        <Modal
          footer={null}
          title="Edit Contact"
          visible={isEditModal}
          onCancel={handleCancel}
        >
          <EditTodo
            contactId={contactId}
            setIsEditModalVisible={setIsEditModalVisible}
          />
        </Modal>
      </div>
    </>
  );
}

export default TableData;
