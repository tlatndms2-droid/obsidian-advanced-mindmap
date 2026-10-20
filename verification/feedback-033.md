# 0.3.3 편집 확대 검증

사용자 확정: 편집 시작 시 최소100% 확대, 이미 더 확대돼 있으면 그대로 유지. 카드 분량·크기는 배율 계산에서 제외. 기존 세로 줄 따라가기·Ctrl+Space 종료 시 원래 배율 복원 유지.

Windows / Obsidian1.14.4 격리 Sandbox에서 실제 Ctrl+Space 입력으로 검사했다.

| 진입 전 | 편집 중 기대·실제 | 종료 후 기대·실제 |
|---|---|---|
| 50% | 100% | 50% |
| 100% | 100% | 100% |
| 150% | 150% | 150% |

각 경우를 높이100의 짧은 카드와 높이2200의 긴 카드, Follow editing line ON/OFF 조합으로 검사했다(12개 조합). 같은 줄 입력 시 화면 목표 유지, 다음 줄 입력 시 가로 위치·100% 배율 유지 및 세로 따라가기 통과. 재시작 후 같은 검사 통과, 로드 버전0.3.3 확인. pageerror 없음.

타입 검사·빌드 통과. 기존 사용자 Canvas·설정 보존 및 원래 Canvas 다시 열기 확인. Release는 중간 배포 금지 기준에 따라 수행하지 않았다.

증거: 로컬 verification/artifacts/feedback-033/runtime.json, restart-tests.json, restart.json 및 editing PNG. 이전 feedback-032의 Shift+2 배율 일치 검사는 이번 사용자 정정으로 대체한다.
