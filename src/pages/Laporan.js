import React from "react";
import { useState, useEffect } from "react";
import { db, database } from "../firebase";
import {
  Button,
  Card,
  Grid,
  Container,
  Image,
  Menu,
  Table,
  Header,
  Icon,
} from "semantic-ui-react";
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
import { onValue, ref } from "firebase/database";

const Laporan = () => {
  const [mading, setMading] = useState([]);
  const [loading, setLoading] = useState(false);
  const [madingItem, setMadingItem] = useState({});
  const navigate = useNavigate();
  const [search, setSeach] = useState("");
  const [data, setData] = useState([]);
  const [jumlah, setJumlah] = useState("");

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "mading"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setMading(list);
        setLoading(false);
        console.log(mading);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    const dbComment = ref(database, "komen/");
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
  }, []);

  return (
    <Container>
      <Menu.Item position="left">
        <Button onClick={() => navigate("/homeadmin")} icon>
          <Icon name="angle left" />
        </Button>
      </Menu.Item>
      <Table basic="very" celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Daftar Artikel</Table.HeaderCell>
            <Table.HeaderCell>Jumlah Komentar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {mading &&
                mading.map((item) => (
                  <Header key={item.id}>
                    <Header.Content>{item.judul}</Header.Content>
                  </Header>
                ))}
            </Table.Cell>
            <Table.Cell>
              {data &&
                data.map((item) => {
                  let total = 0;
                  return (
                    <Header key={item.id}>
                      <Header.Content>
                        {(total = item.length + 1)}
                      </Header.Content>
                    </Header>
                  );
                })}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

export default Laporan;
