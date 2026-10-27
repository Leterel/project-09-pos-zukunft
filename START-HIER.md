# POS Zukunft 0.1.0 ausprobieren

1. Das vollständige Quellenpaket in einen eigenen Ordner entpacken.
2. Mit vorhandenem Node.js 22+ unter Windows Start-POS.cmd öffnen.
   Alternativ im Ordner node server.mjs ausführen.
3. http://127.0.0.1:8852 öffnen. Keine npm-Installation für die Demo nötig.
   Das Terminal geöffnet lassen; Strg+C beendet den lokalen Server.

Nur synthetische Artikel und Testbeträge verwenden. Artikel antippen oder freien
Betrag eingeben, Warenkorb prüfen, Bar-/Karten-Simulation wählen und Testverkauf
lokal speichern. Erst nach dem Browser-Speichercommit erscheint der Demobeleg.
Es wird kein Zahlungsanbieter kontaktiert und kein Geld bewegt.

Demobelege lassen sich ansehen und bewusst drucken. Drucken wurde nicht praktisch
mit einem Drucker geprüft. Storno setzt eine neue Demomarkierung; keine echte
Erstattung. Test-Abschluss hält die bisherige Übersichtsposition fest, ist aber
kein fiskalischer Tagesabschluss. Die Anzeige zeigt die letzten zwölf Verkäufe
und drei Abschlussmarkierungen; im Export stehen alle gespeicherten Demoevents.

Unter Meine Kasse anpassen Namen und bis zu 20 eigene Demoartikel anlegen.
Diese Anpassung demonstriert Selbstbau/DIY. Bezahlter Support ist ein noch zu
prüfendes Geschäftsmodell; keine Buchung oder Zahlung dafür ist implementiert.

Speicherung nur in diesem Browserprofil und unter dieser lokalen Adresse.
Browserreinigung oder Verlust des Profils kann alle Demodaten löschen. Der JSON-
Export ist eine Datenmitnahme-Demo, kein steuerlicher Export; Import/Restore sind
noch nicht implementiert. Maximal 500 Demoevents, 40 Warenkorbzeilen und 99 Stück
pro Zeile. Der bereits geladene Tab kann ohne Netzwerk weiter testen, aber ein
Neuladen erfordert weiterhin den lokalen Server. Keine installierbare Offline-PWA,
Synchronisierung, Hardwareanbindung oder Stromausfallgarantie.

Kein rechtssicheres Kassensystem: keine TSE, DSFinV-K, fiskalische Signatur oder
Steuerberechnung. Nicht für echte Verkäufe verwenden. Marktgespräche zuerst;
README.md, MARKTVALIDIERUNG.md und RECHT-PRUEFPUNKTE.md beschreiben die nächsten
Schritte. Alle bisherigen acht Projekte bleiben davon unabhängig bestehen.
