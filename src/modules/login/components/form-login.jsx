import { useState, useEffect } from "react";
import { Alert } from "react-st-modal"; 
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { PROJECT_TYPE, REACT_APP_BASE_URL } from '../../../routers/router.type'
import axios from 'axios';
export const FormLogin = () => {
  const [loading, setLoading] = useState();
  const { register ,handleSubmit } = useForm();
  const history = useHistory();
  const hanleOnSubmit = async dataUserInput => {
    setLoading(true);
   try {
    const email = dataUserInput.email;
    const password = dataUserInput.password;
    const respon = await axios.post(`${REACT_APP_BASE_URL}login`, {
      username : email,
      password: password,
    });
    const {token} = respon.data.data
    console.log(token);
    if(token){
      localStorage.setItem("token", token);
        setLoading(false);
        history.push(PROJECT_TYPE);
    }
   } catch (error) {
    setLoading(false);
    await Alert("Login failed, try again!", "Notification");
   }
  };

  useEffect(() => {
    // hanleOnSubmit();
}, []);
  return (
    <div className="bg-blue-500 h-screen ">
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: "auto", background: "none" }}
            width="331"
            height="331"
            display="block"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="33"
              fill="none"
              stroke="#edb195"
              strokeDasharray="51.83627878423159 51.83627878423159"
              strokeLinecap="round"
              strokeWidth="7"
            >
              <animateTransform
                attributeName="transform"
                dur="1s"
                keyTimes="0;1"
                repeatCount="indefinite"
                type="rotate"
                values="0 50 50;360 50 50"
              ></animateTransform>
            </circle>
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="none"
              stroke="#04284d"
              strokeDasharray="39.269908169872416 39.269908169872416"
              strokeDashoffset="39.27"
              strokeLinecap="round"
              strokeWidth="7"
            >
              <animateTransform
                attributeName="transform"
                dur="1s"
                keyTimes="0;1"
                repeatCount="indefinite"
                type="rotate"
                values="0 50 50;-360 50 50"
              ></animateTransform>
            </circle>
          </svg>
        ) : (
          <div className="flex rounded-lg sm:h-3/6 lg:h-3/6 h-4/6 shadow-2xl w-1/2 sm:w-3/4 lg:w-1/2 bg-white sm:mx-0">
            <div className="flex flex-col w-1/2 lg:w-full sm:w-full p-4">
              <div className="flex flex-col flex-1 justify-center mb-8">
                <h1 className="text-4xl text-center font-thin">Admin Page</h1>
                <div className="w-full mt-4">
                  <form
                    className="form-horizontal w-3/4 mx-auto"
                    onSubmit={handleSubmit(hanleOnSubmit)}
                  >
                    <div className="flex flex-col mt-4">
                      <input
                        {...register("email", {
                          required: "Required",
                        })}
                        id="email"
                        type="text"
                        className="flex-grow outline-none shadow appearance-none border rounded py-2 px-3 text-grey-darker"
                        name="email"
                        placeholder="Email"
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <input
                         {...register("password", {
                          required: "Required",
                        })}
                        id="password"
                        type="password"
                        className="flex-grow shadow outline-none appearance-none border rounded py-2 px-3 text-grey-darker"
                        name="password"
                        required
                        placeholder="Password"
                      />
                    </div>
                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="mr-2 cursor-pointer"
                      />{" "}
                      <label htmlFor="remember" className="text-sm text-grey-dark">
                        Remember Me
                      </label>
                    </div>
                    <div className="flex flex-col mt-8">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-4">
                    <a className="no-underline hover:underline text-blue-dark text-xs" href="#">
                      Forgot Your Password?
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className=" w-1/2 lg:hidden sm:hidden rounded-r-lg"
              style={{
                background:
                  'url("https://www.harshwal.com/images/remote-business-manager.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
