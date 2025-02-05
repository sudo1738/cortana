// Access the API key from config.js
const HF_ACCESS_TOKEN = config.API_KEY;
const model = 'facebook/blenderbot-400M-distill';

// Initialize the Hugging Face Inference API
const hf = new HfInference(HF_ACCESS_TOKEN);

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatDisplay = document.getElementById('chat-display');

    // Display user message
    chatDisplay.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    try {
        const response = await hf.conversational({
            model: model,
            inputs: userInput,
        });

        // Display bot response
        chatDisplay.innerHTML += `<p><strong>Cortana:</strong> ${response.generated_text}</p>`;
    } catch (error) {
        console.error('Error:', error);
        chatDisplay.innerHTML += `<p><strong>Error:</strong> Failed to get response from the chatbot.</p>`;
    }

    // Clear input field
    document.getElementById('user-input').value = '';

    // Scroll to the bottom of the chat display
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Add event listener for the Enter key in the input field
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
