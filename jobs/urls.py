from django.conf.urls import *

v1_urls = patterns('jobs.views',
    url('^$', 'api_v1_root_view', name='api_v1_root_view'),
    url('^authtoken/$', 'auth_token_view', name='auth_token_view'),
)
api_urls = patterns('jobs.views',
    url('^$', 'api_root_view', name='api_root_view'),
    url('^v1/', include(v1_urls)),
)

urlpatterns = patterns('jobs.views',
    url('^$', 'index', name='index'),
    url('^api/', include(api_urls)),
    #url('^portal/$', 'portal_redirect', name='portal_redirect'),
)
