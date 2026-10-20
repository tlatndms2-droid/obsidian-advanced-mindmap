# Ctrl 메뉴·길게 누르기 수정

개발 빌드0.1.2 / Obsidian1.14.4 / 2026-10-14.

- 재현: 기존0.1.1에서 Ctrl keydown 후 반복 keydown 입력 → 1초 이상 기다려도 메뉴0개.
- 원인: repeat Control이 최초 누름 분기를 통과하지 못하고 다른 Ctrl 조합 처리로 내려가 timer를 취소.
- 수정: Control 자체의 반복 입력은 timer를 유지하며 반환. Ctrl/Tab 공통 timer 1000→500ms.
- 타입 검사·빌드 통과, 설치 main.js/manifest.json/styles.css 바이트 일치.
- 실제 Sandbox: 반복 Ctrl에도 메뉴 표시, 200ms에는 미표시, Ctrl506.5ms/Tab503.1ms 표시. 키 해제 후 닫힘, 길게Tab 카드 생성 없음, Ctrl+C 조합 후 메뉴 안 뜸.
- 같은 Sandbox 프로세스 재시작 후0.1.2: Ctrl506.9ms/Tab507.8ms, 동일 검사 통과. 두 메뉴 스크린샷 직접 확인.
- scripts/check-hold-menu.mjs 및 verification/artifacts/hold-fix/{before,after,restart}.json/PNG에 증거. 기존 Canvas/workspace/data는 backup-*에 SHA256과 함께 보관. 사용자 Stage1 Canvas 내용 변경 없음.
- Hold-menu-check.canvas를 열린 Sandbox에 남겼다. 2단계 및 중간 Release 미진행.
