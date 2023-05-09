from django.urls import path

from users import views
from users.views import CookieLogoutView
from users.views import CookieTokenObtainPairView
from users.views import CookieTokenRefreshView
from users.views import TmpTokenView

urlpatterns = [
    path('token/', CookieTokenObtainPairView.as_view(), name='token-pair-obtain'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token-refresh'),
    path('token/tmp/', TmpTokenView.as_view(), name='tmp-token-obtain'),

    path('logout/', CookieLogoutView.as_view(), name='logout'),

    path('profile/', views.ProfileView.as_view(), name='user-profile'),

    path('', views.ListUsersView.as_view(), name='users-list'),
]
