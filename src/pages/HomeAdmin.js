import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { Button, Card, Grid, Container, Image, Menu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

const HomeAdmin = () => {
  const [mading, setMading] = useState([]);
  const [loading, setLoading] = useState(false);
  const [madingItem, setMadingItem] = useState({});
  const navigate = useNavigate();
  const [search, setSeach] = useState("");

  useEffect(() => {
    const colletionRef = collection(db, "mading");
    const q = query(
      colletionRef,
      search && where("judul", "==", `${search}`) // does not need index
    );
    setLoading(true);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setMading(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, [search]);

  return (
    <Container className="Container">
      <Menu secondary>
        <Menu.Item position="left">
          <form style={{ display: "inline" }}>
            <input
              type="text"
              className="inputField"
              placeholder="Cari Mading"
              onChange={(e) => setSeach(e.target.value)}
              value={search}
            ></input>
          </form>
        </Menu.Item>
        <Menu.Item position="right">
          <Button
            style={{ margin: "20px" }}
            size="medium"
            primary
            onClick={() => navigate("/laporan")}
          >
            Laporan
          </Button>
          <Button
            style={{ margin: "20px" }}
            size="medium"
            primary
            onClick={() => navigate("/add")}
          >
            Tambah Mading
          </Button>
        </Menu.Item>
      </Menu>

      <Card.Group style={{ marginTop: "20px" }}>
        <Grid columns={3}>
          {mading &&
            mading.map((item) => (
              <Grid.Column key={item.id} textAlign="center">
                <Card>
                  <Card.Content>
                    <Image
                      src={item.img}
                      size="large"
                      style={{
                        height: "150px",
                        width: "200px",
                      }}
                    />
                  </Card.Content>
                  <Card.Header style={{ marginTop: "10px" }}>
                    <Card.Description>{item.judul}</Card.Description>
                  </Card.Header>
                  <Card.Content extra>
                    <Button
                      color="blue"
                      onClick={() => navigate(`/detailadmin/${item.id}`)}
                    >
                      View
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
        </Grid>
      </Card.Group>
    </Container>
  );
};

export default HomeAdmin;
