import { useGlobalContext } from "../GlobalContext";
import { useState } from "react";

function Search() {
  const [text, setText] = useState("");
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

  function handleTextChange(event) {
    setText(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(text);
  }

  function handleRandomMeal() {
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
  }

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type your favoite meal"
          className="form-input"
          value={text}
          onChange={handleTextChange}
        />
        <button className="btn">Search</button>
        <button
          className="btn btn-hipster"
          type="button"
          onClick={handleRandomMeal}
        >
          Surprise me!
        </button>
      </form>
    </header>
  );
}
export default Search;
