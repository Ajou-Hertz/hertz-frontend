import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import My from "../pages/My";

const RequireAuth = () => {
    const [user, setUser] = useRecoilState(userState);
    const location = useLocation();
    console.log(user);
    return user ? (
        <My />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
