import { useGlobalContext } from "./../GlobalContext";
import { BsHandThumbsUp } from "react-icons/bs";

function Meals() {
  const { meals, loading, selectMeal, addToFavorites } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again</h4>
      </section>
    );
  }

  return (
    <section className="section-center">
      {meals.map((meal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = meal;

        return (
          <article key={idMeal} className="single-meal">
            <img
              src={image}
              loading="lazy"
              alt={title}
              className="img"
              onClick={() => selectMeal(idMeal, false)}
            />
            <footer>
              <h5>{title}</h5>
              <button
                className="like-btn"
                onClick={() => addToFavorites(idMeal)}
              >
                <BsHandThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
}
export default Meals;
