### < Webpack init >

웹팩은 모듈 번들러다.

```
모듈 : 각 리소스 파일
번들 : 웹팩 실행 후 나오는 결과 파일
```

> 하나의 번들 파일은 여러 모듈로 만들어진다.

<br>

#### 패키지 설치

```
> npm init -y
> npm i webpack webpack-cli
```

> webpack-cli 를 사용하면, CLI 에서 웹팩을 실행할 수 있다.

<br>

#### 소스코드

```js
/*** src/util.js ***/
export function sayHello(name) {
  console.log('Hello', name)
}
```

```js
/*** src/index.js ***/
import { sayHello } from './util'

function myFunc() {
  sayHello('mike')
  console.log('myFUnc')
}
myFunc()
```

```
> npx webpack
```

> dist 폴더가 만들어지고 그 밑에 main.js 번들 파일이 생성된다.
>
> 별다른 설정 없이 웹팩을 실행하면, ./src/index.js 모듈을 입력으로 받아서, ./dist/main.js 번들 파일을 생성한다.

<br>

#### 설정파일 이용하기

```js
/*** webpack.config.js ***/
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  optimization: { minimizer: [] },
}
```

> index.js 모듈을 입력 파일로 사용.<br>dist 폴더 밑에 main.js 번들 파일을 생성<br>프로덕션 모드로 설정하면, 자바스크립트 코드 압축을 포함한 여러 최적화 기능이 기본으로 들어간다.<br>테스트용으로 압축하지 않도록 설정.

<br>

```
> npx webpack
```

> 프로젝트 루트의 설정 파일이 사용된다.

<br>

#### Reference

<https://github.com/landvibe/book-react/tree/master/7-chapter/6-webpack-init>

