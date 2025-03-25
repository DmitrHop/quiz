from django.shortcuts import render
from django.http import HttpResponse
from main.models import Quiz, Answer, Question

def main(request):
    return render(request, 'main.html')
# Create your views here.

def quiz(request):
    all_quiz = Quiz.objects.all()

    return render (request, 'quiz.html', {'data':all_quiz})
