# Compatibility Policy Release
Node.js/Electron API는 Desktop 환경 의존성이 있으므로 사용 시 Desktop-only 요구를 확인한다. Mobile 지원 여부와 플랫폼별 기능 차이를 기획에서 명시한다.

네트워크 기능은 서비스, 목적, 전송 데이터, 실패 동작을 명시한다. 공식 Community 정책상 네트워크 사용 등 공개가 필요한 항목은 README에 반영한다.

공식 정책의 대표 주의점: 목적 은폐용 난독화 금지, client-side telemetry 금지, 플러그인의 자체 설치/업데이트 금지, LICENSE 요구. 정책은 배포 직전 공식 문서로 다시 확인한다.

Community 배포의 핵심:
- Semantic Versioning `x.y.z`
- manifest version과 GitHub Release tag 일치
- Release assets: main.js, manifest.json, 필요 시 styles.css
- README, LICENSE 준비

프로젝트 버전은 순차 증가한다. 예: 0.1.0 → 0.1.1 → 0.1.2.

릴리즈 검증: Build → 테스트 → manifest/version → commit → tag/release → release assets 확인.
BRAT 사용 시 repository, target, tag/release와 실제 설치 빌드를 확인한다.
