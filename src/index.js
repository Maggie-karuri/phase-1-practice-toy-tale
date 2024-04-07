document.addEventListener("DOMContentLoaded", () => {
  // Code for toggling the toy form container
  // AddBtn and toyFormContainer variables

  // Event listener for submitting a new toy
  const toyForm = document.getElementById("toy-form");

  toyForm.addEventListener("submit", function(event) {
      event.preventDefault();
      // Code for submitting a new toy
  });

  // Event listener for increasing a toy's likes
  const toyCollection = document.getElementById("toy-collection");

  toyCollection.addEventListener("click", function(event) {
      if (event.target.classList.contains("like-btn")) {
          const toyCard = event.target.closest(".card");
          const toyId = toyCard.dataset.id;
          const currentLikes = parseInt(toyCard.querySelector("p").textContent.split(" ")[0]);
          const newLikes = currentLikes + 1;

          const requestOptions = {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
              },
              body: JSON.stringify({
                  likes: newLikes
              })
          };

          fetch(`http://localhost:3000/toys/${toyId}`, requestOptions)
              .then(response => response.json())
              .then(updatedToy => {
                  // Assuming `updatedToy` contains the updated toy data
                  toyCard.querySelector("p").textContent = `${updatedToy.likes} Likes`;
              })
              .catch(error => console.error("Error updating toy likes:", error));
      }
  });
});
