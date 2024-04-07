document.addEventListener("DOMContentLoaded", () => {
  // Code for toggling the toy form container
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let addToy = false;

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Event listener for submitting a new toy
  const toyForm = document.getElementById("toy-form");

  toyForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(toyForm);
    const name = formData.get("name");
    const image = formData.get("image");

    const newToy = {
      name: name,
      image: image,
      likes: 0
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    };

    fetch("http://localhost:3000/toys", requestOptions)
      .then(response => response.json())
      .then(data => {
        // Assuming `data` contains the newly added toy
        // You can add the toy to the DOM here
      })
      .catch(error => console.error("Error adding new toy:", error));
  });

  // Fetch and display toys from server
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {
      const toyCollection = document.getElementById("toy-collection");
      toys.forEach(toy => {
        const toyCard = document.createElement("div");
        toyCard.className = "card";
        toyCard.dataset.id = toy.id;

        const toyName = document.createElement("h2");
        toyName.textContent = toy.name;

        const toyImage = document.createElement("img");
        toyImage.src = toy.image;
        toyImage.className = "toy-avatar";

        const toyLikes = document.createElement("p");
        toyLikes.textContent = `${toy.likes} Likes`;

        const likeButton = document.createElement("button");
        likeButton.textContent = "Like";
        likeButton.className = "like-btn";
        likeButton.id = toy.id;

        toyCard.appendChild(toyName);
        toyCard.appendChild(toyImage);
        toyCard.appendChild(toyLikes);
        toyCard.appendChild(likeButton);

        toyCollection.appendChild(toyCard);
      });
    })
    .catch(error => console.error("Error fetching toys:", error));

  // Event listener for increasing a toy's likes
  const toyCollection = document.getElementById("toy-collection");

  toyCollection.addEventListener("click", function(event) {
    if (event.target.classList.contains("like-btn")) {
      const toyId = event.target.id;
      const toyCard = event.target.closest(".card");
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
          toyCard.querySelector("p").textContent = `${updatedToy.likes} Likes`;
        })
        .catch(error => console.error("Error updating toy likes:", error));
    }
  });
});
