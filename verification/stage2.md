> 2026-10-14 정정: 아래 0.2.0 너비 유지 동작은 0.2.1에서 가로·세로 내용 맞춤으로 수정됨. 새 검증: artifacts/autoresize-both/result.json 및 restart.json. 이전 결과는 역사적 기록임.

# 2단계 — 교환·크기·Auto Resize

2026-10-14. 개발 빌드 0.2.0 / Windows / Obsidian 1.14.4. 격리 Sandbox 설치 및 같은 프로필 재시작 검사 통과. 전체 제품 완료나 Release 검증을 의미하지 않는다.

## 실제 검사 결과

- Ctrl+Alt+아래: 서로 다른 크기의 카드 교환, SWAP-01 간격·크기·연결 유지, 제3 카드 좌표 유지 및 겹침 허용. Undo/Redo 통과.
- X 차이 45px인 후보는 허용차 40px에서 제외.
- Ctrl+Shift+방향키: 크기 조절, 좌상단 유지, 반복 입력 전체를 한 번에 Undo/Redo. Obsidian 최소 크기 50px 적용 확인. 다중 선택에서는 교환·크기 조절 미실행.
- 설정 화면에서 조절량 25px·교환 허용차 60px 입력 후 실제 조절 적용 확인. 시험 후 20px·40px 복원.
- Auto Resize ON 전환만으로 기존 카드 크기는 바뀌지 않음. OFF일 때 편집 종료해도 크기 유지.
- ON일 때 편집 중에는 크기 유지, 편집 종료 후 현재 너비를 유지하며 높이를 맞춤. 긴 한글 12문단에서 너비 240px·높이 802px, 본문 clientHeight/scrollHeight 모두 800px 확인.
- 짧은 내용으로 바꾸면 높이 축소. 주변 카드 이동 없음. Undo는 글을 유지하고 크기만 복원하며 ON 상태 유지. 다음 편집 종료 시 재적용.
- Ctrl+Space와 바깥 클릭으로 편집 종료하는 경우 검사. 두 카드를 각각 편집 종료해 독립적으로 맞추는 경우 검사.
- 앱 재시작 후 버전·설정·Canvas 동일성, 실제 크기 조절 및 Undo 확인.
- 타입 검사 및 기존 생성·배치 단위 검사 7개 통과. 실행 중 pageerror 없음.

## 근거

- scripts/stage2-runtime.mjs → artifacts/stage2/runtime.json
- scripts/stage2-extra.mjs → artifacts/stage2/extra.json, restart.json
- 화면: artifacts/stage2/swap.png, autoresize-long.png, settings.png, ready-for-user.png
- settings.png의 25/60은 설정 적용 시험 중 값이며 최종 값은 20/40이다.

## 보존 및 남은 범위

사용자 기존 Canvas와 생성 크기 설정 500×100을 보존했다. 작업 전 백업은 artifacts/stage2/backup-*에 있다. Stage2-check.canvas만 시험 자료로 사용했다. 현재 Auto Resize는 ON이며 Sandbox는 열린 상태다.

CM-050은 카드별 편집 종료 적용을 검사했다. 동시 다중 선택 일괄 Auto Resize 입력은 새로 만들지 않았으며 해당 실행 방식은 검증 완료로 표시하지 않는다. 외부 이미지·임베드의 지연 로딩, 다른 테마, 전체 수용 테스트 및 기능 결합 검사는 이번 결과에 포함하지 않는다. 승인 설정 시안의 나머지 항목은 해당 개발 단계에서 구현한다.

3단계 Alt 탐색·Waypoint와 배포는 시작하지 않았다. 사용자 직접 사용 검수는 대기 중이다.
