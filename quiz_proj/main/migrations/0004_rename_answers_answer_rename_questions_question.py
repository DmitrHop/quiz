# Generated by Django 5.1.7 on 2025-03-24 13:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_answers'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Answers',
            new_name='Answer',
        ),
        migrations.RenameModel(
            old_name='Questions',
            new_name='Question',
        ),
    ]
