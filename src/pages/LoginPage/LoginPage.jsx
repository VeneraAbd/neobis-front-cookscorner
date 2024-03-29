import styles from "./LoginPage.module.css";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { loginValidationSchema } from "../../schemas/index";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import show from "../../assets/show.svg";
import hide from "../../assets/hide.svg";
import at from "../../assets/at.svg";
import { login } from "../../store/reducers/auth";
import { useDispatch } from "react-redux";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleShowPassword = () =>{
    setShowPassword(!showPassword)
  }

  // const loginFormSubmit = async( values ) =>{
  //   const { email, password } = values;
  //   console.log("form is submitted")
  //   try {
  //     const response = await dispatch(login({ email, password }));
  //     console.log(response);
      
  //     if (response.payload) {
  //       navigate('/');
  //       toast.success('Successfully logged in');
  //     } else {
  //       toast.error('Invalid username or password');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
      
  //     if (error.response && error.response.status === 401) {
  //       toast.error('Unauthorized: Invalid username or password');
  //     } else {
  //       toast.error('Login failed');
  //     }
  //   }
  // }
  const loginFormSubmit = async (values) => {
    const { email, password } = values;
    console.log("form is submitted");
    try {
      const response = await dispatch(login({ email, password })).then((action)=>{
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("accessToken", action.payload.accessToken);
      });
  
      if (response.payload) {
        navigate('/');
        toast.success('Successfully logged in');
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
  
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized: Invalid username or password');
      } else {
        toast.error('Login failed');
      }
    }
  };
  
  const { values, errors, touched, handleBlur, handleChange, isValid, handleSubmit} = useFormik({
    initialValues:{
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: loginFormSubmit,
  });

  return (
    <div className={styles.container}>
      <section className={styles.login_header}>
        <p className={styles.heading}>Welcome Back</p>
        <p className={styles.heading}>To <span className={styles.company_title}>CooksCorner</span></p>
      </section>
      <form onSubmit={handleSubmit} className={styles.form_wrapper}>
        <div className={styles.input_wrapper}>
          <div>
            <label htmlFor="email" className={styles.label}>Gmail</label>
            <div className={styles.password_input}>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={styles.input}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <button className={styles.showHide_btn} type="button"><img src={at} alt="at sign" /></button>
          </div>
            {touched.email && errors.email ? (
                  <div className={styles.error}>{errors.email}</div>
                ) : null}
          </div>
          <div>
            <label htmlFor="password" className={styles.label}>Password</label>
              <div className={styles.password_input}>
                <input 
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className={styles.input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <button className={styles.showHide_btn} onClick={toggleShowPassword} type="button"><img src={showPassword ? hide : show} alt="show or hide password" /></button>
              </div>
            {touched.password && errors.password ? (
                  <div className={styles.error}>{errors.password}</div>
                ) : null}
          </div>     
        </div>
      <button type="submit" className={styles.login_button}>Sign in</button>
      <p className={styles.p}>I don't have an account. <Link to="/register" className={styles.registration_link}>Sign Up Now</Link></p>
      </form>
    </div>
    
  )
}

export default LoginPage;
