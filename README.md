# Carrot Market

### Go Live => https://jks-market.vercel.app/

--------

## 목차

[1.사용 기술](#사용-기술)

[2.프로젝트 내용](#프로젝트-내용)

[3.프론트 설명](#next)

[4.기타 스택 설명](#backend-and-styiling)

-----

## 사용 기술


  .
<img src="https://img.shields.io/badge/Typescript-192a56?style=flat-square&logo=typescript&logoColor=white"/> 
<img src="https://img.shields.io/badge/React-487eb0?style=flat-square&logo=react&logoColor=white"> 
<img src="https://img.shields.io/badge/Next-000000?style=flat-square&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=Tailwindcss&logoColor=black"/>
<img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=Prisma&logoColor=white"/>
<img src="https://img.shields.io/badge/CloudFlare-F38020?style=flat-square&logo=CloudFlare&logoColor=white"/>

------

## 프로젝트 수행 기간

프로토타입 개발 완성 기간 2022/09/22 ~ 2022/10/7 약 14일 소요

------

## 프로젝트 내용

당근마켓을 기준으로 잡고 클론코딩을 만들어 보았습니다.

다만 NEXT.JS를 통한 Serverless 풀스텍을 기준으로 프로젝트를 진행하였습니다.

Prisma 를 통한 Database 연동, 이미지 파일 && 스트리밍 서비스를 CloudFlare를 연동하여 만들었습니다.


------

## NEXT

NEXT JS 를 사용하는 이상 가장 NEXT JS가 가지고 있는 장점을 사용해보기 위해 노력했습니다.

### SWR
 
우선 useSWR 을 통한 데이터 패치를 사용해보는 점이었습니다.

![image](https://user-images.githubusercontent.com/87063105/194729348-311eff9b-3313-4081-8d0f-96faed5ba35b.png)
![image](https://user-images.githubusercontent.com/87063105/194732706-be67c084-6bab-4043-b2be-6453ba4d5309.png)


데이터패치를 그대로 불러온 점에 대해서는 약간의 고민이 있었습니다.

현재 동내생활 페이지 내에서는 해당 사용자의 위치를 파악한 후 **동적**으로 데이터를 불러오고 있습니다.

하지만 SSR or SSG 를 포함시킬 수 없는 점을 발견했습니다. 현재 사용자의 위치를 빌드 전 OR 렌더링 전에 파악 할 수 없기 떄문이었습니다.

해당 사유로 기본적인 SWR을 사용한 데이터 패치가 이루어졌습니다.

또한 InfiniteScroll 을 통하여 사용자 경험의 편의성과 개발자의 쿼리낭비를 해결하였습니다.

### SSR

![image](https://user-images.githubusercontent.com/87063105/194729507-691d29ad-d809-47a7-b257-9dea79bc3be2.png)


프로필 페이지의 경우 동적으로 데이터가 움직일 필요가 없다고 판단하였습니다.

SSR을 사용하여 사용자에게 로딩화면을 보여주지 않고 바로 보여줄수 있도록 컨트롤 하였습니다.

### SSG

![image](https://user-images.githubusercontent.com/87063105/194729781-58fa69b3-358d-4fe6-a5df-d8ae9fb351fd.png)

동내질문 디테일 화면입니다.

해당 페이지는 SSG와 SWR을 조합한 페이지로 만들어보았습니다.

해당 동내생활에 대한 데이터 정보는 답변과 궁금해요, 댓글을 제외한 파일들을 정적으로 만들어도 상관이 없다는 판단을 하였습니다.

![image](https://user-images.githubusercontent.com/87063105/194729832-c0acda36-c028-4cd3-ac0b-4d33f1890978.png)

 StaticPath를 통하여 사전 빌드 시 모든 동내생활 질문에 대한 정적 HTML파일을 만들지 않고.
 
 첫 사용자가 클릭하여 요청하였을 때 HTML이 빌드되어 정적 HTML을 만들게 만들었습니다.
 
 하지만 정적 HTML만으로는 이 페이지를 전부 처리할 수 없었기에
 
 SWR을 연동하여 데이터 패치가 가능하도록 설계하였습니다. 해당 내용은 밑에서 적도록하겠습니다.
 
 
 ### SWR BoundMutation
 
 ![screen-recording](https://user-images.githubusercontent.com/87063105/194731161-5ba93bab-84ed-44f9-87db-aec73d97ac01.gif)

BoundMutation을 사용하여 사용자에게 페이크 데이터를 넘겨 즉시 적용된 것 처럼 보이게 하였습니다.

위에있는 gif처럼 즉시 반응 하여 사용자 경험을 좋게 만들었습니다. 또한 채팅 또한 현재 bound mutation이 적용되어있습니다.
 
 
 
 위에 적힌 SSR, SSG, SWR 의 내용은 프로젝트내 여러 곳에서 사용중입니다.

계속해서 업데이트를 할 예정입니다.

NEXT.JS 부분에서는 이러한 부분을 중점으로 어떻게 랜더링 시켜야 하는지에 대한 고민을 하며 작성하였습니다.

-------

## Backend and Styiling

### Prisma , PScale

해당 프로젝트는 서버리스 환경에서 이루어지고있습니다.

그에 상응하는 데이터베이스 Pscale 을 사용하여 mysql-vitess 를 사용하여 NEXT.JS 에 Prisma을 사용하여 적용하였습니다.

![image](https://user-images.githubusercontent.com/87063105/194730279-cde2fdab-0a1f-4343-903a-439286314ae9.png)

Pscale과 Prisma를 연결하여 Query문을 코드로 작성 요청을 하였습니다.

개인적으로 정말 굉장히 편하게 사용하였습니다. Spring Data JPA, QueryDSL을 비교하였을떄

제작하는 시간이 너무나도 짧고 편하였기에 개인 프로젝트에는 계속해서 사용할 생각이 들었습니다.

### CloudFlare

이미지, 스트리밍 업로드에 대한 고민을 하였습니다.

사실은 AWS S3 버킷을 만들어 사용하려고 했었지만 CF에 대한 정보를 알게 되었고

싼 가격과 뛰어난 개발자 경험으로 CF에 흠뻑 빠지게 되었습니다. 

해당 프로젝트에서는 CF를 통한 이미지 업로딩, 불러오기, 라이브 스트리밍 서비스를 처리하고있습니다.

### Tailwind.CSS

CSS 프레임워크입니다. 지금까지는 직접 작성한 CSS OR CSS를 작성한 파일을 styled-components를 사용하여 관리했습니다.

하지만 Tailwind를 사용하여 css작업을 하였을 떄 굉장히 생산성이 뛰어났으며 성능 또한 준수하였습니다.

다만 div가 너무나도 오염되어 이게 무슨 내용인지 알 수가 없을떄가있어 styled-component와 통합하여 사용하는것을 고려해보겠습니다.

![image](https://user-images.githubusercontent.com/87063105/194730475-927b1d48-1977-4ca8-ac31-a34dab09940d.png)


--------


## 가장 어려웠던 점

SWR SSG SSR 작업의 분류가 어려웠고 개념에 대해서 학습하는것에 대해서 정말 어려웠습니다.

어떻게 작성해야 하는지 어느정도의 데이터까지 불러와야 하는지에 대한 판단이 제대로 안섰기 떄문에 고민이 많았습니다.

문제를 해결하기 위해서 공식문서를 보며 데이터 처리방법을 연습하였고 강의를 통하여 SSR SSG 등 사용처에 대한 문제를 해결하고 적용하였습니다.

