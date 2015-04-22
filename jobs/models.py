#!/usr/bin/env python
#-*- coding: utf-8 -*-
######################################################################
## Filename: models.py
##
## Copyright (C) 2015-2016,  Giant Interactive Group, Inc.@ztgame.com
## Version:
## Author:        lichunfeng <lichunfeng@ztgame.com>
## Created at:    2015-04-07 17:53
##
## Description: phoenix运维系统的数据库模型定义
##
######################################################################

from django.db import models
from django.conf import settings
from django.utils.timezone import now

import hmac
import uuid
import hashlib
import datetime

class AuthToken(models.Model):
    """认证令牌信息表模型定义"""

    key = models.CharField(max_length=40, primary_key=True)
    user = models.ForeignKey('auth.User', related_name='auth_tokens', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    expires = models.DateTimeField(default=now)
    request_hash = models.CharField(max_length=40, blank=True, default='')

    @classmethod
    def get_request_hash(cls, request):
        h = hashlib.sha1()
        h.update(settings.SECRET_KEY)
        for header in settings.REMOTE_HOST_HEADERS:
            value = request.META.get(header, '').strip()
            if value:
                h.update(value)

        h.update(request.META.get('HTTP_USER_AGENT', ''))
        return h.hexdigest()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.refresh(save=False)
        if not self.key:
            self.key = self.generate_key()
        return super(AuthToken, self).save(*args, **kwargs)

    def refresh(self, save=True):
        """刷新token的过期时间"""
        if not self.pk or not self.expired:
            self.expires = now() + datetime.timedelta(seconds=settings.AUTH_TOKEN_EXPIRATION)
            if save:
                self.save()

    @property
    def expired(self):
        return self.expires < now()

    def generate_key(self):
        unique = uuid.uuid4()
        return hmac.new(unique.bytes, digestmod=hashlib.sha1).hexdigest()

    def __unicode__(self):
        return self.key
