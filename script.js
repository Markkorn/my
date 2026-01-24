const stories = [
  {
    id: 'forest',
    title: 'Волшебный лес',
    mood: 'таинственная',
    summary: 'История о тропинке, которая ведёт к шёпоту деревьев.',
    text: [
      'Ночь укрыла лес мягким туманом. Соня взяла фонарь и шагнула на старую тропинку, которая светилась словно от лунной пыли.',
      'Каждое дерево приветствовало её тихим вздохом. В дуплах жили огоньки, похожие на маленьких звёздных рыб.',
      'В самом центре леса Соня нашла озеро. Вода сказала ей: «Когда тебе страшно, вспомни, что свет всегда находится внутри тебя».',
      'С этими словами туман расступился, и девочка увидела путь домой. Лес долго ещё шептал ей благодарность.'
    ]
  },
  {
    id: 'brave-bird',
    title: 'Птица храбрости',
    mood: 'смелая',
    summary: 'Сказка о маленькой птичке, которая научилась летать в грозу.',
    text: [
      'Жила-была птичка Иви, которая боялась грозы. Когда гремел гром, она пряталась под широким листом.',
      'Однажды ветер сдул лист, и Иви поняла: пора взлетать. Она расправила крылья и увидела, что дождь танцует.',
      'Иви поймала тёплый поток воздуха и поднялась над облаками. Там было тихо, как в мягкой подушке.',
      'С тех пор Иви знала: смелость — это шаг вперёд, даже если сердце бьётся быстро.'
    ]
  },
  {
    id: 'kind-giant',
    title: 'Добрый великан',
    mood: 'добрая',
    summary: 'Про великана, который выращивал сады для всех жителей.',
    text: [
      'За холмами жил великан Лука. Он был таким высоким, что мог посадить яблоню, не нагибаясь.',
      'Каждое утро Лука ходил по деревне и спрашивал, чего людям не хватает. Кто-то просил тень, кто-то — цветы.',
      'Лука сеял семена, и вскоре вокруг домов появлялись сады. В каждом саду была лавочка для разговоров.',
      'Люди поняли: доброе сердце сильнее любых размеров.'
    ]
  },
  {
    id: 'moon-cat',
    title: 'Лунный кот',
    mood: 'сонная',
    summary: 'Ласковая сказка для спокойного вечера.',
    text: [
      'На крыше жил кот по имени Мур, который каждую ночь собирал лунный свет в шерсть.',
      'Когда дети не могли уснуть, Мур спускался по лестнице из света и мурлыкал песню.',
      'Его мурлыканье укрывало комнаты мягким облаком, и глаза сами закрывались.',
      'Сон приходил тихо, как шаги кота по подоконнику.'
    ]
  },
  {
    id: 'river-lanterns',
    title: 'Речные фонарики',
    mood: 'таинственная',
    summary: 'История о фонариках, которые выполняют желания.',
    text: [
      'Каждую весну жители отпускали по реке фонарики. Говорили, что если попросить тихо, желание исполнится.',
      'Мальчик Егор отпустил свой фонарик и попросил дружбу. Свет поплыл, оставляя золотую дорожку.',
      'На следующий день он встретил девочку, которая тоже искала друга. Они вместе отправились смотреть на реку.',
      'Фонарики учили их: желания любят идти рядом с добротой.'
    ]
  }
];

const storyList = document.getElementById('storyList');
const storyTitle = document.getElementById('storyTitle');
const storyMeta = document.getElementById('storyMeta');
const storyText = document.getElementById('storyText');
const searchInput = document.getElementById('searchInput');
const moodSelect = document.getElementById('moodSelect');
const fontSize = document.getElementById('fontSize');
const themeToggle = document.getElementById('themeToggle');
const randomBtn = document.getElementById('randomBtn');
const startReading = document.getElementById('startReading');
const openCatalog = document.getElementById('openCatalog');
const readerSection = document.getElementById('readerSection');
const profileForm = document.getElementById('profileForm');
const profileName = document.getElementById('profileName');
const profileAge = document.getElementById('profileAge');
const profileMood = document.getElementById('profileMood');
const profileWish = document.getElementById('profileWish');
const profileDisplay = document.getElementById('profileDisplay');
const profileReset = document.getElementById('profileReset');

