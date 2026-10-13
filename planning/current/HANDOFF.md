# HANDOFF — Canvas Mindmap Planning Pack

## 1. Current Goal
Obsidian Canvas Mindmap 기능을 확정 기획대로 구현하고 별도 테스트 Vault에서 검증한다.

## 2. Current Version
기획 패키지: `visual-review-swap01-resolved-2026-10-12`. 플러그인 버전 및 실제 릴리스는 저장소 확인 필요.

## 3. Completed
본 팩의 128개 요구사항과 42개 수용 테스트, 214개 SVG, 단일 HTML 시안 제작. **SWAP-01 사용자 결정 해결**.

## 4. In Progress
실제 Obsidian API 및 Undo/Redo 통합 검증, Canvas 파일 수명주기 및 전용 데이터 유지 시험. 브라우저 미리보기는 플러그인 동작 검증이 아님.

## 5. Decisions
- SWAP-01: 크기가 다른 카드도 **기존 간격 유지 우선**, X좌표 상호 교환, Y좌표 간격 유지 보정.
- 대표 사례 E(100,100,h80), C(120,280,h160) → C(100,100,h160), E(120,360,h80) · 간격100 유지.
- 그 외 모든 확정 규칙은 `01_PRODUCT_SPEC.md`와 `05_PLANNING_STATE.md` 참조.

## 6. Known Issues
CM-011 Tab 연결 출발점 재검토, CM-050/116/120/125 기술 검증, CM-126 초기 원본 대조. 기획에 없는 값은 추측 금지.

## 7. Verification
`VERIFICATION_REPORT.md`를 참고하되 실제 플러그인 동작의 완료 증거로 취급하지 않는다. SWAP-01 검증은 `T06`, `T38`에서 미실행이다.

## 8. Next Action
정확한 사용자 결정이 반영된 명세·도식·HTML을 기준으로 구현 가능성 평가 후, 별도 테스트 Vault에서 수용 테스트 실행.

## 9. Do Not Change
사용자 미승인 기능 추가, 임의 생성 단축키, 숨겨진 부모/자식 데이터, 원본 Canvas 손상, Undo 그룹 분리, 설정 백업 범위 확장 금지.

## 10. Relevant Files
- [Codex 개발 인계 세부사항](06_CODEX_HANDOFF.md)
- [기능 명세](01_PRODUCT_SPEC.md)
- [위치 교환 확정 도식](diagrams/SWAP-01_RESOLVED.svg)
- [SWAP-01 확정 설명](SWAP_01_RESOLVED.md)
- [수용 테스트](04_ACCEPTANCE_TESTS.md)
- [전체 HTML 검수](interactive-preview.html)
