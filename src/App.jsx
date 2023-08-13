//static files
import "./App.css";

//custom componets
import Search from "./components/Search";
import Meals from "./components/Meals";
import { useGlobalContext } from "./GlobalContext";
import Modal from "./components/Modal";
import Favorite from "./components/Favorite";

//Library imports
function App() {
  const { showModal, favorites } = useGlobalContext();

  return (
    <main>
      <Search />
      {favorites.length > 0 && <Favorite />}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;
