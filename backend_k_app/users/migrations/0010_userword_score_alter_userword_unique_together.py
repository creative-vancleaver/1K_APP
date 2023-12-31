# Generated by Django 4.0.2 on 2023-09-28 20:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_country_flag_alter_language_image'),
        ('users', '0009_alter_user_managers_alter_user_languages'),
    ]

    operations = [
        migrations.AddField(
            model_name='userword',
            name='score',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='userword',
            unique_together={('user', 'user_word')},
        ),
    ]
