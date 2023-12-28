import React from "react";
import { Button, Form, Grid, Loader, Icon, Menu } from "semantic-ui-react";
import { storage, db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  snapshotEqual,
  doc,
  updateDoc,
} from "firebase/firestore";

const initialstate = {
  judul: "",
  deskripsi: "",
};

const Add = () => {
  const [data, setData] = useState(initialstate);
  const { judul, deskripsi } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  //update
  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, "mading", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };
  //update end

  useEffect(() => {
    const uploadFile = () => {
      const judul = new Date().getTime() + file.judul;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 1000;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is pause");
              break;

            case "running":
              console.log("upload is runnning");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let errors = {};

    if (!judul) {
      errors.judul = "Judul Harus diisi!";
    }
    if (!deskripsi) {
      errors.deskripsi = "Deskripsi Harus diisi!";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    //kondisi update add
    if (!id) {
      try {
        await addDoc(collection(db, "mading"), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "mading", id), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }
    //end

    navigate("/homeadmin");
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row style={{ marginTop: "10px" }}>
        <Menu.Item position="left">
          <Button onClick={() => navigate("/homeadmin")} icon>
            <Icon name="angle left" />
          </Button>
        </Menu.Item>
        <Grid.Column textAlign="Center">
          <div>
            {isSubmit ? (
              <Loader active inline="centered" size="huge" />
            ) : (
              <>
                <h2>{id ? "Update Mading" : "Tambah Mading"}</h2>
                {/* <h2>Tambah Mading</h2> */}
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                    label="Judul"
                    error={errors.judul ? { content: errors.judul } : null}
                    placeholder="Masukkan Judul"
                    name="judul"
                    onChange={handleChange}
                    value={judul}
                    autoFocus
                  />
                  <Form.TextArea
                    label="Deskripsi"
                    error={
                      errors.deskripsi ? { content: errors.deskripsi } : null
                    }
                    placeholder="Masukkan Deskripsi"
                    name="deskripsi"
                    onChange={handleChange}
                    value={deskripsi}
                  />
                  <Form.Input
                    label="Upload Gambar"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <Button
                    primary
                    type="submit"
                    disabled={progress !== null && progress < 100}
                  >
                    Submit
                  </Button>
                </Form>
              </>
            )}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Add;
