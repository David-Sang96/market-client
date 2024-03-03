import { FaUser } from "react-icons/fa";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { VscSignIn } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
  const { user } = useSelector((store) => store.reducer.user);

  return (
    <nav className="flex items-center justify-between px-2 py-3 text-white bg-blue-500 md:p-4 rounded-b-md">
      <Link to={"/"} className="text-xl font-bold md:text-2xl">
        TRADEHUB
      </Link>
      <div className="space-x-3">
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/question"}>Q&A</Link>
      </div>
      {user ? (
        <div className="flex items-center gap-3 md:gap-6">
          <Link
            to={`${user.role === "user" ? "/profile" : "/admin"}`}
            className="flex items-center gap-1"
          >
            <FaUser className="text-md md:text-lg" />
            <span className="text-sm md:text-base">
              {user.role === "user" ? "Profile" : "Admin Panel"}
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-3 md:gap-6 ">
          <Link to={"/login"} className="flex items-center gap-1">
            <VscSignIn className="text-md md:text-lg" />
            <span className="text-sm md:text-base">LogIn</span>
          </Link>
          <Link to={"/register"} className="flex items-center gap-1">
            <MdOutlineAssignmentInd className="text-md md:text-lg" />
            <span className="text-sm md:text-base"> Register</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
