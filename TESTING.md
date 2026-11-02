# Tests und Reproduzierbarkeit — POS Zukunft

## Voraussetzungen
Node 22+; Browser mit IndexedDB. Playwright für Browserproben.

## Befehle
```text
node --test tests/*.test.mjs
node tests/browser.mjs
```

Start/Build: node server.mjs; http://127.0.0.1:8852 öffnen. Ausschließlich synthetische Beträge.

## Tatsächlicher Befund vom 02.11.2026
4 Modelltests und Browserregression für Speichern/Reload/Tab-Konflikte/Testverkauf/Storno/Export/Speicherfehler bestanden. Keine Zahlung oder Fiskalprüfung.

Bei fehlenden Paketen/Hardware/Betriebssystemen ist das Ergebnis „nicht ausgeführt“, kein Pass. Plattformnachweise aus älteren Detailberichten gelten nur für die dort genannten Versionen. Android-Automatisierung ausschließlich mit expliziter emulator-Seriennummer und bestätigtem ro.kernel.qemu=1. Physische Geräte, persönliche Medien und Produktionskonten sind keine Testfixtures.

## Vor Merge
`git diff --check` ausführen; relevante Funktionstests wiederholen, wenn Codeänderungen ihren Befund entwerten. Speicherdaten/alte Versionen erhalten. Fehlende externe Abnahmen in HANDOFF.md benennen.
