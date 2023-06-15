"""BE URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.urls import include
from django.urls import path

from app import views

urlpatterns = [
    path('healthcheck/', views.HealthcheckView.as_view(), name='healthcheck'),
    path('users/', include('users.urls')),
    path('hipnos/', include('hipnos.urls')),
    path('synergy/', include('synergy.urls')),
]


if settings.DEBUG:
    urlpatterns.append(
        path('swagger/', views.swagger_schema_view.with_ui('swagger'), name='swagger-ui')
    )
