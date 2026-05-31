document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const statusMsg = document.getElementById("formStatus");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent standard page reload

        // Gather form data
        const payload = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        // Update UI to show sending state
        const submitBtn = form.querySelector("button");
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        try {
            // Send data to Python backend securely
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                statusMsg.style.color = "green";
                statusMsg.innerText = data.message;
                form.reset();
            } else {
                throw new Error("Server error");
            }
        } catch (error) {
            statusMsg.style.color = "red";
            statusMsg.innerText = "There was an error sending your message. Please try again or call us directly.";
        } finally {
            // Restore button state
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});