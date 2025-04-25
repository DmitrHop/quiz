from .models import *
from .forms import *

from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView, PasswordResetView
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.views.generic import CreateView, View, ListView
from django.contrib.auth.mixins import LoginRequiredMixin

class QuizResults(LoginRequiredMixin, ListView):
    model = QuizResult
    template_name = 'results/quiz_results.html'
    context_object_name = 'results'

    def get_queryset(self):
        return QuizResult.objects.filter(user=self.request.user)

def main(request):
    return render(request, 'main.html')

# class Main(TemplateView):
#     template_name = 'index.html'

def quiz(request):
    quizzes = Quiz.objects.all()
    return render(request, 'quiz.html', {'quizzes': quizzes})



def quiz_num(request, quiz_num):
    cur_test = get_object_or_404(Quiz, id=quiz_num)
    first_question = cur_test.question_set.order_by('num_in_quiz').first()

    if first_question:
        return redirect('ques_num', quiz_num=quiz_num, abs_ques=first_question.id)
    else:
        return redirect('main')

def ques_num(request, quiz_num, abs_ques):
    cur_test = Quiz.objects.get(id=quiz_num)
    cur_question = Question.objects.get(id=abs_ques)
    answers = cur_question.answer_set.filter(ques=cur_question.id)
    all_questions = cur_test.question_set.all()

    if 'score' not in request.session:
        request.session['score'] = 0

    if request.method == 'POST':
        selected_id = request.POST.get('selected_answer')
        if selected_id:
            selected_answer = Answer.objects.get(id=selected_id)
            if selected_answer.isTrue:
                request.session['score'] += 1

        next_question = all_questions.filter(num_in_quiz=cur_question.num_in_quiz + 1).first()
        if next_question:
            return redirect('ques_num', quiz_num=quiz_num, abs_ques=next_question.id)
        else:
            user = request.user
            QuizResult.objects.create(user=user, quiz=cur_test, score=request.session['score'])
            del request.session['score']
            return redirect('quiz_results')

    return render(request, 'quiz_num.html', {
        'question': cur_question,
        'answers': answers,
        'all_questions': all_questions,
        'cur_test': cur_test
    })

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
        ans_sets = [ansFormSet() for i in range(len(ques_set.forms))]

        ques_ans_pairs = list(zip(ques_set.forms, ans_sets))

        return render(request, self.template_name, {
            'ques_form': ques_form,
            'ques_set': ques_set,
            'ques_ans_pairs': ques_ans_pairs
        })

    def post(self, request, *args, **kwargs):
        ques_form = self.form_quiz(request.POST)
        ques_set = quesFormSet(request.POST)
        ans_sets = []
        
        if ques_form.is_valid() and ques_set.is_valid():
                quiz = ques_form.save(commit = False)
                quiz.owner = request.user
                quiz.save()
                ques_set.instance = quiz
                ques_instances = ques_set.save(commit = False)
                for i, ques in enumerate(ques_instances):
                    ans_set = ansFormSet(request.POST)
                    ans_sets.append(ans_set)

                    if ans_set.is_valid():
                        ques.quiz = quiz
                        ques.save()
                        ans_set.instance = ques
                        ans_set.save()
                    else:
                        valid = False

        if ques_form.is_valid() and ques_set.is_valid():
            return redirect('main')

        if not ans_sets:
            ans_sets = [ansFormSet(request.POST) for i in range(len(ques_set.forms))]


        ques_ans_pairs = list(zip(ques_set.forms, ans_sets))

        return render(request, self.template_name, {
            'ques_form': ques_form,
            'ques_set': ques_set,
            'ques_ans_pairs': ques_ans_pairs
        })


