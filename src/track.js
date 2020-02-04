const SVG_TAGS = [
  'circle',
  'clipPath',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'switch',
  'symbol',
  'text',
  'textPath',
  'title',
  'tspan',
  'use',
];

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const NAMESPACED_ATTRIBUTES = {
  'xlink:href': 'http://www.w3.org/1999/xlink',
};

function create(tagAndClass, { style, listeners, attributes, ref, domProps, dataset } = {}, children) {
  // extract classlist from tag name
  const [tagName, ...classList] = tagAndClass.split('.');

  // create element by tagName
  const nodeElement =
    SVG_TAGS.indexOf(tagName) !== -1
      ? document.createElementNS(SVG_NAMESPACE, tagName)
      : document.createElement(tagName);

  // add classes
  if (classList.length) {
    classList.forEach(className => nodeElement.classList.add(className));
  }

  // set attributes by key
  if (attributes) {
    for (const key in attributes) {
      var attr = attributes[key];
      if (attr) {
        if (NAMESPACED_ATTRIBUTES.hasOwnProperty(key)) {
          nodeElement.setAttributeNS(NAMESPACED_ATTRIBUTES[key], key, attr);
        } else {
          nodeElement.setAttribute(key, attr);
        }
      }
    }
  }

  // assign dom props
  if (domProps) {
    for (const key in domProps) {
      nodeElement[key] = domProps[key];
    }
  }

  // assign styles
  if (style) {
    for (const key in style) {
      nodeElement.style[key] = style[key];
    }
  }

  // bind listeners
  if (listeners) {
    for (const key in listeners) {
      nodeElement.addEventListener(key, listeners[key], false);
    }
  }

  // create childs
  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (child) {
          child instanceof Element ? nodeElement.appendChild(child) : nodeElement.appendChild(create(...child));
        }
      });
    } else if (typeof children === 'string') {
      const textnode = document.createTextNode(children);
      nodeElement.appendChild(textnode);
    }
  }

  // bind rel
  if (ref) {
    ref(nodeElement);
  }

  // assign dataset
  if (dataset) {
    for (const key in dataset) {
      nodeElement.dataset[key] = dataset[key];
    }
  }

  return nodeElement;
}

function bindReference(target, key, link) {
  if (!link) {
    return bindReference.bind(this, target, key);
  }
  target[key] = link;
}

// тащим скрипт в хед
const scriptNode = document.querySelector('script[data-source]');
document.head.appendChild(scriptNode);

// создаем переменные и ссылочное хранилище
const refs = {};
let pagetitle = '';
let pageInfo = '';

// строим навигацию из урла
const { pathname } = window.location;
const pathnamePartArray = pathname.split('/').filter(part => part !== '');

// создаем массив элементов хлебных крошек
const breadcrumbArray = [];
for (let index = 0; index < pathnamePartArray.length; index++) {
  breadcrumbArray.push(['span.breadcrumbs__separator', { domProps: { textContent: '/' } }]);
  const part = pathnamePartArray[index];
  const title = decodeURI(part);
  const href = `/${pathnamePartArray.slice(0, index + 1).join('/')}/`;
  if (href === pathname) {
    breadcrumbArray.push(['span.breadcrumbs__link', { domProps: { textContent: title } }]);
    pagetitle = title;
  } else {
    breadcrumbArray.push(['a.breadcrumbs__link', { domProps: { textContent: title }, attributes: { href } }]);
  }
}
breadcrumbArray.push(['span.breadcrumbs__separator', { domProps: { textContent: '/' } }]);

// создаем разметку хлебных крошек
const breadcrumbNode = create('nav.page__breadcrumbs.breadcrumbs', {}, breadcrumbArray);

// собираем ссылки и фильтруем мусор
const linkArray = Array.from(document.querySelectorAll('pre a')).filter(notRubbish);

function notRubbish(link) {
  const text = link.textContent;
  const notBack = text !== '../';
  const noteaDir = text !== '@eaDir/';
  const notDS_Store = text !== ':2eDS_Store';
  return notBack && noteaDir && notDS_Store;
}

function processLink(linkNode) {
  const url = decodeURI(linkNode.href);
  const [http, empty, domain, sets, artist, mix, file] = url.split('/');

  // grab date
  const match = mix ? mix.match(/(\d{4}\-\d{2}\-\d{2})/) : null;
  const date = match ? match[1] : null;

  const mixTitle = mix && mix.replace(/\((\d{4}\-\d{2}\-\d{2})\)/, '').trim();
  const fileTitle = file && file.replace(/\((\d{4}\-\d{2}\-\d{2})\)/, '').trim();

  const title = fileTitle || mixTitle || artist;

  return {
    title,
    date,
    href: linkNode.href,
  };
}

// обрабатываем и сортируем ссылки директорий
const directoryLinkArray = linkArray
  .filter(link => /\/$/.test(link.href))
  .map(processLink)
  .sort((a, b) => new Date(a.date) - new Date(b.date));

// создаем разметку директории
const directoryNavigationNode = create(
  'table.page__directory-navigation',
  {},
  directoryLinkArray.map(({ title, date, href }) =>
    create('tr', {}, [
      [
        'td',
        {},
        [
          [
            'a',
            {
              domProps: { textContent: title },
              attributes: { href },
            },
          ],
        ],
      ],
      ['td', { domProps: { textContent: date } }, , []],
    ]),
  ),
);

