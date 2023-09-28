# from django.contrib.auth.base_user import BaseUserManager
# from django.utils.translation import gettext_lazy as _

# class CustomUserMananger(BaseUserManager):
#     """
#     CUSTOM USER MODEL MANAGER WHERE EMAIL IS THE UNIQUE IDENTIFIER FOR AUTHENTICATION INSTEAD OF USERNAME
#     """
#     def create_user(self, email, password, **extra_fields):
#         """
#         CREATE + SAVE USER WITH THE GIVEN EMAIIL + PASSWORD
#         """
#         if not email:
#             raise ValueError(_("The Email must be set"))
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save()
#         return user
    
#     def create_superuser(self, email, password, **extra_fields):
#         """
#         CREATE + SAVE A SUPERUSER WITH THE GIVEN EMAIL + PASSWORD
#         """

#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         extra_fields.setdefault('is_active', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError(_('Superuser must have is_staff=True'))
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError(_('Superuser must have is_superuser=True'))
#         return self.create_user(email, password, **extra_fields)

from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    # CUSTOM USER MODEL MANAGER WEHRE EMAIL IS THE UNIQUE IDENTIFIER FOR AUTH INSTEAD OF USERNAME
    
    def create_user(self, email, password, **extra_fields):
        # CREATE + SAVE A USER WITH THE GIVEN EMAIL + PASSWORD

        if not email:
            raise ValueError(_('The Email must be set'))

        extra_fields.setdefault('is_active', True)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        # user.set_password(password)
        user.password = password
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        # CREATE + SAVE SUPERUSER WITH GIVEN EMAIL + PASSWORD
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True'))
        return self.create_user(email, password, **extra_fields)