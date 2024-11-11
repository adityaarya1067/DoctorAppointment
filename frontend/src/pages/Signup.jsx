  import { useState } from "react";
  import signupImg from "../assets/images/signup.gif";
  import avatar from "../assets/images/default-Img.jpg";
  import { Link,useNavigate } from "react-router-dom";
  import uploadImageToCloudinary from "../Utils/uploadCloudinary.js";
   import { BASE_URL } from "../config.js";
   import {toast} from 'react-toastify';
   import {RingLoader} from 'react-spinners';

  const Signup = () => {
    const [selectedFile, setselectedFile] = useState(null);
    const [previewURL, setpreviewURL] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
      email: "",
      password: "",
      name: "",
      photo: "",
      gender: "",
      role: "patient",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }; 

    const handleFileInputChange = async(event)=> {
      const file = event.target.files[0];
      console.log("fileeee",file)

      const data = await uploadImageToCloudinary(file)
      console.log("hrllo",data.url)
      console.log("lo",data)

      setpreviewURL(data.url);
      setselectedFile(data.url);
      setFormData({ ...formData, photo: data.url });

    };

    const submitHandler = async(event)=>{
    event.preventDefault()
    console.log(formData)
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`,{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      }) 
      const {message} = await res.json();
      if(!res.ok){
        throw new Error(message);
      }
      
      setLoading(false);
      toast.success(message);
      navigate("/login");

    } catch (err) {
      toast.error(err.message);
      setLoading(false)
    }
    }

    return (
      <>
        <section className="px-5 xl:px-0">
          <div className=" max-w-[1170px] mx-auto rounded-lg shadow-lg md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* img box */}
              <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                <figure className="rounded-l-lg">
                  <img src={signupImg} alt="" className="w-full rounded-l-lg " />
                </figure>
              </div>

              {/* form */}
              <div className="rounded-l-lg lg:pl-16 py-10">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                  Create an <span className="text-primaryColor">Account</span>
                </h3>

                <form onSubmit={submitHandler}>
                  <div className="mb-5">
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[15px] leading-7 text-headingColor 
                  placeholder:text-textColor rounded-lg cursor-pointer"
                      required
                    />
                  </div>

                  <div className="mb-5">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[15px] leading-7 text-headingColor 
                  placeholder:text-textColor rounded-lg cursor-pointer"
                      required
                    />
                  </div>

                  <div className="mb-5">
                    <input
                      type="password"
                      placeholder="Password   (at least 5 characters)"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[15px] leading-7 text-headingColor 
                  placeholder:text-textColor rounded-lg cursor-pointer"
                      required
                      minLength={5}
                    />
                  </div>

                  <div className="mb-5 flex items-center justify-between">
                    <label className="text-headingColor font-bold text-[16px] leading-7">
                      Are you a :
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="text-textColor font-semibold text-[15px] leading-7 px-4
                        py-3 focus:outline-none"
                      >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                      </select>
                    </label>

                    <label className="text-headingColor font-bold text-[16px] leading-7">
                      Gender:
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="text-textColor font-semibold text-[15px] leading-7 px-4
                  py-3 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </label>
                  </div>

                  <div className="mb-5 flex items-center gap-3">
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-black flex items-center justify-center">
                    {selectedFile ? (
                      <img
                        src={previewURL}
                        alt=""
                        className="w-full rounded-full"
                      />
                    ) : (
                      <img
                        src={avatar}
                        alt="Default Avatar"
                        className="w-full rounded-full"
                        />
                    )}
                  </figure>


                    <div className="relative w-[140px] h-[50px]">
                      <input
                        type="file"
                        className="broder border-[4px] absolutet top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        name="photo"
                        onChange={handleFileInputChange}
                        id="customFile"
                        accept=".jpg, .png"
                      />
                      <label
                        htmlFor="customFile"
                        className="bg-blue-500 absolute top-0 left-0 w-full h-full flex items-center px-[15px] py-[9px] text-[16px] leading-6 overflow-hidden
                        text-white font-semibold rounded-lg truncate cursor-pointer"
                      >
                        Upload Photo
                      </label>
                    </div>
                  </div>

                  <div className="mt-[35px]">
                    <button
                    disabled={loading && true}
                      type="submit"
                      className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                    >
                     { loading ? <RingLoader size={30} color={"#ffff"}/>:'Sign Up'}
                    </button>
                  </div>

                  <p className="mt-5 text-textColor text-center">
                    Already have an account ?{" "}
                    <Link
                      to="/login"
                      className="text-primaryColor font-medium ml-1"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  export default Signup;
