import { Routes, Route } from "react-router-dom";
import Layout   from "./components/Layout";
import Home      from "./pages/Home";
import Interview from "./pages/Interview";
import Results   from "./pages/Results";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"          element={<Home />}      />
        <Route path="/interview" element={<Interview />} />
        <Route path="/results"   element={<Results />}   />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}