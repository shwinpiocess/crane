#!/usr/bin/env python
#-*- coding: utf-8 -*-
######################################################################
## Filename: generics.py
##
## Copyright (C) 2015-2016,  Giant Interactive Group, Inc.@ztgame.com
## Version:
## Author:        lichunfeng <lichunfeng@ztgame.com>
## Created at:    2015-03-07 17:58
##
## Description: phoenix运维系统的通用API封装
##
######################################################################

from django.conf import settings
from django.db import connection

import time
import logging

from rest_framework import views

logger = logging.getLogger('jobs.generics')

class APIView(views.APIView):

    def initialize_request(self, request, *args, **kwargs):
        """
        Store the Django REST Framework Request object as an attribute on the
        normal Django request, store time the request started.
        """
        self.time_started = time.time()
        if getattr(settings, 'SQL_DEBUG', False):
            self.queries_before = len(connection.queries)
        drf_request = super(APIView, self).initialize_request(request, *args, **kwargs)
        request.drf_request = drf_request
        return drf_request

    def finalize_response(self, request, response, *args, **kwargs):
        """
        Log warning for 400 requests.  Add header with elapsed time.
        """
        if response.status_code >= 400:
            logger.warn(u'用户%s尝试访问%s时返回状态为%s' % (request.user, request.path, response.status_code))
        response = super(APIView, self).finalize_response(request, response, *args, **kwargs)
        time_started = getattr(self, 'time_started', None)
        if time_started:
            time_elapsed = time.time() - self.time_started
            response['X-API-Time'] = '%0.3fs' % time_elapsed
        if getattr(settings, 'SQL_DEBUG', False):
            queries_before = getattr(self, 'queries_before', 0)
            q_times = [ float(q['time']) for q in connection.queries[queries_before:] ]
            response['X-API-Query-Count'] = len(q_times)
            response['X-API-Query-Time'] = '%0.3fs' % sum(q_times)
        return response

    #def get_authenticate_header(self, request):
    #    """
    #    Determine the WWW-Authenticate header to use for 401 responses.  Try to
    #    use the request header as an indication for which authentication method
    #    was attempted.
    #    """
    #    for authenticator in self.get_authenticators():
    #        resp_hdr = authenticator.authenticate_header(request)
    #        if not resp_hdr:
    #            continue
    #        req_hdr = get_authorization_header(request)
    #        if not req_hdr:
    #            continue
    #        if resp_hdr.split()[0] and resp_hdr.split()[0] == req_hdr.split()[0]:
    #            return resp_hdr

    #    try:
    #        return authenticator.authenticate_header(request)
    #    except NameError:
    #        pass

    #def get_description_context(self):
    #    return {
    #        'docstring': type(self).__doc__ or '',
    #        'new_in_13': getattr(self, 'new_in_13', False),
    #        'new_in_14': getattr(self, 'new_in_14', False),
    #        'new_in_145': getattr(self, 'new_in_145', False),
    #        'new_in_148': getattr(self, 'new_in_148', False),
    #        'new_in_200': getattr(self, 'new_in_200', False)
    #    }

    #def get_description(self, html = False):
    #    template_list = []
    #    for klass in inspect.getmro(type(self)):
    #        template_basename = camelcase_to_underscore(klass.__name__)
    #        template_list.append('api/%s.md' % template_basename)

    #    context = self.get_description_context()
    #    return render_to_string(template_list, context)

    #def metadata(self, request):
    #    """
    #    Add version number where view was added to Tower.
    #    """
    #    ret = super(APIView, self).metadata(request)
    #    added_in_version = '1.2'
    #    for version in ('2.1.0', '2.0.0', '1.4.8', '1.4.5', '1.4', '1.3'):
    #        if getattr(self, 'new_in_%s' % version.replace('.', ''), False):
    #            added_in_version = version
    #            break

    #    ret['added_in_version'] = added_in_version
    #    return ret
