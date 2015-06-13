---
layout: post
title: 更新pip时报错：Read Timeout Error
comments: true
category: python
tags: 
- pip
- python
---

在window上面更新pip时，报ReadTimeoutError错误，具体如下：<!--more-->
<pre>
	<code>
/s eta 0:17:58[31m  Exception:
  Traceback (most recent call last):
    File "C:\Python27\lib\site-packages\pip\basecommand.py", line 246, in main
      status = self.run(options, args)
    File "C:\Python27\lib\site-packages\pip\commands\install.py", line 342, in r
un
      requirement_set.prepare_files(finder)
    File "C:\Python27\lib\site-packages\pip\req\req_set.py", line 345, in prepar
e_files
      functools.partial(self._prepare_file, finder))
    File "C:\Python27\lib\site-packages\pip\req\req_set.py", line 290, in _walk_
req_to_install
      more_reqs = handler(req_to_install)
    File "C:\Python27\lib\site-packages\pip\req\req_set.py", line 487, in _prepa
re_file
      download_dir, do_download, session=self.session,
    File "C:\Python27\lib\site-packages\pip\download.py", line 827, in unpack_ur
l
      session,
    File "C:\Python27\lib\site-packages\pip\download.py", line 673, in unpack_ht
tp_url
      from_path, content_type = _download_http_url(link, session, temp_dir)
    File "C:\Python27\lib\site-packages\pip\download.py", line 888, in _download
_http_url
      _download_url(resp, link, content_file)
    File "C:\Python27\lib\site-packages\pip\download.py", line 621, in _download
_url
      for chunk in progress_indicator(resp_read(4096), 4096):
    File "C:\Python27\lib\site-packages\pip\utils\ui.py", line 133, in iter
      for x in it:
    File "C:\Python27\lib\site-packages\pip\download.py", line 586, in resp_read

      decode_content=False):
    File "C:\Python27\lib\site-packages\pip\_vendor\requests\packages\urllib3\re
sponse.py", line 273, in stream
      data = self.read(amt=amt, decode_content=decode_content)
    File "C:\Python27\lib\site-packages\pip\_vendor\requests\packages\urllib3\re
sponse.py", line 227, in read
      raise ReadTimeoutError(self._pool, None, 'Read timed out.')
  ReadTimeoutError: HTTPSConnectionPool(host='pypi.python.org', port=443): Read
timed out.
</code>
</pre>

**解决办法**      

1. 到[https://pypi.python.org/simple/pip/](https://pypi.python.org/simple/pip/)下载最新的whl文件进行更新
2. 加大超时时间，如下：
<pre><code>
>  pip --default-timeout=100 install -U pip
</code></pre>

其实在使用pip安装一些包文件的时候如果遇到这样的问题，也是可以通过加大超时时间或者直接下载要安装文件的整个安装包来安装。   

