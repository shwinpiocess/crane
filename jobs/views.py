#!/usr/bin/env python
#-*- coding: utf-8 -*-
######################################################################
## Filename: views.py
##
## Copyright (C) 2015-2016,  Giant Interactive Group, Inc.@ztgame.com
## Version:
## Author:        lichunfeng <lichunfeng@ztgame.com>
## Created at:    2015-03-07 17:58
##
## Description: phoenix运维系统的API数据逻辑处理
##
######################################################################

from django.core.urlresolvers import reverse
from django.views.generic.base import TemplateView, RedirectView
from django.utils.datastructures import SortedDict

from rest_framework.response import Response
from rest_framework import status

from jobs.generics import *
from jobs.serializers import *
from jobs.models import *

class IndexView(TemplateView):
    template_name = 'jobs/index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        return context

index = IndexView.as_view()

class ApiRootView(APIView):

    def get(self, request, format=None):
        current = reverse('jobs:api_v1_root_view', args=[])
        data = dict(description='Crane Jobs APP REST API', current_version=current, available_version=dict(v1=current))
        return Response(data)

api_root_view = ApiRootView.as_view()

class ApiV1RootView(APIView):

    def get(self, request, format=None):
        data = SortedDict()
        data['authtoken'] = reverse('jobs:auth_token_view')
        return Response(data)

api_v1_root_view = ApiV1RootView.as_view()

class AuthTokenView(APIView):
    serializer_class = AuthTokenSerializer

    def post(self, request):
        """验证用户名和密码, 如认证成功返回token信息, 否则返回失败信息"""
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            request_hash = AuthToken.get_request_hash(self.request)
            print 'user', serializer.validated_data['user']
            print type(serializer.validated_data['user'])
            print request_hash
            print now()
            try:
                token = AuthToken.objects.filter(user=serializer.validated_data['user'], request_hash=request_hash, expires__gt=now())[0]
                print token
                token.refresh()
            except IndexError:
                token = AuthToken.objects.create(user=serializer.validated_data['user'], request_hash=request_hash)
                print 'eeee'

            return Response({'token': token.key, 'expires': token.expires})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

auth_token_view = AuthTokenView.as_view()
