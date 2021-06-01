# 버블 파이낸스 루트 프로젝트

키움증권HTS의 조건식을 웹사이트로 제공하는 프로그램


## 서비스 화면
(그림 예정)

### 프로젝트 구성
* bubble-be: DB의 정보를 제공하는 [REST API 서버](https://github.com/ppd0523/bubble-be.git)
* bubble-fe: DB정보를 시각화하는 [웹 페이지](https://github.com/ppd0523/bubble-fe.git)
* bubble-app: 키움증권HTS의 조건식과 결과 얻어 DB에 저장하는 프로그램(예정)

*워킹트리에서 실제 파일명과 github project의 파일명이 다릅니다.*
```bash
$ tree -L 1
.
├── django                 # bubble-be
├── docker-compose.yml
├── html                   # bubble-fe
├── nginx                  # nginx setting
├── postgres               # not included. Data binding postgreSQL
└── README.md
```
