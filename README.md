Illustrates issue with [livereactload](https://github.com/milankinen/livereactload) where a React class can not be hot reloaded if it includes any ES6 module `get` functions.

https://github.com/milankinen/livereactload/issues/54

# To Run

```shell
npm install
gulp
```

Then load up [localhost:3000](http://localhost:3000) in the browser and view the error log.

# Error

>`Uncaught TypeError: Cannot set property displayText of #<Example> which has only a getter`
