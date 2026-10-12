# Obsidian Plugin Fundamentals
Obsidian Community Plugin은 일반적으로 TypeScript로 개발하고 JavaScript로 빌드한다.

핵심 산출물: `manifest.json`, `main.js`, 선택적 `styles.css`. 저장소에는 보통 TypeScript source, README, LICENSE도 둔다.

manifest의 핵심 필드: id, name, version, minAppVersion, description, author, isDesktopOnly. 로컬 개발에서는 id와 플러그인 폴더명을 일치시키는 것이 중요하다.

기획 시 생명주기: load → 등록 → 사용자 작업 → 저장 → unload/reload → 업데이트 호환.

주요 확장 접점: Commands, Ribbon, Settings, Modal, Menu, Workspace/Leaf/View, Editor, Markdown, Vault/File, Metadata, Canvas, Events, Drag & Drop.

API 이름보다 먼저 '사용자가 어디에서 무엇을 하고 어떤 결과를 얻는가'를 확정한다.

공식 문서는 주 Vault가 아닌 별도 개발 Vault 사용을 권장한다.
