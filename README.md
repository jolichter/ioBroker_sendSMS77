# ioBroker sendSMS77
SMS Versand (SMS Gateway Service) für [ioBroker](https://github.com/ioBroker/) mit [sms77.io](https://www.sms77.io), jetzt [seven.io](https://www.seven.io)
### Vorteile
- Einfaches JavaScript (JS) Request mit Axios via POST und HTTP API
- Übertragung der Daten  erfolgt TLS verschlüsselt
- Hohe Erreichbarkeit per SMS, auch bei schlechter Verbindung per GSM Netz
- Zuverlässiger als Messenger welche immer Internetverbindung benötigen
- Seriöse Firma mit Sitz in Kiel, besteht seit 2003
- Guter Support, eine Bug Meldung der API wurde am nächsten Tag gefixt
- Homepage Anmeldung mit Zwei-Faktor-Authentisierung (2FA) möglich
- Fair, keine Grundgebühr, man bezahlt einfach jede SMS (Guthaben aufladen ist möglich)

### Nachteile
- Gegenüber Messenger nicht kostenlos, Netto 0,075 € je SMS (Stand 2022-12-31)
- Kein Open Source, btw: kenne keine seriöse OS Alternative

Blockly mit JS [sendSMS.js](https://github.com/jolichter/ioBroker_sendSMS77/blob/main/sendSMS.js) und Variablen 'text', 'from', 'to', 'flash', 'details' und 'debug':

![Screenshot_send_sms77_Blockly](https://user-images.githubusercontent.com/1485851/211167356-366e2a5e-e4ce-4f16-98c9-b0fafb55662c.png)

Falls Debug aktiviert, werden keine SMS verschickt oder berechnet. Als Antwort auf den Request erhaltet ihr einen numerischen Rückgabewert mit Text. Nutze 2 Datenpunkte, z.B.: 'textSMS' (string) für die Nachricht und 'sendSMS' (boolean) als Trigger zum senden.

### Achtung
- Seit Dezember 2023 wurde der Parameter debug, der genutzt werden konnte, um den Dienst ohne tatsächlichen Nachrichtenversand zu testen, deaktiviert. Stattdessen muss nun die Sandbox als Testumgebung verwendet werden. Weitere Informationen: [Changelog](https://feedback.seven.io/changelog/28188)
