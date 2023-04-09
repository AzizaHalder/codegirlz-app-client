import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  console.log(API_URL);
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  (function () {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
  })()

  return (
    <div className="LoginPage" >
      <h2>CodeGirlz Login</h2>
      <form class="row g-3 needs-validation" novalidate onSubmit={handleLoginSubmit} id="form-login" >
        <div class="col-md-4">
          <label for="validationCustomUsername" class="form-label">Email</label>

          <div class="input-group has-validation">
            <input type="email" class="form-control" value={email} id="validationCustomUsername" aria-describedby="inputGroupPrepend" required onChange={handleEmail} />
            <div class="invalid-feedback">
              Please input your email.
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom03" class="form-label">Password</label>
          <input type="password" name="password" class="form-control" value={password} onChange={handlePassword} id="validationCustom03" required />
          <div class="invalid-feedback">
            Please provide a password at least 6 characters long with one capital letter, one lowercase letter, and one number.
          </div>
        </div>
        <div>{errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}</div>
        <div class="col-md-6">
          <button class="btn btn-primary" type="submit" id="login-button">Login</button>
        </div>
      </form>

      <div class="col-12" id="sign-up-button-div">
        <p>Don't have an account yet?</p>
        <Link to={"/auth/signup"}><button class="btn btn-primary" type="submit" id="sign-up-button">Sign Up</button></Link>
      </div>
    </div>
  );
}

export default LoginPage;
