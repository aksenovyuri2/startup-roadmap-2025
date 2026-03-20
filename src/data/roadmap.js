export const introMetrics = {
  users: 50,
  weeks: 12,
  budget: '50 000–150 000 ₽',
  time: '10–20 часов/неделю',
  strength: 'Growth',
  weakness: 'Нет опыта в программировании',
  market: 'Россия / СНГ',
  targetMetric: '50 юзеров, завершивших core action',
  retentionTarget: '5 из 50 вернулись',
};

export const howToUse = [
  'Этот роудмап — твой операционный документ на 12 недель. Не план на полку, а рабочий инструмент.',
  'Каждую неделю: открой нужный раздел, выполни задачи, отметь чекбоксы, заполни заметки. Затем загрузи документ в Claude и скажи: «Вот мой роудмап, я на неделе N, вот что я сделал и вот что не получилось».',
  'Gate-проверки: после недель 2, 4, 8 и 12 стоят контрольные точки. Если outcome не достигнут — не иди дальше. Вернись и доделай, или пивотни.',
];

export const principles = [
  { title: 'Никаких идей из воздуха', text: 'Каждое решение опирается на данные: интервью, метрики, отзывы, анализ конкурентов.' },
  { title: 'Исследование перед строительством', text: 'Первые 4 недели — это research. Идея должна вырасти из реальных болей, а не из фантазий.' },
  { title: 'No-code + AI API', text: 'Ты не программист. Не учись кодить. Используй инструменты, которые работают в России и оплачиваются российской картой.' },
  { title: 'Growth — твой unfair advantage', text: 'Фокусируйся на поиске аудитории, коммуникации, экспериментах с каналами.' },
];

export const russianSpecifics = {
  aiApis: [
    { name: 'YandexGPT (YandexCloud)', pros: 'Работает в РФ, оплата в ₽, хороший русский', cons: 'Слабее GPT-4 / Claude для сложных задач' },
    { name: 'GigaChat (Сбер)', pros: 'Работает в РФ, оплата в ₽, хорош для текстов', cons: 'Ограниченный API' },
    { name: 'OpenAI через прокси', pros: 'Лучшее качество модели', cons: 'Дороже, нужна оплата в $, риск блокировки' },
    { name: 'OpenRouter / ProxyAPI', pros: 'Оплата криптой или заруб. картой', cons: 'Дополнительные расходы' },
  ],
  aiRecommendation: 'С бюджетом 50–150к ты можешь себе позволить OpenAI через прокси, который даёт лучшее качество. Но начни с YandexGPT для прототипирования (бесплатный тир), и переключись на OpenAI когда поймёшь какие промпты работают.',
  platforms: [
    { task: 'Комьюнити и дискуссии', western: 'Reddit, Slack', russian: 'Telegram-чаты, vc.ru комментарии' },
    { task: 'Профессиональная сеть', western: 'LinkedIn', russian: 'TenChat, Telegram, LinkedIn (через VPN)' },
    { task: 'Лонч продукта', western: 'Product Hunt', russian: 'vc.ru, Habr, Product Radar, Telegram-каналы' },
    { task: 'Отзывы на конкурентов', western: 'G2, Capterra', russian: 'Отзовик, отзывы в Telegram, vc.ru' },
    { task: 'Фриланс', western: 'Upwork, Fiverr', russian: 'FL.ru, Kwork, Habr Фриланс' },
    { task: 'Тренды', western: 'Google Trends, Exploding Topics', russian: 'Wordstat (Яндекс), Google Trends (РФ)' },
    { task: 'Блог-платформы', western: 'Medium, Substack', russian: 'vc.ru, Habr, Telegram-канал' },
    { task: 'Приём оплаты', western: 'Stripe', russian: 'ЮКасса, Робокасса, CloudPayments, Т-Банк' },
  ],
  legal: [
    { form: 'Самозанятый', when: 'Выручка < 2.4 млн ₽/год', pros: 'Налог 4–6%, минимум бюрократии' },
    { form: 'ИП (УСН 6%)', when: 'Выручка > 2.4 млн или нужен эквайринг', pros: 'Простая отчётность, можно принимать оплату от компаний' },
    { form: 'ООО', when: 'Нужны софаундеры / инвестиции', pros: 'Доли, инвестиции, продажа бизнеса' },
  ],
};

