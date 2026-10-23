# 0.5.22 배포 완료 (2026-10-23)

사용자 확인 및 전체 배포 승인으로 공개 발행 완료. 아래 미배포 문구는 당시 검증 이력.
Release: https://github.com/tlatndms2-droid/obsidian-advanced-mindmap/releases/tag/0.5.22
소스 b300df3. 타입·10개 코드 검사·최종 Sandbox 설치본 일치 확인. 공개 설치파일3개 다운로드 후 로컬 빌드 바이트 일치.
main.js SHA256 144d6f861c7770c500ee6b57fcc9771387170b9df7abba0bb863d99cfc3811e0
manifest.json SHA256 d3b4a6a0e8d0a5a7cac4e71e99f4ccae22713cebb43ccbbb76adad6b2c86f8f3
styles.css SHA256 56222ee41c50deafadea276d45eea9b077bfab920f0ef2f71ee31ea1382d0f85
BRAT 설치·업데이트 시험은 기존 사용자 생략 요청 유지. Sandbox 열어둠.

# 0.5.22 확정 수정사항 반영 — Sandbox 검증, 미배포 (2026-10-23)

후속 메뉴 수정: 숫자는 평소 숨기고 편집 밖 Alt+M 카드 메뉴를 열었을 때만 표시. 숫자로 도구 선택 후 색상 선택지는 방향키/Enter/Esc로 조작하며 Canvas 키로 전달하지 않음. 다중 선택 native 정렬 메뉴도 지원. 편집 중 Alt+M은 카드 메뉴가 아니라 실제 입력 편집기 우클릭(링크·서식·단락·삽입·클립보드) 메뉴로 변경. 하위 메뉴 순차 Esc·커서 복귀 유지. 최종 빌드 재설치·전체 재시작 후 5개 실제 Sandbox 시나리오 통과. 증거 verification/artifacts/menu-0522/{runtime,align}.json, editor-menu.png, color-choice.png, numbers.png. 배포 없음.

사용자 배포 금지. Alt+R 편집 중 내용 맞춤, Tab 양방향 출발점 후보와 부착면/메뉴 입력 수정, Ctrl hold 500ms(Tab 200ms 유지), 편집 중 Alt+M 메뉴·커서 복원, 다중 선택 기준 카드 glow, 상단 숫자 툴바 1–20 키/표시 반영. 그룹 인식 추가 취소 유지.
타입·10개 코드 테스트·추가 Tab 회귀 및 최종 Sandbox 전체 재시작 후 핵심 동작 통과. 상세 verification/REVISION-0.5.22.md. Sandbox Obsidian 1.14.5 / plugin 0.5.22 / port9267 열어둠. 공개 릴리즈는 0.5.21 유지, push/Release/BRAT 없음.

# 0.5.21 통합 배포 완료 — 2026-10-21

사용자가 0.5.19–0.5.21 전체 변경 배포 승인. 아래 미배포 문구는 당시 이력이며 현재 공개 버전은 0.5.21.
Release: https://github.com/tlatndms2-droid/obsidian-advanced-mindmap/releases/tag/0.5.21
소스 facfc37. 타입·10개 코드 검사·빌드·Sandbox 설치파일 일치 확인. 공개 main.js·manifest.json·styles.css 다운로드 후 로컬 최종 빌드 바이트 일치.
main.js SHA256 e8c4f86d50dfca9fa058598e16261136b13d8b0b44c1b736952bedca1c5cefde
manifest.json SHA256 9e36362dbb6fc89cb7a82fcb03f3b4ff8407f0753c24686aa8839ade5b596d64
styles.css SHA256 1781d548a9241e7bec0e1690c91ecde9cb3c52dfc5f9818243fb4acd3a872d08
BRAT 설치·업데이트 시험은 기존 사용자 생략 요청 유지. Sandbox 열어둠.

# 0.5.21 — Alt 두 번 선택 맞춤 확대 / 미배포

Alt 단독을 300ms 안에 두 번 누르면 처음 선택한 카드들을 복원하여 Obsidian의 native zoomToSelection(Shift+2) 실행. Alt 한 번 keyup 선택·해제 유지. 다른 키·포인터·창 포커스 변경·Canvas 전환 시 두 번 판정 취소. 편집 중 차단.
타입·10개 코드 검사·빌드 통과. Sandbox 전체 재시작 후 단일/다중 선택의 Shift+2와 좌표/배율 일치, 단일 Alt·Alt+방향키 분리, 편집 중 차단 통과. 증거 verification/artifacts/alt-0521/alt-double.json. 0.5.21 Sandbox 열어둠, 배포 없음.

# 0.5.20 — Ctrl/Tab 메뉴 0.2초 / 미배포

Ctrl 및 Tab hold만 500ms→200ms. Ctrl+Shift 연결 메뉴는 기존 500ms 유지. 타입·빌드 통과. Sandbox 재시작 후 Ctrl 약205ms / Tab 약207ms 표시, 90ms 미표시, 해제 시 닫기 및 짧은 Tab 한 번 생성 통과. verification/artifacts/hold-0520/hold.json. Sandbox 0.5.20 열어둠, 배포/push/BRAT 없음.

# 0.5.19 — Undo/Redo·파일 전환 누적·정렬 지연 수정 / 미배포

2026-10-21 사용자 요청으로 세 문제 수정. 배포 금지: push/Release/BRAT 없음. 공개 0.5.18 유지.
- 지연 이력 기록이 빠른 Undo/Redo를 덮어쓰는 경로 차단. 즉시 입력 10회 카드·연결·선택 복원 통과.
- 닫힌 Canvas/카드/iframe/document 정리 참조를 약한 참조로 관리, 재사용 입력 영역의 이전 처리 제거. 500카드 전환 추가40회에서 DOM/리스너 수 동일.
- 정렬 결과는 유지하고 변경된 좌표만 적용. 500 직접 연결 정렬: 이전607ms → 최종 재시작 후 5회 중앙값96.8ms. 연결 부착면·Undo/Redo 유지.
- 타입·10개 코드 검사·빌드·실제 Sandbox 회귀·전체 재시작 및 최종 설치파일 해시 일치. 상세 verification/FIX-0.5.19.md.
- Sandbox 1.14.4 / port9267 / Canvas-Mindmap-Sandbox / 0.5.19 열어둠. 장시간 사용 및 BRAT는 검증 범위 아님.

# 0.5.18 통합 배포 완료 — 2026-10-21

Release: https://github.com/tlatndms2-droid/obsidian-advanced-mindmap/releases/tag/0.5.18
소스 bf11bf0. 공개 설치파일3개 다운로드 후 최종 빌드 바이트 일치 확인.

사용자가 Sandbox 확인 완료 후 0.5.15–0.5.18 전체 변경 배포 승인. 아래 미배포/배포금지 문구는 당시 이력이며 이번 승인이 최신이다.
타입·9개 코드 테스트·최종 빌드 통과. 재시작한 Sandbox 0.5.18과 설치파일3개 바이트 일치. 기존 BRAT 시험 생략 요청 유지.

