import { useEffect, useState } from "react";
import "./ReviewModal.css";

function ReviewModal({ onModalOpen, watchedMovies, movieID, movieReview }) {
  const [review, setReview] = useState(function () {
    const reviewStore = localStorage.getItem(`${movieID}review`);
    return reviewStore ? JSON.parse(reviewStore) : "";
  });
  useEffect(
    function () {
      localStorage.setItem(`${movieID}review`, JSON.stringify(review));
    },
    [review]
  );

  useEffect(
    function () {
      const newArray = watchedMovies.map((item) => {
        if (item.imdbID === movieID) {
          item["Review"] = review;
          return item;
        } else return item;
      });
      localStorage.setItem("watchedMovies", JSON.stringify(newArray));
    },
    [review]
  );

  return (
    <div className="review-modal">
      <div className="modal-itself">
        <h1 className="h1-modal">Your Review</h1>
        <form className="review-form" action="">
          <textarea
            className="review-input"
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your thoughts about the movie"
            name="review-text"
          ></textarea>
          <div className="review-buttons">
            <button
              className="review-submit-btn"
              onClick={(e) => {
                e.preventDefault();
                onModalOpen();
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
