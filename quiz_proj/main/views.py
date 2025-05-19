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
from django.views import View

class QuizResults(LoginRequiredMixin, ListView):
    model = QuizResult
    template_name = 'results/quiz_results.html'
    context_object_name = 'results'

    def get_queryset(self):
        return QuizResult.objects.filter(user=self.request.user).select_related('quiz')
    
def main(request):
    return render(request, 'main.html')

# class Main(TemplateView):
#     template_name = 'index.html'

def quiz(request):
    quizzes = Quiz.objects.all()
    return render(request, 'quiz.html', {'quizzes': quizzes})



def quiz_num(request, quiz_num):
    cur_test = get_object_or_404(Quiz, id=quiz_num)
    first_question = cur_test.question_set.order_by('id').first()  
    
    if first_question:
        return redirect('ques_num', quiz_num=quiz_num, abs_ques=first_question.id)
    else:
        return redirect('main')


def ques_num(request, quiz_num, abs_ques):
    cur_test = Quiz.objects.get(id=quiz_num)
    cur_question = get_object_or_404(Question, id=abs_ques, quiz=cur_test)
    answers = cur_question.answers.all()
    all_questions = list(cur_test.question_set.order_by('id'))  
    print("Текущий вопрос:", cur_question.value)
    print("Ответы:", list(answers))


    if 'score' not in request.session:
        request.session['score'] = 0

    if request.method == 'POST':
        selected_id = request.POST.get('selected_answer')
        if selected_id:
            selected_answer = Answer.objects.get(id=selected_id)
            if selected_answer.isTrue:
                request.session['score'] += 1

        current_index = next((index for index, question in enumerate(all_questions) if question.id == cur_question.id), None)

        if current_index is not None and current_index + 1 < len(all_questions):
            next_question = all_questions[current_index + 1]
            return redirect('ques_num', quiz_num=quiz_num, abs_ques=next_question.id)
        else:
            user = request.user
            total_questions = len(all_questions)
            correct_answers = request.session['score']
            score_percentage = (correct_answers / total_questions) * 100

            QuizResult.objects.create(user=user, quiz=cur_test, score=score_percentage)
            del request.session['score']
            return redirect('quiz_results')

    return render(request, 'ques.html', {
    'question': cur_question,
    'answers': answers,
    'question_index': all_questions.index(cur_question) + 1,
    'total_questions': len(all_questions),
    'cur_test': cur_test,
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
    user = request.user
    quiz_count = QuizResult.objects.filter(user=user).count()
    return render(request, 'personal_account.html', {
        'quiz_count': quiz_count
    })


class CreateQuiz(View):
    template_name = 'create_quiz.html'
    form_quiz = CreateQuizForm

    def get(self, request, *args, **kwargs):
        ques_form = self.form_quiz()
        ques_set = quesFormSet(prefix='question_set')
        ans_sets = [ansFormSet(prefix=f'ans_{i}') for i in range(len(ques_set.forms))]
        ques_ans_pairs = list(zip(ques_set.forms, ans_sets))
        return render(request, self.template_name, {
            'ques_form': ques_form,
            'ques_set': ques_set,
            'ques_ans_pairs': ques_ans_pairs
        })

    def post(self, request, *args, **kwargs):
        print("POST данные получены:")
        for k, v in request.POST.items():
            print(f"{k} = {v}")

        ques_form = self.form_quiz(request.POST)
        ques_set = quesFormSet(request.POST, prefix='question_set')

        if ques_form.is_valid() and ques_set.is_valid():
            quiz = ques_form.save(commit=False)
            quiz.owner = request.user
            quiz.save()
            print("Квиз сохранён:", quiz.name)

            ques_set.instance = quiz
            questions = ques_set.save(commit=False)

            for i, ques in enumerate(questions):
                ques.quiz = quiz
                ques.save()
                print(f"Вопрос {i} сохранён: {ques.value}")

                ans_set = ansFormSet(request.POST, prefix=f'ans_{i}')
                ans_set.is_valid()
                answers = ans_set.save(commit=False)
                print(f"Ответов в ans_{i}: {len(answers)}")
                for ans in answers:
                    print(f"  ⮑ ответ: '{ans.value}', правильный: {ans.isTrue}")
                    if not ans.value.strip():
                        continue
                    ans.question = ques
                    ans.save()
                    print(f"      ✅ Сохранён для вопроса: {ques.id}")
                for obj in ans_set.deleted_objects:
                    obj.delete()

            return redirect('main')

        print("⚠️ Форма квиза или вопросов невалидна")
        ans_sets = [ansFormSet(request.POST, prefix=f'ans_{i}') for i in range(len(ques_set.forms))]
        ques_ans_pairs = list(zip(ques_set.forms, ans_sets))
        return render(request, self.template_name, {
            'ques_form': ques_form,
            'ques_set': ques_set,
            'ques_ans_pairs': ques_ans_pairs
        })