# 0.5.18 — 항목 복원 시 설정 스크롤 유지 / 미배포

- 기본값 복원 후 설정 컨트롤을 다시 그릴 때 현재 설정창의 스크롤 좌표를 보존하고 누른 복원 버튼으로 포커스 복원(preventScroll).
- 타입 검사·빌드 통과. 실제 Sandbox의 따라가기·이동시간·확대축소량·편집확대율 각각3회 복원 후 scrollTop 및 항목 화면 y좌표 동일 확인. 전체 재시작 후 동일12회 재검사 통과. 사용자 설정값은 검증 전 값으로 복원.
- Sandbox 0.5.18 카메라 설정 열어둠. verification/artifacts/518/ 사전백업과 화면 기록. 배포·push·BRAT 없음.

# 0.5.17 — 카메라 슬라이더·항목별 복원 / 미배포

- 카메라 숫자 설정4개는 슬라이더+단위 포함 현재값 표시. 기존 기본값 및 기존 사용자값 유지.
- 설정값11개 각각 회전 화살표 ‘기본값으로 복원’ 버튼. 해당 항목만 초기화. 너비/높이는 현재 Obsidian Canvas 기본값(현재 Canvas 없으면 기본값 자동 인식 대기). 안내·단축키 설정 열기·백업 실행 버튼은 설정값이 아니므로 초기화 버튼 없음.
- 슬라이더 기본 범위: 이동1–600px, 확대0.01–50%, 편집6.25–200%, 시간0–2000ms. 기존 저장값이 범위 밖이면 표시 범위를 확장하여 값 보존. 기본 확대값 내부 정밀도 보존.
- 타입·빌드 통과. Sandbox 설정창 실제11개 개별 복원 클릭 검증: 다른 값 불변. 슬라이더4개 변경 저장 확인. 재시작123px 유지 후 실제 방향키로 슬라이더124px 변경 확인, 복원60px 확인. 기존 사용자 설정 복구 후 최종 빌드로 재시작0.5.17/설치파일 일치 확인.
- Sandbox 카메라 설정창 열어둠. verification/artifacts/517/에 사전백업과 화면 기록. Release/push/BRAT 하지 않음.

# 0.5.16 — 카메라 설정 / Sandbox 적용, 미배포

- 2026-10-21 승인: 이동량·확대축소량 추가, 기존 편집 최소 확대율·줄 따라가기·이동 시간을 카메라 구역에 통합.
- 기본 이동량60 화면px, 확대 단계 기존0.1 log2와 정확히 같은 (2**0.1-1)*100%. 화면에는 약7.18% 표시. 기존 사용자 설정 유지.
- 설정 백업에 두 항목 포함. 이전 백업은 두 항목 기본값으로 호환 복원.
- 타입 검사·9개 코드 검사·빌드 통과. 실제 설정창120px/20% 입력 후 키보드 이동120px, 확대1.2배/축소복원 확인. Sandbox 전체 재시작 후0.5.16/저장값 유지 및 설치파일 일치 확인.
- 테스트값은 기본60px/약7.18%로 되돌리고 카메라 설정창을 열어둠. verification/artifacts/516/에 백업과 화면 기록.
- 배포 금지 유지: Release/push/BRAT 수행하지 않음. 공개버전0.5.14 유지.

# 0.5.15 — 단축키·수동 내용 맞춤 / Sandbox 적용, 미배포

2026-10-21 사용자 확정 변경. 배포 금지: Release/push/BRAT 수행하지 않음. 공개 버전은 0.5.14.
- Alt 단독 keyup: 선택 없음 → 중앙 카드 선택·포커스, 선택 있음 → 전체 해제. Alt 두 번 전용 분기 제거. 조합키로 사용하면 keyup 선택 동작 없음.
- Ctrl+Shift+Alt+방향키: 마지막으로 추가한 카드 기준 누적 선택. 기존 방향 탐색 기준 재사용.
- Alt+M: 실제 Obsidian 카드 우클릭 메뉴. 방향키·Enter, 하위 메뉴 Esc 한 단계 닫기. 편집 중 제외.
- Shift+Alt+↑/↓ 확대·축소, 기존 [ ] 제거. 편집 중 제외. Shift+방향키 화면 이동 유지.
- Ctrl+Shift+R: 선택 텍스트 카드별 내용 맞춤. 편집 중 제외. 단축키 재지정 보존을 위해 기존 명령 ID toggle-auto-resize는 유지하고 이름·동작만 변경. 자동 실행 제거. 여러 카드 크기 조절은 한 Undo. 파일 카드 크기는 유지.
- 기존 설정 ‘입력 줄 따라가기’ ON/OFF를 실제 검증. 편집 최소 확대율 및 종료 원래 배율 복원 유지.
- 설정 백업에서 autoResize 제외, 이전 boolean 값 포함 백업은 해당 값만 무시하고 복원. 나머지 설정 검증 유지.
- 타입·9개 코드 검사 묶음·빌드 통과. 실제 Sandbox 핵심 키 입력/Undo/편집 차단/메뉴 실행 검사 후 전체 재시작하여 반복 통과. native 하위 메뉴 임시 항목으로 Esc 2→1→0 확인 후 항목 제거. 설정창 OFF/ON의 줄 이동 차이 확인.
- Sandbox: 단축키-수동크기-확인-1792551453044.canvas. 사용자 보관함 수정 없음. 백업/스크린샷: verification/artifacts/515/. 상세 결과 verification/feedback-0515.md.

# 0.5.14 — 선택 카드 Enter 미디어 동작 / 배포 완료

Release: https://github.com/tlatndms2-droid/obsidian-advanced-mindmap/releases/tag/0.5.14
소스 7e3afe9. 공개 다운로드 파일 3개와 최종 빌드 바이트 일치 확인.

2026-10-21 사용자 승인: 영상·YouTube·음악 카드 선택 후 Enter 재생, 이미지 카드 Enter 확대 보기. PDF 기존 기능 유지.
- 영상·음악은 기존 카드의 플레이어를 재생하고, 이미지에는 기존 미리보기 창을 재사용한다. Esc/Ctrl+Enter 닫기 후 카드 선택 유지.
- YouTube는 Obsidian의 실제 YouTube webview 내 기존 재생 표지를 실행하고 iframe API 재생 명령을 사용한다. 저장된 카드 URL·좌표·크기·연결을 바꾸지 않는다. 임의 웹사이트에는 실행하지 않는다.
- 9개 코드 검사 묶음·타입 검사·빌드 통과. Sandbox에서 실제 영상·음악 재생 시간, 이미지 창·닫기·선택 유지, YouTube playerState=1 및 재생 시간 확인. 전체 Sandbox 종료 후 재실행하여 동일 검사 통과. PDF/텍스트/입력란/편집/다중선택/수정키/IME 입력 보호 통과.
- Sandbox: Enter-미디어-확인-1792546624952.canvas 열어둠. 기존 사용자 Canvas 수정 없음. 테스트 전 설정·workspace 백업은 verification/artifacts/enter-media/. BRAT 검사는 사용자 요청에 따라 생략 유지.

