try:
    from flask import Flask, request, jsonify
    from flask_cors import CORS, cross_origin
    import requests
    import json
    import uuid
    import time
except ImportError as e:
    print("ERROR: Missing required packages")
    print(f"Import error: {e}")
    print("\nPlease install the required packages with:")
    print("pip install flask flask-cors requests")
    input("\nPress Enter to exit...")
    exit(1)

app = Flask(__name__)
CORS(app)

# API configuration
API_BASE_URL = "https://api.openai.com/v1/chat/completions"
API_KEY = ""  # Set your OpenAI API key here
API_MODEL = "gpt-4.1"  # Recommended model for this task
conversations = {}

# Check if API key is set
if not API_KEY:
    print("\n" + "!" * 60)
    print("!" * 60 + "\n")
    input("\nPress Enter to exit...")
    exit(1)

@app.route('/api', methods=['POST', 'OPTIONS'])
@cross_origin()
def handle_api_request():
    if request.method == 'OPTIONS':
        return jsonify({'success': True}), 200

    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'error': 'No request data provided'
            }), 400

        # Get or create session ID
        session_id = data.get('session_id')
        if not session_id:
            session_id = str(uuid.uuid4())
            conversations[session_id] = [
                {
                    'role': 'system',
                    'content': '''You are Sparx Tutor, an expert AI assistant for reading comprehension and question answering.

Instructions:
- Carefully read the entire provided story before answering.
- Only answer using information that is explicitly stated in the story. Do not use outside knowledge, make assumptions, or infer answers.
- If the user provides answer choices, select the answer that exactly matches the story. If none match, respond with "Not in Story".
- Do not explain your answer. Only state the answer choice or "Not in Story".
- If the user asks for help with the extension, provide clear usage tips and troubleshooting steps.
- Be concise and direct. Do not add extra information or commentary.
'''
                }
            ]

        # Get conversation history for this session
        conversation_history = conversations.get(session_id, [])

        # Add user message to conversation history
        user_message = data.get('message', '')
        conversation_history.append({
            'role': 'user',
            'content': user_message
        })

        # Format the request for OpenAI
        request_data = {
            'model': API_MODEL,
            'messages': conversation_history,
            'temperature': 0.1,  # Very low temperature for maximum consistency
            'max_tokens': 100,   # Increased token limit for more detailed responses
            'top_p': 0.8,        # Lower top_p for more focused responses
            'frequency_penalty': 0.7,  # Higher frequency penalty for more diverse responses
            'presence_penalty': 0.7    # Higher presence penalty for more focused responses
        }

        headers = {
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        }

        # Add a longer delay to simulate more thorough thinking
        time.sleep(3.0)

        response = requests.post(API_BASE_URL, json=request_data, headers=headers)
        
        if response.status_code == 200:
            response_data = response.json()
            if 'choices' in response_data and len(response_data['choices']) > 0:
                assistant_message = response_data['choices'][0]['message']['content'].strip()
                
                # Add assistant's response to conversation history
                conversation_history.append({
                    'role': 'assistant',
                    'content': assistant_message
                })
                
                # Update conversation history
                conversations[session_id] = conversation_history
                
                return jsonify({
                    'success': True,
                    'data': assistant_message,
                    'session_id': session_id
                })
            return jsonify({
                'success': False,
                'error': 'Unexpected API response format'
            }), 500
        else:
            return jsonify({
                'success': False,
                'error': f'API request failed - Status: {response.status_code}',
                'details': response.json() if response.text else None
            }), response.status_code

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'message': 'API proxy server is running'
    })

if __name__ == '__main__':
    print("=" * 60)
    print("Sparx Reader API Server")
    print("=" * 60)
    print("This server proxies requests from the Sparx Reader extension")
    print(f"Using API endpoint: {API_BASE_URL}")
    print("=" * 60)
    
    try:
        print("\nStarting server on http://localhost:5000")
        print("Press Ctrl+C to stop the server\n")
        app.run(host='127.0.0.1', port=5000, debug=False)
    except OSError as e:
        print(f"Error starting server: {e}")
        print("Please make sure port 5000 is available.")
        input("\nPress Enter to exit...")
        exit(1)