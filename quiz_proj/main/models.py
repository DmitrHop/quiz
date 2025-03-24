from django.db import models

# Create your models here.

class Quiz(models.Model):
    name = models.CharField(max_length=100)

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
    ques = models.ForeignKey(Question, on_delete=models.CASCADE)
