from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

def generate_mock_data():
    """Generate mock Copilot usage statistics for demonstration purposes.
    
    This structure is designed to be easily replaced with real API calls
    to GitHub Copilot's usage API in the future.
    """
    users = [
        'alice@example.com',
        'bob@example.com',
        'charlie@example.com',
        'diana@example.com',
        'eve@example.com'
    ]
    
    languages = ['Python', 'JavaScript', 'TypeScript', 'Java', 'Go', 'C#', 'Ruby']
    
    mock_data = []
    
    for user in users:
        # Generate per-language breakdown
        num_languages = random.randint(3, 5)
        selected_languages = random.sample(languages, num_languages)
        language_breakdown = {
            lang: random.randint(10, 200) 
            for lang in selected_languages
        }
        
        # Calculate total completions
        total_completions = sum(language_breakdown.values())
        
        # Generate last seen timestamp
        days_ago = random.randint(0, 7)
        last_seen = (datetime.now() - timedelta(days=days_ago)).isoformat()
        
        user_data = {
            'user': user,
            'completions': total_completions,
            'active_hours': round(random.uniform(5, 40), 1),
            'language_breakdown': language_breakdown,
            'last_seen': last_seen
        }
        
        mock_data.append(user_data)
    
    return mock_data

@app.route('/api/usage', methods=['GET'])
def get_usage():
    """API endpoint that returns Copilot usage statistics.
    
    Returns:
        JSON response with usage data for all users
    """
    data = generate_mock_data()
    return jsonify({
        'status': 'success',
        'data': data,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    import os
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)
