# Generated by Django 4.0.2 on 2024-01-12 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_character_descirption'),
    ]

    operations = [
        migrations.AlterField(
            model_name='character',
            name='descirption',
            field=models.TextField(blank=True, null=True),
        ),
    ]