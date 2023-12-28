import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { database } from "../firebase";
import { ref, child, get, onValue } from "firebase/database";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLoading(true);
    const dbLogin = ref(database, "user");
    onValue(
      dbLogin,
      (snapshot) => {
        setUsername(snapshot.val().username);
        setPass(snapshot.val().password);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleClick = () => {
    if (username === data.usernameform && pass === data.passwordform) {
      navigate("/homeadmin");
    } else {
      alert("Username atau Password Anda Salah!");
    }
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="Center">
          <Form>
            <Form.Input
              label="Username"
              placeholder="Masukkan Username"
              name="usernameform"
              onChange={handleChange}
            />
            <Form.Input
              label="Password"
              placeholder="Masukkan Password"
              name="passwordform"
              onChange={handleChange}
            />

            <Button onClick={handleClick} primary type="submit">
              Submit
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
      {/* {console.log(username)} */}
    </Grid>
  );
};

// const Login = () => {
//   const [data, setData] = useState({});
//   return (
//     <Grid
//       centered
//       verticalAlign="middle"
//       columns="3"
//       style={{ height: "80vh" }}
//     >
//       <Grid.Row>
//         <Grid.Column textAlign="Center">
//           <Form onSubmit={handleSubmit}>
//             <Form.Input
//               label="Username"
//               placeholder="Masukkan Username"
//               name="username"
//               onChange={handleChange}
//               value={username}
//             />
//             <Form.Input
//               label="Password"
//               placeholder="Masukkan Password"
//               name="passwrod"
//               onChange={handleChange}
//               value={password}
//             />

//             <Button primary type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Grid.Column>
//       </Grid.Row>
//     </Grid>
//   );
// };

export default Login;
