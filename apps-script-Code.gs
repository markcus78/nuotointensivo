/**
 * Web App che riceve i lead della landing "Nuoto Intensivo Estivo 2026":
 *  1. appende il lead come riga nello Google Sheet collegato;
 *  2. crea/aggiorna il contatto in Keap (deduplica per email) e applica il tag
 *     che fa scattare l'automazione/opportunità.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * INSTALLAZIONE / AGGIORNAMENTO (Marco):
 *
 * A) Incolla questo codice NEL PROGETTO GIUSTO
 *    1. Apri lo Sheet "Nuoto Intensivo Estivo 2026 — Richieste".
 *    2. Estensioni → Apps Script (così sei nel progetto agganciato al foglio,
 *       lo stesso che pubblica l'URL del form). Cancella tutto, incolla questo
 *       file, Salva.
 *
 * B) Pubblica la nuova versione
 *    3. Deploy → Gestisci distribuzioni → matita ✏ → Versione: "Nuova versione"
 *       → Distribuisci.  (L'URL /exec NON cambia.)
 *
 * C) Compila i valori Keap nella scheda "Config" del foglio
 *    4. Torna al foglio: ora c'è una scheda "Config" (creata in automatico).
 *       Compila la colonna B:
 *         B1 = la tua Service Account Key di Keap
 *         B2 = l'ID numerico del tag che apre l'opportunità
 *    (Se la scheda non c'è ancora, esegui una volta la funzione "testKeap":
 *     la crea. La Service Account Key si genera dentro Keap → Impostazioni →
 *     API Settings → Service Account Key. NON condividere il foglio con nessuno.)
 *
 * D) (Facoltativo) Test
 *    5. In alto seleziona la funzione "testKeap" → Esegui. Guarda i log:
 *       deve dire {"ok":true,...}. Crea un contatto di prova "Test Keap".
 * ──────────────────────────────────────────────────────────────────────────
 */

var KEAP_BASE = 'https://api.infusionsoft.com/crm/rest/v1';

/**
 * Legge un valore di configurazione dalla scheda "Config" del foglio stesso.
 * Se la scheda non esiste, la crea con le etichette pronte (basta compilare la
 * colonna B). Usare il foglio — e non le Proprietà script — evita ogni
 * disallineamento tra progetti Apps Script diversi.
 *   A1: KEAP_API_KEY   B1: <Service Account Key>
 *   A2: KEAP_TAG_ID    B2: <id numerico del tag>
 */
function prop(key) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var cfg = ss.getSheetByName('Config');
  if (!cfg) {
    cfg = ss.insertSheet('Config');
    cfg.getRange('A1').setValue('KEAP_API_KEY');
    cfg.getRange('A2').setValue('KEAP_TAG_ID');
    cfg.getRange('D1').setValue('Incolla i valori nella colonna B (B1 = chiave Keap, B2 = id tag). NON condividere questo foglio.');
    cfg.getRange('A1:A2').setFontWeight('bold');
    return '';
  }
  var rows = cfg.getRange('A1:B20').getValues();
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][0]).trim() === key) return String(rows[i][1]).trim();
  }
  return '';
}

/**
 * Chiamata all'API Keap. Prova prima l'header "Authorization: Bearer" (doc
 * ufficiale per Service Account Key / Personal Access Token); se l'auth fallisce
 * (401/403) ritenta con "X-Keap-API-Key". Ritorna l'oggetto HTTPResponse.
 */
function keapFetch(path, method, payloadObj) {
  var apiKey = prop('KEAP_API_KEY');
  var base = {
    method: method,
    contentType: 'application/json',
    muteHttpExceptions: true
  };
  if (payloadObj) base.payload = JSON.stringify(payloadObj);

  var opt1 = JSON.parse(JSON.stringify(base));
  if (payloadObj) opt1.payload = base.payload;
  opt1.headers = { 'Authorization': 'Bearer ' + apiKey };
  var res = UrlFetchApp.fetch(KEAP_BASE + path, opt1);

  if (res.getResponseCode() === 401 || res.getResponseCode() === 403) {
    var opt2 = JSON.parse(JSON.stringify(base));
    if (payloadObj) opt2.payload = base.payload;
    opt2.headers = { 'X-Keap-API-Key': apiKey };
    res = UrlFetchApp.fetch(KEAP_BASE + path, opt2);
  }
  return res;
}

/** Crea/aggiorna il contatto in Keap e applica il tag. Ritorna {ok, contactId, message}. */
function syncToKeap(data) {
  var apiKey = prop('KEAP_API_KEY');
  var tagId = prop('KEAP_TAG_ID');
  if (!apiKey || !tagId) {
    return { ok: false, message: 'KEAP_API_KEY (B1) o KEAP_TAG_ID (B2) non compilati nella scheda Config del foglio' };
  }

  // 1) Crea o aggiorna il contatto (deduplica per email)
  var contactBody = {
    duplicate_option: 'Email',
    given_name: data.nome || '',
    family_name: data.cognome || ''
  };
  if (data.email) {
    contactBody.email_addresses = [{ field: 'EMAIL1', email: String(data.email) }];
  }
  if (data.telefono) {
    contactBody.phone_numbers = [{ field: 'PHONE1', number: String(data.telefono) }];
  }

  var cRes = keapFetch('/contacts', 'put', contactBody);
  var cCode = cRes.getResponseCode();
  if (cCode < 200 || cCode >= 300) {
    return { ok: false, message: 'Contatto HTTP ' + cCode + ': ' + cRes.getContentText().slice(0, 300) };
  }
  var contactId = JSON.parse(cRes.getContentText()).id;

  // 2) Applica il tag (fa scattare l'automazione/opportunità in Keap)
  var tRes = keapFetch('/contacts/' + contactId + '/tags', 'post', { tagIds: [Number(tagId)] });
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
  if (!prop('KEAP_API_KEY')) { Logger.log('KEAP_API_KEY non impostata'); return; }
  var res = keapFetch('/tags?limit=1000', 'get', null);
  if (res.getResponseCode() < 200 || res.getResponseCode() >= 300) {
    Logger.log('Errore HTTP ' + res.getResponseCode() + ': ' + res.getContentText().slice(0, 300));
    return;
  }
  var tags = (JSON.parse(res.getContentText()).tags) || [];
  tags.forEach(function (t) { Logger.log(t.id + '  —  ' + t.name); });
}
