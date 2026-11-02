# Prüfstand POS-Gesprächsprototyp 0.1.0 — 27.10.2026

4/4 Node-Modelltests bestanden:

- Dezimale Euroeingaben werden ohne Gleitkommarechnung in Integer-Cent gewandelt;
  ungültige, mehrdeutige und zu große Beträge werden abgelehnt.
- Warenkorbgrenzen, unveränderter Altzustand bei Fehler, Commit-Token gegen
  wiederholten Testabschluss und Abweisung veralteter Zeilenentfernung.
- Append-only-Demostorno, keine doppelte Stornierung oder unbekannte Referenz.
- Historische Beträge bleiben bei Kassenanpassung erhalten; Abschlussanzeige
  berechnet den früheren Stand bis zur damaligen Demomarkierung.

10/10 echte Chrome-Checks bestanden:

1. Artikelwahl und Warenkorb nach tatsächlichem Neuladen.
2. Freier Centbetrag, Karten-Simulation und ausdrücklich nichtfiskalischer Beleg.
3. UI-Storno ändert aktuellen Testsaldo, frühere Abschlussmarkierung bleibt gleich.
4. Eigener Kassenname/Artikel persistieren und können im Warenkorb genutzt werden.
5. 20 konkurrierende IDB-Testabschlüsse mit demselben Warenkorbtoken: genau ein
   Demoevent, 19 Ablehnungen. Kein Nachweis echter Doppelabbuchungsvermeidung.
6. Lokaler JSON-Download ohne Datenübertragung an Zahlungsanbieter oder Server.
7. Bereits geladener Tab speichert bei deaktiviertem Browsernetzwerk. Danach
   Reload über den wieder verfügbaren lokalen Server. Kein Offline-PWA-Nachweis.
8. Desktop und 390px ohne horizontalen Überlauf oder App-Pageerrors; Screenshots
   visuell geprüft. Der Prototypwarnhinweis bleibt auch beim Scrollen zur Zahlungsweg-Simulation sichtbar. Das ist eine Browseransicht, kein physischer Touchgerätetest.
9. Verweigerter IndexedDB-Zugriff bestätigt keinen Testverkauf.
10. Simulierter Schreib-/Quota-Abbruch nach Appstart: kein Erfolg, keine teilweise
    gespeicherte Warenkorbänderung und nach Reload weiterhin unveränderter Stand.

Frische Chromeprofile, synthetische Preise/Artikel und eigener Loopbackserver.
Keine realen Kundendaten, Kartendaten, Bankkonten, Aufnahmegeräte oder Zahlungen.
Keine getestete TSE, DSFinV-K, GoBD-/DSGVO-Konformität, Hardwareanbindung, echte
Stromunterbrechung, Drucker, Multi-Geräte-Synchronisierung oder Produktionsfreigabe.
Auch Browser-IndexedDB mit durability:strict ist kein Fiskalsystemnachweis.

Reproduktion: npm test. Für Chrome: Playwright vorhanden und PLAYWRIGHT_MODULE
auf dessen index.mjs setzen, dann node tests/browser.mjs. Testausgaben liegen in
test-results/ und werden nicht als Kundendaten mitgeliefert. Liefernachweise sind
separat im Chat unter outputs/20261027/POS/nachweise. Keine Runtime-Abhängigkeiten.


## 02.11.2026 — lokale Demowiederherstellung

8 Modell-Testgruppen, 10 bestehende Browser-Prüfgruppen und 6 neue Wiederherstellungs-Prüfgruppen bestanden. Echter lokaler Export/Import-Rundlauf, Schutz bestehender Daten, konkurrierende Importe und atomarer Fehlerpfad geprüft. Keine Zahlung oder Fiskalprüfung. Import ausschließlich in eine frische leere Demo; keine vorhandenen Daten überschrieben. Details und Reproduktion in TESTING.md. Frühere Einträge beschreiben ihren damaligen Stand.
