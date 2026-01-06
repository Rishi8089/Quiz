# Django Quiz Application

A Django-based Quiz platform with user authentication, quiz creation, quiz attempts, and result tracking.

## 🚀 Project Setup Guide

Follow the steps below after cloning or pulling the repository to run the project successfully.

## 🛠 Step-by-Step Installation (All in One)

1) Clone the repository and open the folder  
git clone https://github.com/your-username/django-quiz-app.git  
cd django-quiz-app  

2) Create MySQL database  
Open MySQL Workbench and run:  
CREATE DATABASE quiz;

3) Open project settings file and update database password  
project_name/settings.py  
Change only this field:  
'PASSWORD': 'your_mysql_password',

4) Create virtual environment  
python -m venv venv

5) Activate virtual environment  
Windows: venv\Scripts\activate  
Mac/Linux: source venv/bin/activate  

6) Upgrade pip (optional but recommended)  
python -m pip install --upgrade pip  

7) Install required dependencies  
pip install -r requirements.txt  

8) Run migrations  
python manage.py makemigrations  
python manage.py migrate  

9) Create admin user (optional but recommended)  
python manage.py createsuperuser  

10) Run the development server  
python manage.py runserver  

Now open the project in browser:  
http://127.0.0.1:8000/  

Admin panel:  
http://127.0.0.1:8000/admin
