from django.shortcuts import render
from django.http import HttpResponse
from main.models import Quiz, Answer, Question
from random import randint

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
    answers = cur_question.answer_set.filter(ques = cur_question.id)

    all_questions = cur_test.question_set.all()

    return render (request, 'quiz_num.html', {'question':cur_question, 'answers':answers, 'all_questions': all_questions, 'cur_test':cur_test})
