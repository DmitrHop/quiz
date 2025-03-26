from django.urls import path, re_path
from . import views


urlpatterns = [
        path('', views.main, name = 'main'), # open "main" page on '127.0.0.1:8000/'
        path('quiz/', views.quiz, name = 'quiz_list'), # open "quiz.html" page on '127.0.0.1:8000/quiz/'
        path('quiz/quiz_num_<str:quiz_num>/', views.quiz_num, name='quiz'),
        path('quiz/quiz_num_<str:quiz_num>/<str:ques_num>', views.ques_num, name='ques_num')
]
