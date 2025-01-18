import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ArticleContainer from "./containers/ArticleContainer";
import ArticleDetails from "./containers/ArticleDetail";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Define routes for your app */}
        <Routes>
          <Route path="/" element={<ArticleContainer />} />
          <Route path="/article/:title" element={<ArticleDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
