from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    """Renders the main landing page."""
    return render_template('index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handles contact form submissions from the frontend."""
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # In a production environment, you would integrate SMTP here 
    # to send an email to info@goldcoastsoftwares.com
    print(f"New Inquiry from {name} ({email}): {message}")

    return jsonify({"status": "success", "message": "Thank you for reaching out. Our team will contact you shortly."}), 200

if __name__ == '__main__':
    # Runs the app in debug mode for local development
    app.run(debug=True, host='0.0.0.0', port=5000)