# 0.5.13 — Ctrl+Shift+A/S 수정 및 배포 완료

Release: https://github.com/tlatndms2-droid/obsidian-advanced-mindmap/releases/tag/0.5.13
소스 66ff9f4. 공개 설치 파일 3개와 로컬 빌드 바이트 일치 확인. 재시작 후 Sandbox 로드 버전 0.5.13 및 설치 파일 일치 확인.

2026-10-20. 영문 A 입력은 안내가 나오고, 한글 key=ㅁ/code=KeyA 이벤트는 안내가 나오지 않는 것을 Sandbox에서 재현했다. A/S 물리 키 처리 추가. Obsidian 기본 명령 경로와 직접 처리 경로가 같은 이벤트를 두 번 실행하지 않도록 차단한다. 편집 중 차단과 크기 조절은 유지.

- 8개 코드 검사 묶음·타입·빌드 통과. Sandbox 실제 영문 A/S, 한글 키 이벤트 A/S, 연결 및 방향 전환, 복수 연결 선택, Undo, 편집 차단·크기 조절 통과. 같은 Sandbox 종료 후 재실행하여 동일 검사 통과. 한글 검사는 KeyboardEvent 주입이며 OS IME 전환 자동 시험은 아님.
- 테스트 Canvas만 사용. 기존 사용자 Canvas 수정 없음. Sandbox를 열어둠. BRAT 검사는 기존 사용자 생략 요청 유지.

# 현재 인계 요약 — 0.5.12 / 공개 배포 완료

Release: https://github.com/tlatndms2-droid/obsidian-advanced-mindmap/releases/tag/0.5.12
소스 커밋: b7b2951. main 브랜치 반영. 공개 다운로드한 main.js·manifest.json·styles.css 모두 로컬 최종 빌드와 바이트 일치 확인. BRAT 설치·업데이트 검사는 사용자 요청으로 생략했으며 통과로 기록하지 않는다.

2026-10-20 사용자가 현재 기능 전체 확인 완료 후 배포를 요청했다. BRAT 설치·업데이트 검사는 명시적으로 생략 승인했다. 제거·재설치 자동 보존 검토 역시 사용자가 제외했다. 기존 데이터 저장 방식은 변경하지 않는다.
- 아래의 사용자 확인 대기는 과거 기록이다. 최신 사용자 확인 완료 진술이 우선하며, 자동화로 모든 UI를 재검증했다는 뜻은 아니다.
- Tab 메뉴의 영상 후보는 실제로 선택한 이미지로 들어오는 연결의 출발점이었다. 사용자가 정상으로 확인하여 추가 변경하지 않았다.
- 7개 코드 검사 묶음 및 타입 검사 통과. 버전 0.5.12 유지. 배포용 빌드에서 개발용 배너·인라인 소스맵 제거.
- BRAT 검증, 재설치 보존 보장, 새로운 기능 추가는 이번 배포 범위에 포함하지 않는다.

## 파일 카드 Tab 연결 보존 기록

2026-10-20. Tab 생성 시 전체 Canvas를 다시 적용하던 처리를 새 카드·새 연결만 추가하도록 변경했다. 기존 연결 누락·변경 감지 시 생성 작업을 취소하고 이전 상태로 복원한다. 파일 카드 자체를 다시 적용하지 않는다.
- 기존 이력에 새 카드 생성 직전 연결 삭제가 남았으나, 삭제를 일으킨 정확한 호출은 확정하지 못했다. UI 재현 성공 또는 원인 완전 확정으로 기록하지 않는다.
- 파일 확장자 6종 × 생성 모드 2종의 코드 검사 12건, 연결 누락 감지 검사, 타입 검사·빌드 통과. 모의 Canvas 검사이며 실제 UI 검증은 사용자가 수행한다.
- 확인할 동작: 이미지·영상·PDF의 기존 연결 유지, Tab 새 카드 생성, Ctrl+Z로 새 카드만 취소되고 기존 연결 유지.
- 중간 Release/push 없음. 이미 삭제된 사용자 연결을 임의로 복구하지 않음.

## 이전 6단계 코드 검사 기록

2026-10-20. 5단계 최신 동작은 [STAGE5_CURRENT.md](planning/revised/STAGE5_CURRENT.md). 아래 버전별 기록은 이력이며 현재 조작은 이 최신 문서를 우선한다.
- 사용자 요청: 실제 화면은 사용자가 확인. 이번 작업은 문서 정리·코드 테스트·빌드·확인 목록. 앱 조작/설치/재시작/Release/push 없음.
- 결과: [6단계 코드 보고](verification/stage6-code-report.md), [사용자 확인 목록](verification/stage6-user-check.md).
- 5단계 기능은 코드 반영. 6단계 전체 통과 또는 배포 준비 완료로 취급하지 않는다. 실제 결합·Undo/Redo·복제/이동·재설치·재시작은 개별 결과 필요.
- 버전은 0.5.11 유지. 제품 동작 코드 변경 없이 테스트/문서만 보완.

---

# Canvas Mindmap — 개발 인계

갱신: 2026-10-20. 0.3.1 이후 누적 사용자 검수 수정 6개를 0.3.2에 반영하고 실제 Sandbox 및 재시작 검사를 수행했다. 최신 기준 planning/revised/FEEDBACK_0.3.2.md, 결과 verification/feedback-032.md.

## 0.3.3 편집 확대 정정

사용자 요청으로 Shift+2의 카드 전체 맞춤 배율을 제거했다. 편집 진입 배율은 max(현재 배율, 100%). 짧은 카드·긴 카드 모두 동일하며 줄 따라가기와 종료 시 이전 배율 복원 유지. 검증 기록: verification/feedback-033.md. 중간 Release 없음.

## 0.3.4 편집 최소 확대율 설정

설정의 Minimum editing zoom (%) 추가, 기본100%. 편집 진입은 max(현재 배율, 설정값), 줄 따라가기와 편집 종료 이전 배율 복원 유지. Canvas 자체 배율 범위6.25–200% 입력. Sandbox 입력·저장·125% 재시작 유지 검증 후 사용자용 기본값100%로 두었다. verification/feedback-034.md 참고. 중간 Release 없음.

## 0.3.5 설정 한국어화

현재 설정 항목·구역 제목·설명·입력 안내·저장 실패 안내를 한국어로 변경했다. 설정값·동작 유지. Sandbox 실제 설정창과 재시작 후 표시·기존 설정값 일치 확인. 앞으로 설정 문구는 한국어 사용. 중간 Release 없음.

## 0.4.0 관리창·색상

