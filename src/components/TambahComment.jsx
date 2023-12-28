import React from "react";
import { db, storage, database } from "../firebase";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  snapshotEqual,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Button, Form, Grid, Loader, Divider } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, set } from "firebase/database";

const initialstate = {
  nama: "",
  email: "",
  deskripsi: "",
};

const TambahComment = () => {
  const [data, setData] = useState(initialstate);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { nama, email, deskripsi } = data;
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    try {
      await set(ref(database, "komen/" + id + `/${nama}`), {
        ...data,
        nama: nama,
        email: email,
        deskripsi: deskripsi,
      });
    } catch (error) {
      console.log(error);
    }
    // window.location.reload(false);
  };

  const validate = () => {
    let errors = {};

    if (!nama) {
      errors.nama = "Nama Harus diisi!";
    }
    if (!email) {
      errors.email = "Email Harus diisi!";
    }
    if (!deskripsi) {
      errors.deskripsi = "Deskripsi Harus diisi!";
    }

    return errors;
  };

  return (
    <Grid
      verticalAlign="middle"
      columns="3"
      style={{ height: "auto", marginTop: "10px" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="left">
          {/* <h2>Tambah Mading</h2> */}
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Nama"
              error={errors.nama ? { content: errors.nama } : null}
              placeholder="Masukkan Nama"
              name="nama"
              onChange={handleChange}
              autoFocus
            />
            <Form.Input
              label="Email"
              error={errors.email ? { content: errors.email } : null}
              placeholder="Masukkan Email"
              name="email"
              onChange={handleChange}
            />
            <Form.TextArea
              label="Deskripsi"
              error={errors.deskripsi ? { content: errors.deskripsi } : null}
              placeholder="Masukkan Deskripsi"
              name="deskripsi"
              onChange={handleChange}
            />

            <Button primary type="submit">
              Submit
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TambahComment;
