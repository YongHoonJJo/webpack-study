### Webpack-loader

loader 는 모듈을 입력으로 받아서 원하는 형태로 변환한 다음, 새로운 모듈을 출력해주는 함수다.

js, 이미지, css, csv 파일 등 모든 파일은 모듈이 될 수 있다.



##### 패키지 설치

```
> mkdir webpack-loader
> cd webpack-loader
> npm init -y
> install webpack webpack-cli
```

<br>

#### JS 파일을 처리하는 babel-loader

바벨 로더를 사용하기 위한 패키지 설치

```
> npm i babel-loader @babel/core @babel/preset-react react react-dom
```

> JS코드에서 JSX 문법으로 작성된 리액트 코드를 처리하기 위해 필요한 패키지들.

<br>

```js
/*** src/index.js ***/
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  return (
    <div className="container">
      <h3 className="title">webpack example</h3>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

```js
/*** babel.config.js ***/
const presets = ['@babel/preset-react']
module.exports = { presets }
```

```js
/*** webpack.config.js ***/
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  mode: 'production'
}
```

> js 확장자를 갖는 모듈은 babel-loader 가 처리하도록 설정.

<br>

```
> npx webpack
```

> dist 폴더에 main.js 파일이 생성된다.

<br>

#### CSS 파일을 처리하는 css-loader

```
> npm i css-loader
```

```css
/*** src/App.css ***/
.container {
  border: 1px solid blue;
}

.title {
  color: red;
}
```

```js
/*** src/index.js ***/
//...
import Style from './App.css'
console.log({ Style })
//...
```

위 내용을 추가 후 웹팩을 실행시키면 에러가 발생한다.

<br>

css-loader 설정

```js
/*** webpack.config.js ***/
//...
module: {
    rules: [
      //...
      {
        test: /\.css$/,
        use: 'css-loader'
      }
    ]
  },
```

> css 확장자를 갖는 모듈은 css-loader 가 처리하도록 설정.

<br>

스타일을 실제로 적용하기 위해서는 style-loader 가 필요하다.

```
> npm i style-loader
```

```js
/*** webpack.config.js ***/
//...
module: {
    rules: [
      //...
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
```

> style-loader 를 추가하였으며, 로더를 배열로 입력하면, 오른쪽 로더부터 실행된다.
>
> style-loader 는 css-loader 가 생성한 CSS 데이터를 style 태그로 만들어서 HTML head 에 삽입한다. 또한, 번들 파일이 브라우저에서 실행될 때 style 태그를 삽입한다. 그렇기 때문에 번들 파일이 실행되다가 에러가 발생하면 style 태그가 삽입되지 않을 수 있다.
>
> 그 외, css-loader는 css-modue 기능을 제공하며, CSS 코드에서 사용되는 @import, url() 등의 처리를 도와준다.

<br>

#### 기타 파일 처리

세 종류의 파일을 준비한다.

```
src/icon.png
src/data.txt
src/data.json // { "name": "mike", "age": 23 }
```

<br>

로더 설치

```
> npm i file-loader raw-loader
```

> text 모듈은 file-loader 가 처리하며, 모듈의 내용을 그대로 복사해서 dist 폴더 밑에 복사본을 만든다.
>
> png 모듈은 raw-loader 가 처리하며, 모듈의 내용을 그대로 자바스크립트 코드로 가져온다.
>
> JSON 모듈은 웹팩에서 기본적으로 처리해준다.

<br>

```js
/*** webpack.config.js ***/
//...
module: {
    rules: [
      //...
      {
        test: /\.(png|jpg|fig)$/,
        use: 'file-loader'
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },
```

> 각 로더를 위와 같이 추가한다.
>
> 또한, 이미지 파일의 이름에는 해시값이 포함되어 있는데, 이는 이미지 파일이 수정되는 경우에만 변경되기 때문에 사용자에게 전달된 이미지 파일은 브라우저의 캐싱 효과를 활용할 수 있다.

<br>

#### 이미지 파일의 요청 횟수 줄이기

이미지 파일을 번들 파일에 포함시키면 브라우저의 파일 요청 횟수를 줄일 수 있지만 파일이 너무 커질 수가 있다.

url-loader 를 사용하면 크기가 작은 이미지 파일만 번들 파일에 포함시킬 수 있다.

```
> npm i url-loader
```

```js
/*** webpack.config.js ***/
//...
module: {
    rules: [
      //...
      
        test: /\.(png|jpg|fig)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
    ]
  },
```

파일 크기가 limit 에 해당하는 값보다 작은 경우에만 번들 파일에 파일의 내용을 포함시키고, 값이 큰 경우에는 다른 로더가 처리할 수 있도록 fallback 옵션을 제공하는데, default 는 file-loader 가 처리하도록 되어있다.



<br>

#### Reference

<https://github.com/landvibe/book-react/tree/master/7-chapter/7-webpack-loader>