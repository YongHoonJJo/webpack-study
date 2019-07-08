### Hello Webpack

Webpack 은 JS로 만든 프로그램을 배포하기 좋은 형태로 묶어주는 툴.

웹팩은 ESM(ES6의 모듈 시스템)과 commonJS 를 모두 지원한다. 이 모듈 시스템을 사용해서 코드를 작성하고 웹팩을 실행하면, 예전 버전의 브라우저에서도 동작하는 자바스크립트 코드를 만들 수 있다.

웹팩을 실행하면 하나의 파일로 만들거나, 혹은 여러개의 파일로 분할 할 수 있으며, 웹팩이 만들어준 자바스크립트 파일을  HTML의 script 태그에 포함시키는 것이 우리가 할 일 이라고 한다.

<br>

To do : 웹팩을 사용해서 리액트의 두 파일을 자바스크립트의 모듈 시스템으로 포함시키기.

<br>

#### 프로젝트 구조

```
hello-webpack 
    ├── package.json
    ├── index.html
    └── src
         ├── index.js
         └── Button.js
```

<br>

#### 패키지 설치

```
> npm init -y
> npm i webpack webpack-cli react react-dom
```

> 웹팩 및 리액트 패키지 설치.

<br>

index.js 및 Button.js 에서는 모두 ESM 문법을 이용해서 필요한 모듈을 가져오고 있다.

```js
import React from 'react'

//...
```



<br>

#### 웹팩 실행

```
> npx webpack
```

> dist 폴더 안에 main.js 파일이 생성이 되는데, 이는 두개의 자바스크립트 파일을 하나의 파일로 합친 결과이다.<br> index.html 파일을 브라우저에서 실행하면 원하는 결과를 얻을 수 있다.

<br>

#### Reference

<https://github.com/landvibe/book-react/tree/master/1-chapter/4-webpack-test>