# 베이스 이미지로 Node.js 20 버전 사용
FROM node:20-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 실행 단계
FROM node:20-alpine

WORKDIR /app

# 빌드된 파일과 필요한 파일들만 복사
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# 프로덕션 의존성만 설치
RUN npm ci --only=production

# 3000 포트 열기
EXPOSE 3000

# Next.js 애플리케이션 실행
CMD ["npm", "start"]
