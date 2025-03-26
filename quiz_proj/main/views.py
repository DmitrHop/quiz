from django.shortcuts import render
from django.http import HttpResponse
from main.models import Quiz, Answer, Question

def main(request):
    return render(request, 'main.html')
# Create your views here.

def quiz(request):
    all_quiz = Quiz.objects.all()

    for i in all_quiz:
        print (f'//{i.id}//')

    return render (request, 'quiz.html', {'data':all_quiz})


def quiz_num(request, quiz_num):
    cur_test = Quiz.objects.get(id = quiz_num)
    question = cur_test.question_set.filter(id = 1)

    return render (request, 'quiz_num.html', {'question':question})

def ques_num(request, quiz_num, ques_num):
    cur_test = Quiz.objects.get(id = quiz_num)
    print (cur_test)
    question = cur_test.question_set.get(num_in_quiz = ques_num)
    print(f"question: {question}")
    answers = question.answer_set.filter(ques = question.id)

    return render (request, 'quiz_num.html', {'question':question, 'answers':answers})
