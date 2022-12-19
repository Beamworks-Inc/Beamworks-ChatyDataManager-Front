# Beamworks-Platform-Frontend
![Dev Deployment](https://github.com/Beamworks-Inc/Beamworks-Platform-Front/actions/workflows/Deploy.yml/badge.svg?branch=main)

[![Dev Deployment](https://github.com/Beamworks-Inc/Beamworks-Platform-Front/actions/workflows/Deploy.yml/badge.svg?branch=dev)](https://dbs4gu2mftt7h.cloudfront.net)
## Usage
### 1. Clone Repository
```shell 
git clone https://github.com/Beamworks-Inc/Beamworks-Platform-Front.git
```
### 2. Install Package
```shell
yarn 
```
### 3. Run Vite Project
```shell
yarn dev
```

## Features
### 1. Testing
 1. Jest를 이용해서 예외, 일치 그리고 연산 등 기본적인 로직을 테스트합니다.
 2. React Testing Library를 이용해서 컴포넌트에 필요한 컨텐츠가 존재하는지 테스트합니다.
 3. 아래 커맨드를 통해서 테스트를 수행할 수 있습니다.
 ```shell
 yarn test
 ```
### 2. React-Router
SPA 어플리케이션에서 클라이언트 관점에서 라우팅을 수행하기 위한 패키지입니다. 이 패키지를 이용해 SPA 어플리케이션의 장점을 유지하며 URI를 통한 페이지의 직관적 구분이 가능합니다. 

## Branch Strategy
이 프로젝트에서 수행할 브랜치 전략입니다. Git Flow 기반으로 현재 조직 규모와 체계에  맞게 개발되었습니다. 프로젝트에는 총 3가지 타입의 브랜치가 존재합니다.
1. Feature 
- 개발자가 하나의 기능을 구현하기 위한 최소한의 단위 브랜치입니다. 로그인 기능을 구현하는 경우 ```feature/login``` 식으로 브랜치를 작성할 수 있습니다. 
- 이 브랜치는 오직 dev 브랜치에만 병합할 수 있습니다. 병합을 위해서는 먼저 PR을 작성해야하며, PR이 작성되면 CI를 통해 자동으로 테스트가 진행됩니다. 
- 테스트가 완료되면 Dev 브랜치에 병합을 요청 할 수 있습니다.
2. Dev 
- 여러 Feature를 통합하고 엔드투 엔드 테스트를 수행하기 위한 브랜치입니다.  
- 새로운 커밋이 추가된 경우, 최신 커밋을 기준으로 개발 서버에 코드 배포를 수행합니다. QA와 개발자가 테스트를 위해서 서버에 접속이 가능합니다.
- 이 브랜치에는 작은 버그 수정에 해당하는 내용만 직접 커밋이 가능합니다. 
3. Main
- 실제 사용자에게 배포하기 위한 브랜치입니다.
- 오직 Dev 브랜치에서 PR을 작성함으로써 새로운 커밋을 추가할 수 있습니다.
- Dev 에서 충분한 엔드투 엔드 테스트와 QA 과정을 거친후 PR에 모두 승인을 받으면 사용자 서버에 배포가 수행됩니다.

## Deployment Strategy
배포 전략은 위 3개의 브랜치를 기준으로 구성된 [개발 환경 구성](https://beamworks.atlassian.net/wiki/spaces/BP/pages/88638431) 문서에서 참고하실 수 있습니다. 
## Reference
1. 리액트 테스팅 개요, https://ko.reactjs.org/docs/testing.html
2. React 테스트 환경 구축하기,https://marshallku.com/web/tips/react-%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0
3. 벨로퍼트와 함께하는 리액트 테스팅, https://learn-react-test.vlpt.us/#/
4. React Testing Library Setup,https://testing-library.com/docs/react-testing-library/setup
