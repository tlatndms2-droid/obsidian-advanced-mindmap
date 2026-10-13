# Canvas Mindmap — 현재 작업 인계

## 1. Current Goal
새 팩으로 단계별 플러그인 개발. 해당 UI를 검수받은 뒤 기능 코드를 구현한다.

## 2. Current Version
개발 기반 0.1.0, 구현 단계 0. 제품 기능 구현·Release 전. 현재 실제 Sandbox 앱 표시 버전 1.14.4.

## 3. Completed
프로젝트 구성, 새 팩 251개 파일 보존, 128개 요구사항·42개 테스트·214개 SVG 참조 확인. 실제 Canvas Undo/Redo·iframe 편집 종료·크기만 Undo·제거/재설치 보존 후보·별도 앱 재시작 시험. 상세 결과: verification/stage0.md.

## 4. In Progress
1단계 미확정 사항과 생성 메뉴 UI 검수 준비. 아직 1단계 제품 기능 코드를 작성하지 않았다.

## 5. Decisions
새 팩만 제품 기준. UX는 팩을 따르고 UI는 단계별로 단순하고 세련되게 검수받는다. SWAP-01의 기존 간격 보존은 확정. 현재 HTML 외형은 최종 승인 전.

## 6. Known Issues
Canvas 내부 API 의존성·버전 호환 확인 필요. 메뉴 확정/닫기·모드 유지·기본 카드 크기 미지정. CM-011/050/116/120/125/126은 명세의 상태와 제한을 유지한다. 0단계 네이티브 시험이 제품 구현 검증을 대신하지 않는다.

## 7. Verification
제품 기능 0/128, 수용 테스트 0/42. 기반 빌드·타입·팩 검증 및 실제 Sandbox 기술 시험 통과. 원본 ZIP SHA-256: 56b1fa078be77a534ca77294577d7968a1f5773cd4653e0dadf785f04550b0be.

## 8. Next Action
1단계 미확정 사항을 실제 예시로 하나씩 해결하고 생성 메뉴 UI를 검수받는다. 그 전에는 제품 생성 단축키·메뉴 기능을 구현하지 않는다.

## 9. Do Not Change
원본 Vault·원본 ZIP·기존 HTML·확정 UX 보호. 숨겨진 계층/추가 단축키 금지. 전체 필수 검증 전 Release 금지. 0단계 시험 저장 경로와 크기는 제품 기본값으로 사용하지 않는다.

## 10. Relevant Files and Sandbox
- planning/current/: 원본 새 팩의 보존본
- DEVELOPMENT_PLAN.md: 승인된 개발 순서
- canvas-mindmap-uiux-spec.html: 기존 15개 UI 검수 문서
- verification/stage0.md, verification/implementation-status.json
- Sandbox: C:\Users\tlatn\AppData\Local\CanvasMindmap-Stage0-20261013\Canvas-Mindmap-Sandbox
- Profile: C:\Users\tlatn\AppData\Local\CanvasMindmap-Stage0-20261013\Profile
- CDP: 127.0.0.1:9257, 마지막 실행 PID 10008. 이후 접속 시 실제 Sandbox 제목·Vault 경로를 확인하고 새 대상을 조회할 것.
- Backups: C:\Users\tlatn\AppData\Local\CanvasMindmap-Stage0-20261013\Backups

Sandbox와 현재 시험 상태를 유지했다. 사용자 요청 없이 종료·원상 복구하지 않는다.
