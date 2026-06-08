/**
 * Web App che riceve i lead della landing "Nuoto Intensivo Estivo 2026"
 * e li appende come righe nello Google Sheet collegato.
 *
 * COME INSTALLARLO (una volta sola, ~2 minuti):
 *  1. Apri lo Sheet "Nuoto Intensivo Estivo 2026 — Richieste".
 *  2. Menu  Estensioni → Apps Script.
 *  3. Cancella tutto il contenuto e incolla QUESTO file. Salva (icona dischetto).
 *  4. In alto a destra: Deploy → Nuova distribuzione (Esegui distribuzione).
 *  5. Tipo: "App web". Esegui come: "Me". Chi ha accesso: "Chiunque".
 *  6. Distribuisci → autorizza con l'account marco@wellnesstown.it.
 *  7. Copia l'URL che finisce con /exec e mandalo a Claude (va nel form).
 *
 * Se in futuro cambi questo script, fai Deploy → Gestisci distribuzioni →
 * matita → "Nuova versione": l'URL /exec resta lo stesso.
 */
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

    // Telefono come testo, per non perdere lo 0 iniziale
    var r = sheet.getLastRow();
    sheet.getRange(r, 4).setNumberFormat('@').setValue(String(data.telefono || ''));

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
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
