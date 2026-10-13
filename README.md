# Canvas Mindmap

Windows용 Obsidian Canvas 플러그인의 단계별 개발 프로젝트입니다.

## 현재 상태

**0단계 개발 기반·기술 가능성 확인 완료. 제품 기능 구현 전이며 배포하지 않았습니다.**

- 기준 팩: `planning/current/`의 새 SWAP01_RESOLVED 팩. 원본 ZIP은 변경하지 않았습니다.
- 요구사항 128개, 수용 테스트 42개, SVG 214개를 보존하고 ID·파일 연결을 확인했습니다.
- 현재 설치되는 플러그인은 동작을 추가하지 않는 0단계 기반입니다.
- 제품 수용 테스트 42개는 아직 미실행입니다. 기본 Canvas 기능으로 수행한 기술 시험과 구분합니다.
- 생성 메뉴와 각 기능 UI는 사용자 검수를 받은 뒤 구현합니다.

## 문서

- `canvas-mindmap-uiux-spec.html`: 15개 화면·상태를 펼친 인터랙티브 검수 문서. 디자인 승인 전.
- `DEVELOPMENT_PLAN.md`: 승인된 단계별 개발 순서.
- `verification/stage0.md`: 실제 Sandbox 기술 시험의 결과와 한계.
- `verification/implementation-status.json`: 제품 요구사항·테스트 진행 상태.
- `HANDOFF.md`: 다음 작업과 Sandbox 정보.

## 개발 확인

개발 의존성은 `package.json`과 `pnpm-lock.yaml`에 기록합니다. 현재 환경에서 패키지 설치 스크립트 승인 정책을 바꾸지 않고 아래 Node 실행으로 빌드·검증했습니다.

```text
node build.mjs
node node_modules/typescript/bin/tsc --noEmit
node scripts/check-planning.mjs
```

`main.js`는 빌드 산출물입니다. 아직 GitHub Release나 BRAT 설치용 완성품이 아닙니다.

## 범위

검증은 전용 Sandbox에서만 수행합니다. 사용자 원본 Vault를 변경하지 않습니다. 다른 버전·모바일 지원은 검증 전 보장하지 않습니다.
