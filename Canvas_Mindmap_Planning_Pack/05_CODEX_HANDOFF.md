# 05 — Codex Handoff

## 1. Current Goal
Canvas Mindmap 기획을 원본 Vault 데이터 손상 없이 구현. 세부 UX는 `01_PRODUCT_SPEC.md`를 기준으로 한다.

## 2. Current Version
미확정. 기존 저장소의 manifest 및 릴리즈 기록 확인 후 순차 버전 관리. 임의 버전 선언 금지.

## 3. Completed
기획 단계에서 사용자 요구사항과 주요 사용자 흐름 확정. **코드 구현·테스트 완료를 뜻하지 않음**.

## 4. In Progress
공식 API·단축키·Undo 통합·Canvas 복제/rename/move·플러그인 제거 후 데이터 보존 가능성 검증.

## 5. Decisions
`01_PRODUCT_SPEC.md`, `02_DATA_AND_SAFETY.md`, `04_PLANNING_STATE.md` 참조. 사용자 결정 우선, 미확정은 추측 금지.

## 6. Known Issues
- Obsidian 기본 Canvas의 비공개 구현에 의존해야 하는 기능이 있는지 확인 필요.
- Ctrl+Z와 기본 Obsidian Undo 기록이 동일한 순서로 결합되는지 확인 필요.
- Canvas 복제 시 원본/복사본 노드 식별 관계 보존 가능성 확인 필요.
- Windows 파일 저장 대화상자 및 제거 후 별도 보존 방식 검증 필요.
- `PROJECT_INSTRUCTIONS.md` 및 최초 기획서 전체 미확인.

## 7. Verification
`03_ACCEPTANCE_TESTS.md`의 시나리오별 증거(동작 기록·실제 파일 diff·로그)를 제출. 테스트용 별도 Vault에서 수행. 기존 Canvas 원본을 먼저 백업.

## 8. Next Action
1. 저장소·manifest·현재 버전·기존 기능을 조사한다.
2. 공식 문서와 실제 Obsidian 환경에서 API 지원·단축키 충돌을 검증한다.
3. 기획과 구현 가능성의 차이가 발생하면 임의 우회 설계 전에 차이를 보고한다.
4. 구현 계획과 테스트 계획을 작성하고 개발한다.
5. README, HANDOFF.md, 버전/릴리즈 증거를 동기화한다.

## 9. Do Not Change
- 카드 생성 기본 간격 100px, 수동 크기 조절 20px, 위치 교환 X 허용차 40px
- Alt 탐색 시 Zoom 변경 금지
- 카드/카메라 Waypoint 구분 및 Canvas별 독립 저장
- 설정 백업은 **설정만** 포함
- Undo 작업 묶음/역순/Redo 정책
- 기존 Vault 카드·연결선·적용된 색상 보호
- 사용자 미승인 기능 확장 금지

## 10. Relevant Files
이 Planning Pack의 README, 01~04, references/ 8개 문서. 프로젝트 저장소 및 최초 기획서는 별도 확인.
