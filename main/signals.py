from django.dispatch import receiver
from allauth.socialaccount.signals import social_account_added, social_account_updated
from allauth.socialaccount.models import SocialAccount

@receiver([social_account_added, social_account_updated])
def save_google_avatar(request, sociallogin, **kwargs):
    user = sociallogin.user
    if sociallogin.account.provider == 'google':
        data = sociallogin.account.extra_data
        avatar_url = data.get('picture')

        if avatar_url:
            user.avatar = avatar_url
            user.google_id = data.get('sub')  # сохраняем также google_id, если не сохранялся ранее
            user.save()
