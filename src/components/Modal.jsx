import { useGlobalContext } from "../GlobalContext";

function Modal() {
  const { selectedMeal, closeModal } = useGlobalContext();

  const {
    strMeal: title,
    strMealThumb: image,
    strInstructions: text,
    strSource: source,
  } = selectedMeal;

  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <img src={image} loading="lazy" alt={title} className="img modal-img" />
        <div className="modal-content">
          <h3>{title}</h3>

          <article>
            <p>
              <strong>Cooking Instructions: </strong>
            </p>
            {text}
          </article>
          <a href={source} target="_blank" rel="noopener noreferrer">
            Go to Source
          </a>
          <button className="btn btn-hipster close-btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Modal;
