import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { fetchBooks } from "../redux/slices/booksSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displaySelect, setDisplaySelect] = useState(true);
  let { categories, isLoading } = useSelector((state) => state.categories);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    preference: "",
    role: "user",
  });
  const [passwordError, setPasswordError] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const [err, setErr] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setIsAdmin(checked);
      setUserData({ ...userData, role: checked ? "admin" : "user" });
      setDisplaySelect(!displaySelect);
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    dispatch(
      registerUser({
        email: userData.email,
        password: userData.password,
        role: userData.role,
        preference: userData.preference,
      })
    ).then((resultAction) => {
      if (registerUser.fulfilled.match(resultAction)) {
        dispatch(fetchCategories());
        dispatch(fetchBooks());
        navigate("/home");

        setUserData({
          email: "",
          password: "",
          confirmPassword: "",
          preference: "",
        });
      }
    });
  };

  useEffect(() => {
    if (error !== null) {
      setErr(error);
    }
    const timeout = setTimeout(() => setErr(""), 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    try {
      dispatch(fetchCategories());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);
  return (
    <div className="bg-library-pattern bg-cover bg-center bg-no-repeat flex justify-center items-center min-h-screen bg-white">
      <div className="bg-[#f4f4f990] p-6 w-[80vw] lg:w-[30vw] md:w-[50vw] sm:w-[30vw] shadow-lg animate-fade-left animate-once">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold text-center mb-4">Register</h1>
          {err && <p className="text-red-500 text-sm">{err}</p>}
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="p-2 border font-normal rounded-full w-full"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="p-2 border font-normal rounded-full w-full"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChange}
            className="p-2 border font-normal rounded-full w-full"
          />

          <div className="flex justify-start items-center">
            <label htmlFor="admin" className="mr-2 text-primaryGreen">
              Register as an Admin?
            </label>
            <input
              type="checkbox"
              name="admin"
              checked={isAdmin}
              onChange={handleChange}
              className="form-checkbox bg-red-500 text-primaryGreen focus:ring-primaryGreen focus:ring-2 rounded"
            />
          </div>

          {displaySelect && (
            <select
              onChange={(e) =>
                setUserData({ ...userData, preference: e.target.value })
              }
              className="py-3 px-2 bg-white border rounded-sm shadow-sm opacity-50 text-mute">
              <option>Select your Preference</option>
              {categories &&
                categories.length > 0 &&
                categories.map((itm) => (
                  <option key={itm.id} value={itm.id}>
                    {itm.name}
                  </option>
                ))}
            </select>
          )}

          <button
            type="submit"
            className="bg-customGreen shadow-md p-2 border font-semibold rounded-full text-white w-full">
            {loading ? "Loading..." : "Register"}
          </button>

          <p className="my-5">
            Already have an account?
            <Link to="/login" className="cursor-pointer text-primaryGreen ml-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
