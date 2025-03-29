from django import forms
from .models import *

class LoginForm(forms.ModelForms):
    class Meta:
        model = 