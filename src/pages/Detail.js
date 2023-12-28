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
import CommentUser from "../components/CommentUser";

const Detail = () => {
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
      //   console.log("Document data:", snapshot.data());
      setData({ ...snapshot.data() });
    } else {
      console.log("No data");
    }
  };

  return (
    <Container text>
      <Menu secondary>
        <Menu.Item position="left">
          <Button onClick={() => navigate("/")} icon>
            <Icon name="angle left" />
          </Button>
        </Menu.Item>
      </Menu>
      <div>
        <Image size="large" src={data.img} wrapped />

        <Header>{data.judul}</Header>
        <p>{data.deskripsi}</p>
      </div>
      <TambahComment />
      <CommentUser />
    </Container>
  );
};

export default Detail;