승인 PNG04·05·06 구조로 Waypoints / Colors / Add color 구현. 설명·툴팁·Obsidian 명령은 한국어. Ctrl+Alt+W/C 기본 단축키와 기본·사용자 색상 적용 명령은 Obsidian 단축키에서 변경 가능. 창 크기와 사용자 색상은 설정 파일에 저장하며 Canvas 원본과 분리. 실제 Sandbox 및 재시작 결과 verification/stage4.md. 중간 Release 없음.

## 0.4.1 사용자 검수 정정

팔레트 기본키 Ctrl+Shift+C(기존 Ctrl+Alt+C 폐기). 편집 중에도 사용: 방향키·Enter 적용/Esc 취소 후 같은 편집·커서 유지. 팔레트는 선택 카드 아래8px, 공간 부족 시 위쪽/화면 안쪽. 색상 선택기는 Enter 등록 후 팔레트 복귀·추가 색상 강조, Tab으로 색상환/사각형 전환·방향키 조절. Waypoint 제목 드래그 이동, 항목 호출 후 창 유지. 외부 클릭·Esc·토글 닫기 유지. 최신 사용자 정정으로 이전 명세의 호출 후 닫기·즉시 마우스 색등록 규칙을 대체한다. verification/feedback-041.md 참고.

## 0.4.2 팔레트 방향키 이동 버그

팔레트 키 처리보다 Canvas scope 기본 nudge가 먼저 실행돼 방향키마다 카드가20px 이동하던 문제 재현 및 수정. 팔레트/선택기 열림 동안 native scope 방향키를 팔레트로만 전달한다. 단일/다중/편집·Shift/CtrlShift 방향키, 닫은 뒤 native 이동 유지, 재시작 통과. verification/feedback-042.md.

## 0.4.3 Waypoint 키보드 선택

관리창 상하/좌우 방향키로 이전/다음 등록 항목 강조, Enter로 호출 후 창 유지. 이름 편집 중에는 기존 커서 이동·Enter 저장 유지. Canvas 기본 이동/Enter 편집 진입 차단. Sandbox 재시작 검사 통과. Alt+W 변경 가능성 질문에는 가능하다고 답했으나 아직 변경 승인 전이므로 Ctrl+Alt+W 유지.

## 0.4.4 Waypoint 단축키 변경

사용자 확정으로 Waypoint 관리창 기본키 Alt+W로 변경. Ctrl+Alt+W 기본키 제거. 방향키·Enter 및 이름 편집 동작 유지. 실제 Sandbox 및 재시작 열기/닫기·이전 키 비활성·방향키·원본 데이터 유지 확인. verification/feedback-044.md.

## 0.4.5 선택 카드 연결 해제

Ctrl+Alt+D로 선택 카드에 들어오거나 나가는 연결선을 모두 제거한다. 다중 선택은 선택 카드들의 연결 전체에 적용한다. 카드 내용·위치·크기·색상·Waypoint는 유지하고 Ctrl+Z 한 번으로 연결을 복원하며 Redo도 지원한다. 편집/입력 중에는 실행하지 않는다. 실제 Sandbox 및 재시작 검사 통과. verification/feedback-045.md 참고. 중간 Release 없음.

## 0.4.6 방향 연결

Ctrl+Shift+D를 누른 채 방향키를 누르면 Alt 탐색과 같은 기준으로 대상 카드 하나에 연결한다. 원래 선택과 카드 좌표·크기를 유지한다. 누르고 있는 동안 다른 방향키도 사용 가능하며, 반복 keydown·중복 연결·대상 없음은 새 연결을 만들지 않는다. Ctrl+Z 한 번은 연결 한 개를 취소한다. 편집 중 비활성. Sandbox 및 재시작 검사: verification/feedback-046.md. 중간 Release 없음.

## 0.4.7 방향 연결 안내

Ctrl+Shift+D 유지 중 선택 카드 우측 상단에 기존 메뉴 스타일로 Press an arrow key 표시. 가운데 정렬, 키 해제·포커스 이탈·Canvas 전환 시 닫힘. 연결 동작 유지. Sandbox 표시·위치·닫힘·연결·Undo/Redo 및 재시작 검사 통과. verification/feedback-047.md. 중간 Release 없음.

## 0.4.8 연결 조작 통합·빈 카드·편집 크기

최신 사용자 확정: Ctrl+Shift 500ms 유지로 연결 안내 메뉴. Ctrl+Shift+A 유지 + 방향키로 연결, D로 연결 전체 해제, S로 방향 반전. 복수 연결은 ↑/↓ 선택·Enter 반전, Esc 취소. 구 Ctrl+Alt+D 및 D 유지 연결 기본키 폐기. 연결 조작은 편집 중 비활성. Ctrl+Shift+방향키 크기 조절은 편집 중에도 가능하며 편집·커서 유지. Ctrl+Alt+↑/↓ 위치 교환 유지. 빈 텍스트 카드는 Auto Resize 편집 종료 시 설정 기본 크기 적용. 검증 verification/feedback-048.md. 중간 Release 없음.

## 0.4.9 연결 카드 정렬 시험

Ctrl+Shift+L 또는 명령 팔레트의 연결된 카드 정렬 (시험). 직접 연결된 카드만 현재 사방 방향으로 나누어 간격을 고르게 배치. 기준 카드·무관한 카드·크기·연결 유지, 주변 고정 카드와 겹치면 해당 열/행을 바깥으로 이동. 설정 gap 사용, Group 제외, 편집 중 비활성. 한 번의 Undo/Redo. Sandbox/재시작 검증 verification/feedback-049.md. 사용자 사용 후 조정할 시험 기능이며 중간 Release 없음.

## 0.4.10 과도한 정렬 수정

0.4.9의 사방 재배치·행/열 전체 밀어내기를 폐기했다. 실제로 겹친 직접 연결 카드만 주변 경계 후보 중 가까운 빈자리로 이동하며, 겹치지 않는 카드·기준·무관한 카드는 그대로 유지한다. 반복 실행 시 추가 이동 없음. Ctrl+Shift+L, Undo/Redo 유지. verification/feedback-0410.md. 중간 Release 없음.

## 0.4.11 가까운 위치에서 정렬·간격 정돈

겹치지 않아도 같은 방향의 직접 연결 카드들을 기존 평균 위치 근처에 맞추고 간격을 균등화한다. 기존 간격 평균을 사용하되 설정 gap을 상한으로 하며 조밀한 배치의 최소 여백은 min(gap,24px). 충돌은 개별 카드 빈자리 탐색으로 해결하고 행/열 전체 밀어내기는 하지 않는다. Ctrl+Shift+L 및 한글 ㅣ KeyL 입력 검사, Undo/Redo, 재시작 통과. verification/feedback-0411.md. 중간 Release 없음.

## 0.4.12 카드·연결선 정렬

단독 위/아래 카드는 기준 세로 중심, 단독 좌/우 카드는 기준 가로 중심 정렬. 같은 방향 복수 카드는 기준을 향하는 테두리를 맞춘다. 정렬 대상 연결선의 부착면도 서로 마주보게 교정하며 방향·ID·색상·라벨 유지. 카드/선 변경 전체 Undo 한 번. 사용자 참조 배치와 실제 화면 비교·재시작 통과. verification/feedback-0412.md. 중간 Release 없음.

