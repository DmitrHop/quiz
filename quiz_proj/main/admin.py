from django.contrib import admin
from .models import *


admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(User)
admin.site.register(UserRelation)
admin.site.register(QuizResult)
admin.site.register(QuesResult)
