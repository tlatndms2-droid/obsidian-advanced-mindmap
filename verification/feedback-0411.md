# 0.4.11 정렬 기능 강도 보완

사용자 요청: 단축키 확인, 겹치지 않아도 정렬·간격 정돈, 과도한 이동 억제.

## 변경

- 사방 방향별로 두 개 이상 직접 연결 카드가 있으면 기존 평균 위치 근처에서 중심선을 맞춘다.
- 기존 순서와 카드 크기를 보존하고 빈 간격을 균등화한다. 현재 간격 평균을 사용하되 설정 gap을 상한으로 하고 최소 여백은 min(gap,24px)로 둔다.
- 기준 카드 중심으로 무조건 다시 모으거나 전체 행/열을 바깥으로 밀지 않는다.
- 정돈 후 충돌은 개별 카드의 가까운 빈자리 후보로 해결한다. 장애물이 많으면 정렬선보다 겹침 해소가 우선이며 이동 거리의 절대 상한은 없다.
- Ctrl+Shift+L 기존 명령 유지. 비편집 상태의 물리 KeyL 입력도 처리해 key가 한글 ㅣ인 경우 대응한다.

## 검증

타입 검사·빌드 통과. 다양한 크기/배치 50개에서 충돌 해소 및 고정 카드·원본·연결 보존 통과.
비겹침 3카드 사례에서 중심선 일치·동일 간격·각 이동거리 50px 미만·반복 안정성 확인. 이 수치는 해당 사례 측정이며 모든 배치 보장이 아니다.

Windows Obsidian 1.14.4 격리 Sandbox에서 실제 Ctrl+Shift+L 실행, 비겹침 카드 정렬, 기준/무관 카드 고정, Undo 한 번·Redo 확인. 실제 화면 캡처 확인.
CDP 키 입력 key=ㅣ, code=KeyL, Ctrl+Shift로 동일 정렬 및 한 번의 Undo 확인. Windows IME 전환 자체를 조작한 검사는 아니다.
재시작 후 0.4.11에서 동일 검사 통과. Sandbox 등록 명령 중 같은 단축키 충돌 없음.

scripts/test-arrange.mjs, scripts/feedback0411-runtime.mjs (--restart), scripts/feedback0411-korean-key.mjs.
증거/백업: verification/artifacts/feedback-0411/.
새 검수 Canvas에 Sandbox 열어둠. 사용자 원본 Canvas 변경 및 중간 Release/push 없음.
