import { useNavigate } from "react-router-dom";
import Button from "./ButtonComponent/Button";
import { FaChevronLeft } from "react-icons/fa";

function WelcomeRegistered() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/signin");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleDeleteAccount = () => {
    navigate("/delete-account");
  };

  const handleBack = () => {
    navigate(-1); //
  };

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#475569] via-[#3f3f46] to-[#44403c]"
      aria-labelledby="welcomeTitle"
    >
      <section className="flex flex-col w-full max-w-xl p-6 bg-white bg-opacity-80 justify-center items-center rounded-3xl shadow-lg backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={handleBack}
            className="bg-[#55028D] text-white rounded-full p-2 hover:bg-[#7A1FB7] focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label="Go back"
          >
            <FaChevronLeft size={24} />
          </button>
          <h1
            id="welcomeTitle"
            className="text-xl md:text-2xl lg:text-3xl text-[#5473E3]"
          >
            Welcome to the Home Page
          </h1>
          <div className="w-10"></div>{" "}
        </div>

        <Button
          type="button"
          onClick={handleDeleteAccount}
          className="w-40 md:w-48 lg:w-56 text-center"
        >
          Delete Account
        </Button>
        <Button
          type="button"
          onClick={handleLogout}
          className="w-40 md:w-48 lg:w-56 text-center"
        >
          Log Out
        </Button>
      </section>
    </main>
  );
}

export default WelcomeRegistered;
