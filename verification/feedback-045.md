# 0.4.5 — 선택 카드 연결 해제

2026-10-20 / Windows Obsidian 1.14.4 / 격리 Sandbox.

사용자 요청: Ctrl+Alt+D로 선택 카드의 연결선 전체 해제, 카드 유지, Ctrl+Z로 복원.

- 한국어 명령 `선택한 카드의 연결 모두 해제`, 기본 Ctrl+Alt+D.
- 들어오는 선·나가는 선·같은 두 카드 사이 복수 선을 제거한다.
- 여러 카드 선택 시 선택 카드에 닿는 선 전체를 제거한다.
- 카드 내용·위치·크기·색상과 Waypoint 정보는 유지한다.
- 연결이 없거나 카드 미선택이면 변경하지 않는다.
- 편집/입력 중과 읽기 전용에서는 실행하지 않는다.

## 실제 검증

`scripts/feedback045-runtime.mjs`가 별도 검수 Canvas를 만들고 실제 키보드 입력으로 확인했다.

| 초기 상태·입력 | 기대 결과 / 실제 결과 |
|---|---|
| 연결 4개 중 3개가 선택 카드에 닿음 → Ctrl+Alt+D | 해당 3개 제거, 무관한 1개 유지 / 통과 |
| 카드 내용·좌표·크기·색상·Waypoint 비교 | 전후 동일 / 통과 |
| 연결 없는 상태에서 다시 Ctrl+Alt+D 후 Ctrl+Z | 불필요한 Undo 단계 없이 기존 연결 전체 복원 / 통과 |
| Ctrl+Shift+Z | 같은 연결 다시 해제 / 통과 |
| 두 카드 선택 후 Ctrl+Alt+D | 선택 카드들의 연결 전체 제거, 카드 유지 / 통과 |
| 선택 해제 후 Ctrl+Alt+D | 변경 없음 / 통과 |
| Sandbox 재시작 후 동일 검사 | 0.4.5 로드 및 동일 결과 / 통과 |

복원 시 Obsidian 내부 연결 배열 순서는 달라질 수 있으므로 ID로 정렬해 각 연결의 속성 일치를 비교했다. 화면에서 복원된 연결과 선택 카드도 확인했다. 타입 검사·빌드 통과, 검사 중 pageerror 없음.

증거: `verification/artifacts/feedback-045/`의 runtime.json, restart.json, before.png, disconnected.png, restored.png. 원래 열려 있던 Canvas 및 설정 백업은 같은 폴더에 보존했다. 테스트는 새 Canvas에서 진행했으며 연결을 복원하고 대상 카드를 선택한 상태로 Sandbox를 열어 두었다.

이번 기능의 검증이며 전체 제품 수용 테스트 또는 다른 Obsidian 버전 검증은 아니다. 중간 Release·push 없음.
