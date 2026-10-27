# Stufenplan und technische Grenzen

## Stufe 0: Marktgespräche und UX-Demo (jetzt)

Artikel/Betrag wählen, Warenkorb verstehen, expliziten Testabschluss auslösen,
Demobeleg ansehen, Teststorno und Test-Tagesübersicht durchgehen. Kassenname und
Artikel anpassen zeigt den Selbstbaugedanken. Keine echte Geldannahme, Karte,
Steuerberechnung, Fiskalisierung, Buchhaltung oder rechtsgültigen Belege.

Der Browser speichert nur Testdaten lokal. „Lokal“ bedeutet nicht, dass ein frisch
geöffneter Browser ohne laufenden lokalen Webserver funktioniert. Kein ungeprüftes
Offline- oder Synchronisationsversprechen. Exakter Umfang: TESTNACHWEIS.md.

## Stufe 1: Architektur nach positivem Marktentscheid (offen)

Ein Auftrag erhält eine unveränderliche Vorgangs-ID. Warenkorbentwurf, bestätigte
Zahlung, Fiskalvorgang, Beleg und Storno sind getrennte Zustände mit Referenzen.
Erfolg erst nach bestätigtem Speichervorgang; abgeschlossene Vorgänge nicht einfach
überschreiben. Ein Journallog oder Hash allein beweist keine Rechtskonformität.

Zahlungen über einen bestehenden Anbieter. Zustände wie angefragt, ausstehend,
bestätigt, abgelehnt und unklar unterscheiden. Bei Timeout nicht blind neu abbuchen:
Anbieterstatus mit derselben Vorgangsreferenz abgleichen, Wiederholungen mit dessen
Idempotenzfunktion absichern und unbekannte Fälle sichtbar zur Klärung behalten.
Rückerstattung und internes Storno sind unterschiedliche Vorgänge. Noch kein
Anbieter ausgewählt, SDK verbunden oder produktiver Vertrag abgeschlossen.

Zunächst ein Gerät als verbindliche Schreibinstanz. Mehrgeräte-Synchronisierung
später ausdrücklich entwerfen: Konflikte, Reihenfolge, Idempotenz, lokale Uhren,
Berechtigungen und Wiederanlauf. Kein Last-write-wins für bestätigte Verkäufe.
Offline-Recht und Providerfähigkeit hängen vom ausgewählten Gesamtsystem ab.
Keine Kartendaten im eigenen Kern speichern.

## Stufe 2: Zuverlässigkeit vor dem produktiven Pilot

| Fall | Akzeptanzziel | Stand |
|---|---|---|
| Doppelklick/gleiche Vorgangs-ID | kein zweiter Testabschluss bzw. keine zweite Providerbuchung | Demo separat testen; echter Provider offen |
| Browser-/App-Neustart | letzter bestätigter Zustand vorhanden; kein erfundener Erfolg | Demo separat testen; echtes Gerät offen |
| Speicher voll/gesperrt | verständlicher Fehler, kein Erfolg vor Commit | Demo separat testen |
| WLAN weg/Provider-Timeout | unklaren Status anzeigen, später abgleichen statt neu abbuchen | Providerintegration offen |
| Stromausfall beim Schreiben | bestätigte Vorgänge wiederherstellbar; offenen Zustand erkennen | Hardware-/Dauerlauftest offen |
| Storno/Rückerstattung | eindeutige Referenz, nachvollziehbarer Grund, keine Dopplung | nur Teststorno in Demo; Provider offen |
| Update/defekte Version | überprüftes Paket, Migration, Backup und Rückweg | offen |
| Restore/Export | vollständige Datenprüfung, dokumentierter Wiederanlauf | offen; kein Fiskalexport in Demo |
| Drucker/TSE nicht erreichbar | keine stille Verschluckung, definierter Betriebsvorgang | Hardware-/Fiskalanbindung offen |

Hardware nach Messungen auswählen: Reaktionszeiten im Zielablauf, Tageslaufzeit,
Laden, Druckverhalten, Reparatur/Austausch und verfügbare Ersatzteile. Bisher
keine Geräte ausgewählt oder auf Basis unbestätigter Herstellerbehauptungen gekauft.

## Stufe 3: 1 bis 3 Pilotbetriebe (offen)

Zunächst reine Beobachtung/Paralleltest mit Testvorgängen; für einen produktiven
Pilot vorher rechtliche und technische Einsatzfreigabe sowie Verträge klären.
Altsystem als definierter Rückfallweg. Testablauf, Schulung, Dauer, Ansprechpartner,
Supportfenster, Datenumfang und Abbruchkriterien schriftlich festhalten.

Messen: erfolgreiche/fehlgeschlagene Abläufe, Bearbeitungszeit, Abbrüche,
Statusunklarheit, Wiederanlaufzeit und Supportminuten. Keine Zahlung doppelt
belasten, um einen Testfehler zu demonstrieren. Ergebnisse gegen vorher vereinbarte
Ziele bewerten; keine erfundenen Leistungs-/Preisvorteile gegenüber Wettbewerbern.
Erst danach Verkauf, Skalierung und Investitionen entscheiden.
