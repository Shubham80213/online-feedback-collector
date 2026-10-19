
const feedbackForm = document.getElementById("feedbackForm");
const message = document.getElementById("message");

feedbackForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const rating = document.getElementById("rating").value;
    const comments = document.getElementById("comments").value.trim();

    if (!name || !email || !rating || !comments) {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    const feedback = {
        name: name,
        email: email,
        rating: Number(rating),
        comments: comments
    };

    try {
        const response = await fetch("http://localhost:3000/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedback)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Feedback submission failed.");
        }

        message.textContent =
            "Thank You, " + name + "! Your feedback has been submitted successfully.";
        message.style.color = "green";

        feedbackForm.reset();

    } catch (error) {
        message.textContent =
            "Feedback submit nahi hua. Please check whether the backend is running.";
        message.style.color = "red";
        console.error("Feedback error:", error);
    }
});
