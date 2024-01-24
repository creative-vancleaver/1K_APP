# Generated by Django 4.0.2 on 2024-01-10 21:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_country_flag_alter_language_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Alphabet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('alphabet_type', models.CharField(blank=True, max_length=250, null=True)),
                ('alphabet_sub_type', models.CharField(blank=True, max_length=250, null=True)),
                ('dialect', models.CharField(blank=True, max_length=250, null=True)),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='alphabets', to='base.language')),
            ],
        ),
        migrations.AddField(
            model_name='word',
            name='pronunciation',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('character', models.CharField(max_length=250)),
                ('pronunciation', models.CharField(blank=True, max_length=250, null=True)),
                ('alphabet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='characters', to='base.alphabet')),
            ],
        ),
        migrations.AddField(
            model_name='word',
            name='characters',
            field=models.ManyToManyField(related_name='words', to='base.Character'),
        ),
    ]