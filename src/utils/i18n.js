import langMap from '../i18n';


const DATE_FORMAT = {year: 'numeric', month: 'short', day: 'numeric'};
const TIME_FORMAT = {hour: '2-digit', minute: '2-digit', second: '2-digit'};

export function trans (id, defaultTrans){
    let lang = locale();
    let translations = lang == 'en'? langMap.en: langMap.zhCN;

    if(isDebugMode()){
        return id;
    }

    return (translations && translations[id]) || defaultTrans || id;
}

function locale (){
    return normalizeLocale(window.globalLange) || getBrowserLang() || 'en';
}

function normalizeLocale (locale){
    return locale && locale.replace(/_/g, '-');
}

function getBrowserLang (){
    return navigator && navigator.language;
}

/**
 * 日期格式化
 * @param {Number|Date} timestamp
 * @returns {String}
 */
export function formatDate (timestamp){
    let dateFormatter = new Intl.DateTimeFormat(locale(), DATE_FORMAT);
    return dateFormatter.format(timestamp);
}

/**
 * 日期时间格式化
 * @param {Number|Date} timestamp
 * @returns {String}
 */
export function formatDateTime (timestamp){
    let {second, ...partTimeFormat} = TIME_FORMAT;
    let dateFormatter = new Intl.DateTimeFormat(locale(), {...DATE_FORMAT, ...partTimeFormat});
    return dateFormatter.format(timestamp);
}

/**
 * 完整日期时间格式化
 * @param {Number|Date} timestamp
 * @returns {String}
 */
export function formatDateTimeFull (timestamp){
    let dateFormatter = new Intl.DateTimeFormat(locale(), {...DATE_FORMAT, ...TIME_FORMAT});
    return dateFormatter.format(timestamp);
}

/**
 * 时间格式化
 * @param {Number|Date} timestamp
 * @returns {String}
 */
export function formatTime (timestamp){
    let dateFormatter = new Intl.DateTimeFormat(locale(), TIME_FORMAT);
    return dateFormatter.format(timestamp);
}

function isDebugMode (){
    let result = false;

    try {
        result = location.search.indexOf('debug=true') > -1;
    } catch (e) {
        setTimeout(function() {
          throw e;
        });
    }

    return result;
}

export { locale };
