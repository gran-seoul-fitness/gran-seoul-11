/**
 * 웰니스레터 스프레드시트 - 백엔드 (Google Apps Script)
 *
 * 【이번 업데이트 (11월 열차 사이트 연결)】
 * 1. 탭 이름 자동 결정: 사이트가 요청에 month(예: "11월")를 함께 보내면 그 달 탭에 기록합니다.
 *    month를 보내지 않는 기존 사이트(질문 폼 등)는 지금처럼 CHALLENGE_MONTH_LABEL 값을 씁니다.
 *    → 11월 퀴즈는 CHALLENGE_MONTH_LABEL을 바꾸지 않아도 "11월 퀴즈" 탭에 자동으로 들어갑니다.
 * 2. 입주사 기록: 퀴즈 탭에 "입주사" 칸(E열)을 추가했습니다.
 *    D열 "수령 유무"는 지금처럼 직원이 손으로 체크하는 칸으로 비워 둡니다.
 *    입주사를 보내지 않는 요청은 E열이 빈칸으로 남습니다.
 *    (8월~10월 탭은 건드리지 않습니다. 새로 만들어지는 탭부터 E열 머리글이 생깁니다.)
 *
 * 【적용 방법】
 * 1. Apps Script 편집기의 기존 코드를 모두 지우고 이 파일 내용을 붙여넣은 뒤 저장
 * 2. "배포" > "배포 관리" > 연필 아이콘 > 버전: "새 버전" > 배포
 *    (기존 배포를 새 버전으로 올리는 것이라 웹앱 주소는 그대로 유지됩니다)
 */

function getKSTTime() {
  return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
}

// 요청에 month가 없을 때 쓰는 기본 월 라벨 (질문 폼 등 기존 사이트용).
// 기존처럼 다음 달로 넘어갈 때 이 값을 바꿔주시면 됩니다 (예: '10월' -> '11월').
const CHALLENGE_MONTH_LABEL = '10월';

// 요청에 "11월"처럼 올바른 월 라벨이 오면 그것을, 아니면 기본값을 씁니다.
function getMonthLabel(e) {
  const m = e && e.parameter && e.parameter.month;
  return /^(1[0-2]|[1-9])월$/.test(m || '') ? m : CHALLENGE_MONTH_LABEL;
}

function doGet(e) {
  return ContentService.createTextOutput('스크립트 정상 작동 중 - ' + getKSTTime());
}

function doPost(e) {
  const action = e.parameter.action;

  if (action === 'question') {
    return handleQuestionSubmit(e);
  }

  if (action === 'quiz') {
    return handleQuizSubmit(e);
  }

  return ContentService.createTextOutput(JSON.stringify({ result: 'unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// monthLabel + baseName(예: '11월 퀴즈') 시트를 찾고, 없으면 헤더까지 만들어서 반환합니다.
function getOrCreateMonthSheet(monthLabel, baseName, headerRow) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = monthLabel + ' ' + baseName;
  let target = spreadsheet.getSheetByName(sheetName);

  if (!target) {
    target = spreadsheet.insertSheet(sheetName);
    target.appendRow(headerRow);
    target.getRange(1, 1, 1, headerRow.length).setFontWeight('bold');
  }

  return target;
}

function handleQuestionSubmit(e) {
  const qSheet = getOrCreateMonthSheet(getMonthLabel(e), '질문', ['제출일시', '이름', '질문 내용']);

  qSheet.appendRow([
    getKSTTime(),
    e.parameter.name || '익명',
    e.parameter.content || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

const QUIZ_HEADER = ['제출일시', '이름', '회차', '수령 유무', '입주사'];

function handleQuizSubmit(e) {
  const quizSheet = getOrCreateMonthSheet(getMonthLabel(e), '퀴즈', QUIZ_HEADER);

  quizSheet.appendRow([
    getKSTTime(),
    e.parameter.name || '익명',
    e.parameter.vol || 'Vol.01',
    '',                          // 수령 유무: 직원이 직접 체크
    e.parameter.company || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---- 시트를 미리 만들어두고 싶을 때 ----
// Apps Script 편집기에서 이 함수를 선택한 뒤 "실행" 버튼을 한 번 눌러주세요.
// "11월 퀴즈" 빈 시트(머리글 포함)가 바로 생성됩니다. 다른 달이 필요하면 '11월'만 바꿔서 실행하세요.
function createNovemberQuizSheet() {
  getOrCreateMonthSheet('11월', '퀴즈', QUIZ_HEADER);
}
