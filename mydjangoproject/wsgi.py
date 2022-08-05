"""
WSGI config for mydjangoproject project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os
from whitenoise import WhiteNoise
from django.core.wsgi import get_wsgi_application
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mydjangoproject.settings')

# application = get_wsgi_application()
application = WhiteNoise(application, root=os.path.join(BASE_DIR, 'build'))