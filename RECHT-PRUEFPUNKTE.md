# Deutsche Prüfpunkte vor produktivem Kassenbetrieb

Recherchestand 27.10.2026. Arbeitsliste, keine vollständige Rechtsprüfung oder
Betriebsfreigabe. Noch keine TSE-/DSFinV-K-/GoBD-/DSGVO-Konformität nachgewiesen.
Die Einordnung hängt vom tatsächlich angebotenen System und Einsatz ab.
Selbstbau oder ein Demo-Hinweis ersetzt diese Prüfung nicht.

## Elektronische Kassenfunktion und Fiskalisierung

§146a AO und KassenSichV regeln den betroffenen Systembereich; die BMF-FAQ stellt
unter anderem auf den Funktionsumfang von Kassenmodulen und die Möglichkeit zur
Abwicklung barer Vorgänge ab. Deshalb nicht aus „DIY“, „nur Karte“ oder einem
abschaltbaren Menüpunkt automatisch auf eine Ausnahme schließen. Vor einem
kommerziellen Angebot oder produktiven Pilot Einordnung, TSE-Anbindung,
Belegangaben/-ausgabe, Ausfallverfahren und Meldeprozess konkret prüfen.

Primärquellen:
- [§146a AO](https://www.gesetze-im-internet.de/ao_1977/__146a.html)
- [KassenSichV](https://www.gesetze-im-internet.de/kassensichv/)
- [BMF-FAQ Kassengesetz, Stand 29.04.2026](https://www.bundesfinanzministerium.de/Content/DE/FAQ/FAQ-steuergerechtigkeit-belegpflicht.html)

## Export und Aufbewahrung

Die DSFinV-K ist eine definierte Schnittstelle, kein beliebiger CSV-/JSON-Export.
Das BZSt führt DSFinV-K2.4 mit Anwendungshinweisen auf. Vor Implementierung die
maßgebliche Spezifikation und Einsatzanforderungen prüfen. In dieser Demo sind
weder DSFinV-K noch TSE-Export, rechtssichere Archivierung, Kassensturz oder
Verfahrensdokumentation implementiert. GoBD-Anforderungen an das Gesamtsystem
und den Betreiberprozess bleiben gesondert zu prüfen.

[BZSt: DSFinV-K und Downloads](https://www.bzst.de/DE/Unternehmen/Aussenpruefungen/DigitaleSchnittstelleFinV/digitaleschnittstellefinv_node.html?lv2=90794)
Recherchehinweis: BZSt-Inhalt war über das Suchergebnis verfügbar, direkter Abruf
wurde vom Server mit403 abgewiesen. Keine vollständige Spezifikationsprüfung.
Der recherchierte BMF-GoBD-Änderungslink von2025 war bei direktem Abruf503;
dessen Inhalt wurde hier nicht als geprüft übernommen. GoBD bleibt Prüfauftrag.

## Datenschutz und Supportzugriff

Datenminimierung, datenschutzfreundliche Voreinstellungen und angemessene
technische/organisatorische Maßnahmen gehören in die spätere Auslegung.
Dafür Verantwortlichkeiten, Rechtsgrundlagen, Aufbewahrung/Löschung, notwendige
Auftragsverarbeitung und bewusste Supportzugriffe prüfen. Keine pauschale
„DSGVO-zertifiziert“-Aussage. Die Demo benötigt keine Kunden-/Karten-/Kontodaten.

[BfDI: DSGVO/BDSG, insbesondere Artikel25 und32](https://www.bfdi.bund.de/SharedDocs/Downloads/DE/Broschueren/INFO1.pdf?__blob=publicationFile&v=16)

## Offene Freigaben

Konkrete Zielgruppe und Länder, Bar-/Kartenabläufe, Steuer-/Rechnungsumfang,
zuständige fachliche Prüfung, zertifizierter TSE-Partner und dessen zulässige
Einsatzumgebung, Zahlungsanbieter-Vertrag, Hardware, Export-/Restore-Nachweise,
Vertriebslizenz und Supportvertrag. Für keinen Punkt liegt eine Freigabe vor.
Bis dahin ausschließlich Testdaten und keine öffentliche Produktveröffentlichung.
