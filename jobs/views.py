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

class ApplicationInfoView(APIView):
    def get(self, request, format='json'):
        application_info = {
            'serviceInfo': {
                'tf_copyrightInfo': '巨人网络公司所有',
                'tf_copyrightOwner': '巨人网络',
                'tf_serviceDepartment': '巨人网络',
                'tf_serviceEmail': 'lichunfeng@ztgame.com',
                'tf_serviceHomepage': 'www.ztgame.com',
                'tf_serviceQQ': '1013111502',
                'tf_serviceTelnumber': '1333333333'
            },
            'systemInfo': {
                'tf_systemName': '运维系统',
                'tf_systemVersion': '1.0.0',
                'tf_systemAddition': '',
            },
            'tf_systemMenu': [
                {
                    'parent': {
                        'text': '工程管理',
                        'icon': '',
                        'glyph': 0,
                        'expanded': True,
                        'description': '',
                    },
                    'children': [
                        {
                            'text': '工程项目',
                            'module': 'Global',
                            'icon': '',
                            'glyph': 0xf0f7,
                            'leaf': True
                        },
                        {
                            'text': '工程标段',
                            'module': 'Global',
                            'icon': '',
                            'glyph': 0xf0f7,
                            'leaf': True
                        },

                    ]
                    
                }
            ]
            #'tf_MenuGroups': [
            #    {
            #        'tf_menuGroupId': '10',
            #        'tf_title': '工程管理',
            #        'tf_description': '',
            #        'tf_expand': True,
            #        #'tf_menuModules': [
            #        #    {
            #        #        'tf_ModuleId': '1020',
            #        #    }
            #        #]
            #    },
            #    {
            #        'tf_menuGroupId': '20',
            #        'tf_title': '合同管理',
            #        'tf_description': '',
            #        'tf_expand': True
            #    },
            #    {
            #        'tf_menuGroupId': '30',
            #        'tf_title': '资金管理',
            #        'tf_description': '',
            #        'tf_expand': True
            #    },
            #],
            #'tf_Modules': [
            #    {
            #        'tf_moduleId': '1020',
            #        'tf_ModuleGroup': {
            #            'tf_title': '工程项目',
            #            'tf_moduleName': '合同管理',
            #            'tf_icon': '',
            #            'tf_glyph': 0xf0f7
            #        }
            #    },
            #    #{
            #    #    'tf_moduleId': '1020',
            #    #    'tf_title': '工程标段',
            #    #    'tf_moduleName': '合同管理',
            #    #    'tf_icon': '',
            #    #    'tf_glyph': 0xf02e
            #    #},

            #]
        }
        return Response(application_info)

application_info_view = ApplicationInfoView.as_view()
