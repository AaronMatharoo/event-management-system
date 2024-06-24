import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import styles for TailwindCSS
import "styles/global.css";
//page components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Events from "./pages/Events";
import AuthProvider from "./components/AuthProvider";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Register from "pages/Register";
import EventDetailPage from "pages/EventDetailPage";

const App = () => (
  <Router>
    {/* wrap app in auth provider */}
    <AuthProvider>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* protected routes only accessible when authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