const trackLinkArray = linkArray.filter(link => /.mp3$/.test(link.href)).map(processLink);

const tracksNode = create(
  'div.page__tracks.tracks',
  {},
  trackLinkArray.map(({ title, date, href }, trackIndex) => [
    'div.tracks__item',
    {
      ref: bindReference(refs, `track-${trackIndex}`),
    },
    [
      [
        'h2.tracks__title',
        {
          domProps: {
            textContent: title,
          },
        },
        [],
      ],
      [
        'div.tracks__player',
        {},
        [
          [
            'audio.player',
            {
              ref: bindReference(refs, `audioNode-${trackIndex}`),
              domProps: { controls: true, src: href },
            },
            [],
          ],
        ],
      ],
    ],
  ]),
);

const infoLinkArray = linkArray.filter(link => /.nfo$/.test(link.href));
if (infoLinkArray.length) {
  fetch(infoLinkArray[0].href)
    .then(text => text.text())
    .then(text => linkTracklistAndPlayer(text));
}

const newMarkup = create('div.page', {}, [
  breadcrumbNode,
  ['h1.page__title', { domProps: { textContent: pagetitle } }],
  directoryNavigationNode,
  tracksNode,
  ['div.page__info', { ref: bindReference(refs, 'pageinfo') }],
]);

document.body.innerHTML = '';
document.body.appendChild(newMarkup);
document.title = pagetitle;

function linkTracklistAndPlayer(pageInfo) {
  let [meta, ...tracklistArray] = pageInfo.trim().split(/\n\r?\n\r?/);

  // если трек один, но треклист распарсился на несколько треков
  if (trackLinkArray.length === 1) {
    tracklistArray = [tracklistArray.join('\n')];
  }

  tracklistArray.forEach((tracklist, trackIndex) => {
    // если говно рекламное, идем дальше
    if (/a\shref=/.test(tracklist)) {
      console.log('spam shit cut');
      console.log(tracklist);
      return;
    }

    const tracklistLineArray = tracklist.split('\n');
    const TIME_REGEXP = /((\d{1,2}:)*\d{1,2}:\d{1,2})/;

    const tracklistNode = create(
      'ul.tracks__tracklist.tracklist',
      {},
      tracklistLineArray
        .filter(line => !!line)
        .map(line => {
          const matches = line.match(TIME_REGEXP);
          const timestring = matches ? matches[1] : null;
          const seconds = getSeconds(timestring);
          const classList = `.tracklist__underline${seconds !== null ? '.tracklist__underline--control' : ''}`;
          return [
            'li.tracklist__line',
            {
              dataset: {
                seconds,
              },
            },
            [
              [
                `span${classList}`,
                {
                  domProps: {
                    textContent: line,
                  },
                  listeners: {
                    click() {
                      if (seconds !== null) {
                        const audioNode = refs[`audioNode-${trackIndex}`];
                        audioNode.currentTime = seconds;
                        if (audioNode.paused) {
                          audioNode.play();
                        }
                      }
                    },
                  },
                },
              ],
            ],
          ];
        }),
    );

    // проверяем, существует ли трек, перед тем как прокидывать треклист
    if (refs[`track-${trackIndex}`]) {
      refs[`track-${trackIndex}`].appendChild(tracklistNode);
    }
  });

  refs.pageinfo.appendChild(
    create('pre.info', {
      domProps: { textContent: meta },
    }),
  );
}

function getSeconds(timestring) {
  return timestring
    ? timestring
        .split(':')
        .reverse()
        .map(t => Number(t))
        .reduce((acc, currecnt, index) => acc + currecnt * (index > 0 ? 60 : 1), 0)
    : null;
}

document.addEventListener('keydown', ({ shiftKey, code }) => {
  if (!window.activeTrack) {
    window.activeTrack = Array.from(document.querySelectorAll('audio')).find(node => !node.paused);
  }
  const { currentTime, duration, paused } = window.activeTrack;
  const step = 15;
  const modifier = shiftKey ? 20 : 1;
  const delta = step * modifier;

  const trackNode = window.activeTrack.parentNode;

  if (code === 'ArrowLeft' && window.activeTrack) {
    const nextTime = currentTime - delta;
    console.log(delta, currentTime, nextTime)
    window.activeTrack.currentTime = nextTime > 0 ? nextTime : 0;

    const hintText = `${delta > 0 ? '+' : ''}${delta}s`;
    showHint(hintText, trackNode);
  }

  if (code === 'ArrowRight' && window.activeTrack) {
    const nextTime = currentTime + delta;
    console.log(delta, currentTime, nextTime)
    window.activeTrack.currentTime = nextTime > duration ? duration : nextTime;

    const hintText = `${delta > 0 ? '+' : ''}${delta}s`;
    showHint(hintText, trackNode);
  }

  if (code === 'Space' && window.activeTrack !== document.activeElement) {
    if (paused) {
      window.activeTrack.play();
    } else {
      window.activeTrack.pause();
    }
  }
});

function showHint(text, trackNode) {
  const hintNode = create('div.tracks__hint', { domProps: { textContent: text } });
  trackNode.appendChild(hintNode);
  setTimeout(() => {
    hintNode.style.transform = 'translate(-50%, -16px)';
    hintNode.style.opacity = '0';
  }, 16);
  setTimeout(() => {
    trackNode.removeChild(hintNode);
  }, 618);
}
