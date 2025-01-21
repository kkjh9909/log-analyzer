# <img width="50" alt="quotivation_logo (1)" src="https://github.com/user-attachments/assets/d6327e1e-b277-4313-9152-16fad4be916d"> Log-analyzer
 
Log-analyzer

[https://quotivation.kr](https://quotivation.kr) 사이트 주소  
[https://api.quotivation.kr/api/quote](https://api.quotivation.kr/api/quote) API 함수 주소  
[https://github.com/kkjh9909/quotivation](https://github.com/kkjh9909/quotivation) Quotivation 프로젝트  

![Image](https://github.com/user-attachments/assets/75be9b81-6808-417e-92c0-3e41e76ee7af)

## 🛠️ 프로젝트 스택

- React 18 / JavaScript
- recharts

## 🚀 설치 및 실행 방법

### 1. 사전 요구사항
* Node.js 16.x 버전 이상
* MongoDB 설치 or MongoDB Atlas
* Docker 설치(선택사항)

### 2. 레포지토리 클론
```bash
git clone https://github.com/kkjh9909/log-analyzer.git
cd log-analyzer
```

### 3. 환경 설정
* .env 파일의 MongoDB Server Port 번호만 수정:
```bash
REACT_APP_SERVER_URL={SERVER_URL}
```

### 4. 빌드 및 실행
* 로컬 환경에서 실행:
```javascript
npm start
```

* Docker를 사용한 배포:
```bash
docker-compose up -d 
```

### 5. 접속
* 브라우저에서 http://localhost:3000로 접속.

## 🌟 주요 기능
* 실제 서버 쪽에서 발생한 로그 추적 기능
* 서버 쪽 발생한 로그 관련 검색 및 분석

## 📂 파일 구조도
```bash
log-analyzer
├── src
    ├─components
    │  ├─LogChart,js
    │  ├─LogTable.js
    │  │
    ├─pages
    │  ├─Dashboard.js
    │
    ├─app.js
    └─index.js
```

## 📄 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](https://github.com/kkjh9909/log-analyzer/blob/main/LICENSE) 파일을 참조하세요.