## 0.4.13 근거리 묶음별 평균 정렬

같은 방향에서도 공간적으로 떨어진 카드들을 별도 묶음으로 정렬한다. 근거리 묶음은 기준 쪽 테두리를 평균 위치로 맞추고 설정 gap 그대로 간격을 균등화. 먼 단독 카드는 좌표 유지하여 근거리 평균에 포함하지 않는다. 연결 부착면 교정/개별 겹침 회피/Undo 유지. 시험 근접 기준: max(설정 gap, 해당 방향 카드 최대변 중간값)의 2배 이하 가장자리 거리로 묶음 구성. Sandbox·재시작 검증 verification/feedback-0413.md. 중간 Release 없음.

## 0.4.14 가까운 묶음 중앙 맞춤

승인된 HTML 시안대로 근거리 묶음의 전체 경계 중앙을 기준 카드 중앙에 맞춘다. 좌/우 묶음은 세로 중앙, 위/아래 묶음은 가로 중앙. 먼 묶음은 기존 위치 근처 정렬 유지하며 먼 단독 카드 고정. 간격·테두리·연결 부착면·Undo 유지. 실제 Sandbox에서 기준/먼 카드 고정, 묶음 중앙 일치, 반복/Undo/Redo 및 재시작 통과. verification/feedback-0414.md. 중간 Release 없음.

## 0.4.15 연결 부착면 보존

정렬 시 연결 부착면을 자동 변경하던 처리를 제거했다. 기준 카드의 기존 연결 면별로 정렬하며 연결 대상·방향·부착면·라벨·색상 등 연결 데이터 전체를 보존한다. 동일 카드가 기준 카드의 서로 다른 면에 복수 연결된 경우 임의 분류하지 않고 그 카드를 유지한다. 근거리 중앙·간격, 먼 카드 고정, Undo/Redo 유지. 실제 Sandbox 및 재시작 검사 verification/feedback-0415.md. 이전 0.4.12~14의 부착면 자동 교정 규칙 폐기. 중간 Release 없음.

## 0.4.16 X 카드 삭제

편집·입력·메뉴 조작 중이 아닐 때 수정키 없는 X(물리 KeyX 포함)로 선택 카드들을 삭제한다. 카드에 연결된 선도 삭제하며 Undo 한 번으로 카드·연결·선택 복원, Redo 지원. 반복 keydown 무시. 실제 Sandbox 및 재시작 단일/복수/연결/Undo/Redo/편집/외부 입력/무선택 검사 통과. verification/feedback-0416.md. 중간 Release 없음.

## 0.4.17 Alt 중앙 카드 포커스

무선택 Alt 및 Alt 빠른 두 번으로 중앙에 가까운 카드를 선택할 때 카메라도 해당 카드 중앙으로 이동한다. 기존 panDuration 및 현재 확대율 유지. 선택 기준·카드 데이터 유지. 실제 Sandbox 및 재시작 검사 verification/feedback-0417.md. 중간 Release 없음.

## 다음 담당자가 먼저 볼 상태

- 개발 빌드 **0.4.17**, Windows용 Obsidian 플러그인. 실제 검사 환경은 Obsidian **1.14.4**다. manifest의 minAppVersion 1.12.7 전체 호환성을 검증한 것은 아니다.
- **1~4단계 구현 및 해당 범위 Sandbox 검사 완료. 다음은 5단계 설정·파일 처리.** 사용자 직접 사용 검수 결과는 별도로 받는다. 전체 제품·전체 수용 테스트·Release 완료가 아니다.
- 사용자 요청으로 4단계를 구현했다. 5단계는 아직 시작하지 않았으며 다음 요청을 기다린다.
- 저장소: https://github.com/tlatndms2-droid/obsidian-advanced-mindmap
- 작업 브랜치: `codex/canvas-mindmap-foundation`.
- 작업 트리에 변경·미추적 파일이 다수 있다. 사용자 변경과 누적 개발 결과를 보존한다. reset·clean·강제 push 금지. 로컬 진행 상태를 원격 반영 완료로 보고하지 않는다.

## 기준 자료와 우선순위

현재 사용자 정정 → `planning/revised/FEEDBACK_0.3.2.md` → `planning/revised/FEEDBACK_0.3.1.md` → `planning/revised/DEVELOPMENT_BASELINE.md`·`01_PRODUCT_SPEC.md` → 승인 UI `planning/revised/APPROVED_UI.md` 및 `approved-ui/` → `DEVELOPMENT_PLAN.md`·`04_ACCEPTANCE_TESTS.md`를 사용한다.

- 요구사항 ID128개, 테스트43개를 추적한다. **CM-050 복수 선택 일괄 Auto Resize는 사용자 요청으로 범위 제외**하며 ID만 기록용으로 유지한다. 다시 미구현 선행 항목으로 요구하지 않는다.
- 원본 ZIP·`planning/current/` 보존. 과거 HTML·SVG·기획 문구가 최신 사용자 정정과 다르면 최신 정정을 우선한다.
- 승인된 디자인과 확정 동작을 다시 선택하도록 요구하지 않는다. 완료한 대조 결과는 재사용하고, 실제 모순이 있을 때 해당 부분만 확인한다.

## 완료된 개발과 증거

| 단계 | 구현된 사용자 동작 | 검증 근거 |
|---|---|---|
| 0 기반 | 최신 기획·승인 UI·테스트 연결과 개발 기준 정리 | `verification/development-baseline.md` |
| 1 생성·배치 | 일반/연결 생성, Ctrl 방향 생성, Tab 삽입, 출발점 선택 (0.3.1에서 생성 밀어내기 제거), Ctrl+Space 편집 전환, Undo | `verification/stage1.md`, `verification/hold-menu-fix.md` |
| 2 교환·크기 | SWAP-01 간격 보존, 제3 카드 겹침 허용, 수동 크기 조절·길게 누르기 Undo, 편집 종료 가로·세로 Auto Resize·글 보존 Undo | `verification/stage2.md`의 정정 및 `verification/artifacts/autoresize-both/` |
| 3 탐색·Waypoint | Alt 가장자리 탐색, 중앙 이동·선택·Zoom 유지, 카드/카메라 Waypoint, 배지, 등록·해제·덮어쓰기·삭제 Undo, 저장·복제·이동·재시작 | `verification/stage3.md` |

`verification/implementation-status.json`은 현재 단계4·다음 단계5를 기록한다. 구현 항목 집계와 전체 수용 테스트 통과 수를 혼동하지 않는다. T17 인라인 이름 편집 화면·Undo 검사는 4단계에서 수행했다.

이전 0.3.0 검사: 타입 검사·빌드·생성/배치 단위 검사7개, 3단계 실제 Sandbox 입력·결합 검사·재시작. 최종 실행의 pageerror 없음. 기존 생성·Tab·크기·Auto Resize와 Waypoint 정보의 결합도 확인했다. 이 기록은 2026-10-14 검사 결과이며 오늘 재실행한 결과가 아니다.

