# UI UX Planning
UI는 기능명이 아니라 사용자 행동으로 정의한다.

예: Canvas에서 카드 3개 선택 → 우클릭 Save → Side View에 항목 생성 → 원본 Canvas는 유지.

진입점 후보: Command Palette, Ribbon, Context menu, Editor menu, Canvas, Sidebar/View, Settings, Hotkey.

상태: default, hover, selected, focused, disabled, loading, empty, error, success, drag, drop target, conflict.

Obsidian 친화성:
- 기본 테마 변수 우선
- Light/Dark 대응
- 기본 조작을 불필요하게 가로채지 않음
- 단축키 충돌 고려
- Workspace 재배치/패널 resize 고려

복잡한 패널은 책임, 선택 동기화, 최소/최대 크기, resize, collapse, scroll, 선택 유지, 재실행 복원 여부를 정의한다.

사용자 브리핑: 무엇이 바뀌는가 → 버튼/UI 위치 → 사용 순서 → 저장/동기화 결과.
