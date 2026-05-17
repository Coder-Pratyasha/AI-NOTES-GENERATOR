from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_answer(context: str, question: str):

    try:

        prompt = f"""
        You are an AI study assistant.

        Answer the question only using the provided context.

        Context:
        {context}

        Question:
        {question}
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:

        return f"Error: {str(e)}"