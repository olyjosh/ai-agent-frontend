import {
  Route, Routes,
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import AIAgentViewPage from "./pages/AIAgentViewPage";
import PayemntPage from "./pages/PaymentPage";
import DonationPage from "./pages/DonationPage";

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<AIAgentViewPage />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/payment" element={<PayemntPage />} />
      </Routes>
     </Router>
  );
}

export default App;