import React from "react";
import { storage, db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import {
  Button,
  Card,
  Grid,
  Container,
  Image,
  Menu,
  Modal,
  Header,
  Icon,
} from "semantic-ui-react";
import TambahComment from "../components/TambahComment";

import CommentAdmin from "../components/CommentAdmin";

const DetailAdmin = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, "mading", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      console.log("Document data:", snapshot.data());
      setData({ ...snapshot.data() });
    } else {
      console.log("No data");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Ingin Menghapus Mading?")) {
      try {
        deleteDoc(doc(db, "mading", id));
        navigate(`/detailadmin/${id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Container text>
      <Menu secondary>
        <Menu.Item position="left">
          <Button onClick={() => navigate("/homeadmin")} icon>
            <Icon name="angle left" />
          </Button>
        </Menu.Item>
        <Menu.Item position="right">
          <Button
            color="red"
            content="Delete"
            labelPosition="right"
            icon="checkmark"
            onClick={() => handleDelete(id)}
            style={{ margin: "5px" }}
          />
          <Button
            style={{ margin: "5px" }}
            color="green"
            onClick={() => navigate(`/update/${id}`)}
          >
            Update
          </Button>
        </Menu.Item>
      </Menu>

      <div>
        <Image size="large" src={data.img} wrapped />

        <Header>{data.judul}</Header>
        <p>{data.deskripsi}</p>
      </div>
      <TambahComment />
      <CommentAdmin />
    </Container>
  );
};

export default DetailAdmin;
