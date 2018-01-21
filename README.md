# allhumor 프로젝트

## 간단한 설명

유머 사이트 게시글을 크롤링해 보여주는 앱

## 목표

버전 1 의 목표는

카테고리에 맞는 새 글 보기

로그인한 회원은 댓글 쓰기, 칭찬하기 가능하게끔

게시글 검색 기능의 세 가지.

## 배운 것

1. this

   arrow function 은 자체적으로 this 를 바인드하지 않는다.
   다만 context 에 따라서 동적으로 this 를 바인드 하는데예를 들어서 react js 의 컴포넌트 내부에서는 컴포넌트를 this 로 삼는다. this 를 바인드하는 방법에는 세 가지가 있는데첫 번째로 constructor 내부에 bind function 을 사용하는 방법,
   두 번째로 arrow function 을 통해 동적으로 bind 하는 방법,
   세 번째로 ::(es7 bind syntax)를 통해 바인드하는 방법이 있다.

2. mongodb

   1. lean option: mongodb 의 document 는 js 의 object 처럼 생겼지만 그렇지 않다. 그러므로 .lean() 호출을 통해 js object 로 바꿔줘야 object 관련 함수 호출을 할 수 있다.
      ex) omit(mongodoc, ['__v']) => mongodoc 의 버전 프로퍼티 제거

   2. remove middleware: middleware 는 정말 유용하게 사용할 수 있다.
      만약 두 모델이 ref 를 통해 서로 종속성을 가지는 경우 더욱 그렇다.
      Article 모델과 Comment 두 가지 모델이 있을 때 미들웨어가 없다면 CRUD 작업시 일일히 두 collection 을 update 해줘야한다. 하지만 middleware 를 사용하면 일일히 update 작업에 신경쓸 필요가 없다. 주의할 것은 save middleware 의 경우 모델 단위/도큐먼트 단위 쿼리에 모두 발동되는 반면 remove middleware 의 경우 도큐먼트 단위 쿼리에만 발동된다.
      즉, db.articles.remove()는 middleware 를 발동시키지 않는다.
      반면 mongodoc.remove()는 middleware 를 발동시킨다.
      save middleware 는 두 가지 경우 모두 작동한다.

   3. skip 및 limit 활용해서 query 에서 pagination 하기:
      상당히 직관적으로 구현가능하다.
      query 는

      ```js
      .skip(넘길 자료의 수)
      .limit(한 페이지 제한)
      .sort({ prop: -1 })  // decsending order
      ```

   4. 문서 단위의 save 말고도 insertMany 를 통해 array 단위로 문서를 쓸 수 있다.

   5. 기본 \_id 말고 custom id 를 사용하고 샆을 때:

   mongodb 는 기본적으로 \_id 없이는 문서 저장이 안 된다.
   그러므로 \_id 의 디폴트 값을 false 로 설정해두고,
   나중에 save 할 때 바꾸면 custom id 를 가질 수 있다.

   6. query 된 문서의 개수: .count()

   7. mongodb date 타입: new Date()로 저장하면 zulu time 으로 저장됨.

   8. mongodb 의 aggregation:
      mongodb 의 computed value 개념.
      기본적으로 $match 를 통해 pipeline 을 시작하며,
      갖가지 연산을 통해 나온 값을 받을 수 있다.
      $match 의 경우 objectId 를 매치하려면 mongoose 의 type 을 가져와야 한다.

   예시) array 필드의 길이값을 추가해서 리턴하는 pipeline

   ```js
    let [article] = await Article.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id), // 이런 식으로 매치해야 작동함
          },
        },
        {
          $addFields: {
            vote_counts: { $size: '$votes' },
            // string 안에 array 값을 넣으면 사이즈를 리턴
          },
        },
      ])
   ```

