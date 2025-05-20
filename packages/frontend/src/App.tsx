import { Routes, Route } from "react-router";
import Home from "./Home";
import CreateEvent from "./CreateEvent";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent />} />
        </Routes>
    );
}


export default App;