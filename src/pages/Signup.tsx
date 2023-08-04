import { FormEvent, useState } from "react";
import { supabase } from "../api/supabaseClient";
import { MdLock, MdMail } from "react-icons/md";
import logo from "../assets/images/Logo.svg";
import { BiUser } from "react-icons/bi";
import useUserStore from "../store/useUserStore";
import { Navigate } from "react-router-dom";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function Signup() {
  const user = useUserStore((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      let { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            avatar_url: `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${username}`,
          },
        },
      });
      if (error) throw error;
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (user) return <Navigate to="/" />;
  return (
    <div className="h-screen md:min-h-screen flex justify-center items-center">
      <div className="md:w-1/2 lg:w-1/3 px-5 md:m-auto">
        <div className="md:px-10 md:py-10 rounded-lg md:border md:border-gray-500 ">
          <section>
            <img src={logo} alt="Logo" />
            <div className="text-left pr-8 mt-5 md:mt-3">
              <p className="font-semibold">
                Sign up to get started with Thullo
              </p>
              <p className="text-sm mt-5 md:mt-3">
                Boost your productivity with Thullo and start getting things
                done today.
              </p>
            </div>
            <div className="mt-2 flex space-x-1 items-center w-full bg-blue-200 p-2 rounded-md">
              <IoInformationCircleOutline className="w-5 h-5 " />
              <p className="text-xs">You can use random email to sign up</p>
            </div>
          </section>
          <section className="mt-5 md:mt-3">
            <form onSubmit={handleSignup}>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-400 p-2 pl-10 text-sm"
                  placeholder="Username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <BiUser className="w-10 h-10 absolute left-0 top-0 p-2 text-gray-500" />
              </div>
              <div className="relative mt-5 md:mt-3">
                <input
                  type="email"
                  className="w-full border border-gray-400 p-2 pl-10 text-sm"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <MdMail className="w-10 h-10 absolute left-0 top-0 p-2 text-gray-500" />
              </div>
              <div className="relative mt-5 md:mt-3">
                <input
                  type="password"
                  className="w-full border border-gray-400 p-2 pl-10 text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <MdLock className="w-10 h-10 absolute left-0 top-0 p-2 text-gray-500" />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white text-sm mt-5 rounded-lg hover:bg-blue-600 active:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Sign up"
                )}
              </button>
              <p className="mt-2 text-sm">
                Already have an account?{" "}
                <a href="/signin" className="text-blue-500 hover:underline">
                  Sign in
                </a>
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