3) nodemailer

   ```js
   var nodemailer = require('nodemailer')

   // create reusable transport method (opens pool of SMTP connections)
   var smtpTransport = nodemailer.createTransport('SMTP', {
     service: 'Gmail',
     auth: {
       user: 'gmail.user@gmail.com',
       pass: 'userpass',
     },
   })

   // setup e-mail data with unicode symbols
   var mailOptions = {
     from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
     to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
     subject: 'Hello ✔', // Subject line
     text: 'Hello world ✔', // plaintext body
     html: '<b>Hello world ✔</b>', // html body
   }

   // send mail with defined transport object
   smtpTransport.sendMail(mailOptions, function(error, response) {
     if (error) {
       console.log(error)
     } else {
       console.log('Message sent: ' + response.message)
     }

     // if you don't want to use this transport object anymore, uncomment following line
     //smtpTransport.close(); // shut down the connection pool, no more messages
   })
   ```

   위 예시 코드의 경우 상당히 오래되었으며, 그에 따라 createTransport 의 첫 번째 인자로 "SMTP"를 주는 대신 아무 것도 넣지 않으면 잘 작동한다.

4) 특정 시간이 지나가면 response timeout 일으키기

   connect-timeout 모듈을 이용하면 된다.

   예시)

   ```js
   import timeout from 'connect-timeout'

   app.use(timeout(240000)) // 240000 초의 timeout 설정
   app.use(haltOnTimeout) // 응답 객체에 timeout 이 없다면 next 함수를 호출하는 미들웨어

   // haltOnTimeout.js
   export default (req, res, next) => {
     if (!req.timeout) next()
   }
   ```

5) cheerio

cheerio 에는 치명적인 결합이 있는데 그건 한국어로 된 문서를 크롤링할 경우 이상한 문자열들만 출력된다는 점이다. 이것은 cheerio 가 크롤링을 수행하면서 decode 를 진행하기 때문인데 문서를 load 할때 decodeEntities 옵션을 false 로 두면 해결된다.

ex)

```js
const $ = await cheerio.load(data, {
  decodeEntities: false,
})
```

또 크롤링한 문서에서 특정 부분을 제거하고 싶다면
$('특정 element 의 선택자').remove()

선택된 요소들에 반복작업이 필요하면
$('선택자').each((i, el) => {
console.log(el)
})

6. 비동기 작업 한 번에 진행하기

만약 Array 단위의 작업을 모두 기다려야 한다면

```js
  await Promise.all(array.map(el => someAsyncFunc(el)))
```

이런식으로 할 수 있다.

7. sanitizeHtml

cheerio 를 통해 크롤링한 문서는 standard 한 attribute 말고도 덕지덕지 필요없는 custom attribute 가 붙어있다. 그러므로 sanitize 작업을 통해 쓸모없는 attribute 들을 정리해두어야한다.

8. axios

responseType 정하기:

axios 의 기본 responseType 은 json 형태이다. 그러므로 image 같은 data 를 받으려면 responseType 을 arrayBuffer 같은 binary type 으로 바꿔주어야 한다.

```js
  const { data } = await axios.get(src, {
    responseType: 'arraybuffer',
  })
```

9. sharp

이미지는 크기에 비례해서 용량이 기하급수적으로 커진다. 단적인예로 가로 세로 크기가 2000 을 넘어가면 2~3mb 의 용량을 자랑하게 된다. 그렇기 때문에 적절하게 resizing 작업과 압축 작업을 해줘야만 이미지를 최적화할 수 있다. 이미지 최적화 라이브러리 중 가장 사용이 간편한 라이브러리 중 하나가 sharp 다. gif 파일을 지원하지 않는다는 단점을 고려하더라도 상당히 문서가 잘 돼있고 사용이 간단하다.

```js
  // buffer 저장 예시
  const buffer = sharp(data) // data는 buffer
  const meta = await buffer.metadata() // metadata 객체 안에 확장자나 가로 세로 길기 같은 정보가 들어있음.

  // 가로 길이를 확인해서 큰 이미지는 리사이징
  if (w > 700) {
    // big images
    await buffer
      .resize(700, Math.round(h * (700 / w)))
      .jpeg({ quality: 80 }) // 보통 70 중후반에서 80정도의 퀄리티가 가장 선호됨
      .toFile(`${imagePath}/${site}/${id}_${imageName}`)
  } else {
    await buffer.jpeg({ quality: 80 }).toFile(`${imagePath}/${site}/${id}_${imageName}`)
  }
```

10. gif 파일 최적화

