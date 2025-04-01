from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Quiz(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=7)

    def __str__(self):
        return f'ID: {self.id}, name: {self.name}'

class Question(models.Model):
    value = models.TextField()
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    num_in_quiz = models.IntegerField(null = True)

    def __str__(self):
        return str(self.id)

class Answer(models.Model):
    value = models.TextField()
    isTrue = models.BooleanField()
    ques = models.ForeignKey(Question, on_delete=models.CASCADE)