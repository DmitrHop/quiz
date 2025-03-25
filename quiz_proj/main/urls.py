from django.urls import path
from . import views


urlpatterns = [
        path('', views.main, name = 'main'), # open "main" page on '127.0.0.1:8000/'
        path('quiz_list', views.quiz, name = 'quiz_list'), # open "quiz.html" page on '127.0.0.1:8000/quiz_list/'
        path('quiz_num', veiws.quiz_num, name = 'quiz_num'),
]
