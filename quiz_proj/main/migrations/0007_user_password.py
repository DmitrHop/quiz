# Generated by Django 5.1.7 on 2025-03-29 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(default='null'),
            preserve_default=False,
        ),
    ]