export const phases = [
  {
    id: 1,
    title: 'Фаза 1: Исследование и поиск идеи',
    subtitle: 'Недели 1–4. Цель: найти проблему через систематическое исследование.',
    color: 'phase1',
    gradient: 'from-blue-500 to-cyan-500',
    weeks: [1, 2, 3, 4],
  },
  {
    id: 2,
    title: 'Фаза 2: Сборка MVP и софт-лонч',
    subtitle: 'Недели 5–8. Цель: собрать MVP и добиться первых completed core actions.',
    color: 'phase2',
    gradient: 'from-violet-500 to-pink-500',
    weeks: [5, 6, 7, 8],
  },
  {
    id: 3,
    title: 'Фаза 3: Growth-спринт → 50 юзеров',
    subtitle: 'Недели 9–12. Цель: 50 completed core actions + 5 returning users.',
    color: 'phase3',
    gradient: 'from-emerald-500 to-cyan-500',
    weeks: [9, 10, 11, 12],
  },
];

export const weeks = {
  1: {
    id: 1,
    phase: 1,
    title: 'Неделя 1: Карта территорий',
    hours: '10–15 часов',
    goal: 'Определить 3–5 проблемных территорий, опираясь на реальные сигналы спроса.',
    sections: [
      {
        title: 'Исследование спроса (5–7 часов)',
        tasks: [
          { id: 'w1-t1', text: 'Проанализировать Telegram-чаты и каналы в своей сфере: на что жалуются? Что спрашивают?' },
          { id: 'w1-t2', text: 'Изучить vc.ru: статьи про AI-инструменты, комментарии, запросы пользователей' },
          { id: 'w1-t3', text: 'Посмотреть Kwork, FL.ru: за какие AI-задачи уже платят? Какие заказы повторяются?' },
          { id: 'w1-t4', text: 'Проверить Яндекс Wordstat: что ищут по запросам «AI для...», «нейросеть для...»?' },
          { id: 'w1-t5', text: 'Изучить Product Hunt и Product Radar: какие AI-продукты запускались последние 3 месяца?' },
          { id: 'w1-t6', text: 'Изучить свою сферу: какие проблемы есть у тебя самого / твоих коллег?' },
        ],
      },
      {
        title: 'Фильтрация (3–4 часа)',
        description: 'Каждую найденную проблему прогони через фильтр:',
        tasks: [
          { id: 'w1-t7', text: 'Можно ли решить через input → AI → output?' },
          { id: 'w1-t8', text: 'Люди уже платят за решение (фрилансеры, SaaS, курсы)?' },
          { id: 'w1-t9', text: 'Я могу найти 10 потенциальных клиентов в Telegram / vc.ru за день?' },
          { id: 'w1-t10', text: 'Проблема повторяется регулярно (не разовая)?' },
          { id: 'w1-t11', text: 'API-расходы < 5 ₽ за один запрос?' },
        ],
      },
      {
        title: 'Результат недели 1',
        tasks: [
          { id: 'w1-t12', text: 'Список из 3–5 проблемных территорий: чья проблема, в чём боль, какие сигналы спроса' },
          { id: 'w1-t13', text: 'Каждая территория прошла фильтр (5 пунктов выше)' },
          { id: 'w1-t14', text: 'Список 15+ человек для интервью (из Telegram-чатов, vc.ru, личных контактов)' },
        ],
      },
    ],
    risk: 'Влюбиться в первую найденную проблему и прекратить исследование. Собери все 3–5 территорий прежде чем выбирать.',
  },
  2: {
    id: 2,
    phase: 1,
    title: 'Неделя 2: Customer development интервью',
    hours: '12–18 часов',
    goal: 'Провести 10–15 проблемных интервью и выбрать одну территорию на основе данных.',
    sections: [
      {
        title: 'Подготовка (2–3 часа)',
        tasks: [
          { id: 'w2-t1', text: 'Составить скрипт по методу Mom Test (спрашивать про прошлый опыт, не питчить идею)' },
        ],
        tips: [
          '«Расскажи, как ты последний раз решал эту задачу?»',
          '«Что было самым сложным / раздражающим?»',
          '«Какие инструменты пробовал? Почему не подошли?»',
          '«Сколько времени / денег тратишь на это?»',
          '«Как часто это происходит?»',
        ],
        note: 'Где искать респондентов в РФ: нишевые Telegram-чаты, комментаторы на vc.ru, личные контакты, TenChat.',
      },
      {
        title: 'Проведение (6–10 часов)',
        tasks: [
          { id: 'w2-t2', text: 'Провести 10–15 интервью по 20–30 мин (звонок / Zoom / Telegram-звонок)' },
          { id: 'w2-t3', text: 'Записывать: прямые цитаты, эмоции, конкретные цифры' },
          { id: 'w2-t4', text: 'Искать паттерны: одинаковые жалобы от 3+ человек = сигнал' },
        ],
      },
      {
        title: 'Анализ и выбор (2–3 часа)',
        tasks: [
          { id: 'w2-t5', text: 'Свести в таблицу: проблема / частота / интенсивность боли / готовность платить' },
          { id: 'w2-t6', text: 'Выбрать одну территорию на основе данных' },
          { id: 'w2-t7', text: 'Сформулировать гипотезу: «[Аудитория] имеет проблему [Х], и готова платить за [решение]»' },
        ],
      },
    ],
    risk: 'Питчить идею вместо того, чтобы слушать. Не рассказывай про решение. Слушай.',
  },
  3: {
    id: 3,
    phase: 1,
    title: 'Неделя 3: Анализ конкурентов и формулировка решения',
    hours: '10–15 часов',
    goal: 'Понять конкурентную среду, найти щель, сформулировать решение.',
    sections: [
      {
        title: 'Анализ конкурентов (5–7 часов)',
        tasks: [
          { id: 'w3-t1', text: 'Найти 5–10 конкурентов (российских и зарубежных)' },
          { id: 'w3-t2', text: 'Прочитать отзывы: vc.ru, Telegram, Отзовик, Product Hunt, G2' },
          { id: 'w3-t3', text: 'Выписать: чем недовольны? Чего не хватает? Что слишком дорого?' },
          { id: 'w3-t4', text: 'Попробовать 2–3 конкурента лично (free trial)' },
          { id: 'w3-t5', text: 'Заполнить таблицу: конкурент / цена / плюсы / минусы / незанятая ниша' },
        ],
        note: 'В РФ многие западные AI-сервисы недоступны или сложны в оплате — это твоё конкурентное преимущество.',
      },
      {
        title: 'Формулировка решения (3–5 часов)',
        tasks: [
          { id: 'w3-t6', text: 'Описать core action: «Юзер [input] → AI [делает] → юзер получает [output]»' },
          { id: 'w3-t7', text: 'Определить узкую нишу (не «маркетологи», а «ММ-щики в российском e-commerce»)' },
          { id: 'w3-t8', text: 'Определить retention-повод: почему юзер вернётся?' },
          { id: 'w3-t9', text: 'Проверить: можно ли сделать через YandexGPT/GigaChat + no-code?' },
        ],
      },
      {
        title: 'Результат недели 3',
        tasks: [
          { id: 'w3-t10', text: 'Таблица конкурентов с данными' },
          { id: 'w3-t11', text: 'Чёткая формулировка: аудитория + проблема + core action + retention' },
          { id: 'w3-t12', text: 'Понимание, чем ты отличаешься от конкурентов' },
        ],
      },
    ],
  },
  4: {
    id: 4,
    phase: 1,
    title: 'Неделя 4: Лендинг + smoke test',
    hours: '10–15 часов',
    goal: 'Проверить спрос до строительства продукта.',
    sections: [
      {
        title: 'Лендинг (3–5 часов)',
        tasks: [
          { id: 'w4-t1', text: 'Собрать лендинг на Tilda Pro (750–1 250 ₽/мес, свой домен, аналитика)' },
          { id: 'w4-t2', text: 'Структура: заголовок с проблемой → как работает (3 шага) → форма «Ранний доступ»' },
          { id: 'w4-t3', text: 'Подключить Яндекс.Метрику (бесплатно)' },
        ],
      },
      {
        title: 'Smoke test (5–8 часов)',
        tasks: [
          { id: 'w4-t4', text: 'Опубликовать в 3–5 Telegram-чатах/каналах целевой аудитории' },
          { id: 'w4-t5', text: 'Написать пост на vc.ru про проблему (не про продукт!) со ссылкой на лендинг' },
          { id: 'w4-t6', text: 'Отправить ссылку людям из интервью' },
          { id: 'w4-t7', text: 'Цель: 30+ emails в waitlist. Конверсия < 5% после 3 попыток → пивот' },
        ],
      },
    ],
  },
  5: {
    id: 5,
    phase: 2,
    title: 'Неделя 5: No-code сборка: core flow',
    hours: '15–20 часов',
    goal: 'Собрать минимальный путь от входа до core action. Ничего лишнего.',
    sections: [
      {
        title: 'Сборка MVP',
        tasks: [
          { id: 'w5-t1', text: 'Выбрать стек из таблицы рекомендуемых стеков' },
          { id: 'w5-t2', text: 'Протестировать промпты вручную на 10+ примерах' },
          { id: 'w5-t3', text: 'Собрать: форма ввода → AI → результат. Никаких настроек, дашбордов, профилей' },
        ],
      },
    ],
    stacks: [
      { type: 'Текст → текст', front: 'Lovable / Tilda', ai: 'YandexGPT / OpenAI*', glue: 'Albato / Make' },
      { type: 'Файл → результат', front: 'Bubble', ai: 'OpenAI* / Claude*', glue: 'Albato / Make' },
      { type: 'Чат-бот', front: 'Botpress / Salebot', ai: 'YandexGPT / OpenAI*', glue: 'Встроенный' },
      { type: 'Web scraping + AI', front: 'Lovable', ai: 'OpenAI* / YandexGPT', glue: 'Apify + Albato' },
    ],
    risk: 'Scope creep. Только core flow. Всё остальное — в бэклог.',
  },
  6: {
    id: 6,
    phase: 2,
    title: 'Неделя 6: Тест на 5 людях',
    hours: '10–15 часов',
    goal: 'Получить первый фидбэк от реальных пользователей.',
    sections: [
      {
        title: 'Тестирование',
        tasks: [
          { id: 'w6-t1', text: 'Пригласить 5 человек из waitlist' },
          { id: 'w6-t2', text: 'Провести сессии: Zoom / Telegram-звонок с screen share. Ты молчишь и смотришь' },
          { id: 'w6-t3', text: 'Записать: где застряли, что не поняли, что понравилось' },
          { id: 'w6-t4', text: 'Починить критичные блокеры в тот же день' },
        ],
      },
      {
        title: 'Результат недели 6',
        tasks: [
          { id: 'w6-t5', text: '5 человек прошли core flow' },
          { id: 'w6-t6', text: 'Список UX-проблем с приоритетами' },
          { id: 'w6-t7', text: 'Первые цитаты от юзеров' },
        ],
      },
    ],
  },
  7: {
    id: 7,
    phase: 2,
    title: 'Неделя 7: Фиксы + аналитика + контент',
    hours: '10–15 часов',
    goal: 'Подготовить продукт к софт-лончу.',
    sections: [
      {
        title: 'Задачи',
        tasks: [
          { id: 'w7-t1', text: 'Починить топ-3 UX-проблемы из недели 6' },
          { id: 'w7-t2', text: 'Настроить аналитику: Яндекс.Метрика + PostHog (free tier) — трекать: signup → core action → return' },
          { id: 'w7-t3', text: 'Начать контент: 3 поста/неделю про проблему (Telegram-канал, vc.ru, TenChat)' },
          { id: 'w7-t4', text: 'Подготовить онбординг-сообщение для массового инвайта' },
        ],
      },
    ],
  },
  8: {
    id: 8,
    phase: 2,
    title: 'Неделя 8: Софт-лонч на 20–30 юзеров',
    hours: '12–18 часов',
    goal: 'Открыть доступ и получить первые completed core actions.',
    sections: [
      {
        title: 'Лонч',
        tasks: [
          { id: 'w8-t1', text: 'Открыть доступ всему waitlist (цель: 20–30 signups)' },
          { id: 'w8-t2', text: 'Писать каждому лично в Telegram после регистрации' },
          { id: 'w8-t3', text: 'Собирать фидбэк через личные сообщения, не через формы' },
          { id: 'w8-t4', text: 'Мониторить: signup → core action. Цель: 30%+ conversion' },
        ],
      },
    ],
  },
  9: {
    id: 9,
    phase: 3,
    title: 'Неделя 9: Оптимизация activation',
    hours: '10–15 часов',
    goal: 'Увеличить конверсию от регистрации до core action.',
    sections: [
      {
        title: 'Оптимизация',
        tasks: [
          { id: 'w9-t1', text: 'Проанализировать воронку: где отваливаются? Сократить шаги до core action' },
          { id: 'w9-t2', text: 'Добавить «ага-момент» раньше: демо-режим до регистрации' },
          { id: 'w9-t3', text: 'Настроить retention-луп: email или Telegram-бот через 3 дня после core action' },
        ],
        note: 'Telegram-бот для retention лучше email в РФ. Открываемость сообщений в Telegram ~80%, email ~20%.',
      },
    ],
  },
  10: {
    id: 10,
    phase: 3,
    title: 'Недели 10–11: Growth-эксперименты',
    hours: '15–20 ч/неделю',
    goal: 'Масштабировать привлечение. Твой growth-скилл — главное оружие.',
    sections: [
      {
        title: 'Каналы привлечения в РФ (выбери 2–3)',
        tasks: [
          { id: 'w10-t1', text: 'Telegram: нишевые чаты и каналы. Давай пользу, не спамь' },
          { id: 'w10-t2', text: 'vc.ru: статьи-кейсы про проблему и решение (500–2000 визитов с одной статьи)' },
          { id: 'w10-t3', text: 'Cold outreach: личные сообщения в Telegram/TenChat с предложением помочь' },
          { id: 'w10-t4', text: 'Product Hunt / Product Radar лонч (подготовка 1 неделя)' },
          { id: 'w10-t5', text: 'Habr (если техническая аудитория)' },
          { id: 'w10-t6', text: 'Партнёрства: Telegram-каналы, нюслеттеры, микро-блогеры в нише' },
          { id: 'w10-t7', text: 'Платная реклама в Telegram-каналах ниши (бюджет: 10–30к ₽)' },
          { id: 'w10-t8', text: 'Промо на vc.ru (платное размещение статьи от 5 000 ₽)' },
        ],
      },
    ],
  },
  11: {
    id: 11,
    phase: 3,
    title: 'Неделя 11: Growth-эксперименты (продолжение)',
    hours: '15–20 часов',
    goal: 'Продолжить эксперименты с каналами привлечения, масштабировать рабочие.',
    sections: [
      {
        title: 'Документируй эксперименты',
        tasks: [
          { id: 'w11-t1', text: 'Проанализировать результаты экспериментов недели 10' },
          { id: 'w11-t2', text: 'Масштабировать 1–2 рабочих канала' },
          { id: 'w11-t3', text: 'Запустить 2–3 новых эксперимента' },
          { id: 'w11-t4', text: 'Документировать: канал / гипотеза / метрика успеха / результат' },
        ],
      },
    ],
  },
  12: {
    id: 12,
    phase: 3,
    title: 'Неделя 12: Финал — 50 юзеров + ретро',
    hours: '10–15 часов',
    goal: 'Добить цель и провести ретроспективу.',
    sections: [
      {
        title: 'Финальный спринт',
        tasks: [
          { id: 'w12-t1', text: 'Добить 50 completed core actions' },
          { id: 'w12-t2', text: '1-on-1 с каждым returning user: почему вернулся? что бы сломалось без продукта?' },
          { id: 'w12-t3', text: 'Посчитать unit-экономику: CAC по каналам, конверсия, retention rate' },
          { id: 'w12-t4', text: 'Ретроспектива: что сработало, что нет, что дальше' },
          { id: 'w12-t5', text: 'Next step: монетизация / фандрейзинг / масштабирование / пивот' },
        ],
      },
    ],
    finalCheck: [
      { id: 'final-t1', text: '50+ completed core actions' },
      { id: 'final-t2', text: '5+ returning users' },
      { id: 'final-t3', text: 'Понимание, почему возвращаются (и почему нет)' },
      { id: 'final-t4', text: 'Данные по unit-экономике' },
      { id: 'final-t5', text: 'Решение о следующем шаге' },
    ],
  },
};

