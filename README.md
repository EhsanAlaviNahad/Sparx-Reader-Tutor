<p align="center">
  <img src="ss2.png" alt="Sparx Tutor Logo" width="300"/>
</p>

# Sparx Tutor

Sparx Tutor is an AI-powered reading comprehension assistant that answers questions strictly based on the provided story content. It uses OpenAI's GPT-4 API to deliver concise, accurate answers for educational and research purposes.

---

## Features

- **Strict Reading Comprehension:** Answers are based only on the provided story—no outside knowledge, guessing, or inference.
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
    git clone https://github.com/EhsanAlaviNahad/sparx-tutor.git
    cd sparx-tutor/SparxTutor
    ```

2. **Install Dependencies**
    ```sh
    pip install flask flask-cors requests
    ```

3. **Set Your OpenAI API Key**

    - Open `GPT4.1.py` in a text editor.
    - Find the line:
      ```python
      API_KEY = ""
      ```
    - Enter your OpenAI API key between the quotes.

4. **Run the Server**
    ```sh
    python GPT4.1.py
    ```

---

## Using Sparx Tutor in Chrome

1. **Enable Developer Mode in Chrome Extensions**
   - Open Google Chrome.
   - Go to `chrome://extensions/`.
   - Turn on **Developer mode** (toggle in the top right corner).

2. **Install the Extension**
   - Click "Load unpacked" or drag and drop the `Sparx Tutor` folder into the Chrome Extensions page.

3. **Open Sparx Reader**
   - Go to the Sparx Reader website and open a story.

4. **Use the Extension**
   - Click the Sparx Tutor extension icon in your Chrome toolbar.
   - Use the **Help** button in the extension popup for detailed instructions on how to use the tool.

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

For questions or support, please contact sparxreadertutor@gmail.com.
