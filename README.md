# Sparx Tutor

Sparx Tutor is a privacy-focused, AI-powered reading comprehension assistant designed to help users answer questions based strictly on provided story content. It leverages OpenAI's GPT-4 API to deliver concise, accurate answers for educational and research purposes.

---

## Features

- **Strict Reading Comprehension:** Answers are based solely on the provided story—no outside knowledge, guessing, or inference.
- **Answer Choice Matching:** Selects the answer that exactly matches the story, or responds with "Not in Story" if none match.
- **No Explanations:** Provides only the answer, keeping responses concise and direct.
- **Personal Use License:** For personal, educational, or research use only. Commercial use, modification, or redistribution is strictly prohibited.

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- [OpenAI API Key](https://platform.openai.com/account/api-keys)
- Google Chrome browser

### Installation

1. **Clone the Repository**
    ```sh
    git clone https://github.com/yourusername/sparx-tutor.git
    cd sparx-tutor/SparxTutor
    ```

2. **Install Dependencies**
    ```sh
    pip install flask flask-cors requests
    ```

3. **Set Your OpenAI API Key**

    - Create a file named `.env` in the `SparxTutor` directory:
        ```
        OPENAI_API_KEY=your_openai_api_key_here
        ```
    - Alternatively, you can set the `API_KEY` variable directly in `GPT4.1.py` (not recommended for public repositories).

4. **Run the Server**
    ```sh
    python GPT4.1.py
    ```

---

## Using Sparx Tutor in Chrome

1. **Start the Flask Server**  
   Ensure the server is running as described above.

2. **Access the Web Interface**  
   Open Google Chrome and navigate to:
   ```
   http://localhost:5000
   ```
   (If a web interface is not included, use a compatible Chrome extension or frontend that communicates with the `/api` endpoint.)

3. **Submit Your Story and Questions**  
   - Paste your reading passage and question (with answer choices, if applicable) into the interface.
   - Receive concise, story-based answers from the AI.

---

## API Usage

- **Endpoint:** `/api`
- **Method:** `POST`
- **Payload Example:**
    ```json
    {
      "session_id": "optional-session-id",
      "message": "Your story and question here"
    }
    ```
- **Response:**
    ```json
    {
      "success": true,
      "answer": "The answer choice or 'Not in Story'"
    }
    ```

---

## License

This project is licensed under a [Personal Use License](./LICENSE).  
**Commercial use, modification, or redistribution is strictly prohibited.**

---

## Disclaimer

Sparx Tutor is provided "as is" without warranty of any kind.  
For personal, educational, or research use only.

---

## Contact

For questions or support, please open an issue on GitHub or contact the project
