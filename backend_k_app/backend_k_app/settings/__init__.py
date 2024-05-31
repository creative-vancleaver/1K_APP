from .base import *

from decouple import config

# if (config("DEV_ENV") == "True"):
#     # USE LOCAL STATIC FILES and AWS PRODUCTION DB FOR MEDIA FILES
#     if (config('USE_S3') == 'False') and config('USE_LOCAL_STATIC') == 'True':
#         from .local_static_prod_db import *
#     # USE LOCAL STATIC + MEDIA + LOCAL SQLITE DB
#     else:
#         from .local_static_local_db import *
# else:
#     from .production import *

if (config('DEV_ENV') == 'True'):
    # USE LOCAL STATIC, MEDIA + DB
    print('dev')
    from .dev import *
else:
    print('prod')
    from .prod import *