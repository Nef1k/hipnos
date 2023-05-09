from rest_framework_simplejwt.authentication import JWTAuthentication


class TmpJWTAuthentication(JWTAuthentication):

    def get_header(self, request):
        return request.GET.get('access')

    def get_raw_token(self, header):
        return header