## 반드시 유지할 사용자 확정

- Ctrl·Tab 길게 누르기 모두 **500ms**. Ctrl 메뉴는 Create / Create & Connect, ↑/↓ 선택, Ctrl 해제 확정. 생성 모드는 다시 변경할 때까지 모든 Canvas에서 공유하고 재실행 후 유지한다.
- Tab 메뉴는 연결 출발점 하나만 선택한다. Tab 해제는 출발점만 저장하고 카드 생성은 하지 않는다. 다음 짧은 Tab에서 생성하며 다시 메뉴로 바꾸기 전까지 출발점을 유지한다.
- 새 카드 생성 후 선택하고 현재 Zoom을 유지해 중앙으로 이동하며 자동 편집 진입은 하지 않는다. 기존 카드는 겹쳐도 밀지 않는다. 최초 크기 설정은 Obsidian 기본 카드 크기에서 시작하고 이후 사용자가 지정한 값을 사용한다. 기존 사용자 설정 **500×100**을 초기화하지 않는다.
- 교환은 기존 크기·간격 보존 우선. 주변 제3 카드와 겹쳐도 교환하며 주변 카드를 밀지 않는다.
- Auto Resize는 **편집 종료 시 현재 너비를 상한으로 짧은 글은 가로 축소, 긴 글은 줄바꿈, 높이는 내용에 맞춤**. 편집 중 미조절, 좌상단 고정, 주변 카드 미이동. Undo는 글을 유지하고 크기만 복원. 0.3.0의 긴 글 가로 확장은 최신 사용자 정정으로 폐기됐다. 복수 선택 일괄 맞춤은 만들지 않는다.
- Alt 방향 탐색은 정방향 후보 우선, 없으면 대각선 후보. 각 후보군 안에서는 가장자리 거리 우선, 동률은 방향 중심선 우선. 단일 선택만, Group 제외, 편집 중 차단, 키 유지 단발. 중앙 이동 기본250ms·설정 변경 가능, 현재 Zoom 유지.
- 카드 Waypoint는 현재 카드 위치로 이동·중앙 배치·선택하며 현재 Zoom 유지. 카메라 Waypoint만 저장한 위치와 Zoom 복원.
- 승인 UI는 영어·작은 팝업 기준. 생성/출발점 메뉴는 카드 우측 상단 바깥·중앙 정렬. 배지는 카드 왼쪽 위·화면상 크기 고정. 색상 선택기는 **클립스튜디오 방식 바깥 색상환+안쪽 채도/밝기 사각형**. HEX 입력·별도 저장 버튼을 추가하지 않는다.

## 0.3.2 사용자 검수 수정

Alt 정방향 후보 우선·대각선 대체, Alt 단독 빠른 두 번 중앙 카드 선택, Shift+방향키 화면 이동, 대괄호 줌, 기본 Shift+2 편집 확대 및 설정형 세로 입력 줄 따라가기, 번호 배지 지연 수정. 입력란에서는 화면 조작 차단. 기본 카드 nudge와 Shift+방향키 충돌은 해당 Canvas scope에서 억제한다. `src/editor-camera.ts` 추가. Follow editing line 신규 기본 ON, 기존 저장값 존중. 상세 검증은 `verification/feedback-032.md`.

## 0.3.1 사용자 검수 수정

7개 수정 및 재시작 검사 통과: Auto Resize 너비 상한, 생성 화면 포커스, Undo/Redo 선택, 오른쪽 Shift+WASD/QE(편집 중 차단), 생성 밀어내기 제거, Ctrl+Space 편집 확대/종료 배율 복원, 무선택 Alt 카드 선택. `src/selection-history.ts`는 실행 중 Undo 선택을 담당하며 파일 데이터에 선택 정보를 추가하지 않는다. 상세 기대값·실제 결과는 `verification/feedback-031.md`.

## 완료된 4단계 — 0.4.0

관련 범위: CM-084~106 및 색상 단축키 사용자 설정 관련 CM-128. 기존 승인 이미지04·05·06을 적용한다. 새 디자인 재결정 없이 승인된 화면을 구현한다.

1. **Waypoint 관리창**: Ctrl+Alt+W로 토글, 커서 근처, Canvas 작업을 막지 않는 팝업. 등록된 번호만 오름차순, 번호·대상 아이콘·이름·연필·휴지통 표시.
2. 항목 클릭은 호출 후 닫기. Esc·외부 클릭·Canvas 전환 시 닫기. 이름 편집 Enter 저장·Esc 취소, 편집 중 외부 클릭은 취소 후 닫기.
3. 휴지통은 확인 없이 등록만 해제하며 원본 카드는 보존. 등록 해제·이름 변경 Undo가 기존 작업 순서와 일치해야 한다.
4. 창 외곽·모서리 드래그 크기 조절, 마지막 크기 저장·재시작 복원, 목록 높이·스크롤. 별도 크기 조절 버튼을 만들지 않는다.
5. **색상 팔레트**: Ctrl+Alt+C로 커서 근처 토글, 기본/사용자 색상·추가 버튼. 지원하는 선택 항목에 일괄 적용 후 닫기. 색을 고르지 않고 닫으면 변경 없음.
6. **색상 선택기**: 승인된 색상환+사각형, 선택색 즉시 사용자 목록 저장, 동일 색 중복 방지, 모든 Canvas에서 공유. 사용자 색상 칩 우클릭 삭제 후에도 기존 카드 적용색 유지.
7. 다중 항목 색상 변경은 Undo 한 번으로 각각의 이전 색 복원. 설정·저장 처리는 이 단계에서 함께 구현한다. 관리창과 팔레트는 실제 Sandbox 화면·승인 이미지 비교 및 재시작까지 확인한다.

4단계 시작 시 `src/navigation.ts`의 registry/register/call/rename 및 기존 Undo 경로를 재사용한다. 등록 삭제와 이름 편집 화면을 연결할 인터페이스를 보완하고 독립 Undo 기록을 새로 중복 생성하지 않는다.

## 이후 단계와 미수행 항목

| 단계 | 남은 작업 |
|---|---|
| 5 설정·파일 | 전체 설정 UI, 설정만 백업, Windows 저장창, 복원 확인·전체 교체·손상 시 부분 적용 방지. 빈 카드 Markdown/Canvas/Image 전환, 이미지 패널, 취소·Undo·연결 보존 |
| 6 결합 검증 | 전체 요구사항·43개 테스트 결과 대조, Undo/Redo 순서·Canvas별 독립성, 제거·재설치 보존, 테마·단축키·100/500/1000개 카드, 비활성화·재시작·파일 수명주기 |
| 7 배포 | 전체 필수 검증 통과 후 버전·문서·GitHub Release·배포 자산 비교·BRAT 설치/재시작·사용자 체크리스트 |

