import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <main>
      <div className="max_padd_container">
        <Navbar />
        <Admin />
      </div>
    </main>
  );
}
