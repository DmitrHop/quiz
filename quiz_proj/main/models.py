from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    pass


class UserRelation(models.Model):
    supervisor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='relation_as_supervisor')
    subordinate = models.ForeignKey(User, on_delete=models.CASCADE, related_name='relation_as_subordinate')

    class Meta:
        unique_together = ('supervisor', 'subordinate')

    def __str__(self):
        return f'{self.supervisor} → {self.subordinate}'


class Quiz(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'ID: {self.id}, name: {self.name}'

class Question(models.Model):
    value = models.TextField()
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)

class Answer(models.Model):
    value = models.TextField()
    isTrue = models.BooleanField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')


class QuizResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.quiz.name} - {self.score}%'

class QuesResult(models.Model):
    quizRes = models.ForeignKey(QuizResult, on_delete=models.CASCADE)
    isTrue = models.BooleanField()
    ques = models.ForeignKey(Question, on_delete=models.CASCADE)
