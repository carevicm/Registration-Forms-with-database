import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useState } from "react";
import Button from "./ButtonComponent/Button";

function DeleteAccount() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const Modal = ({ children }) => {
    return ReactDOM.createPortal(
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        {children}
      </div>,
      document.body
    );
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/delete-user",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setShowModal(true);
      } else {
        console.error("Error deleting account:", response.data.msg);
        alert(`Error deleting account: ${response.data.msg}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Error deleting account. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#475569] via-[#3f3f46] to-[#44403c]"
      aria-labelledby="deleteAccount"
    >
      <section className="flex flex-col w-full max-w-xl p-6 bg-white bg-opacity-80 justify-center items-center rounded-3xl shadow-lg backdrop-blur-md space-y-4">
        <h1
          id="deleteAccount"
          className="text-xl md:text-2xl lg:text-3xl text-[#5473E3]"
        >
          Would you like to delete your account?
        </h1>
        <Button
          type="button"
          onClick={handleDelete}
          className="w-40 md:w-48 lg:w-56 text-center"
        >
          Yes
        </Button>
        <Button
          type="button"
          onClick={handleCancel}
          className="w-40 md:w-48 lg:w-56 text-center"
        >
          No
        </Button>

        {showModal && (
          <Modal>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-[#38383E] font-medium mb-4">
                Account deleted. We&apos;re sorry to see you go.
              </p>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/signin");
                }}
                className="border-2 border-[#C93B32] text-[#C93B32] rounded px-4 py-2 hover:bg-[#C93B32] hover:text-white transition duration-300"
              >
                Close
              </button>
            </div>
          </Modal>
        )}
      </section>
    </main>
  );
}

export default DeleteAccount;