관리창·인라인 이름 편집·팔레트·색상 선택기는 0.4.0에서 구현 및 검사했다. verification/stage4.md 참고. 제거·재설치 전체 절차, 다른 Obsidian 버전·테마·모바일, 대량 Canvas 성능·전체 결합 검사는 아직 통과하지 않았다. 외부 임베드의 지연 로딩 Auto Resize도 검증 기록이 없다.

**중간 Release 금지.** 단계별 진행 요청을 받으며, 다음 단계로 임의로 넘어가지 않는다. 원본 사용자 Vault에 설치·시험하지 않는다.

## 코드와 저장 위치

- `src/main.ts`: 설정·입력, 500ms 메뉴, 생성, 편집 전환. iframe을 포함한 창 캡처 단계에서 확정 단축키를 처리한다.
- `src/layout.ts`: 기존 카드를 움직이지 않는 생성·배치 계산.
- `src/size.ts`: 교환·크기·Auto Resize, 길게 누르기와 중복 없는 Undo. 연결선 속성 순서만 다른 동일 상태가 중복 이력으로 들어가지 않도록 비교한다.
- `src/navigation.ts`: 가장자리 탐색·카메라 이동·Waypoint·배지. 등록 데이터는 Canvas의 별도 `canvasMindmap` 영역에 저장해 카드·연결선과 구분하며, 네이티브 Undo 스냅샷과 함께 보존한다. 숨겨진 부모·자식 정보 없음.
- `styles.css`: 승인 메뉴·배지 스타일.
- 설정은 현재 플러그인 data.json에 저장한다. 제거·재설치 보존 요구 전체를 충족했다고 단정하지 말고 이후 실제 절차를 검사한다.
- `main.js`, `node_modules/`, `verification/artifacts/`는 gitignore 대상이다. **JSON·스크린샷·백업 증거는 로컬에 있고 GitHub로 자동 전달되지 않는다.** 다른 PC 인계 시 별도 확보가 필요하다. 문서만으로 실제 UI 검사 재실행을 대신하지 않는다.

기본 명령: `npm run typecheck`, `npm test`, `npm run build`. Node가 PATH에 없으면 관리 런타임 `C:/Users/tlatn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe` 사용. 현재 메타데이터는0.4.0, implementationStage는4이다.

## Sandbox 보존·재사용

- Vault: `C:/Users/tlatn/AppData/Local/CanvasMindmap-Stage1-20261014/Canvas-Mindmap-Sandbox`
- Profile: `C:/Users/tlatn/AppData/Local/CanvasMindmap-Stage1-20261014/profile`
- CDP: `9267`. 2026-10-20 재시작 PID9548·target3B03D5BD121284E432FF80F347017D35. 이 값은 실행마다 바뀌므로 재사용 전 Vault·제목·버전·새 target을 확인한다.
- 마지막 사용자 화면: `Stage3-사용자확인.canvas`. Project Plan 카드 Waypoint1·카메라 Waypoint2. `3단계 확인 안내.md`가 사용자 조작 안내다.
- 사용자가 Sandbox를 열어두라고 요청했다. 임의로 닫거나 시험 파일·설정을 초기화하지 않는다. 사용자가 확인하며 바꾼 내용도 보존한다.
- `scripts/stage1-runtime.mjs`, stage2/3 시험 스크립트는 시험 파일·설정을 변경한다. 이전 결과를 보기 위해 무작정 재실행하지 않는다. 현재 상태를 먼저 보호하고 새로운 시험 파일로 수행한다.
- 열기만 요청하면 obsidian-sandbox-open만, 설치·실제 검증이면 obsidian-sandbox-validation 절차를 따른다. 관련 스킬의 전체 지침을 읽는다.

## 이력

과거 단계의 누적 HANDOFF 원문은 [이력 보관본](verification/handoff-history-through-stage3-2026-10-14.md)에 보존했다. 현재 상태는 이 파일 상단을 우선한다. 0.3.1에서는 사용자 승인에 따라 코드·빌드·Sandbox·버전을 갱신했다. 원격 push 및 Release는 수행하지 않았다.

## 0.5.0 설정 백업·복원 사용자 확인 대기
설정창 값만 백업·복원하며 관리창 크기·Waypoint·사용자 색상·연결 출발점·Canvas 원본은 제외. 한국어 설정/확인/오류 안내 추가. 타입 검사·빌드·Sandbox 설치 파일 일치 및 로드 버전 확인. 최신 사용자 지시로 Computer Use 및 백업·복원 실제 조작 검증은 사용자에게 맡김. 설정창을 열어둠. 이번 범위는 사용자 동작 확인 대기이며 5단계 전체 완료 아님. 파일 전환은 미착수. verification/stage5-settings-user-check.md 참고. 중간 Release 없음.

## 0.5.1 Alt+I 파일 전환 (해당 버전 기록)
사용자가 0.5.0 설정 확인 후 Alt+I 구현 승인. 빈 텍스트 카드의 상단 메뉴에서 Markdown/Canvas/Image 선택 후 보관함 파일 선택. 이미지 검색·썸네일 목록 포함. 변환은 ID·좌표·크기·연결·Waypoint 보존. Native Canvas import의 동일 ID 타입 재사용을 보완해 text/file 전환 및 Undo 때 올바른 카드 종류 재생성. 설정/오류/검색 안내 한국어.
타입 검사·데이터 변환 검사·빌드 통과, 0.5.1 Sandbox 파일 일치·새 명령 등록 확인. 최신 사용자 지시대로 실제 UI/키 입력 검증은 사용자 담당. verification/file-insert-user-check.md 참조. Sandbox 열어둠. Release/push 없음.

## 0.5.2 파일 선택창 수정
문서/Canvas는 Obsidian FuzzySuggestModal 기본 검색 선택창으로 교체. 이미지 선택창은 썸네일 크기 슬라이더 및 생성일/수정일 최신순/오래된순 정렬 제공. 날짜는 Vault 파일 stat 기준. Alt+I 진입·빈 카드 변환·Undo 처리 유지.
타입 검사·빌드 통과. Sandbox 설치 파일 일치·플러그인 로드·명령 등록 확인. 사용자 요청대로 실제 화면 조작 검증은 사용자에게 맡기며 완료로 주장하지 않음. 중간 Release/push 없음.

## 0.5.3 이미지 생성 시기 묶음·창 크기 조절
이미지 선택창을 생성일 기준 오늘/어제/이번 주/이번 달/이전으로 중복 없이 분류. 로컬 날짜, 월요일 주 시작. 생성일/수정일 정렬은 각 묶음 내부에 적용. 검색·썸네일 크기 유지. 8방향 테두리/모서리 드래그로 창 크기 조절, 목록만 스크롤. 묶음 제목 제외한 썸네일의 실제 행 위치로 방향키 이동.
타입 검사·빌드·날짜 경계 검사 통과. Sandbox 설치 파일 일치/로드 확인. 실제 UI는 사용자 확인 대기(사용자 요청). Release/push 없음.

