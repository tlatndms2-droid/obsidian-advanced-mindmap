# Canvas Mindmap

Windows용 Obsidian Canvas 플러그인 **0.5.12**.
키보드로 카드 생성·탐색·연결·정렬, Waypoint, 색상 선택, 파일 교체와 미디어 미리보기를 사용할 수 있습니다. 설정과 안내는 한국어입니다.

## 설치
- [GitHub Release](https://github.com/tlatndms2-droid/obsidian-advanced-mindmap/releases/latest)에서 `main.js`, `manifest.json`, `styles.css`를 받습니다.
- 보관함의 `.obsidian/plugins/canvas-mindmap/`에 세 파일을 넣고 Obsidian의 커뮤니티 플러그인에서 Canvas Mindmap을 켭니다.
- BRAT을 사용한다면 저장소 주소 `https://github.com/tlatndms2-droid/obsidian-advanced-mindmap`을 등록합니다. 이번 배포에서는 사용자 요청에 따라 BRAT 설치·업데이트 검사를 생략했습니다.

## 주요 조작
| 키 | 동작 |
|---|---|
| Ctrl 0.5초 | 생성 모드 선택 |
| Ctrl+방향키 / Tab | 방향 생성 / 아래 형제 카드 생성 |
| Tab 0.5초 | 연결 출발점 선택 |
| Ctrl+Space | 카드 편집 진입·종료 |
| Alt+방향키 | 카드 탐색 |
| Ctrl+Shift+방향키 | 카드 크기 조절 |
| Ctrl+Shift+L | 연결된 카드 정렬 |
| Alt+W | Waypoint 관리창 |
| Ctrl+Shift+C | 색상 선택 |
| Alt+I | 빈 카드에 파일 삽입 / 파일 카드 교체 |
| Enter / Ctrl+Enter | 파일 선택 확정 / 미리보기 열기·닫기 |
| X | 선택 카드 삭제 |
| Ctrl+Z | 실행 취소 |

파일 선택은 문서·Canvas·이미지·PDF·영상·음악을 지원합니다. 영상·음악 미리보기에서는 Space로 재생/정지, 좌우 방향키로 탐색, 상하 방향키로 음량 조절, M으로 음소거합니다.
설정 백업·복원은 설정창의 설정값만 대상으로 합니다. 플러그인을 삭제하고 재설치할 때 설정·사용자 색상의 자동 보존은 보장하지 않습니다.

## 현재 기준과 확인
- [5단계 최신 동작](planning/revised/STAGE5_CURRENT.md): 설정만 백업·복원, Alt+I 파일 삽입/교체, 미디어 미리보기·재생 키.
- [6단계 코드 결과](verification/stage6-code-report.md): 실행한 테스트와 한계.
- [사용자 확인 목록](verification/stage6-user-check.md): 기능 결합·Undo·저장·재시작·화면 확인.
- [인계](HANDOFF.md): 최신 요약 및 버전별 이력.
- [단계별 계획](DEVELOPMENT_PLAN.md): 개발 순서. 초기 시간 추정은 현재 실측과 다름.

원본 ZIP과 planning/current는 보존한다. 원본의 128개 요구사항과 개정본 43개 테스트·215개 SVG는 역사적 기준이다. 사용자 정정으로 제외/변경된 내용은 최신 기준이 우선하며, 원본 개수 검사 통과는 현재 제품 전체 검증을 뜻하지 않는다.

## 코드 검사
```text
node node_modules/typescript/bin/tsc --noEmit
node scripts/test-all.mjs
node build.mjs
node scripts/check-planning.mjs
```
테스트는 로컬 계산/가짜 UI 대상이며 실제 Obsidian 화면을 조작하지 않는다. 사용자는 2026-10-20 현재 기능 전체 확인을 완료했다고 보고했다. 이를 자동 UI 검증 결과와 구분한다. 제거·재설치 보존 확인과 BRAT 검사는 사용자 요청으로 생략했다.
