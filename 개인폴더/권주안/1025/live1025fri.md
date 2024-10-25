# Docker의 시작

Docker Engine은 5가지 대표적인 특징을 갖고 있습니다.

## 도커의 대표적 특징

1. 가벼움 / 빠름
2. 외부환경 자유로움
3. 안정성
4. 이식성
5. 확장성

5가지 특증을 바탕으로 효율적이고 유연한 컨테이너 환경 제공

##  Container Orchestration

kubernetes
Minikube
Docker Swarm
Docker Compose

어플리케이션 컨테이너의 네트워킹, 프로비저닝, 배포, 관리 간소화 및 자동화

## Docker의 경쟁자

podman

PodMan은 오픈소스로, Docker와 같은 중앙관리 Engine이 없어 자유로움.

## 직접설치 Docker Compose

sudo apt update && sudo apt upgrade
항상 업데이트가 먼저 하고, 그 다음에 그 리스트를 바탕으로 업그레이드를 해야 한다.

curl -fsSL https://get.docker.com -e(?o?) dockerSetter.sh
chmod 711 dockerSetter.sh
./dockerSetter.sh

## 직접 세팅 할때

## 자동화로 단축된 시간

약 3일 -> 1분 20초
36시간에서, 80초
1/1620

## 활용방법 1 - Docker Network

## Docker Network

Bridge, Host, Overlay

### Bridge

Docker Network의 기본 모드로 가장 많이 사용
Bridge를 통하여 Eth0에 통합 관리되는 구조

### Host

Docker Network를 사용하지 않고, 서버의 Network에 직접 접속
각 컨테이너별로 Eth0에 직접 접속

### Overlay

자주 쓰이지는 않지만 알아두면 유용하다.
Overlay Network는 각 Host가 별도 네트워크를 사용하지만, 통합 관리하는 구조

### 오버레이 네트워크 제한사항

동일한 Region(지역정보)
동일한 Account(사용자계정)
동일한 Permission(권한 수준)
최소 3개의 조건이 맞아야 사용가능

### 오버레이 네트워크 확장

Overlay + VPN으로 네트워크 한계 돌파!
(Virtual Private Network)

## 활용방법 2 - Docker file

예를 들면 MySQL
기본적으로 도커 허브에 이미지를 가지고 도커 엔진 위에 MySQL이 돌아간다.

## 프레임워크 프로젝트는?

springboot, python, nodejs 등등
Project를 처음 만들때부터 Docker Image로 Framework 적용하는 방법도 가능

별도의 설치 없이 Docker Engine 내부에서 모두 처리!

## 활용방법 3 - docker-compose.yml

