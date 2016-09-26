#Ykdc_cookie 
##Introduce		
This page is test how to get\set\remove the cookie that you want.

##Usage
>1. If you browser don't have the cookie named 'test', the program will create it, and the new cookie's the default value is null
```javascript
var a = Ykdc.findCookie('test');
```
-------  
```javascript
a.setCookie(key,value);
```
You can set a single key and value like that

```javascript
a.setCookie(obj);
```
You can also set a object key and value like that

```javascript
a.setCookie(string);
```
You can also set single value like that, ps: if cookie value's type has changed, it will store the history value into the 'this[3]'

```javascript
a.setCookie(null);
```
------- 

```javascript
a.removeCookie();
```
Remove all value like use setCookie(null)

```javascript
a.removeCookie(key);
```
Remove the key which you named, if the key is not find, the program will not do anything, if the original cookie value's type is Object and this value is last one of this Object, the cookie value will be reset: null



