# 04 — Planning State

## Project
- Name: Canvas Mindmap
- Goal: Obsidian Canvas 키보드 중심 카드 조작과 Waypoint·색상·설정 보조
- Phase: 사용자 요구사항 통합 완료, Codex 검증 전, 최종 사용자 승인 전

## 확정 (P1)
| ID | Topic | Decision |
|---|---|---|
| D01 | 카드 간격 | 100px, 사용자 설정 가능 |
| D02 | 기본 카드 크기 | 모든 플러그인 카드 생성에 설정값 적용 |
| D03 | 카드 생성/밀어내기 | 연결 다단계 및 연쇄 충돌 포함, 기준 카드 고정 |
| D04 | Tab 삽입 | 빈 공간 활용, 부족분만 이동, 왼쪽 정렬 |
| D05 | 위치 교환 | Ctrl+Alt+상하, 단일 선택, X/Y 교환, 허용 X 차이 기본 40px |
| D06 | 수동 크기 | Ctrl+Shift+방향키, 기본 20px, 단일 선택, 좌상단 고정 |
| D07 | Auto Resize | ON/OFF, 편집 종료 시 양방향 크기 맞춤, 설정 전역 공유 |
| D08 | 탐색 | Alt+방향키, 가까운 카드, 화면 중앙, Zoom 유지, 250ms 애니메이션 |
| D09 | Waypoint | 카드/카메라, 번호 공유, Canvas별 저장, 복제/rename/move 유지 |
| D10 | Waypoint Manager | Ctrl+Alt+W, 커서 팝업, 외곽 크기 변경, 이름 편집·삭제 |
| D11 | 색상 팔레트 | Ctrl+Alt+C, 다중 선택, 기본+사용자 색상, 전체 Canvas 공유 |
| D12 | Undo/Redo | Ctrl+Z/Ctrl+Shift+Z, 작업별 역순, Canvas별, 세션 내 기록 |
| D13 | 데이터 보존 | 비활성화/재설치 후 전용 데이터 보존 요구 |
| D14 | 설정 백업 | 설정만 내보내기, 파일 위치 선택, 확인 후 전체 교체, 오류 시 전체 중단 |

## 제외
- Alt 탐색 중 자동 Zoom 및 Shift+2 Fit Selection 동작
- Auto Resize 일회성 별도 명령
- 색상 팔레트의 HEX 직접 입력 UI
- 색상 팔레트의 기본 색상 복원 전용 항목
- Waypoint/색상 목록/Canvas 파일의 **설정 백업 포함**
- Undo/Redo 기록 영구 저장

## 재검토 / 확인 필요
| ID | Item | 이유 | 담당 |
|---|---|---|---|
| R01 | 다중 선택 이동 Undo 후 선택 상태 | 직전 질문은 사용자 미응답. 기본 Obsidian 동작 우선 | Codex 기본 동작 검증; 의도 차이 크면 사용자 |
| R02 | 카드 생성·연결 생성의 전체 키 조합 및 범위 | 현재 대화에서 완전한 최초 기획 자료 확인 불가 | 원본 기획서 대조 |
| R03 | 숫자패드 0 등 번호 범위 | 대화에서 1~9만 명시 | 원본 기획서 대조 |
| R04 | 지원 OS/Obsidian 버전·배포 대상 | 현 대화에서 최종 명시 확인 불가 | 원본 기획서 대조 |
| R05 | 프로젝트 최상위 17항목 명세 | PROJECT_INSTRUCTIONS.md 미제공 | 파일 확보 후 정합성 점검 |

## 주요 위험
- Canvas 공식/비공식 API 경계, Undo 통합 불가 가능성: High
- 플러그인 제거 후 보존·재설치 자동 복원 보장 불확실: High
- Canvas 외부 복제 시 Waypoint 참조 재매핑 불확실: High
- 연쇄 밀어내기에서 순환 연결/다중 충돌로 데이터 불일치: High
- 기본 단축키와 Obsidian/OS 충돌: Medium
- 대형 Canvas에서 반복 키 입력·재배치 성능: Medium

## Next Action
원본 최초 기획 자료와 미제공 최상위 지침을 대조한 후 Codex가 기술 가능성을 검증. 기술 제약으로 사용자 경험 변경이 필요할 때만 사용자에게 재질문.
