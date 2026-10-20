# 최신 진행 — 3단계 0.3.0 (2026-10-14)

사용자 요청으로 Alt 탐색·Waypoint CM-051~083 구현. verification/stage3.md 및 artifacts/stage3의 runtime/extra/combination/restart/file-cards.json 참고. 최종 빌드 설치·실제 입력·같은 프로필 재시작 확인 통과. 전체 제품·배포 완료 아님. 다음 4단계는 사용자 진행 요청 후. 관리창·이름 편집 UI·팔레트는 아직 구현하지 않았다.

Sandbox를 열어 둔다. 기존 Vault/Profile/port9267 사용, 최종 PID10340 및 target44D7C95F3716633665C0901F9914B1B5 (다음 작업 전 재확인). Stage3-사용자확인.canvas 열림. Project Plan은 카드 Waypoint1, 숫자2는 카메라 위치·Zoom. 확인 안내는 3단계 확인 안내.md. 사용자의 기존 Canvas와 설정500×100 보존, 새 시험 파일만 수정. Stage3 테스트 스크립트는 이후 사용자 확인 파일을 덮어쓰지 않도록 재실행 시 보호한다.

Waypoint는 Canvas의 별도 canvasMindmap 전용 영역에 저장. 카드/연결선 필드는 보존하고 기본 Undo 스냅샷에 전용 영역이 함께 들어간다. Windows 파일 복제·이동·이름 변경과 내부 복제·이동 확인, 복사본은 독립 등록. 설치 폴더에만 저장하지 않는다. 제거·재설치 전체 시험은 이후 단계.

입력 처리는 iframe 포함 창 캡처 단계에서 확정 단축키를 먼저 처리한다. 같은 상태의 필드 순서 차이가 Undo 중복을 만들지 않도록 비교를 정정했다. 기존 생성·크기·Auto Resize 및 Ctrl/Tab500ms 메뉴 결합 검사 통과.

복수 선택 일괄 Auto Resize(CM-050)는 사용자 요청으로 제외. 코드로 추가하지 않았고 더 이상 2단계 선행 항목이 아니다. 개별 카드 편집 종료 가로·세로 조절 유지. 중간 Release 금지 유지.

아래는 이전 단계 기록이다.

# 최신 수정 — Auto Resize 가로·세로 (0.2.1)

2026-10-14 사용자 정정으로 너비 유지 제한을 제거했다. 편집 종료 시 렌더링된 내용의 가로·세로 크기에 맞추고 명시적 줄바꿈을 반영한다. 별도 최대 폭은 추가하지 않았다. 편집 중 미조절, 좌상단 고정, 주변 카드 미이동, 텍스트 유지 Undo/Redo 보존. 이전 0.2.0 너비 유지 설명은 폐기된 동작이다.

Sandbox 0.2.1 설치·실제 입력·재시작 후 재검사 통과. PID11268/port9267 (재사용 전 확인). AutoResize-both-1791971103232.canvas 열림, Auto Resize ON. 기존 사용자 Canvas 백업·보존. 근거: verification/artifacts/autoresize-both/result.json 및 restart.json, scripts/check-autoresize-both.mjs. 짧은 글100×50, 긴 글+3문단1541×145. 최종 카드 스크롤 잘림 없음. 타입 검사 통과. 외부 임베드의 비동기 로딩 미검증. 중간 Release 금지 유지.

# 최신 진행 — 2단계 (2026-10-14)

사용자의 2단계 진행 요청에 따라 교환·수동 크기·Auto Resize를 구현했다. 개발 빌드 0.2.0. 실제 Sandbox 기능 검사 및 동일 프로필 재시작 검사 통과. 세부 범위와 미검증 항목은 verification/stage2.md. CM-050은 카드별 편집 종료 적용만 검사했으며 동시 일괄 실행은 추가하지 않았다. 전체 제품 완료 아님. 사용자 직접 검수 대기, 3단계 및 중간 Release 시작하지 않음.

Sandbox는 열어 둔다. Vault/Profile/port는 아래와 동일, 마지막 PID25152 및 target DA581B3CE147238C27B648DBFFAC758C (다음 사용 전 확인). Stage2-check.canvas가 열려 있다. Auto Resize ON, resizeStep20, swapTolerance40. 사용자의 생성 크기500×100과 기존 Canvas를 보존했다. 2단계 확인 안내.md 참고.

