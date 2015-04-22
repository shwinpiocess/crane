#!/usr/bin/env python
#-*- coding: utf-8 -*-
######################################################################
## Filename: serializers.py
##
## Copyright (C) 2015-2016,  Giant Interactive Group, Inc.@ztgame.com
## Version:
## Author:        lichunfeng <lichunfeng@ztgame.com>
## Created at:    2015-03-07 17:58
##
## Description: phoenix运维系统的API序列化定义
##
######################################################################

from django.contrib.auth import authenticate

import logging

from rest_framework import serializers

logger = logging.getLogger('jobs.serializers')

class AuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError('User account is disabled.')
                attrs['user'] = user
                return attrs
            raise serializers.ValidationError('用户名或密码错误')
        else:
            raise serializers.ValidationError('用户名密码不能为空')
