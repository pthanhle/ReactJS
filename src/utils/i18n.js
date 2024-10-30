import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend'
i18n
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    // here we will place our translations...
                    homepage: {
                        title1: "There's a better way to ask...",
                        title2: `You don't want to make a boring from.
                        And your audience won't answer one.
                        Created a typeform instead - and make everyone happy.`,
                        title3: {
                            login: `Get's started. It's free`,
                            user: `Doing Quiz Now`
                        }
                    }
                }
            },
            vi: {
                translation: {
                    // here we will place our translations...
                    homepage: {
                        title1: "Có rất nhiều cách để hỏi...",
                        title2: `Bạn không muốn tạo ra sự nhàm chán.
                        Và khán giả của bạn sẽ không trả lời một.
                        Thay vào đó, hãy tạo một kiểu chữ - và làm cho mọi người hài lòng.`,
                        title3: {
                            login: `Hãy bắt đầu. Nó miễn phí`,
                            user: `Bắt đầu làm bài ngay bây giờ`,
                        }
                    }
                }
            },
        }
    });

export default i18n;