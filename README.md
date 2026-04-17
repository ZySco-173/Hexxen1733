Dieses Repository enthält eine Sammlung von Makros für HeXXen 1733, die speziell für die Nutzung in Foundry Virtual Tabletop entwickelt wurden. Die Skripte unterstützen Spielleiter und Spieler dabei, Spielmechaniken effizienter zu gestalten und den Spielfluss zu beschleunigen.
***
**Foundry VTT Version: 13 (Stable)
HeXXen 1733 System-Version: 2.0.8**
***
**Installation**
1. Öffne dein Foundry VTT Projekt.
2. Erstelle ein neues Makro in der Makroleiste.
3. Setze den Typ auf "Script".
4. Kopiere den Inhalt der gewünschten .js Datei aus diesem Repository und füge ihn in das Textfeld ein.
5. Speichere das Makro ab.
***
# Erklärung der Macros
## Auto Damage
<details>
<mark>Voraussetzung:</mark>
Angriffe müssen als Kampffertigkeit (bei Jägern) oder Angriffen (bei NSCs) hinterlegt sein, dies erfordert unter Umständen ein manuelles Nacharbeiten der Charaktere. 
Ziel des Angriffs muss als Target (auswählen und mit T markieren) gewählt sein. <br>
 <br>
<mark>Funktionen</mark>

*Automatischer Hook:* Das Makro klinkt sich in den Chat-Prozess ein und analysiert eingehende Schadensmeldungen in Echtzeit (nur für den Spielleiter aktiv).  

*Intelligente Zielerkennung:* Identifiziert Ziele basierend auf den Markierungen (Targets) des GMs oder des angreifenden Spielers. 

*Dynamische Schadensberechnung:*  Liest Erfolgswerte und Basisschaden direkt aus der Chat-Message.
                                  Berücksichtigt automatisch den Panzerwert (PW) des Ziels.

*NSC- & Jäger-Logik:* NSCs/Monster: Addiert Schaden auf das Wund-System **(system.health.wound)** und aktualisiert gleichzeitig die Lebenspunkte des Token.
                      Jäger (Spieler): Zieht Schaden klassisch von den aktuellen Lebenspunkten **(system.health.value)** ab.  

*Zustands-Automatisierung:* Erkennt Schlüsselwörter im Chat (z. B. Malus, Lähmung, Innerer/Äußerer Schaden) und berechnet die entsprechenden Zustandsstufen basierend auf der Erfolgsrate.  

*Interaktive Analyse:* Öffnet einen Dialog zur finalen Bestätigung oder manuellen Korrektur des Schadens vor der Datenbank-Aktualisierung. (Nur für den Gamemaster sichtbar)

*Target-Release:* Hebt nach Abschluss der Aktion die Markierungen (Targets) auf, um den Spielfluss für die nächste Aktion zu bereinigen. (Nur beim Gamemaster, beim Spieler nicht möglich)
</details>

## Add Enemys 
<details>
<mark>Voraussetzung:</mark>
Es muss per Zeichentool ein Rahmen gezeichnet werden (Muss nicht sichtbar sein), als Textbezeichnung muss dieser Rahmen "SpawnZone" heißen. Zusätzlich muss es einen Ordner unter "Actors" geben in dem eure Gegenertypen zu finden sind. Der Name der Zone und des Ordners können im Macro angepasst werden.
<mark>Funktionen</mark>
*Gegner wählen:* Per DropDown bekommt ihr alle Actor aus dem angewählten Ordner angezeigt 
*Anzahl Gegner:* Legt fest wie viele Token Random innerhalb der SpawnZone erstellt werden
*Anzahl Spieler:* Ist nur bei BOSS NPCs interessant, da hier direkt die Lebenspunkte des NPCs hochgerechnet werden auf die Jägeranzahl.
</details>
---



