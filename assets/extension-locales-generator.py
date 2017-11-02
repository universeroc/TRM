#! -*- encoding:utf-8 -*-

import os

'''https://pypi.python.org/pypi/googletrans
pip install googletrans

from googletrans import Translator
translator = Translator(service_urls=[
      'translate.google.cn'
    ])
'''
from googletrans import Translator
import codecs


locales=["ar","am","bg","bn","ca","cs","da","de","el","en","en_GB","en_US","es","es_419","et","fa","fi","fil","fr","gu","he","hi","hr","hu","id","it","ja","kn","ko","lt","lv","ml","mr","ms","nl","no","pl","pt_BR","pt_PT","ro","ru","sk","sl","sr","sv","sw","ta","te","th","tr","uk","vi","zh_CN","zh_TW"]


sl = [
  'Tab Resource Monitor for Google Chrome',
  'Tab Resource Monitor enables you see all resource consumed of each Tab.',
  'Type',
  'Url',
  'Byte',
  'Read cache'
]

mt = '''{
  "appName": {
    "message": "%s",
    "description": "The title of the application, displayed in the web store."
  },
  "appDesc": {
    "message": "%s",
    "description":"The description of the application, displayed in the web store."
  },
  "popupTypeSection": {
    "message": "%s",
    "description": "The type section of the requests, displayed in Popup."
  },
  "popupUrlSection": {
    "message": "%s",
    "description": "The url section of the requests, displayed in Popup."
  },
  "popupByteSection": {
    "message": "%s",
    "description": "The bypes section of the requests, displayed in Popup."
  },
  "popupReadCacheSection": {
    "message": "%s",
    "description": "The read cache section of the requests, displayed in Popup."
  }
}'''

locales_root='../src/_locales/'
if not os.path.exists(locales_root):
  os.mkdir(locales_root)
os.chdir(locales_root)

translator = Translator(service_urls=[
  'translate.google.cn',
])

for l in locales:
  if not os.path.exists(l):
    print(l)
    os.mkdir(l)
  os.chdir(l)
  with open('messages.json', 'w') as f:
    try:
      print 'Processing [%s]' % l
      if l in ['zh_CN','zh_TW']:
        l = l.replace('_', '-')
      translations = translator.translate(sl, dest=l)
      message = mt % (translations[0].text, translations[1].text,
                      translations[2].text, translations[3].text,
                      translations[4].text, translations[5].text)
      # print message
      f.write(message.encode('utf-8'))

      print 'Processing [%s] Over.' % l
    except Exception as e:
      print e
  os.chdir('..')
