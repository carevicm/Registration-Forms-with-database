import { useLocation } from "react-router-dom";

const ImageSrc = () => {
  const location = useLocation();

  return location.pathname === "/signup" ? "/signup1.webp" : "/login1.webp";
};

export default ImageSrc;
