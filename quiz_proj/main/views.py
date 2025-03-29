from django.shortcuts import render
from django.http import HttpResponse
from main.models import Quiz, Answer, Question
from random import randint

def main(request):
    return render(request, 'main.html')
# Create your views here.

def quiz(request):
    all_quiz = Quiz.objects.all()
    arr = []
    for i in all_quiz:
        tmp = {
            'quiz': i,
            'first_ques':i.question_set.get(num_in_quiz = 1),
        }
        arr.append(tmp)

    # first_ques = []

    # for i in all_quiz:
    #     first_ques.append(i.question_set.get(num_in_quiz = 1))
    # print(f"\033[1;32;40m{first_ques}\033[1;0;40m")
    return render (request, 'quiz.html', {'data':arr})


def quiz_num(request, quiz_num):
    cur_test = Quiz.objects.get(id = quiz_num)
    question = cur_test.question_set.filter(id = 1)

    return render (request, 'quiz_num.html', {'question':question})

def ques_num(request, quiz_num, abs_ques):
    # print(f"\033[1;32;40m")
    cur_test = Quiz.objects.get(id = quiz_num)
    # print(f"\033[1;33;40m")
    cur_question = Question.objects.get(id = abs_ques)
    # print(f"\033[1;34;40m")
    answers = cur_question.answer_set.filter(ques = cur_question.id)

    all_questions = cur_test.question_set.all()

    # print(f"\033[1;0;40m")
    return render (request, 'quiz_num.html', {'question':cur_question, 'answers':answers, 'all_questions': all_questions, 'cur_test':cur_test})

def login(request):
    return render (request, 'login.html')
    
def register():
    return render (request, 'register.html')