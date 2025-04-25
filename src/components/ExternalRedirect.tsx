import { useEffect } from "react";
import "./ExternalRedirect.css";

interface ExternalRedirectProps {
  url: string;
}

const ExternalRedirect: React.FC<ExternalRedirectProps> = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div className="auth-loading">
      <div className="sad-emoji">🔄</div>
      <p className="fade-in">
        Redirecting you to your destination...
      </p>
    </div>
  );
};

export default ExternalRedirect;