// import React from "react";
// import { Typography, Grid, TextField, Button } from "@mui/material";
// import { Link } from "react-router-dom";

// const LoginForm = () => {
//   return (
//     <Grid container spacing={2} direction={"column"}>
//       <Grid item>
//         <Typography textAlign="center" variant="h4">
//           Login to Selina's website
//         </Typography>
//       </Grid>
//       <Grid item container direction={"column"} spacing={1}>
//         <Grid item>
//           <Typography>Email</Typography>
//           <TextField type="email" variant="outlined" fullWidth />
//         </Grid>
//         <Grid item>
//           <Typography>Password</Typography>
//           <TextField type="password" variant="outlined" fullWidth />
//         </Grid>
//       </Grid>
//       <Grid item container direction={"column"} spacing={2}>
//         <Grid item>
//           <Button variant="contained" fullWidth>
//             Login
//           </Button>
//         </Grid>
//         <Grid item>
//           <Typography textAlign="center">
//             New to Selina's Website? <Link to="/signup">Create an account</Link>
//           </Typography>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default LoginForm;


import React, { useState } from "react";
import { login } from "../../redux/controller/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.controller.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  const handleDemoUserLogIn = (e) => {
    e.preventDefault();

    dispatch(login("demo@aa.io", "password")).catch(async (res) => {
      const data = await res.json();
      console.log(data)
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="page-container">
      <div className="login-form-container">
        <div className=" form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <h1>Log In</h1>
            </div>
            {errors.length > 0 && (
              <div>
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="login-form-input-container">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-form-input-container">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button className="cart-button" type="submit">
                Log In
              </button>
            </div>
            <div>
              <button
                className="login-button"
                type="submit"
                onClick={handleDemoUserLogIn}
              >
                Demo User Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
