# Math Visualization with Manim and LLMs

## Project Overview
This project leverages the Manim library and Large Language Models (LLMs) to generate visually appealing videos explaining mathematical concepts. Additionally, we integrate Streamlit for an interactive UI, allowing users to upload text, PDFs, or PowerPoint files and process them using NLP techniques.

## Features
- **Manim Animation**: Uses Manim to create mathematical visualizations.
- **Summarization**: Utilizes T5 for summarizing large texts.
- **Text Correction**: Employs Cohere's model to refine the summaries.
- **Equation Extraction & Explanation**: Identifies equations in text and provides explanations.
- **Streamlit UI**: User-friendly interface to upload and process files.

## Tech Stack
- **Manim**: Mathematical animations
- **Streamlit**: Web-based UI
- **Transformers (T5)**: Summarization
- **Cohere API**: Text correction
- **PyPDF2**: PDF text extraction
- **Python-pptx**: PowerPoint text extraction
- **OpenAI GPT**: Chat functionality

## Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up API keys:
   ```bash
   export COHERE_API_KEY="your_cohere_api_key"
   export OPENAI_API_KEY="your_openai_api_key"
   ```
4. Run the application:
   ```bash
   streamlit run app.py
   ```

## Usage
- Upload a text/PDF/PPTX file.
- The app extracts text, summarizes it, corrects errors, and explains equations.
- View results directly on the UI.

## Future Enhancements
- Support for more equation types
- Improved visualization using advanced Manim features
- Integration with more LLMs for better explanations

## License
This project is licensed under the MIT License.
