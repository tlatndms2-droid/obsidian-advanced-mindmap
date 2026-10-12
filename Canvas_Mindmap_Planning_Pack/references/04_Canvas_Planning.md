# Canvas Plugin Planning
Canvas 기능은 `Canvas 입력 → 내부 표현 → 사용자 조작 → Canvas 반영`으로 나눈다.

입력 후보: 현재 Canvas, selected nodes/edges, group, file/text node, viewport, 사용자가 지정한 좌표.

원본 Canvas 객체와 플러그인 내부 Item이 같은 객체인지 참조 관계인지 명확히 한다.
참조형 예: `Canvas Placement → Plugin Item ← Other Canvas Placement`.

재배치/Export는 기준 좌표, 상대좌표, group/edge 유지, 충돌검사, preview, 취소, undo 기대, 중복을 정의한다.

Drag & Drop은 각 방향별로 copy/move/reference, 원본 유지, preview, 실패, multi-select를 정한다.

체감 성능 검증: pan, zoom, drag, multi-select, group 이동, 대량 node, 저장 지연, 메모리.
