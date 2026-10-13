# Canvas Mindmap — 검증용 Planning Pack

**상태: 사용자 최종 승인 전 · Codex 실제 구현/테스트 미실행.**

## 시작
1. [전체 HTML 시안](interactive-preview.html)을 브라우저에서 연다. 이 HTML은 도식을 인라인으로 포함한 단일 파일이다.
2. 1~6 Markdown 문서와 각 문서 첫머리의 개요 SVG를 확인한다.
3. 세부 요구사항 128개 각각의 `CM-xxx.svg`와 연결 테스트 42개를 검수한다.
4. `SWAP-01`의 [사용자 확정 좌표 도식](diagrams/SWAP-01_RESOLVED.svg)을 확인한다. **기존 간격 유지가 우선이며 Y좌표는 보정한다.**

## 문서 구조
- `01_PRODUCT_SPEC.md` — 전체 128개 요구사항, 각 전후 SVG 및 테스트 ID
- `02_UI_UX_SPEC.md` — 화면·단축키·팝업 사용 경험, 도식 링크
- `03_DATA_AND_SAFETY.md` — Canvas 원본 데이터 보호, Waypoint/팔레트/설정 구분
- `04_ACCEPTANCE_TESTS.md` — 42개 수용 테스트 및 개별 SVG
- `05_PLANNING_STATE.md` — 확정·재검토·원본 확인·기술 검증 상태
- `06_CODEX_HANDOFF.md` — Codex 개발 전 검증과 Do Not Change
- `diagram-manifest.json` — 요구사항/테스트 ↔ SVG 간 기계 확인 가능한 관계
- `diagrams/` — 총 214개 SVG (128개 요구사항·42개 테스트·37개 검수 사례·6장 개요·SWAP-01 해결 도식)
- `references/` — 제공된 공식 참고 Markdown 8개와 주요 사용자 이미지
- `VERIFICATION_REPORT.md` — 이번 SWAP-01 개정판의 파일·브라우저 검증 결과
- `HANDOFF.md` — Codex 재개용 10개 항목 HANDOFF, `06_CODEX_HANDOFF.md`와 함께 사용
- `SWAP_01_RESOLVED.md` — SWAP-01 사용자 최종 결정 및 정확한 좌표 예시

## 중요한 개정
- Auto Resize 기본 단축키는 **Ctrl+Shift+R**, 사용자 승인 대화에 근거해 반영(구 팩의 '논의됨' 표시 수정).
- Ctrl+Space 편집 모드, Ctrl 유지 생성 Context Menu, 일반/연결 생성의 공통 입력 추가.
- 기존 별도의 숨겨진 부모·자식 데이터는 **없음**.
- 설정 백업에는 Settings만 포함한다.
- 실제 SVG 설명은 비축척 개념도와 특정 숫자 비교 도식으로 구분한다.

## 남은 검증 사항 및 한계
- 최초 최상위 `PROJECT_INSTRUCTIONS.md`가 확보되지 않아 해당 17개 공식 조항과의 직접 대조는 미완료.
- SWAP-01은 **해결/확정**: 크기가 다른 카드의 위치 교환에서 원래 간격 유지 우선. Codex는 이 규칙을 구현하고 실제 환경에서 검증해야 한다.
- 외부 파일 관리자에서의 Canvas 복제 추적, 플러그인 완전 제거 뒤 데이터 보존, 공식 Canvas API/Undo 통합, 편집 관련 연결 출발점 판정 등은 실제 기술 검증 대상.
- HTML 시안은 실제 Obsidian 플러그인 구현이 아니므로 수용 테스트 통과를 뜻하지 않는다.

- `T01~T37`은 실제 사용 시나리오별 추가 전후 도식이 각각 존재합니다. 총 SVG **214개**입니다.