gif 파일은 일반 사진과 비교할 수 없을 정도로 용량 차이가 심하게 나는데큰 파일은 가뿐하게 10mb 를 넘기도 한다. 그러므로 압축을 하더라도 용량이 어느 정도는 나갈 수밖에 없다.
대안으로는 mp4 등의 동영상 확장자로 파일을 전환하는 방법 등이 있는데 ffmpeg 라이브러리가 있다. 다만 실험 결과 꽤 자잘하게 많은 문제가 생겨 실제로 적용하지는 못하였다.

11. React js styling

초기에는 sass + css module 을 통한 전통적인 방식으로 작업했으나
gaeron 의 reactjs org 레포지토리에서 영감을 받고 css-in-js 라이브러리인 emotion js 를 시도해보았다. Emotion js 의 가장 큰 장점은 css prop syntax 를 제공한다는 것과 object style, template literal stlye 두 가지 모두를 지원한다는 점이다.

만약 css prop syntax 를 사용하려면

```json
  "babel": {
    "env": {
      "production": {
        "plugins": [
          [
            "emotion",
            {
              "hoist": true
            }
          ]
        ]
      },
      "development": {
        "plugins": [
          [
            "emotion",
            {
              "sourceMap": true,
              "autoLabel": true
            }
          ]
        ]
      }
    },
  "presets": ["react-app"],
  "plugins": ["emotion"]
},
```

기존 바벨 설정을 이런 식으로 바꿔줘야한다.

global style 의 경우 styled-components 를 사용해봤다면 익숙할
injectGlobal 함수를 사용하며, theme js 파일은 gaeron 의 reactjs org 레포지토리에서 많은 영감을 얻었다.

```js
// theme.js
const screenSize = {
  small: { min: 0, max: 499 },
  medium: { min: 500, max: 799 },
  mediumLarge: { min: 800, max: 1200 },
}

// media query syntax 가 한결 이해하기 쉬워졌다.
const media = {
  between(smallKey, largeKey, excludeLarge = false) {
    if (excludeLarge) {
      return `@media (min-width: ${
        screenSize[smallKey].min
      }px) and (max-width: ${screenSize[largeKey].min - 1}px)`
    }
    if (screenSize[largeKey].max === Infinity) {
      return `@media (min-width: ${screenSize[smallKey].min}px)`
    }
    return `@media (min-width: ${screenSize[smallKey].min}px) and (max-width: ${
      screenSize[largeKey].max
    }px)`
  },
  greaterThan(key) {
    return `@media (min-width: ${screenSize[key].max}px)`
  },
  lessThan(key) {
    return `@media (max-width: ${screenSize[key].min - 1}px)`
  },
}

/*
   * 예시 syntax 가 굉장히 직관적이다.
   * css={{
   *  // some styles
   *  backgroundColor: 'yello',
   *  [media.greaterThan('medium')]: {
   *    backgroundColor: 'red',
   *  }
   * }}
   */
```

12. Sticky header hoc

sticky header 는 css 의 position: fixed 를 사용하는 것으로도 간단히 구현이 가능하지만 일정 높이를 스크롤한 뒤에 fixed 속성이 생기는 경우는 어떨까?

이 경우 hoc 패턴을 통해 구현이 가능하다.

```js
const StickyOnScrollHoc = WrappedComponent =>
  class StickyOnScroll extends Component {
    state = {
      isSticky: false,
    }
    componentWillMount() {
      window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
    }
    handleScroll = () => {
      // 70px 이상 스크롤해서 내려오면 isSticky 속성이 생김
      if (window.scrollY >= 70) {
        this.setState({ isSticky: true })
      } else {
        this.setState({ isSticky: false })
      }
    }
    render() {
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }

/* 컴포넌트 단위에서 활용
      <nav
        css={{
          position: isSticky ? 'fixed' : 'static',
          ...some styles
     */
```

13. timeago.js

이번에 시간을 표시할 일이 있어서 쓰게 된 라이브러리.

다국어지원 부분이 좀 헷갈려서 고생했다.

다국어 지원은 아래와 같이 하면 끝!

다만 약간의 버그가 있는데 .으로 나누어진 날짜는 인식을 제대로 못한다.

그래서 .으로 나눠진 날짜를 -으로 바꿔주는 코드를 삽입했다.

