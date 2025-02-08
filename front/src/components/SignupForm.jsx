import { useForm } from "react-hook-form";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const SignupForm = () => {
  const { setUser, error, setError } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    try {
      const { data: response } = await axios.post(
        `${API_URL}/users/signup`,
        formdata,
        { withCredentials: true }
      );
      setUser(response.data);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.message || "An error occurres, please try again"
          );
        } else if (error.request) {
          setError("No response from server. Check interner connection");
        } else {
          setError("Something went wrong. Please try again");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-[19rem] md:w-[25rem] lg:w-[30rem] bg-[#431592] px-8 p-16 rounded-lg"
      >
        <div className="text-yellow-500 font-bold text-2xl">Signup</div>
        <div>{error}</div>
        <div>
          <label className="block text-sm font-medium text-white">
            Username
          </label>
          <input
            type="text"
            {...register("username", {
              required: "Can't be empty",
            })}
            className="mt-1 lg:w-100 input input-bordered"
          />
          <p className="text-red-500 text-sm">{errors?.username?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Can't be empty",
              pattern: {
                value:
                  /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="mt-1 lg:w-100 input input-bordered"
          />
          <p className="text-red-500 text-sm">{errors?.email?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Can't be empty",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[A-Z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*.,?]).{8,}$/,
                message:
                  "At least 8 characters, capital letter, symbol and number",
              },
            })}
            className="mt-1 lg:w-100 input input-bordered"
          />
          <p className="text-red-500 text-sm">{errors?.password?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("passwordconfirm", {
              required: "Can't be empty",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="mt-1 lg:w-100 input input-bordered"
          />
          <p className="text-red-500 text-sm">
            {errors?.passwordconfirm?.message}
          </p>
        </div>

        <button
          type="submit"
          className="btn bg-yellow-500 border-yellow-500 mt-2"
        >
          Signup
        </button>
        <p className="text-white text-center">
          Already have an account?{" "}
          <Link to="/" className="text-yellow-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
