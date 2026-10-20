> 아래 본문은 원본 팩의 과거 검증 보고서 보존본입니다. 개정본의 현재 검사 결과는 ../../verification/planning-revision.md를 따릅니다.

# Canvas Mindmap — SWAP-01 해결 반영 검증 보고서

검수 대상: `Canvas_Mindmap_Planning_Pack_SWAP01_RESOLVED`, 6개 Markdown, `HANDOFF.md`, SVG 214개, 단일 HTML 시안.  
**상태: 사용자 결정 확정 / 기획서 개정 및 HTML 브라우저 검증 통과 / 실제 Obsidian 구현 검증 전.**

## 1. SWAP-01 사용자 최종 결정 반영

- 사용자 최종 결정: **크기가 다른 카드의 위치를 교환할 때 기존 간격 유지 우선, 필요한 만큼 Y좌표 보정**.
- 위치 교환은 `Ctrl+Alt+↑/↓`, 단일 카드 선택만 지원.
- 후보 X좌표 차 허용값 기본 40px. X는 두 카드가 서로 교환하며, Y는 순서와 간격을 기준으로 재계산.
- 크기·카드 내용·연결선 대상·선택 상태 유지, Undo 1회로 복원.

### 검증 좌표 예시 (Canvas px)

| 상태 | E | C | 계산한 빈 공간 |
|---|---|---|---|
| 교환 전 | X100, Y100, 높이80 | X120, Y280, 높이160 | 280 − (100+80) = **100px** |
| 교환 후 | X120, Y360, 높이80 | X100, Y100, 높이160 | 360 − (100+160) = **100px** |

원래 Y좌표를 무조건 맞바꾸어 간격을 20px로 축소하는 방식은 **채택되지 않음**.

### 수정 위치

- 기능 명세: `01_PRODUCT_SPEC.md` — CM-024, CM-025, SWAP-01 절
- UI/UX: `02_UI_UX_SPEC.md` — CM-024/025
- 수용 테스트: `04_ACCEPTANCE_TESTS.md` — T06, T38 (미실행)
- 결정 상태: `05_PLANNING_STATE.md` — 확정 122 / 재검토 1 / 기술 검증 4 / 원본 검토 1
- 인계: `06_CODEX_HANDOFF.md`, `HANDOFF.md`
- 결정서: `SWAP_01_RESOLVED.md`
- SVG: `SWAP-01_RESOLVED.svg`, `CM-024.svg`, `CM-025.svg`, `T06.svg`, `T38.svg`, `CASE-T06.svg`, `DOC-05_OVERVIEW.svg`
- `diagram-manifest.json` 및 모든 해당 HTML 인라인 SVG

## 2. 정적 검증 결과

| 검증 | 관찰 결과 |
|---|---|
| SVG XML 파일·viewBox 검사 | **214개 유효** |
| 요구사항 ID·상태·SVG 연결 | **128개**, 상태 122/1/4/1 일치 |
| 수용 테스트 ID·요구사항 참조 | **42개**, 연결 무결성 통과 |
| 1~6 MD의 SVG 링크 | 깨진 링크 **0개** |
| HTML 내 SVG | 독립 SVG 214개 + 시안 SVG 1개 = **215개** |
| HTML 외부 이미지/CSS/JS 의존성 | **없음** |
| 이전 SWAP-01 미확정 문구·파일 링크 | 해당 수정 범위에서 제거 |

## 3. 실제 Chromium 검증 결과

개정 `interactive-preview.html`을 Chromium headless의 `page.set_content()`로 실행·검사했다. 브라우저 렌더링/JavaScript 시뮬레이션 검증이며 GitHub Pages 배포·Obsidian 실제 플러그인 검증은 아니다.

| 검증 항목 | 결과 |
|---|---|
| DOM 요구사항 128 / 수용 테스트 42 / SVG 215 | 통과 |
| 초기 전체 요구사항 노출 | 128건 |
| Waypoint 검색 | 40건 |
| `CM-024` 검색 | 1건 |
| 검색 결과 없음 | 0건 |
| 위치 교환 장 필터 | 8건 |
| 재검토 상태 필터 | 1건 (CM-011) |
| CM-024/CM-025 상태 표기 | 모두 **확정** |
| 위치 교환 전후 X | E 260→280, C 280→260 (화면 시뮬레이션 좌표) |
| 위치 교환 전후 Y | E 20→280, C 200→20 (화면 시뮬레이션 좌표) |
| 시뮬레이션 카드 높이 | E 80, C 160 유지 |
| 시뮬레이션 카드 간격 | **100→100px 유지** |
| 교환 후 E 선택 유지 | 통과 |
| 교환 Undo 1회 | 두 카드 위치 모두 복원 |
| 생성·생성 Undo · Tab · 탐색 | 회귀 검사 통과 |
| Waypoint Manager / 색상 팔레트 열기 | 회귀 검사 통과 |
| SVG 브라우저 도식 viewBox 바깥 넘침 | 0개 |
| JavaScript 실행 오류 | 0건 |
| 외부 HTTP 요청 | 0건 |
| 620px 화면 가로 넘침 | 없음 |

원시 관찰 결과는 `evidence/machine-checks.json`에 있다. 이전 패키지의 실행 결과는 `evidence/machine-checks-before-swap01.json`에 별도 보관한다.

## 4. 검수 화면 증거

- `evidence/01_overview_desktop.png` — 갱신된 122개 확정 표시
- `evidence/02_swap_conflict.png` — 이름만 유지한 스크린샷 파일이며 **실제 내용은 SWAP-01 해결 후 도식**
- `evidence/05_swap_demo.png` — 높이가 서로 다른 카드의 인터랙티브 위치 교환 시안
- `evidence/06_req_cm024.png` / `07_req_cm025.png` — 요구사항별 전후 도식
- `evidence/03_waypoint_manager.png` / `04_mobile_overview.png` — 팝업과 소형 화면 시안

## 5. 여전히 미검증인 사항

- 실제 Obsidian Canvas API 및 Undo/Redo 연동, Vault 데이터 보호, 대량 카드/연결선 성능
- CM-011(Tab 연결 출발점) 원본 기획과의 정합성
- CM-050, CM-116, CM-120, CM-125 기술 검증, CM-126 원본 세부 명세 검토
- 최상위 `PROJECT_INSTRUCTIONS.md` 원문 부재로 그 파일의 17개 항목과의 직접 대조

**이 보고서는 기획서·도식·HTML 정합성 검증이며 플러그인 구현 완료 판정이 아니다.**


## 2026-10-13 개정 상태

원본 planning/current 및 ZIP은 보존했다. 현재 검수 기준은 planning/revised. 원래 128개 요구사항·214개 SVG 파일명을 유지하고 T43 파일 전환 테스트와 SVG를 추가했다(43개 테스트·215개 SVG). 사용자 확정 생성 규칙은 CM-001과 DECISIONS.md에 반영했다. CM-011 기본 A–E는 원본 이미지로 확인됐지만 예외는 미확정이다. 모든 수용 테스트는 제품 미실행이며 기존 브라우저 검증 기록은 원본 버전의 기록이다. 개정본 검사 결과는 verification/planning-revision.md를 확인한다.
