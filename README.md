simple test for check web page on playwright-core package and headless chromium browser (code tested on runtime version of node.js - 14.x)


for deployment the code to lambda:
- pull the repo
- pack into zip archive
- create lambda function
- upload code in zip archive

Configuration of Lambda for success launch:
- add layer with preinstalled base code for lambda( in my case I use 'https://github.com/shelfio/chrome-aws-lambda-layer')
- update memory to 1920 MB
- increase timeout to 15 sec
- for providing url for the tests - add environment variable with name - ENV_URL