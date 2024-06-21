import React, { useContext, useState } from 'react';
import { Contextsfetch } from '../context/Context';
import axios from 'axios'

const Login = () => {
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const {login,  isAuth}=  useContext(Contextsfetch);

    const fetchUser = async() => {
      try {
        const params = {
            f_userName:userName,
            f_Pwd:pass
        };

        const response = await axios.get("http://localhost:8088/api/findUser", { params });

        if(response.data){
          localStorage.setItem("authUser",response.data.f_userName)
        }
        else{
          alert("Invalid Request")
        }

        // Handle the response
        console.log(response.data);
      } catch (error) {
          // Handle the error
          console.error(error);
      }
    }


    const handleLogin = () => {
        // Simulate authentication by setting an item in localStorage
        fetchUser();
        login();
    };



    return (
        <div  className="w-[100%]  h-max-content  font-poppinsRegular text-white h-[703px]  bg-custom-color2">
            <div className=' w-[100%]'>
                <p className='md:w-[20%] w-[100%] px-10 py-7  text-2xl'>Login page</p>
            </div>
            <form className="bg-custom-color3  mt-24 lg:w-[50%] w-[100%] md:w-[50%] m-auto text-white rounded-xl">
              <div className=" object-cover rounded-lg p-[2rem] bg-purple-200">
                

                <div className="container w-[100%] py-[1.5rem] flex flex-col lg:flex-row justify-left  gap-5 ">
                  <div className="lg:w-[70%] m-auto w-[100%] flex  gap-6">
                    <label
                      className="block text-gray-700 md:text-xl text-sm font-poppinsBold py-2 "
                      htmlFor="name"
                    >
                      UserName
                    </label>
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="shadow text-sm appearance-none rounded w-[100%] h-12 p-[0.5rem] text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Enter your UserName"
                    />
                  </div>
                  </div>
                  <div className="container w-[100%] py-[1.5rem] flex flex-col lg:flex-row justify-left  gap-5 ">

                  <div className="lg:w-[70%] m-auto w-[100%] flex  gap-8">
                    <label
                      className="block text-gray-700 md:text-xl text-sm font-poppinsBold py-2"
                      htmlFor="mobile"
                    >
                      Password
                    </label>
                    <input
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      className="shadow text-sm appearance-none rounded w-[100%] h-12 p-[0.5rem] text-black leading-tight focus:outline-none focus:shadow-outline"
                      type="password"
                      placeholder="Enter your Password"
                    />
                  </div>
                </div>

                <div className=" m-auto  lg:w-[62%]  lg:md-[30%] md:ml-[30%]  w-[100%] text center ">
                  <button
                  onClick={handleLogin}
                    className="  bg-custom-color2 lg:w-[88%] text-xl  m-atuo   w-[100%]  text-center  h-12 hover:bg-custom-color1 text-white font-poppinsBold rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Login
                  </button>
                </div>

                
              </div>
            </form>
        </div>
    );
};

export default Login;
