# Generated by Django 4.0.2 on 2023-10-02 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_userword_score_alter_userword_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='userword',
            name='isMastered',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]