# Generated by Django 4.0.2 on 2024-01-12 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_word_alphabet'),
    ]

    operations = [
        migrations.AddField(
            model_name='character',
            name='descirption',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