let activeStoryId = null;

const renderStories = () => {
  const query = searchInput.value.toLowerCase();
  const mood = moodSelect.value;

  const filtered = stories.filter((story) => {
    const matchesQuery = story.title.toLowerCase().includes(query);
    const matchesMood = mood === 'all' || story.mood === mood;
    return matchesQuery && matchesMood;
  });

  storyList.innerHTML = '';

  filtered.forEach((story) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'story-card';
    if (story.id === activeStoryId) {
      button.classList.add('is-active');
    }

    button.innerHTML = `
      <h3>${story.title}</h3>
      <p>${story.summary}</p>
    `;

    button.addEventListener('click', () => setActiveStory(story.id));

    item.appendChild(button);
    storyList.appendChild(item);
  });

  if (!filtered.length) {
    const empty = document.createElement('li');
    empty.innerHTML = '<p class="story-meta">Ничего не найдено. Попробуйте изменить фильтры.</p>';
    storyList.appendChild(empty);
  }
};

const setActiveStory = (storyId) => {
  const story = stories.find((item) => item.id === storyId);
  if (!story) {
    return;
  }

  activeStoryId = storyId;
  storyTitle.textContent = story.title;
  storyMeta.textContent = `Настроение: ${story.mood}`;
  storyText.innerHTML = story.text.map((paragraph) => `<p>${paragraph}</p>`).join('');
  renderStories();
};

const setRandomStory = () => {
  const pool = stories.filter((story) => story.id !== activeStoryId);
  const selection = pool[Math.floor(Math.random() * pool.length)];
  setActiveStory(selection.id);
};

const toggleTheme = () => {
  const root = document.documentElement;
  const isDark = root.dataset.theme === 'dark';
  root.dataset.theme = isDark ? 'light' : 'dark';
  themeToggle.textContent = `Тема: ${isDark ? 'светлая' : 'тёмная'}`;
};

const profileStorageKey = 'fairyProfile';

const renderProfile = (profile) => {
  if (!profile) {
    profileDisplay.innerHTML = `
      <div class="profile__status">Профиль не создан</div>
      <p>Пока профиль пуст. Заполните форму справа, чтобы создать свой уголок чтения.</p>
    `;
    return;
  }

  profileDisplay.innerHTML = `
    <div class="profile__status">Профиль сохранён</div>
    <h3>Привет, ${profile.name}!</h3>
    <p>Возраст: ${profile.age}</p>
    <p>Любимое настроение: ${profile.mood}</p>
    ${profile.wish ? `<p>Пожелание: ${profile.wish}</p>` : ''}
  `;
};

const loadProfile = () => {
  const stored = localStorage.getItem(profileStorageKey);
  if (!stored) {
    renderProfile(null);
    return;
  }

  const profile = JSON.parse(stored);
  profileName.value = profile.name;
  profileAge.value = profile.age;
  profileMood.value = profile.mood;
  profileWish.value = profile.wish ?? '';
  renderProfile(profile);
};

const saveProfile = (event) => {
  event.preventDefault();
  const profile = {
    name: profileName.value.trim(),
    age: profileAge.value,
    mood: profileMood.value,
    wish: profileWish.value.trim()
  };

  localStorage.setItem(profileStorageKey, JSON.stringify(profile));
  renderProfile(profile);
};

const resetProfile = () => {
  localStorage.removeItem(profileStorageKey);
  profileForm.reset();
  renderProfile(null);
};

searchInput.addEventListener('input', renderStories);
moodSelect.addEventListener('change', renderStories);
fontSize.addEventListener('input', (event) => {
  document.documentElement.style.setProperty('--reader-size', `${event.target.value}px`);
});
randomBtn.addEventListener('click', setRandomStory);
themeToggle.addEventListener('click', toggleTheme);
startReading.addEventListener('click', () => {
  readerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
openCatalog.addEventListener('click', () => {
  storyList.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
profileForm.addEventListener('submit', saveProfile);
profileReset.addEventListener('click', resetProfile);

setActiveStory(stories[0].id);
renderStories();
loadProfile();