```js
import timeago from 'timeago.js'

function locale(number, index) {
  return [
    ['방금', '곧'],
    ['%s초 전', '%s초 후'],
    ['1분 전', '1분 후'],
    ['%s분 전', '%s분 후'],
    ['1시간 전', '1시간 후'],
    ['%s시간 전', '%s시간 후'],
    ['하루 전', '1일 후'],
    ['%s일 전', '%s일 후'],
    ['1주일 전', '1주일 후'],
    ['%s주일 전', '%s주일 후'],
    ['1개월 전', '1개월 후'],
    ['%s개월 전', '%s개월 후'],
    ['1년 전', '1년 후'],
    ['%s년 전', '%s년 후'],
  ][index]
}

timeago.register('ko', locale)

const timeagoInstance = timeago()
export default date =>
  // timeago는 2018.01.04 형식이 아닌
  // 2018-01-04 형태만 바르게 인식
  timeagoInstance.format(date.replace(/[.]/g, '-'), 'ko')
```

14. redux 어플리케이션 설계

    redux 앱 설계에는 단 하나의 정답이 없다.

    그 말인 즉슨 자기에게 가장 잘 맞는 구조를 골라서 작업하면 된다는 말인데

    나 또한 여러가지 라이브러리를 도입해보고 망쳐도보고(?) 하면서 몇 가지 교훈을 얻었다.

    1. 너무 복잡한 구조는 오히려 독이다.

    redux-saga 는 redux 의 비동기 처리 라이브러리 중 star 수가 가장 많다. 출시 시기 상으로 redux-thunk 에 비해 밀림에도 더 인기가 많다는 것은 그만큼 redux-saga 의 완성도가 높다는 것을 얘기하는 것을 것이다. 그러나 완성도나 기능의 확장성과는 별개로 사용하기가 너무 복잡했다. thunk 의 경우 그냥 필요한 작업들을 순차적으로 이어서 써나가는 느낌이 강했다면 saga 는 적절한 effect 를 골라줘야하고 초기에 working saga 나 watcher saga 같은 개념을 이해하기가 어려웠다. All humor 는 그다지 복잡한 기능을 사용하지 않을 것 같아서 다시 thunk 로 돌아왔다.

    2. immutable/normalizr

    immutable js 는 언젠간 한 번 써봐야지라고 하다가 거의 4 개월이 지나고서야 써보게 됐다. 아직 record 같은 개념은 생소하고 기본적인 조작 정도만 다룰 줄 안다. 장점이라면 spread operator(...)을 사용할 때보다 syntax 가 깔끔하다는 것, 그리고 immutability 가 보장된다는 것 정도일까? 그래도 확실히 nested field update 조작이 간편해졌다. immutable js 짱짱맨!

    다음 후보는 normalizr 다. normalizr 는 nested json 형태를 Schema 에 따라 normalize 해주는 라이브러리인데, 공식문서의 예시에 따르면

    ```js
      {
        "id": "123",
        "author": {
          "id": "1",
          "name": "Paul"
        },
        "title": "My awesome blog post",
        "comments": [
          {
            "id": "324",
            "commenter": {
              "id": "2",
              "name": "Nicole"
            }
          }
        ]
      }
    ```

    이런 일반적인 json 을

    ```js
      {
        result: "123",
        entities: {
          "articles": {
            "123": {
              id: "123",
              author: "1",
              title: "My awesome blog post",
              comments: [ "324" ]
            }
          },
          "users": {
            "1": { "id": "1", "name": "Paul" },
            "2": { "id": "2", "name": "Nicole" }
          },
          "comments": {
            "324": { id: "324", "commenter": "2" }
          }
        }
      }
    ```

    요렇게 바꿔준다.

    더 심하게 nested 된 구조였다면 아마 더 surprise 였을테지만 이정도만 해도 꽤 놀랍다. 이제 한결 조작이 간단해졌음을 느꼈을 것이다.

    normalizr 을 쓰면서 꽤 삽질한 부분이 있는데 자꾸 undefined 키가 생성되는 부분이었다.

    api resonpse 를 normalize 해서 store 에 담으면 자꾸 id 부분이 undefined 로 뜨길래 삽질 좀 했더니

    Entity 를 설정할 때 option 으로 idAttributes 를 넘겨줄 수 있었다.

    몽고디비에서 넘어온 녀석들은 id field 가 전부 \_id 였기 때문에 발생한 에러...

    ```js
      const { data: { articles, total } } = await api.get(`/articles/${category}/${page}`)
      const articleSchema = new schema.Entity('articles', {}, { idAttribute: '_id' }) // mongodb
      const articleListSchema = [articleSchema]     // array of objects
    ```

    3. selector 패턴

    redux 를 사용하면 일반적으로 container 의 connect 에서 prop 으로 redux store 의 여러 상태들을 뿌려주게 된다. 이 경우 보통은 mapStateToProps 함수를 사용하게 되는데, 대신 selector 를 사용하면 몇 가지 장점이 있다.

    1. 연산과정이 바뀌더라도 일일히 container 들을 손 볼 필요가 없다.

    계산은 selector 에서만 일어나므로 계산 과정이 조금 바뀌더라도 일일히 container 를 돌며 바꿔줄 필요가 없다.

    예를 들어서

    ```js
      // 일반적인 mapStateToProps 함수
      const mapStateToProps = (state) => {
        const { taxRata, sum } = state.tax
        return ({
          tax: taxRate * sum
        })
      }

      // 여기서 tax에 대한 계산과정을 selector로 빼버리면?
      const mapStateToProps = state => ({
        tax: getTax(state),
      })

      이 둘의 차이는 전자는 만약 tax의 연산과정이 바뀌면 container에 있는 함수를 일일히 수정해줘야한다는 것이지만 후자는 getTax 함수만 수정하면 된다는 것!
    ```

    2. reselect 같은 라이브러리를 사용하면 성능상의 이점을 볼 수 있음.

    reselect 는 memoize 패턴을 사용하기 때문에 render 가 될 때마다 비싼 연산을 하는 mapStateToProps 함수와는 달리 결과값을 저장해놓고 연산을 훨씬 적게 하게 된다. 이는 당연히 성능 향상을 연결된다.

    4. 하나의 거대한 reducer 보다는 여러 개의 작은 reducer

    어떤 것이든 늘 그렇지만 리듀서도 크기가 너무 커지면 그 리듀서가 정확히 어떤 일들을 하는지 이해하기 어렵게 된다. 이는 더 나아가 유지 보수를 힘들게 하고, 크게는 어플리케이션의 확장성을 떨어뜨린다.
    그러므로 좋은 설계자는 항상 관심사의 분리를 걱정해야하는데 이는 redux 의 경우에도 예외는 아니다.
    Redux 의 공식문서에는 [리듀서 쪼개기](https://redux.js.org/docs/recipes/reducers/SplittingReducerLogic.html) 라는 하위 항목이 존재하는데 상당히 유용한 문서다.

    예시로 만들었던 투두앱의 리듀서가 어떤 부분에서 필요 이상으로 많은 일을 하는지를 먼저 짚어주고 그 다음에는 공통된 일을 하는 함수를 하나로 빼냈으며(DRY), 마지막에는 로직을 분리해냈다.

    나도 api 호출 성공 결과를 저장하는 entity 리듀서, api 호출 실패시 에러를 저장하는 error 리듀서, api 호출 시 request 의 status 를 기록하는 fetching 리듀서, pagination 관련 기능을 담당하는 pagination 리듀서 등 로직을 분산하기 위해 노력했다.

    5. api 호출의 actionType 을 덜 verbose 하게 사용해보자.

    일반적으로 redux 는 verbose 하다. 간결한 syntax 를 더 선호나는 나로서는 꽤 큰 약점이다. 나는 이런 verbose 함을 견디기 위해 actionTypes 를 좀 다른 방식으로 구성했는데 이를테면

    ```js
    export default {
      article: {
        REQUEST: 'article/ARTICLE_REQUEST',
        SUCCESS: 'article/ARTICLE_SUCCESS',
        ERROR: 'article/ARTICLE_ERROR',
      },
      pagination: {
        SET_CATEGORY: 'pagination/SET_CATEGORY',
        SET_PAGE: 'pagination/SET_PAGE',
        SET_LAST_PAGE: 'pagination/SET_LAST_PAGE',
      },
      login: {
        SWITCH_VIEW: 'login/SWITCH_VIEW',
      },
    }
    ```

    이런 식이라면 전보다 더 깔끔하게 action 을 부를 수 있다.
