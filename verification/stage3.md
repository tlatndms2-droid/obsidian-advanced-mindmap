# 3단계 — Alt 탐색·Waypoint

2026-10-14 / 개발 빌드 0.3.0 / Windows, Obsidian 1.14.4. CM-051~083 구현 및 아래 실제 Sandbox 검사 통과. 전체 제품·43개 수용 테스트·배포 완료를 뜻하지 않는다.

## 실행 및 결과

| 초기 상태·입력 | 기대 결과와 실제 결과 | 판정 |
|---|---|---|
| 단일 카드, Alt 네 방향 | 가장자리 최단거리 카드 선택·중앙 배치·Zoom 유지. 가까운 Group 제외, 연결 없는 카드 이동 | 통과 |
| 외곽 거리와 중심 거리가 다른 후보 / 동거리 후보 | 가장자리 거리 우선, 동률은 방향 중심선에 가까운 카드 | 통과 |
| Alt 키 유지 / 이동 중 다시 누름 / 후보 없음 | 단발 탐색 / 기존 이동 중단·다음 카드 이동 / 무동작 | 통과 |
| 다중 선택 또는 글 편집 중 Alt 방향키 | 탐색 차단 | 통과 |
| Ctrl+숫자패드 1, 같은 카드 재입력, 다른 카드 덮어쓰기 | 등록·배지 / 등록만 해제 / 새 카드와 새 이름. Undo/Redo로 이전 등록·이름 복원 | 통과 |
| 첫 줄·빈 카드·Markdown 파일 카드 | 첫 줄 / 카드 N / 파일명. 이후 글 변경은 등록 이름 유지 | 통과 |
| 사용자 지정 이름 덮어쓰기 후 Undo | 이전 사용자 이름 복원. 이름 데이터 처리와 Undo 검사이며 이름 편집 UI 검사는 4단계 | 통과 |
| 카드 이동 후 숫자패드 호출 | 이동한 현재 카드 중앙·선택, 호출 전 Zoom 유지 | 통과 |
| 선택 없이 Ctrl+Shift+숫자패드, 이후 호출 | 당시 카메라 위치와 Zoom 저장·복원. 카드 번호와 공유 | 통과 |
| 등록 카드 삭제, Undo/Redo | 등록 해제 / 카드·등록·이름 복원 / 다시 해제 | 통과 |
| 같은 카드 번호 두 개·Zoom 변경 | 번호 함께 표시, 카드 왼쪽 위 위치와 22px 높이 유지. 다른 카드 배지는 자동 재배치 없음 | 통과 |
| 서로 다른 Canvas 같은 번호 | 각각 독립 등록 | 통과 |
| Windows 파일 복사 / Obsidian 내부 복사 | 등록 복제, 복사본 변경이 원본에 영향을 주지 않음 | 통과 |
| 내부·외부 파일 이름 변경과 폴더 이동 | 등록 유지 및 이동 후 호출 | 통과 |
| 플러그인 비활성화·활성화 | Canvas에 저장된 Waypoint 보존 | 통과 |
| 같은 Sandbox 프로필 재시작 | 버전·설정·Canvas 일치, 실제 카드·카메라 호출 성공 | 통과 |

Pan duration 기본 250ms, 설정에서 0ms 변경 후 즉시 이동 검사 및 250ms 복원. 숫자패드 1~9 모두 카메라 등록 검사. 숫자열 키는 Waypoint 등록 입력으로 취급하지 않는다.

## 기존 기능 결합 검사

Ctrl 500ms 메뉴, Tab 500ms 출발점 메뉴 및 짧은 Tab 생성, 방향 생성과 한 번 Undo, 카드 교환, 길게 누른 크기 조절 Undo, Ctrl+Space 편집·가로세로 Auto Resize·글을 보존하는 Undo 검사 통과. Waypoint 정보가 이 작업 중에도 보존됨.

Obsidian 기본 단축키가 숫자패드 일부 입력을 먼저 소비하던 문제를 창 캡처 단계의 입력 처리로 수정했다. 연결선 속성의 순서만 달라진 동일 상태가 Undo에 중복 등록되던 문제는 순서와 무관한 동일 상태 비교로 수정했다.

## 증거와 보호

- scripts/stage3-runtime.mjs → artifacts/stage3/runtime.json 및 restart.json
- scripts/stage3-extra.mjs → artifacts/stage3/extra.json
- scripts/stage3-combination.mjs → artifacts/stage3/combination.json
- 화면: badge.png, settings.png, restart.png, user-review.png
- 작업 전 Canvas·설정·workspace 해시 백업: artifacts/stage3/backup-*

기존 사용자 Canvas와 생성 크기500×100·설정을 보존했다. Waypoint는 Canvas의 별도 canvasMindmap 전용 영역에 저장하며 카드·연결선 필드에 계층 정보를 추가하지 않는다. 로컬 카드 ID로 참조하므로 파일 복사본의 해당 카드로 호출된다. 전체 Vault에는 설치하지 않았다. 새 Sandbox 시험 파일과 사용자 확인 파일만 만들었다.

타입 검사·빌드·기존 생성 배치 검사7개 통과. 최종 실행의 pageerror 없음. 중간 결합 검사의 파일 객체 반환 오류는 검사 코드에서 반환을 제거해 해결한 뒤 다시 실행했다.

## 이번 단계 이후 항목

관리창·인라인 이름 편집 UI·팔레트는 4단계다. Markdown·이미지·Canvas 파일 카드 이름과 이미지 카드 호출도 실제 검사했다(file-cards.json). 제거·재설치 전체 절차, 다른 테마, 대량 Canvas와 전체 결합 검증은 이후 단계에 남아 있다. 이 항목들을 이번 검사로 통과 처리하지 않는다. 중간 Release 없음.

사용자 요청으로 복수 선택 일괄 Auto Resize는 제외됐다(CM-050 ID는 기록용으로 유지). 기존 개별 카드 편집 종료 Auto Resize는 유지한다.
