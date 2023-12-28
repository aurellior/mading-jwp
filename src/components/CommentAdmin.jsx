import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, database } from "../firebase";
import { Button, Comment, Form, Grid, Header } from "semantic-ui-react";
import avatar from "../assets/matt.jpg";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";

const CommentAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const dbComment = ref(database, "komen/" + id);
    onValue(
      dbComment,
      (snapshot) => {
        setData(Object.values(snapshot.val()));
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [id]);

  const handleDelete = (id) => {
    if (window.confirm("Apakah Ingin Menghapus Komen?")) {
      try {
        deleteDoc(doc(db, "komen", id));
        navigate(`/detailadmin/${id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      <>
        {data === "undefined"
          ? undefined
          : data.map((data) => (
              <Comment key={data.id}>
                <Comment.Avatar src={avatar} alt="avatar"></Comment.Avatar>
                <Comment.Content>
                  <Comment.Author as="a">{data.nama}</Comment.Author>
                  <Comment.Metadata>
                    <div>{data.email}</div>
                  </Comment.Metadata>
                  <Comment.Text>{data.deskripsi}</Comment.Text>
                  <Button
                    color="red"
                    size="small"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </Button>
                </Comment.Content>
              </Comment>
            ))}
      </>
    </Comment.Group>
  );
};

export default CommentAdmin;
