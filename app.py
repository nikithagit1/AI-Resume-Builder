import spacy
import pdfplumber
import re
import json
import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# Load NLP model
nlp = spacy.load("en_core_web_sm")

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def home():
    return render_template("index.html")

def extract_info(text):
    doc = nlp(text)
    extracted_info = {
        "name": None,
        "email": None,
        "phone": None,
        "skills": [],
        "education": [],
        "experience": []
    }
    
    # Extract email
    email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    email_match = re.search(email_pattern, text)
    if email_match:
        extracted_info["email"] = email_match.group()
    
    # Extract phone number
    phone_pattern = r"\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}"
    phone_match = re.search(phone_pattern, text)
    if phone_match:
        extracted_info["phone"] = phone_match.group()
    
    # Extract named entities
    for ent in doc.ents:
        if ent.label_ == "PERSON" and not extracted_info["name"]:
            extracted_info["name"] = ent.text
        elif ent.label_ == "ORG":
            extracted_info["education"].append(ent.text)
        elif ent.label_ in ["WORK_OF_ART", "EVENT", "JOB"]:
            extracted_info["experience"].append(ent.text)
    
    return extracted_info

@app.route("/upload", methods=["POST"])
def upload_resume():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400
    
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    
    with pdfplumber.open(file_path) as pdf:
        text = "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
    
    extracted_data = extract_info(text)
    return jsonify(extracted_data)

@app.route("/generate_preview", methods=["POST"])
def generate_preview():
    data = request.get_json()
    
    # Create resume preview
    resume_preview = f"""
    Name: {data["name"]}
    Email: {data["email"]}
    Phone: {data["phone"]}
    Experience Level: {data["experience"]}
    
    Skills:
    {', '.join(data["skills"])}
    
    Education:
    {', '.join(data["education"])}
    
    Experience:
    {', '.join(data["experience"])}
    """
    
    return jsonify({"message": "Resume preview generated successfully!", "resume_preview": resume_preview})

@app.route("/generate_resume", methods=["POST"])
def generate_resume():
    data = request.get_json()
    
    # Resume data is passed to the front-end for final confirmation
    resume = {
        "name": data["name"],
        "email": data["email"],
        "phone": data["phone"],
        "skills": data["skills"],
        "education": data["education"],
        "experience": data["experience"],
    }

    return jsonify({"message": "Resume generated successfully!", "resume": resume})

if __name__ == "__main__":
    app.run(debug=True)