## 0.5.4 이미지 좌우 키 이동
검색 입력란에 포커스가 있으면 좌우 키를 반환하던 조건을 제거. 이미지 검색란/목록에서 네 방향키로 썸네일 선택. 정렬 선택·크기 슬라이더·취소 버튼의 고유 키 조작과 IME 조합 입력 보호 유지. 타입 검사·빌드 통과 및 Sandbox 설치 파일 일치/재로드. 사용자 지시에 따라 실제 UI 키 입력 확인은 사용자 담당. Release/push 없음.

## 0.5.5 미디어 미리보기 (해당 버전 기록)
사용자 승인: Alt+I에 PDF/Video/Audio 추가. PDF 첫 페이지 썸네일, 영상/음악 재생 확인, 이미지 큰 미리보기. 문서/Canvas는 기존 기본 검색 선택창 유지.
미디어 목록 Enter/클릭은 미리보기만 열고, 별도의 ‘카드에 넣기’로 삽입. 미리보기 ‘목록으로’/Esc는 삽입 없이 복귀. 플레이어는 수동 재생, 닫기/상위 선택창 종료/플러그인 해제 시 정지 및 소스 해제. PDF는 Obsidian loadPdfJs, 보이는 썸네일부터 최대 2개 동시 렌더링, 닫기/검색 시 작업 취소. 이미지 선택창의 날짜 구분·크기 조절·정렬·네 방향키 유지. PDF/영상도 같은 목록 틀 사용. 지원되지 않는 재생 형식은 한국어 오류 표시. PDF 암호 입력 기능은 추가하지 않음.
타입 검사·빌드, scripts/test-media-picker.mjs의 가짜 UI/디코더 테스트(미리보기와 삽입 분리·취소·재생 정리·PDF 작업 취소·변환 데이터 보존) 통과. 0.5.5 Sandbox 설치 파일 일치·로드·명령 등록 확인. 실제 PDF 렌더링·재생·삽입 UI/Undo는 사용자 지시에 따라 사용자 확인 대기. 실제 앱 검증 완료 아님. Release/push 없음.

## 0.5.6 파일 카드 교체·미디어 샘플
Alt+I는 빈 텍스트 카드 또는 기존 file 카드에서 사용. 기존 file 카드의 파일 확장자와 무관하게 새 파일 선택 가능. 내용 있는 텍스트 카드·Group·Link는 제외. ID/위치/크기/색/연결/Waypoint 보존, 이전 파일의 subpath는 새 파일에 이월하지 않음. 기존 Undo 경로 유지.
36가지 기존/새 파일 확장자 조합의 데이터 보존 및 비대상 거부 테스트 통과. 타입 검사·빌드·Sandbox 파일 일치/재로드. 실제 교체·Undo/미디어 재생은 사용자 확인 대기.
별도 Sandbox 폴더 ‘미디어 미리보기 샘플-1792495148055’에 PDF 3개·6초 MP4 3개(H264/AAC)·8초 MP3 3개 추가. 생성일을 오늘/어제/10일 전으로 구분. 파일 복사 일치 및 MP4/MP3 코덱·길이 검사 통과. 원래 Canvas/파일 보존. Release/push 없음.

## 0.5.7 미디어 선택 키 변경
미디어 목록 Enter는 선택 파일 즉시 삽입/교체. Ctrl+Enter는 미리보기 열기, 음악/영상은 재생 시작 시도(재생 제한 시 플레이어 버튼 사용 가능). 클릭 미리보기 유지. 가짜 UI 키 처리 테스트·타입 검사·빌드 통과 및 Sandbox 재설치. 실제 앱 키 입력은 사용자 확인 대기. Release/push 없음.

## 0.5.8 미리보기 버튼 제거·Ctrl+Enter 닫기
사용자 이미지 주석에 따라 미리보기 하단 목록으로/카드에 넣기 버튼 제거. 목록 Ctrl+Enter → 미리보기, 미리보기 Ctrl+Enter → 닫고 기존 목록 선택 복귀. 재생 정지, PDF 작업 취소 유지. 목록 Enter만 즉시 삽입/교체. Esc/닫기 아이콘 유지. 코드 키 처리/재생 정리 테스트·타입 검사·빌드 통과, Sandbox 설치 파일 일치 및 재로드. 실제 화면 조작은 사용자 확인 대기. Release/push 없음.

## 0.5.9 미리보기 재생 단축키
사용자 승인대로 영상/음악 미리보기 내부에서 Space 재생/일시정지, 좌우 5초 이동, 상하 음량 5%, M 음소거 토글. Ctrl+Enter 닫기 유지. 목록 방향키와 이미지/PDF에는 적용하지 않음. 키 길게 누를 때 재생/음소거 토글 반복 방지, 재생 위치/음량 경계 보호. 미리보기 아래 한국어 키 안내 표시.
가짜 플레이어 키 처리·경계·조합키 보호 테스트, 타입 검사·빌드 통과. 0.5.9 Sandbox 설치 파일 일치 및 재로드. 실제 UI/재생은 사용자 확인 대기. Release/push 없음.

## 0.5.10 미리보기 열기 즉시 키 입력
미리보기 안에서 발생한 DOM 키 이벤트만 처리하던 구조에 활성 Modal scope 단축키 등록을 추가. 열기 직후 미리보기 창 포커스 지정 및 다음 프레임 재확인, 닫기 시 예약 해제. 클릭 없이 Space/방향키/M/Ctrl+Enter 사용 목적. 가짜 UI 포커스·scope 처리 테스트 및 기존 테스트·타입 검사·빌드 통과. Sandbox 설치/재로드. 실제 앱에서 클릭 없는 입력 확인은 사용자 담당. Release/push 없음.

## 0.5.11 영상 삽입 크기 수정
Sandbox 읽기 전용 데이터 확인: 문제 카드의 이력은 이미지 369x369 → 음악 369x42 → 영상 75x42. 파일 전환에서 이전 높이를 그대로 넘겨 Native 영상 비율 맞춤이 너비까지 축소한 원인 확인. 플러그인 Auto Resize는 text 카드 편집 종료에만 적용.
영상 삽입/교체 시 기존 너비와 설정 기본 카드 너비 중 큰 값을 사용하고 높이는 기존 높이와 해당 너비의 9/16 중 큰 값으로 초기 공간 확보. Native 실제 영상 비율 맞춤 유지. 큰 카드/좌표/연결/ID 보존, 이후 수동 크기 제한 추가 없음. 다른 파일 종류 영향 없음. 기존 작은 카드는 Alt+I로 영상 재선택 시 적용.
코드 회귀 테스트(audio 369x42→video 500x282, 큰 카드 보존, 비영상 크기 보존), 전체 미디어 코드 테스트·타입 검사·빌드 통과. 0.5.11 Sandbox 설치 파일 일치·재로드. 실제 영상 삽입 및 Undo 확인은 사용자 담당. Release/push 없음.
