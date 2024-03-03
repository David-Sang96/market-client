import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";

const General = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, name, role } = useSelector((state) => state.reducer.user.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <section className="p-2">
      <div className="flex items-center justify-between mb-3 font-medium border-b border-blue-200">
        <p className="font-semibold">Email</p>
        <p>{email}</p>
      </div>
      <div className="flex items-center justify-between mb-3 font-medium border-b border-blue-200">
        <p className="font-semibold">Name</p>
        <p>{name}</p>
      </div>
      <div className="flex items-center justify-between mb-3 font-medium border-b border-blue-200">
        <p className="font-semibold">Role</p>
        <p>{role}</p>
      </div>
      <div className="flex items-end justify-between mb-4">
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 text-white bg-blue-500 rounded-md "
          onClick={handleLogout}
        >
          <VscSignOut className="text-xl" /> logout
        </button>
      </div>
    </section>
  );
};

export default General;
