from django.urls import include, path, re_path
from django.views.decorators.cache import cache_page
from main.views import *
from . import views
from .views import index


urlpatterns = [
        path('', include('django.contrib.auth.urls')),
        path('', views.index, name = 'main'), # open "main" page on '127.0.0.1:8000/'
        path('quiz/', quiz, name = 'quiz_list'), # open "quiz.html" page on '127.0.0.1:8000/quiz/'
        path('quiz/quiz_num_<str:quiz_num>/', quiz_num, name='quiz'),
        path('quiz/quiz_num_<str:quiz_num>/<str:abs_ques>', ques_num, name='ques_num'),
        # path('login', Login.as_view(), name = 'login'),
        path('register', Register.as_view(), name = 'register'),
        path('personal_account', personal_account, name = 'personal_account'),
        path('password_reset', PasswordReset.as_view(), name = 'password_reset'),
        path('create_quiz', CreateQuiz.as_view(), name = 'create_quiz'),
        path('', index, name='home'),
]

# for add cache: path('quiz/', cache_page(60)(views.quiz), name = 'quiz_list')
# where 60 is seconds for life
# views.quiz - is view, that starts