# TRM
Tab Resource Monitor is a tiny, useful, clean &amp; clear Google Chrome extension for you who wants to know exactly what and how many resource each tab consumed.

## Why you need it?
TRM is the minimal version to implement this feature, it's inspired by [uBlock Orign](https://github.com/gorhill/uBlock). But [uBlock Orign](https://github.com/gorhill/uBlock) is too big and complex.

## How does TRM work?
TRM only requires permissions: tabs, webRequest, webRequestBlocking, http:\/\/\*\/\*, https:\/\/\*\/\*

TRM use [chrome.webRequest.onResponseStarted](https://developer.chrome.com/extensions/webRequest) to implement the core feature. Each request headers contains the content-length option, TRM read it and sum all requests size together to calculate the resource consumption.

## How can you help me?
Welcome any suggestion or advice!

You can create an issue or pull request on github or comments on chrome webstore.
