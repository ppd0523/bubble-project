# 버블 파이낸스

키움증권HTS. 매일 조건식 결과를 제공하는 웹 애플리케이션

<br>

## 서비스 화면
(그림 예정)

<br>

## 프로젝트 구조

* bubble-be: DB 미들웨어. [REST API 서버](https://github.com/ppd0523/bubble-be.git)
* bubble-fe: 서비스 [웹 페이지](https://github.com/ppd0523/bubble-fe.git)
* bubble-app: 키움증권HTS 조건식 결과 등을 저장하는 프로그램(예정)

```bash
$ tree -L 1
.
├── django                 # bubble-be
├── docker-compose.yml
├── frontend               # bubble-fe
├── nginx
├── postgres               # not included. Data binding postgreSQL
└── README.md
```

<br>

## 실행 준비

```yml
# docker-compose.yml

# postgreSQL 비밀번호 환경변수 설정
...
postgresql:
    ...
    environment:
        - POSTGRES_PASSWORD='mypassword'

```

```sh
# DB 설정
$ docker-compose run postgresql  # 컨테이너 bash 접속
```
   
```sh
$ psql -U postgres  # postgresql client 로그인

# 여기서 설정하는 USER, PASSWORD, DATABASE는
# config/settings/base.py의 변수 DATABASE 값이다.
# USER = DATABASE['USER']
# PASSWORD = DATABASE['PASSWORD']
# DATABASE = DATABASE['NAME']

# django에서 접속할 USER/PASSWORD 생성
# example) CREATE USER ppd0523 ENCRYPTED PASSWORD 'hellopass';
> CREATE USER <user> ENCRYPTED PASSWORD '<password>';  
> \du  # user 생성 확인

# django에서 접근하는 DATABASE 생성하기
>> CREATE DATABASE <db> OWNER <user>;  
>> \l  # db 생성 확인

# 설정 후 컨테이너 종료
```

```python
# django/config/settings/key.py

# postgresql 컨테이너에서 설정한 정보를 아래 작성
# django/config/settings/key.py.sample 참고

# django 프로젝트를 생성하면
# <project>/settings.py 에 자동 생성되는 키값
key = '...'

DB_NAME = '<db>'            
DB_USER = '<user>'          
DB_PASSWORD = '<password>'
```

```sh
# nginx에서 django 정적 파일을 서비스 할수 있도록 파일을 복사한다

$ docker-compose run django /bin/bash

$ python manage.py collectstatic
# 실행 후 /usr/src/django/.static_root 폴더 생성

$ python manage.py makemigrations
$ python manage.py makemigrations stock

$ python manage.py migrate
$ python manage.py migrate stock
```

```sh
# django에서 사용할 관리자 계정 생성
$ python manage.py createsuperuser
```

```sh
# https 위한 SSL인증키 생성
# 공개키는 클라이언트가, 개인키는 서버가 사용

$ cd ./nginx/conf.d
$ openssl genrsa 2048 > rsa.key  # 개인키
$ openssl req -new -x509 -nodes -sha256 -days 365 -key rsa.key > rsa.crt  # 공개키
```

<br>

## 실행
```sh
$ docker-compose up -d
```