검증 스크립트는 Stage2-check만 시험 대상으로 사용한다. 사용자 확인 이후에는 해당 파일도 사용자 변경을 보호해야 한다. 과거 stage1-runtime을 재실행하여 사용자 Canvas를 덮어쓰지 않는다. Ctrl/Tab 메뉴는500ms 유지. 생성 카메라 이동이나 Alt 탐색은 이번 단계에서 추가하지 않았다.

아래는 과거 단계 기록이다.
# 최신 수정 — 길게 누르기 메뉴

2026-10-14 사용자 요청: Ctrl 메뉴 미표시 수정, Ctrl/Tab 모두 500ms로 변경. 개발 빌드0.1.2. Control repeat keydown이 타이머를 취소하던 문제를 재현하고 반복 입력을 무시하도록 수정했다. Sandbox 설치/재시작 검증 통과, 열린 상태. 현재 PID16632/port9267(재사용 시 확인). Hold-menu-check.canvas에 확인 카드. 기존 사용자 Canvas 백업 및 보존. 중간 Release 금지 유지.
검증: verification/hold-menu-fix.md. 기존 문서의 1초 기준은 이 사용자 정정으로 대체한다.

# 최신 진행 상태 — 2026-10-14

사용자 다음 진행 요청에 따라 1단계 생성·배치를 구현하고 검증했다. 개발 빌드 0.1.1, CM-001~022 구현. 결과는 verification/stage1.md. 전체 제품 완료 아님. 다음 2단계는 사용자 요청 후 진행한다. 중간 Release 금지.

Sandbox를 닫지 말 것: 사용자가 밖에 있어 나중에 직접 확인한다고 요청했다. 시험 카드·설정 보존.
- Vault: C:/Users/tlatn/AppData/Local/CanvasMindmap-Stage1-20261014/Canvas-Mindmap-Sandbox
- Profile: C:/Users/tlatn/AppData/Local/CanvasMindmap-Stage1-20261014/profile
- CDP: 9267, 마지막 PID 38808. 재사용 시 대상 재확인. Obsidian 1.14.4/plugin 0.1.1.
- Stage1.canvas, Stage1-다른Canvas.canvas, 사용자 확인 안내.md.
- scripts/stage1-runtime.mjs는 시험 전 백업 후 fixture를 수정한다. 이후 사용자 변경이 있으면 재실행 전 보호한다.

아래는 0단계 당시 기록이며 현재 진행 범위는 위 내용을 우선한다.

# Canvas Mindmap — 현재 인계

## 현재 목표와 단계
2026-10-14 승인 계획 실행 중. 이번 범위는 0단계 개발 기준 고정이다. 0단계 결과 보고 후 다음 단계 진행 요청을 받는다. 제품 구현·빌드·Sandbox 시험·Release는 이번 단계에 포함하지 않는다.

## 기준 문서
- DEVELOPMENT_PLAN.md: 최신 승인 단계별 계획, 완료 조건·비용·중단 기준.
- planning/revised/DEVELOPMENT_BASELINE.md 및 01_PRODUCT_SPEC.md: 최신 확정 동작.
- planning/revised/APPROVED_UI.md: 승인 화면 11개와 적용 범위.
- planning/revised/04_ACCEPTANCE_TESTS.md 및 BASELINE 추가 사례: 수용 기준.

## 구현 상태
제품 코드 src/main.ts는 0단계 기반이다. 제품 기능 0/128, 제품 테스트 0/43. 승인 이미지와 문서 검사는 제품 검증이 아니다.

## 다음 단계
사용자가 1단계 진행을 요청하면 생성·배치 범위를 구현한다. 확정 UX와 승인 디자인은 다시 선택하도록 요청하지 않는다. 실제 제약이 나오면 해당 근거만 보고한다.

## 보호
원본 ZIP·planning/current·사용자 Vault·기존 변경 보존. 과거 HTML/SVG는 참고 자료이며 최신 동작과 디자인을 대체하지 않는다. 중간 Release 금지.

## 과거 기술 증거
verification/stage0.md 및 evidence/handoff-before-2026-10-14.md(개정본 내부) 참고. Sandbox 포트·PID는 과거값이므로 다음 실제 시험 때 재확인한다. 이번 단계에서는 앱을 실행하거나 조작하지 않았다.
