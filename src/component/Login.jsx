import { useForm } from "react-hook-form";
import { login } from '../Services/Auth';
import { useNavigate } from "react-router"
import { useEffect } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("pacificadmin"))) {
      navigate("/dashboard")
    }
  }, [])


  const ShowPass = () => {
    const input = document.querySelector(".login-pass input");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

  const onSubmit = async (formData) => {
    const response = await login(formData)
    if (response.data.code === 1) {
      localStorage.setItem("pacificadmin", JSON.stringify(response.data.data))
      setTimeout(() => {
        navigate("/dashboard");
      }, 0);
    } else {
      Swal.fire({
        title: response.data.data.message,
        timer: 3500,
        icon: 'error',
        showConfirmButton: false,
      })
    }
  }

  return (
    <section className="login">
      <div className="row ">
        <div className="col-md-12 col-sm-12 col-xs-12 ">
          <div className="login-content">
            <div className="login-img">
              <img src="/assets/images/Intersection 1.png" alt="" />
            </div>
            <div className="login-header">
              <h3>Welcome Back!</h3>
              <p>Sign In to continue to Pacific Shores Admin Portal</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="form-login">
              <div className="login-name">
                <input type="text" name="uname"
                  placeholder="Username" {...register("email", { required: true })} />
                {errors.email?.type === "required" && <span>Email is required</span>}
              </div>
              <div className="login-pass">
                <input type="password" name="uname" placeholder="Password" {...register("password", { required: true })} />
                {errors.password?.type === "required" && <span>Password is required</span>}
                <img className='eye-pass' onClick={ShowPass} src="/assets/images/Group 64.svg" alt="" />
              </div>
              <button type="submit" className="btn-primary login-button">Login</button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Login;