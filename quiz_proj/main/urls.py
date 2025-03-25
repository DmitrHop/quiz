from django.urls import path
from . import views


urlpatterns = [
        path('', views.main, name = 'main'), # open "main" page on '127.0.0.1:8000/'
        path('quiz/', views.quiz, name = 'quiz_list'), # open "quiz.html" page on '127.0.0.1:8000/quiz/'
        path('quiz/<str:quiz_num>/ques_1', views.quiz_num, name='quiz'),
]
