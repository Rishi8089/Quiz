# Django Quiz Application

A Django-based Quiz platform with user authentication, quiz creation, quiz attempts, and result tracking.

## 🚀 Project Setup Guide (All Steps Together)

### 🔹 Step 1: Clone the repository and open the folder
git clone https://github.com/your-username/django-quiz-app.git  
cd django-quiz-app  

### 🔹 Step 2: Create MySQL database
CREATE DATABASE quiz;

### 🔹 Step 3: Configure database password in settings.py
project_name/settings.py  
'PASSWORD': 'your_mysql_password',

### 🔹 Step 4: Create virtual environment
python -m venv venv

### 🔹 Step 5: Activate virtual environment
Windows → venv\Scripts\activate  
Mac/Linux → source venv/bin/activate  

### 🔹 Step 6: Upgrade pip (optional but recommended)
python -m pip install --upgrade pip

### 🔹 Step 7: Install required dependencies
pip install -r requirements.txt

### 🔹 Step 8: Run migrations
python manage.py makemigrations  
python manage.py migrate  

### 🔹 Step 9: Create admin user (optional)
python manage.py createsuperuser  

### 🔹 Step 10: Run the development server
python manage.py runserver  

### 🔹 Access URLs
App → http://127.0.0.1:8000/  
Admin → http://127.0.0.1:8000/admin
