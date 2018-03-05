# 올유머 프로젝트

## 기술스택

* express
* mongodb
* react
* redux
* auth0

이 외 redux 관련 잡다하게 immutable 이나 redux-thunk 등을 사용했습니다.

## 코멘트

1.  크롤러 로직을 따로 때어내서 앱에서 분리하려고 했지만 항상 마지막 단계만 가까워오면 시간이 부족해지더군요 ㅜ

2.  샤프(노드) 라이브러리는 리눅스 버전이 따로 있어서 그냥 람다 함수에 zip 파일로 Mac 버전을 올렸더니 호환이 안 됐습니다. 만약 샤프 라이브러리를 사용하실려면 docker 와 함께 사용해보세요.

3.  근 두 달여간 앱을 만들면서 한 반 정도의 시간을 리팩토링하는데 사용했습니다. 시간이 없어서, 앱이 충분히 복잡하지 않아서 라는 말이 핑계라는 걸 깨닫는데 꽤 시간이 걸렸죠. TDD/clean code 만세!

4.  개발 막판이 되니 가장 큰 문제는 맥 환경에서 잘 돌아가는 앱을 어떻게 리눅스(우분투 16.04) 환경으로 성공적으로 옮길 수 있을까 하는 것이었습니다. 이 문제는 추후에 docker, docker-compose 를 배울 생각입니다.

5.  마지막으로 Keith Weaver 의 MERN app 을 ec2 에 배포하는 법을 다룬 훌륭한 가이드를 소개하며 마치겠습니다.
    [link](https://medium.com/@Keithweaver_/setting-up-mern-stack-on-aws-ec2-6dc599be4737)
