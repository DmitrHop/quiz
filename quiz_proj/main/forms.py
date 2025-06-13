from django import forms
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.utils.translation import gettext_lazy as _
from django.forms import inlineformset_factory


User = get_user_model()

class UserCreationForm(UserCreationForm):
    email = forms.EmailField(
        required = False,
        label=_("Email"),
        max_length=254,
        widget=forms.EmailInput(attrs={'autocomplete': 'email'})
    )

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'email')

class CreateQuizForm(forms.ModelForm):
    class Meta:
        model = Quiz
        fields = ['name']

class CreateQuesForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['value']
        labels = {
            'value': 'Question:',
        }

class CreateAnsForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = ['value', 'isTrue']

quesFormSet = inlineformset_factory(Quiz, Question, form=CreateQuesForm, extra=1, can_delete=True)
ansFormSet = inlineformset_factory(Question, Answer, form=CreateAnsForm, extra=0, can_delete=True)