export const gateChecks = {
  2: {
    title: 'Gate-проверка после недели 2',
    question: 'Есть ли гипотеза, подтверждённая данными из 3+ интервью?',
    yes: 'Неделя 3',
    no: 'Ещё 5–10 интервью или смени территорию.',
  },
  4: {
    title: 'Gate-проверка после недели 4',
    question: '30+ emails в waitlist + чёткая формулировка проблемы и решения?',
    yes: 'Фаза 2',
    no: 'Пересмотри месседжинг, каналы или саму идею.',
  },
  8: {
    title: 'Gate-проверка после недели 8',
    question: '10+ completed core actions? Conversion signup → core action > 20%?',
    yes: 'Фаза 3',
    no: 'Чини онбординг или пивотни продукт.',
  },
  12: {
    title: 'Финальная проверка',
    question: 'Все цели достигнуты?',
    yes: 'Следующий этап: монетизация / рост',
    no: 'Анализ и корректировка стратегии.',
  },
};

export const budgetTable = [
  { tool: 'Лендинг (Tilda Pro)', cost: '750–1 250 ₽/мес', ruPayment: true },
  { tool: 'No-code (Lovable / Bubble)', cost: '2 000–5 000 ₽/мес', ruPayment: false },
  { tool: 'AI API (YandexGPT)', cost: '1 000–8 000 ₽/мес', ruPayment: true },
  { tool: 'AI API (OpenAI через прокси)', cost: '2 000–10 000 ₽/мес', ruPayment: false },
  { tool: 'Автоматизация (Albato / Make)', cost: '0–2 500 ₽/мес', ruPayment: true },
  { tool: 'Аналитика (Я.Метрика + PostHog)', cost: '0 ₽', ruPayment: true },
  { tool: 'Домен (.ru/.com)', cost: '500–2 000 ₽/год', ruPayment: true },
  { tool: 'Платное продвижение', cost: '10 000–30 000 ₽', ruPayment: true },
  { tool: 'Фрилансер на точечную задачу', cost: '5 000–20 000 ₽', ruPayment: true },
];

export const funnelMath = [
  { stage: 'Визиты', conversion: '—', needed: '~1500' },
  { stage: 'Регистрации', conversion: '10–15%', needed: '~170' },
  { stage: 'Completed core action', conversion: '25–35%', needed: '50' },
  { stage: 'Return visit', conversion: '~10%', needed: '5' },
];

export function getAllTaskIds() {
  const ids = [];
  Object.values(weeks).forEach((week) => {
    week.sections.forEach((section) => {
      section.tasks.forEach((task) => ids.push(task.id));
    });
    if (week.finalCheck) {
      week.finalCheck.forEach((task) => ids.push(task.id));
    }
  });
  return ids;
}

export function getWeekTaskIds(weekId) {
  const week = weeks[weekId];
  if (!week) return [];
  const ids = [];
  week.sections.forEach((section) => {
    section.tasks.forEach((task) => ids.push(task.id));
  });
  if (week.finalCheck) {
    week.finalCheck.forEach((task) => ids.push(task.id));
  }
  return ids;
}

export function getPhaseTaskIds(phaseId) {
  const phase = phases.find((p) => p.id === phaseId);
  if (!phase) return [];
  return phase.weeks.flatMap((wId) => getWeekTaskIds(wId));
}
