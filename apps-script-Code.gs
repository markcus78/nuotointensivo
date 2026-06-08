/**
 * Web App che riceve i lead della landing "Nuoto Intensivo Estivo 2026":
 *  1. appende il lead come riga nello Google Sheet collegato;
 *  2. crea/aggiorna il contatto in Keap (deduplica per email) e applica il tag
 *     che fa scattare l'automazione/opportunità.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * INSTALLAZIONE / AGGIORNAMENTO (Marco):
 *
 * A) Incolla questo codice
 *    1. Apri lo Sheet "Nuoto Intensivo Estivo 2026 — Richieste".
 *    2. Estensioni → Apps Script. Cancella tutto, incolla questo file, Salva.
 *
 * B) Inserisci i segreti Keap (NON vanno nel codice — restano privati)
 *    3. In Apps Script: ⚙ Impostazioni progetto → "Proprietà script" →
 *       Aggiungi proprietà, due volte:
 *         • KEAP_API_KEY  =  la tua Service Account Key di Keap
 *         • KEAP_TAG_ID   =  l'ID numerico del tag che apre l'opportunità
 *
 *    Dove prendere la Service Account Key: https://keys.developer.keap.com
 *    (serve un account admin Keap → crea una "Service Account Key").
 *    Dove prendere l'ID del tag: in Keap il tag ha un ID numerico
 *    (visibile nell'URL quando apri il tag, o chiedi a Claude di elencarli).
 *
 * C) Pubblica la nuova versione
 *    4. Deploy → Gestisci distribuzioni → matita ✏ → Versione: "Nuova versione"
 *       → Distribuisci.  (L'URL /exec NON cambia.)
 *
 * D) (Facoltativo) Test
 *    5. In alto seleziona la funzione "testKeap" → Esegui. Guarda i log:
 *       deve dire {"ok":true,...}. Crea un contatto di prova "Test Keap".
 * ──────────────────────────────────────────────────────────────────────────
 */

var KEAP_BASE = 'https://api.infusionsoft.com/crm/rest/v1';

function prop(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

/** Crea/aggiorna il contatto in Keap e applica il tag. Ritorna {ok, contactId, message}. */
function syncToKeap(data) {
  var apiKey = prop('KEAP_API_KEY');
  var tagId = prop('KEAP_TAG_ID');
  if (!apiKey || !tagId) {
    return { ok: false, message: 'KEAP_API_KEY o KEAP_TAG_ID non impostati nelle Proprietà script' };
  }

  // 1) Crea o aggiorna il contatto (deduplica per email)
  var contactBody = {
    duplicate_option: 'Email',
    given_name: data.nome || '',
    family_name: data.cognome || ''
  };
  if (data.email) {
    contactBody.email_addresses = [{ field: 'EMAIL', email: String(data.email) }];
  }
  if (data.telefono) {
    contactBody.phone_numbers = [{ field: 'PHONE1', number: String(data.telefono) }];
  }

  var cRes = UrlFetchApp.fetch(KEAP_BASE + '/contacts', {
    method: 'put',
    contentType: 'application/json',
    headers: { 'X-Keap-API-Key': apiKey },
    payload: JSON.stringify(contactBody),
    muteHttpExceptions: true
  });
  var cCode = cRes.getResponseCode();
  if (cCode < 200 || cCode >= 300) {
    return { ok: false, message: 'Contatto HTTP ' + cCode + ': ' + cRes.getContentText().slice(0, 300) };
  }
  var contactId = JSON.parse(cRes.getContentText()).id;

  // 2) Applica il tag (fa scattare l'automazione/opportunità in Keap)
  var tRes = UrlFetchApp.fetch(KEAP_BASE + '/contacts/' + contactId + '/tags', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'X-Keap-API-Key': apiKey },
    payload: JSON.stringify({ tagIds: [Number(tagId)] }),
    muteHttpExceptions: true
  });
  var tCode = tRes.getResponseCode();
  if (tCode < 200 || tCode >= 300) {
    return { ok: false, contactId: contactId, message: 'Tag HTTP ' + tCode + ': ' + tRes.getContentText().slice(0, 300) };
  }

  return { ok: true, contactId: contactId };
}

/** Assicura le intestazioni delle colonne di stato Keap (K, L). */
function ensureKeapHeaders(sheet) {
  if (!sheet.getRange(1, 11).getValue()) sheet.getRange(1, 11).setValue('Keap Stato');
  if (!sheet.getRange(1, 12).getValue()) sheet.getRange(1, 12).setValue('Keap Contact ID');
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Foglio1') || ss.getSheets()[0];
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.submitted_at || new Date().toISOString(), // Timestamp
      data.nome     || '',                            // Nome
      data.cognome  || '',                            // Cognome
      '',                                             // Telefono (impostato sotto come testo)
      data.email    || '',                            // Email
      data.categoria|| '',                            // Categoria
      data.formato  || '',                            // Formato
      data.note     || '',                            // Note
      data.privacy ? 'Sì' : 'No',                     // Privacy
      data.source   || ''                             // Source
    ]);

    var r = sheet.getLastRow();
    // Telefono come testo, per non perdere lo 0 iniziale
    sheet.getRange(r, 4).setNumberFormat('@').setValue(String(data.telefono || ''));

    // Sincronizzazione Keap (la riga è già salvata: un errore Keap non perde il lead)
    var keap;
    try {
      keap = syncToKeap(data);
    } catch (kerr) {
      keap = { ok: false, message: String(kerr) };
    }
    ensureKeapHeaders(sheet);
    sheet.getRange(r, 11).setValue(keap.ok ? 'ok' : ('errore: ' + keap.message));
    sheet.getRange(r, 12).setValue(keap.contactId || '');

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok', keap: keap.ok }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Permette un test rapido aprendo l'URL /exec nel browser.
function doGet() {
  return ContentService.createTextOutput('OK — endpoint nuoto intensivo attivo.');
}

/** Esegui a mano dall'editor per testare la connessione Keap (crea un contatto di prova). */
function testKeap() {
  var res = syncToKeap({
    nome: 'Test', cognome: 'Keap',
    email: 'test-keap-nuoto@example.com', telefono: '3330000000'
  });
  Logger.log(JSON.stringify(res));
  return res;
}

/** Esegui a mano per elencare i tag Keap (id + nome), se non conosci l'ID del tag. */
function listKeapTags() {
  var apiKey = prop('KEAP_API_KEY');
  if (!apiKey) { Logger.log('KEAP_API_KEY non impostata'); return; }
  var res = UrlFetchApp.fetch(KEAP_BASE + '/tags?limit=1000', {
    headers: { 'X-Keap-API-Key': apiKey },
    muteHttpExceptions: true
  });
  var tags = (JSON.parse(res.getContentText()).tags) || [];
  tags.forEach(function (t) { Logger.log(t.id + '  —  ' + t.name); });
}
