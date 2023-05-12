// V23.05.012
// SMS Versand (SMS Gateway Service) für ioBroker mit sms77.io
// Quelle: https://www.seven.io/de/entwickler/
// Seit Anfang 2023 ist SMS77 unter dem Namen "Seven" bekannt und die Domain wurde von sms77.io zu seven.io umgestellt.
// Bestehende Webhooks und API-Anfragen müssen angeblich nicht geändert werden und sind weiterhin gültig.
// Habe das Gateway dennoch angepasst: https://gateway.sms77.io/api/sms zu https://gateway.seven.io/api/sms
//
// Das 'request'-Modul für HTTP-Requests ist deprecated und wird nicht mehr aktiv gepflegt.
// Verwende stattdessen den Promise-basierenden HTTP-Client 'axios'.
//
// Hinweis zu Flash-SMS:
// Nicht alle Geräte zeigen Flash SMS auf dieselbe Weise an.
// Unter Umständen werden Flash-SMS als normale SMS empfangen, besonders wenn der Bildschirm gesperrt ist.

const axios = require('axios');

// Funktion, um den Text für einen numerischen Rückgabewert zu erhalten
function getResponseText(response) {
  switch (response) {
    case 100:
      return '100: SMS wurde vom Gateway angenommen.';
    case 101:
      return '101: Versand an mindestens einen Empfänger fehlgeschlagen.';
    case 201:
      return '201: Absender ungültig. Erlaubt sind max 11 alphanumerische oder 16 numerische Zeichen.';
    case 202:
      return '202: Empfängernummer ungültig.';
    case 301:
      return '301: Variable to nicht gesetzt.';
    case 305:
      return '305: Variable text nicht gesetzt.';
    case 401:
      return '401: Variable text ist zu lang.';
    case 402:
      return '402: Reloadsperre – diese SMS wurde bereits innerhalb der letzten 180 Sekunden verschickt.';
    case 403:
      return '403: Maximales Limit pro Tag für diese Nummer erreicht.';
    case 500:
      return '500: Zu wenig Guthaben vorhanden.';
    case 600:
      return '600: Carrier Zustellung misslungen.';
    case 900:
      return '900: Authentifizierung ist fehlgeschlagen. Bitte Api Key prüfen.';
    case 901:
      return '901: Verifizierung des Signierhashes ist fehlgeschlagen.';
    case 902:
      return '902: API Schlüssel hat kein Zugriffsrecht auf diesen Endpunkt.';
    case 903:
      return '903: Server IP ist falsch.';
    default:
      return 'Unbekannter Fehler!';
  }
}

// Funktion, um eine SMS zu senden
async function sendSms(apiKey, to, text, from, flash, details, debug) {
  const options = {
    method: 'POST',
    url: 'https://gateway.seven.io/api/sms',
    headers: {
      'X-Api-Key': apiKey
    },
    data: {
      to,
      text,
      from,
      flash,
      details,
      debug
    }
  };

// Sende die Anfrage asynchron und warte auf das Ergebnis
  try {
    const response = await axios(options);

    // Boolean false/true zu Zahl 0/1
    debug = debug ? 1 : 0;
    flash = flash ? 1 : 0;
    details = details ? 1 : 0;

    if (details === 1) {
      console.log(response.data);
      // console.log(details);
    } else {
      const responseText = getResponseText(response.data);
      console.log(responseText);
    }

    if (debug === 1) {
      console.log(JSON.stringify({ to, text, from, flash, details, debug }));
    }

  } catch (error) {
    console.error(error);
  }
}

// Aufruf der Funktion mit await
const result = await sendSms('hier-den-API-KEY-eintragen', to, text, from, flash, details, debug);
