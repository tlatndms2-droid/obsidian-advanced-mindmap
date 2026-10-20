> 현행 단계 안내(2026-10-14): 승인 계획의 0단계 기준 정리. 상위 ../../HANDOFF.md와 ../../DEVELOPMENT_PLAN.md, APPROVED_UI.md를 따른다. 아래 과거 문구는 구현·시험 자동 시작 지시가 아니다.

# 최신 작업 범위 — 이전 인계 내용보다 우선

현재 목표는 누적 확정 사항을 문서에 반영하여 개발 준비 기준을 갖추는 것이다. 코드 구현·개발 계획 신규 작성·빌드·Sandbox 시험·Release·외형 디자인은 시작하지 않는다.
최신 기준 파일: planning/revised/DEVELOPMENT_BASELINE.md (개정본 안에서는 DEVELOPMENT_BASELINE.md).
제품 기능은 구현 전이고 테스트는 미수행이다. 아래는 과거 단계 기록이며 다음 행동을 자동 승인하는 지시가 아니다.

---

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


## 2026-10-13 개정 상태

원본 planning/current 및 ZIP은 보존했다. 현재 검수 기준은 planning/revised. 원래 128개 요구사항·214개 SVG 파일명을 유지하고 T43 파일 전환 테스트와 SVG를 추가했다(43개 테스트·215개 SVG). 사용자 확정 생성 규칙은 CM-001과 DECISIONS.md에 반영했다. CM-011 기본 A–E는 원본 이미지로 확인됐지만 예외는 미확정이다. 모든 수용 테스트는 제품 미실행이며 기존 브라우저 검증 기록은 원본 버전의 기록이다. 개정본 검사 결과는 verification/planning-revision.md를 확인한다.
