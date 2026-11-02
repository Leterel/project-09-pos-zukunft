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
8 Modell-Testgruppen, 10 bestehende Browser-Prüfgruppen und 6 neue Wiederherstellungs-Prüfgruppen bestanden. Echter lokaler Export/Import-Rundlauf, Schutz bestehender Daten, konkurrierende Importe und atomarer Fehlerpfad geprüft. Keine Zahlung oder Fiskalprüfung.

Bei fehlenden Paketen/Hardware/Betriebssystemen ist das Ergebnis „nicht ausgeführt“, kein Pass. Plattformnachweise aus älteren Detailberichten gelten nur für die dort genannten Versionen. Android-Automatisierung ausschließlich mit expliziter emulator-Seriennummer und bestätigtem ro.kernel.qemu=1. Physische Geräte, persönliche Medien und Produktionskonten sind keine Testfixtures.

## Vor Merge
`git diff --check` ausführen; relevante Funktionstests wiederholen, wenn Codeänderungen ihren Befund entwerten. Speicherdaten/alte Versionen erhalten. Fehlende externe Abnahmen in HANDOFF.md benennen.

## Wiederherstellung am 02.11.2026

`node --test tests/*.test.mjs`: 8 Pass, 0 Fehler. Neue Gruppen: Rundlauf inklusive Storno/Abschluss/Warenkorb, Schutz vor Überschreiben, Versions-/Schema-/UTF-8-Größenfehler und Objektfeldisolation.

`node tests/browser.mjs`: alle 10 bestehenden Browsergruppen bestanden. `node tests/backup-browser.mjs`: 6 neue Gruppen bestanden, darunter echte UI-Downloaddatei in frischem Browserprofil, Vorschau ohne Mutation, HTML als Text, atomare Leerstandsprüfung, zwei konkurrierende Importe (genau einer erfolgreich), simulierte Quota-Ablehnung ohne Teilzustand und 390px. Playwright/Chrome waren vorhanden; kein Download oder Provider. Mobile Wiederherstellungsansicht visuell angesehen. Kein Hardware-/Zahlungs-/Fiskaltest. Ausgaben: test-results/backup und test-results/backup-regression.
