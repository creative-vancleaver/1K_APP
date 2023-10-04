# Generated by Django 4.0.2 on 2023-09-21 20:14

import base.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_alter_language_countries'),
    ]

    operations = [
        migrations.AlterField(
            model_name='country',
            name='flag',
            field=models.ImageField(blank=True, null=True, upload_to=base.models.country_path),
        ),
        migrations.AlterField(
            model_name='language',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=base.models.language_path),
        ),
    ]
