
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./PrivateRoute.css";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="auth-loading bg-background">
                <div className="sad-emoji">😢</div>
                <p className="fade-in">
                    You don't have access to this page yet.<br />
                    <a href="/signin"> Click me to sign in.</a>
                </p>
            </div>
        );
    }

    return <Outlet />;
};

export default PrivateRoute;
