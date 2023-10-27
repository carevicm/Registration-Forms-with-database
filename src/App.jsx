import React, { Suspense, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SignUp from "./forms/signUp/SignUpPage";
import ForgotPassword from "./forms/forgotPassword/Forgotpassword";
import ChangePassword from "./forms/changePassword/ChangePassword";
import DeleteAccount from "./components/DeleteAccountPage";
import HomePage from "./components/WelcomePage";
import RouterError from "./components/RouterError";
import { ClipLoader } from "react-spinners";
import "./transitions.css";

const SignIn = React.lazy(() => import("./forms/signIn/SignInPage"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <ClipLoader color="#123abc" size={50} />
              </div>
            }
          >
            <RoutesWithTransition />
          </Suspense>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

function RoutesWithTransition() {
  const location = useLocation();
  const nodeRef = React.useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        nodeRef={nodeRef}
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <div className="route-section" ref={nodeRef}>
          <SwitchRoutes location={location} />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

import PropTypes from "prop-types";

function SwitchRoutes(props) {
  const { location } = props;
  return (
    <Routes location={location}>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/delete-account" element={<DeleteAccount />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/routererror" element={<RouterError />} />
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  );
}

SwitchRoutes.propTypes = {
  location: PropTypes.object.isRequired,
};

function NotFoundRedirect() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/login");
  }, [navigate]);
  return null;
}

export default App;
