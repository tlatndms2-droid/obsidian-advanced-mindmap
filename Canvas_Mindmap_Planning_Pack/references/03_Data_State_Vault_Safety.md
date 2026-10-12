# Data State and Vault Safety
데이터를 원본 사용자 파일 / plugin data / cache / 파생 데이터 / UI 상태 / 외부 데이터로 분류한다.

각 핵심 데이터는 입력 → 생성 → 식별 → 수정 → 저장 → 동기화 → 삭제 → 복구 흐름을 정의한다.

참조 관계에서는 다음을 정한다.
- 기준 ID
- rename/move 영향
- 원본 삭제 시 처리
- 복제 시 새 객체 여부
- 여러 Canvas 배치 가능 여부

Vault 수정 기능은 덮어쓰기/사본, 변경 전 검증, 부분 실패 rollback, 취소, 불일치 시 source of truth를 정의한다.

저장 전략: 즉시/지연, debounce, 저장 실패, 동시 수정, reload 복원, schema migration.

대량 데이터에서는 전체 재스캔을 최소화하고 필요한 범위만 갱신하며 캐시 무효화 조건을 정의한다.
