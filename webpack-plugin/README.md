### 플러그인 사용하기

로더는 특정 모듈에 대한 처리만 담당하지만, 플러그인은 웹팩이 실행되는 전체 과정에 개입할 수 있다.

<br>

##### 패키지 설치

```
> npm init -y
> npm i webpack webpack-cli
> npm i @babel/core @babel/preset-react babel-loader react react-dom
```

<br>

```jsx
/*** src/index.js ***/
import React from 'react'
import ReactDom from 'react-dom'

function App() {
  return (
    <div>
      <h3>Hello, Webpack Plugin</h3>
      <p>html-webpack-plugin 플러그인</p>
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
```

<br>

```js
/*** webpack.config.js ***/
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  mode: 'production'
}
```

> chunkhash 은 파일의 내용이 수정될 때마다 파일 이름이 변경되로록 설정.
>
> 자바스크립트 모듈을 처리하도록 babel-loader 를 설정. babel.config.js 파일로 바벨을 설정할 수도 있지만, 이처럼 babel-loader 에서 직접 바벨 설정을 할 수도 있다.

<br>

#### html-webpack-plugin

```
> npm i clean-webpack-plugin html-webpack-plugin
```

> clean-webpack-plugin 은 웹팩을 실행할 때마다 dist 폴더를 정리한다. 여기서는 번들 파일의 내용이 변경될 때마다 파일 이름도 변경되기 때문에 이전에 생성된 번들 파일을 정리하는 용도로 사용
>
> 웹팩을 실행해서 나오는 결과물을 확인하기 위해서는 HTML 파일을 수동으로 작성해야하며, 여기서는 번들 파일 이름에 chunkhash 옵션을 설정했기 때문에 파일의 내용이 변경될 때마다 HTML 파일의 내용도 수정해야 하는데, 이 작업을 자동으로 하는 플러그인이 html-webpack-plugin 이다.

<br>

webpack.config.js 파일에 내용 추가

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //...
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './template/index.html'
    })
  ],
  //...
}
```

> new CleanWebpackPlugin() 는 웹팩이 실행될 때마다 dist 폴더를 정리.
>
> index.html 파일이 자동으로 생성되도록 html-webpack-plugin 을 설정하는데, 원하는 형태를 기반으로 index.html 파일이 생성되도록 template 옵션을 설정.

<br>

template/index.html 생성

```html
<html>
  <head>
    <title>Webpack Plugin Ex</title>
  </head>
  <body>
    <div id="root" />
  </body>
</html>
```

<br>

```
> npx webpack
```

dist 폴더에 생성된 index.html 파일은 다음과 같다.

```html
<html>
  <head>
    <title>Webpack Plugin Ex</title>
  </head>
  <body>
    <div id="root" />
  <script type="text/javascript" src="main.f8e1a42fae3083964160.js"></script></body>
</html>
```

> 번들 파일이 script 태그로 등록된다.

<br>

#### DefinePlugin

모듈 내부에 있는 문자열을 대체해주는 DefinePlugin (웹팩 내장 플러그인)

```jsx
/*** src/index.js ***/
import React from 'react'
import ReactDom from 'react-dom'

function App() {
  return (
    <div>
      <h3>Hello, Webpack Plugin</h3>
      <p>html-webpack-plugin plugin</p>
      <p>{`App version : ${APP_VERSION}`}</p>
      <p>{`10 * 10 = ${TEN * TEN}`}</p>
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
```

```js
/*** webpack.config.js ***/
//...
const webpack = require('webpack')

module.exports = {
  //...
  plugins: [
    //...
    new webpack.DefinePlugin({
      APP_VERSION: '"1.2.3"', // or JSON.stringify('1.2.3')
      TEN: '10'
    })
  ],
  //...
}
```

> 문자열을 대체하는 플러그인.

<br>

```
> npx webpack
```

압축된 코드를 잘 검색해보면 아래와 같은 내용을 확인할 수 있다.

```js
l.a.createElement("p",null,"App version : 1.2.3"),l.a.createElement("p",null,"10 * 10 = 100")
```

> 프로덕션 모드로 웹팩을 실행했기 때문에 미리 계산된 결과가 번들 파일에 포함되었다.

<br>

#### ProvidePlugin

자주 사용되는 모듈은 import 키워드를 사용해서 가져오는 것이 번거로울 수 있다. ProvidePlugin 을 사용하면, 미리 설정한 모듈을 자동으로 등록해준다. 이 플러그인 역시 웹팩 내장 플러그인이다. 

```jsx
//import React from 'react'
import ReactDom from 'react-dom'

function App() {
  return (
    //...
  )
}

ReactDom.render(<App />, $('#root')[0])
```

> 첫 라인을 주석처리하고, 마지막 라인을 jquery 를 사용해서 돔 요소를 가져오는 코드로 변경.

<br>

webpack.config.js 에서 플러그인 추가

```js
/*** webpack.config.js ***/
//...

module.exports = {
  //...
  plugins: [
    //...
    new webpack.ProvidePlugin({
      React: 'react',
      $: 'jquery'
    })
  ],
  //...
}
```

```
> npm i jquery
```

<br>

웹펙을 실행시키면 원하는 결과를 얻을 수 있다.

```js
import React from 'react'
import $ from 'jquery'
```

> 위 코드를 작성하지 않아도 된다.

