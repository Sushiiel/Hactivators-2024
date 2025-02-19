import openai
import os

# Load your OpenAI API key from environment variables
openai.api_key = os.getenv("OPEN_AI_API_KEY")

def chat_with_gpt():
    while True:
        user_input = input("You: ")

        if user_input.lower() in ['exit', 'quit']:
            print("Exiting chat.")
            break

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": user_input}],
            )
            print("AI:", response['choices'][0]['message']['content'])
        
        except Exception as e:
            print(f"Error: {e}")

if _name_ == "_main_":
    chat_with_gpt()