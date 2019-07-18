### Tree Shaking - 번들 파일 최적화

Tree shaking 은 불필요한 코드를 제거해주는 기능.



#### 패키지 설치

```
> npm i webpack webpack-cli
```

<br>

```js
/*** src/util_esm.js ***/
export function func1() {
  console.log('func1')
}

export function func2() {
  console.log('func2')
}
```

> ESM 문법을 사용하는 코드 : import, export

<br>

```js
/*** src/commonjs.js ***/
function func1() {
  console.log('func1')
}

function func2() {
  console.log('func2')
}

module.exports = { func1, func2 }
```

> commonJS 문법을 사용하는 코드 : module.exports, require

<br>

```js
/*** src/index.js ***/
import { func1 } from './util_esm'

func1()
```

> ESM 문법으로 작성된 모듈을 ESM 문법으로 가져오는 코드.

<br>

```
> npx webpack
```

> 번들 파일을 확인해보면, func2 함수가 보이지 않는데, tree shaking 으로 인해 함수가 제거된 상태이다.

<br>

#### Tree Shaking 이 실패하는 경우

index.js 수정

```js
import { func1 } from './util_commonjs'

func1()
```

<br>

```
> npx webpack
```

> 이번에는 번들된 파일에서 func2 함수가 보인다. 사용되는 util_commonjs.js 모듈이 ESM 이 아니가 때문이다.

<br>

##### Tree shaking 은 아래와 같은 경우 동작하지 않는다.

```
- 사용되는 모듈이 ESM 이 아닌 경우
- 사용하는 쪽에서 ESM이 아닌 다른 모듈 시스템을 사용하는 경우
- 동적 임포트를 사용하는 경우
```

> 즉, 사용되는 쪽과 사용하는 쪽 모두 ESM 문법을 사용하면 정삭 동작한다.

<br>

#### 동적 임포트를 사용하는 예시

```js
import('./util_esm').then(util => util.func1())
```

<br>

 또한, 모듈 내부에서 자신의 함수를 호출하는 경우에는 웹팩이 해당 함수를 제거하지 않는다. 즉, 모듈이 평가되는 시점에 호출되는 함수를 제거하지 않는다.

외부 패키지의 경우에는 패키지가 어떤 모듈 방식을 사용하느냐에 따라 적용이 되기도, 안되기도 한다. 그렇기 때문에, 사용하는 패키지에 적용된 모듈 시스템이 무엇인지, ESM 이 아니라면 각 기능을 별도의 파일로 제공하는지 여부를 파악해서 번들 크기를 줄일 수 있다.

<br>



#### Reference

 <https://github.com/landvibe/book-react/tree/master/7-chapter/9-webpack-tree-shaking>







