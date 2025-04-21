from django.shortcuts import render, redirect
from django.http import HttpResponse
from main.models import *
from main.forms import *
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView, PasswordResetView
from django.contrib.auth import authenticate, login
from django.views.generic import CreateView, View
# from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _ 
from random import randint
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Quiz
from .serializers import QuizSerializer

# from random import randint

def index(request):
    return render(request, 'index.html')

def main(request):
    return render(request, 'main.html')

def quiz(request):
    all_quiz = Quiz.objects.all()
    arr = []
    for i in all_quiz:
        tmp = {
            'quiz': i,
            'first_ques':i.question_set.get(num_in_quiz = 1),
        }
        arr.append(tmp)

    return render (request, 'quiz.html', {'data':arr})


def quiz_num(request, quiz_num):
    cur_test = Quiz.objects.get(id = quiz_num)
    question = cur_test.question_set.filter(id = 1)

    return render (request, 'quiz_num.html', {'question':question})

def ques_num(request, quiz_num, abs_ques):
    
    cur_test = Quiz.objects.get(id = quiz_num)

    cur_question = Question.objects.get(id = abs_ques)

    cur_test = Quiz.objects.get(id = quiz_num)
    cur_question = Question.objects.get(id = abs_ques)
    answers = cur_question.answer_set.filter(ques = cur_question.id)

    all_questions = cur_test.question_set.all()

    return render (request, 'quiz_num.html', {'question':cur_question, 'answers':answers, 'all_questions': all_questions, 'cur_test':cur_test})

class Login(LoginView):
    form = AuthenticationForm
    template = 'login.html'

class Register(CreateView):
    template_name = "registration/register.html"

    def get(self, request):
        context = {
            'form': UserCreationForm()
        }

        return render(request, self.template_name, context)
    
    def post(self, request):
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('main')
        
        context = {
            'form': form,
        }

        return render (request, self.template_name, context)

class PasswordReset(PasswordResetView):
    template_name = 'registration/passwd_res.html'



def personal_account(request):
    return render(request, 'personal_account.html')

class CreateQuiz(View):
    model = Quiz
    form_quiz = CreateQuizForm
    template_name = 'create_quiz.html'

    def get(self, request, *args, **kwargs):
        ques_form = self.form_quiz()
        ques_set = quesFormSet()
        return render(request, self.template_name, 
                      {'ques_form': ques_form, 'ques_set': ques_set})

    def post(self, request, *args, **kwargs):
        ques_form = self.form_quiz(request.POST)
        ques_set = quesFormSet(request.POST)
        
        if ques_form.is_valid() and ques_set.is_valid():
                quiz = ques_form.save(commit = False)
                quiz.owner = request.user
                quiz.save()
                ques_set.instance = quiz
                ques_set.save()
                return render(request, self.template_name, {'ques_form': ques_form, 'ques_set': ques_set})


