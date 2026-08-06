export type BibleVersion = 'KJV' | 'NKJV' | 'ESV' | 'NIV'

// Verse counts for each chapter of Isaiah (index 0 = chapter 1)
export const ISAIAH_VERSE_COUNTS = [
  31, 22, 26,  6, 30, 13, 25, 22, 21, 34,
  16,  6, 22, 32,  9, 14, 14,  7, 25,  6,
  17, 25, 18, 23, 12, 21, 13, 29, 24, 33,
   9, 20, 24, 17, 10, 22, 38, 22,  8, 31,
  29, 25, 28, 28, 25, 13, 15, 22, 26, 11,
  23, 15, 12, 17, 13, 12, 21, 14, 21, 22,
  11, 12, 19, 12, 25, 24,
]

export const BIBLEHUB_VERSION: Record<BibleVersion, string> = {
  KJV: 'kjv', NKJV: 'nkjv', ESV: 'esv', NIV: 'niv',
}

export interface VerseData {
  ref: string
  texts: Partial<Record<BibleVersion, string>>
}

export interface ChapterData {
  number: number
  title: string
  theme: string
  part: 1 | 2 | 3
  keyVerses: VerseData[]
}

export const PARTS = [
  { part: 1 as const, label: 'Warning of Judgement', chapters: '1–39', range: [1, 39], schedule: '2–4 chapters a week', color: '#a85b31' },
  { part: 2 as const, label: 'Comfort and Hope', chapters: '40–55', range: [40, 55], schedule: '2–4 chapters a week', color: '#949b61' },
  { part: 3 as const, label: 'Future Restoration', chapters: '56–66', range: [56, 66], schedule: '2–4 chapters a week', color: '#cfac29' },
]

export const ISAIAH_CHAPTERS: ChapterData[] = [
  // ── PART 1: Warning of Judgement (1–39) ──────────────────────────────────
  {
    number: 1, part: 1,
    title: 'The Sinful Nation',
    theme: 'God calls rebellious Judah to account and offers cleansing',
    keyVerses: [
      { ref: 'Isaiah 1:18', texts: {
        ESV: '"Come now, let us reason together, says the LORD: though your sins are like scarlet, they shall be as white as snow; though they are red like crimson, they shall become like wool."',
        KJV: '"Come now, and let us reason together, saith the LORD: though your sins be as scarlet, they shall be as white as snow; though they be red like crimson, they shall be as wool."',
        NKJV: '"Come now, and let us reason together," says the LORD, "Though your sins are like scarlet, they shall be as white as snow; though they are red like crimson, they shall be as wool."',
        NIV: '"Come now, let us settle the matter," says the LORD. "Though your sins are like scarlet, they shall be as white as snow; though they are red as crimson, they shall be like wool."',
      }},
      { ref: 'Isaiah 1:3', texts: { ESV: 'The ox knows its owner, and the donkey its master\'s crib, but Israel does not know, my people do not understand.' }},
    ],
  },
  {
    number: 2, part: 1,
    title: 'The Mountain of the LORD',
    theme: 'The nations stream to Zion; the day of the LORD brings humbling',
    keyVerses: [
      { ref: 'Isaiah 2:2', texts: { ESV: 'It shall come to pass in the latter days that the mountain of the house of the LORD shall be established as the highest of the mountains, and shall be lifted up above the hills; and all the nations shall flow to it.' }},
      { ref: 'Isaiah 2:4', texts: { ESV: 'He shall judge between the nations, and shall decide disputes for many peoples; and they shall beat their swords into plowshares, and their spears into pruning hooks; nation shall not lift up sword against nation, neither shall they learn war anymore.' }},
    ],
  },
  {
    number: 3, part: 1,
    title: 'Judgment on Jerusalem',
    theme: 'God removes Jerusalem\'s leaders and judges its pride',
    keyVerses: [
      { ref: 'Isaiah 3:14', texts: { ESV: 'The LORD will enter into judgment with the elders and princes of his people: "It is you who have devoured the vineyard, the spoil of the poor is in your houses."' }},
      { ref: 'Isaiah 3:15', texts: { ESV: '"What do you mean by crushing my people, by grinding the face of the poor?" declares the Lord GOD of hosts.' }},
    ],
  },
  {
    number: 4, part: 1,
    title: 'The Branch of the LORD',
    theme: 'After cleansing, the remnant of Zion flourishes in beauty',
    keyVerses: [
      { ref: 'Isaiah 4:2', texts: { ESV: 'In that day the branch of the LORD shall be beautiful and glorious, and the fruit of the land shall be the pride and honour of the survivors of Israel.' }},
      { ref: 'Isaiah 4:5–6', texts: { ESV: 'Then the LORD will create over the whole site of Mount Zion and over her assemblies a cloud by day, and smoke and the shining of a flaming fire by night; for over all the glory there will be a canopy.' }},
    ],
  },
  {
    number: 5, part: 1,
    title: 'The Song of the Vineyard',
    theme: 'God\'s vineyard (Israel) yields wild grapes; six woes pronounced',
    keyVerses: [
      { ref: 'Isaiah 5:4', texts: { ESV: '"What more was there to do for my vineyard, that I have not done in it? When I looked for it to yield grapes, why did it yield wild grapes?"' }},
      { ref: 'Isaiah 5:16', texts: { ESV: 'But the LORD of hosts is exalted in justice, and the Holy God shows himself holy in righteousness.' }},
    ],
  },
  {
    number: 6, part: 1,
    title: 'Isaiah\'s Commission',
    theme: 'Isaiah sees the glory of God and is sent as prophet to a hard-hearted people',
    keyVerses: [
      { ref: 'Isaiah 6:3', texts: {
        ESV: '"Holy, holy, holy is the LORD of hosts; the whole earth is full of his glory!"',
        KJV: '"Holy, holy, holy, is the LORD of hosts: the whole earth is full of his glory."',
        NKJV: '"Holy, holy, holy is the LORD of hosts; the whole earth is full of His glory!"',
        NIV: '"Holy, holy, holy is the LORD Almighty; the whole earth is full of his glory."',
      }},
      { ref: 'Isaiah 6:8', texts: {
        ESV: 'And I heard the voice of the Lord saying, "Whom shall I send, and who will go for us?" Then I said, "Here I am! Send me."',
        KJV: 'Also I heard the voice of the Lord, saying, Whom shall I send, and who will go for us? Then said I, Here am I; send me.',
        NIV: 'Then I heard the voice of the Lord saying, "Whom shall I send? And who will go for us?" And I said, "Here am I. Send me!"',
      }},
    ],
  },
  {
    number: 7, part: 1,
    title: 'The Sign of Immanuel',
    theme: 'God gives Ahaz the sign of the virgin-born Immanuel',
    keyVerses: [
      { ref: 'Isaiah 7:14', texts: {
        ESV: '"Therefore the Lord himself will give you a sign. Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel."',
        KJV: '"Therefore the Lord himself shall give you a sign; Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel."',
        NIV: '"Therefore the Lord himself will give you a sign: The virgin will conceive and give birth to a son, and will call him Immanuel."',
      }},
    ],
  },
  {
    number: 8, part: 1,
    title: 'Assyria, God\'s Instrument',
    theme: 'Assyria floods the land; the faithful hold to God\'s teaching',
    keyVerses: [
      { ref: 'Isaiah 8:16', texts: { ESV: 'Bind up the testimony; seal the teaching among my disciples.' }},
      { ref: 'Isaiah 8:13', texts: { ESV: '"But the LORD of hosts, him you shall honour as holy. Let him be your fear, and let him be your dread."' }},
    ],
  },
  {
    number: 9, part: 1,
    title: 'The Prince of Peace',
    theme: 'Light dawns on Galilee; the child who is Wonderful Counsellor',
    keyVerses: [
      { ref: 'Isaiah 9:6', texts: {
        ESV: 'For to us a child is born, to us a son is given; and the government shall be upon his shoulder, and his name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.',
        KJV: 'For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.',
        NKJV: 'For unto us a Child is born, unto us a Son is given; and the government will be upon His shoulder. And His name will be called Wonderful, Counselor, Mighty God, Everlasting Father, Prince of Peace.',
        NIV: 'For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.',
      }},
    ],
  },
  {
    number: 10, part: 1,
    title: 'Woe to the Oppressors',
    theme: 'Woe to unjust rulers; Assyria is God\'s rod but will be judged',
    keyVerses: [
      { ref: 'Isaiah 10:1–2', texts: { ESV: '"Woe to those who decree iniquitous decrees, and the writers who keep writing oppression, to turn aside the needy from justice and to rob the poor of my people of their right."' }},
      { ref: 'Isaiah 10:15', texts: { ESV: 'Shall the axe boast over him who hews with it, or the saw magnify itself against him who wields it?' }},
    ],
  },
  {
    number: 11, part: 1,
    title: 'The Branch from Jesse',
    theme: 'The Spirit-filled Messiah brings justice and universal peace',
    keyVerses: [
      { ref: 'Isaiah 11:1–2', texts: {
        ESV: 'There shall come forth a shoot from the stump of Jesse, and a branch from his roots shall bear fruit. And the Spirit of the LORD shall rest upon him, the Spirit of wisdom and understanding, the Spirit of counsel and might, the Spirit of knowledge and the fear of the LORD.',
        KJV: 'And there shall come forth a rod out of the stem of Jesse, and a Branch shall grow out of his roots: And the spirit of the LORD shall rest upon him, the spirit of wisdom and understanding, the spirit of counsel and might, the spirit of knowledge and of the fear of the LORD.',
      }},
      { ref: 'Isaiah 11:6', texts: { ESV: 'The wolf shall dwell with the lamb, and the leopard shall lie down with the young goat, and the calf and the lion and the fattened calf together; and a little child shall lead them.' }},
    ],
  },
  {
    number: 12, part: 1,
    title: 'Songs of Praise',
    theme: 'Redeemed Israel sings of God\'s salvation with joy',
    keyVerses: [
      { ref: 'Isaiah 12:2', texts: { ESV: '"Behold, God is my salvation; I will trust, and will not be afraid; for the LORD GOD is my strength and my song, and he has become my salvation."' }},
      { ref: 'Isaiah 12:3', texts: { ESV: 'With joy you will draw water from the wells of salvation.' }},
    ],
  },
  {
    number: 13, part: 1,
    title: 'Prophecy Against Babylon',
    theme: 'The Day of the LORD falls upon mighty Babylon',
    keyVerses: [
      { ref: 'Isaiah 13:6', texts: { ESV: 'Wail, for the day of the LORD is near; as destruction from the Almighty it will come!' }},
      { ref: 'Isaiah 13:19', texts: { ESV: 'And Babylon, the glory of kingdoms, the splendour and pomp of the Chaldeans, will be like Sodom and Gomorrah when God overthrew them.' }},
    ],
  },
  {
    number: 14, part: 1,
    title: 'Taunt Against Babylon',
    theme: 'The pride of the king of Babylon leads to his downfall',
    keyVerses: [
      { ref: 'Isaiah 14:12', texts: {
        ESV: '"How you are fallen from heaven, O Day Star, son of Dawn! How you are cut down to the ground, you who laid the nations low!"',
        KJV: '"How art thou fallen from heaven, O Lucifer, son of the morning! how art thou cut down to the ground, which didst weaken the nations!"',
      }},
    ],
  },
  {
    number: 15, part: 1,
    title: 'Prophecy Against Moab',
    theme: 'Moab is laid waste in a night; weeping and mourning throughout the land',
    keyVerses: [
      { ref: 'Isaiah 15:5', texts: { ESV: 'My heart cries out for Moab; her fugitives flee to Zoar, to Eglath-shelishiyah.' }},
    ],
  },
  {
    number: 16, part: 1,
    title: 'Moab\'s Pride and Fall',
    theme: 'Moab\'s pride is rebuked; a remnant is promised',
    keyVerses: [
      { ref: 'Isaiah 16:5', texts: { ESV: '"Then a throne will be established in steadfast love, and on it will sit in faithfulness in the tent of David one who judges and seeks justice and is swift to do righteousness."' }},
    ],
  },
  {
    number: 17, part: 1,
    title: 'Prophecy Against Damascus',
    theme: 'Damascus falls; Israel looks to its Maker',
    keyVerses: [
      { ref: 'Isaiah 17:7', texts: { ESV: 'In that day man will look to his Maker, and his eyes will look on the Holy One of Israel.' }},
    ],
  },
  {
    number: 18, part: 1,
    title: 'Prophecy Against Cush',
    theme: 'The tall, smooth-skinned nation brings tribute to Zion',
    keyVerses: [
      { ref: 'Isaiah 18:7', texts: { ESV: 'At that time tribute will be brought to the LORD of hosts from a people tall and smooth, from a people feared near and far.' }},
    ],
  },
  {
    number: 19, part: 1,
    title: 'Prophecy Against Egypt',
    theme: 'Egypt is humbled but will know the LORD; blessed with Israel and Assyria',
    keyVerses: [
      { ref: 'Isaiah 19:19', texts: { ESV: 'In that day there will be an altar to the LORD in the midst of the land of Egypt, and a pillar to the LORD at its border.' }},
      { ref: 'Isaiah 19:25', texts: { ESV: 'The LORD of hosts has blessed, saying, "Blessed be Egypt my people, and Assyria the work of my hands, and Israel my inheritance."' }},
    ],
  },
  {
    number: 20, part: 1,
    title: 'Egypt and Cush as a Sign',
    theme: 'Isaiah walks barefoot as a sign of Egypt\'s coming shame',
    keyVerses: [
      { ref: 'Isaiah 20:3', texts: { ESV: '"As my servant Isaiah has walked naked and barefoot for three years as a sign and portent against Egypt and Cush..."' }},
    ],
  },
  {
    number: 21, part: 1,
    title: 'The Fall of Babylon',
    theme: 'A watchman announces Babylon\'s fall',
    keyVerses: [
      { ref: 'Isaiah 21:9', texts: { ESV: '"Fallen, fallen is Babylon; and all the carved images of her gods he has shattered to the ground."' }},
    ],
  },
  {
    number: 22, part: 1,
    title: 'Jerusalem\'s Valley of Vision',
    theme: 'Jerusalem rejoices in the face of danger; the key of David',
    keyVerses: [
      { ref: 'Isaiah 22:22', texts: { ESV: '"And I will place on his shoulder the key of the house of David. He shall open, and none shall shut; and he shall shut, and none shall open."' }},
    ],
  },
  {
    number: 23, part: 1,
    title: 'Prophecy Against Tyre',
    theme: 'Tyre, the great trading city, is brought to ruin',
    keyVerses: [
      { ref: 'Isaiah 23:9', texts: { ESV: 'The LORD of hosts has purposed it, to defile the pompous pride of all glory, to dishonour all the honoured of the earth.' }},
    ],
  },
  {
    number: 24, part: 1,
    title: 'The LORD\'s Devastation of the Earth',
    theme: 'Cosmic judgment falls on the whole earth; God reigns on Mount Zion',
    keyVerses: [
      { ref: 'Isaiah 24:5', texts: { ESV: 'The earth lies defiled under its inhabitants; for they have transgressed the laws, violated the statutes, broken the everlasting covenant.' }},
      { ref: 'Isaiah 24:23', texts: { ESV: 'Then the moon will be confounded and the sun ashamed, for the LORD of hosts reigns on Mount Zion and in Jerusalem, and his glory will be before his elders.' }},
    ],
  },
  {
    number: 25, part: 1,
    title: 'Praise for God\'s Salvation',
    theme: 'God destroys death forever and wipes away every tear',
    keyVerses: [
      { ref: 'Isaiah 25:8', texts: {
        ESV: 'He will swallow up death forever; and the Lord GOD will wipe away tears from all faces, and the reproach of his people he will take away from all the earth, for the LORD has spoken.',
        KJV: 'He will swallow up death in victory; and the Lord GOD will wipe away tears from off all faces; and the rebuke of his people shall he take away from off all the earth: for the LORD hath spoken it.',
        NIV: 'He will swallow up death forever. The Sovereign LORD will wipe away the tears from all faces; he will remove his people\'s disgrace from all the earth. The LORD has spoken.',
      }},
    ],
  },
  {
    number: 26, part: 1,
    title: 'A Song of Trust',
    theme: 'Judah sings of God\'s perfect peace for the trusting heart',
    keyVerses: [
      { ref: 'Isaiah 26:3', texts: {
        ESV: 'You keep him in perfect peace whose mind is stayed on you, because he trusts in you.',
        KJV: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.',
        NIV: 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.',
      }},
      { ref: 'Isaiah 26:4', texts: { ESV: 'Trust in the LORD forever, for the LORD GOD is an everlasting rock.' }},
    ],
  },
  {
    number: 27, part: 1,
    title: 'Deliverance of Israel',
    theme: 'Leviathan is slain; Israel the vineyard is tended by God',
    keyVerses: [
      { ref: 'Isaiah 27:2–3', texts: { ESV: '"A pleasant vineyard, sing of it! I, the LORD, am its keeper; every moment I water it. Lest anyone punish it, I keep it night and day."' }},
    ],
  },
  {
    number: 28, part: 1,
    title: 'Woe to the Crown of Ephraim',
    theme: 'Woe to drunken leaders; God lays a precious cornerstone in Zion',
    keyVerses: [
      { ref: 'Isaiah 28:16', texts: { ESV: '"Behold, I am the one who has laid as a foundation in Zion a stone, a tested stone, a precious cornerstone, of a sure foundation: Whoever believes will not be in haste."' }},
    ],
  },
  {
    number: 29, part: 1,
    title: 'Woe to Ariel',
    theme: 'Jerusalem besieged; the people honour God with lips but not hearts',
    keyVerses: [
      { ref: 'Isaiah 29:13', texts: {
        ESV: '"Because this people draw near with their mouth and honour me with their lips, while their hearts are far from me, and their fear of me is a commandment taught by men..."',
        KJV: '"Forasmuch as this people draw near me with their mouth, and with their lips do honour me, but have removed their heart far from me, and their fear toward me is taught by the precept of men..."',
      }},
    ],
  },
  {
    number: 30, part: 1,
    title: 'The Obstinate Nation',
    theme: 'Judah trusts Egypt rather than God; the call to return in rest',
    keyVerses: [
      { ref: 'Isaiah 30:15', texts: {
        ESV: '"In returning and rest you shall be saved; in quietness and in trust shall be your strength." But you were unwilling.',
        KJV: 'For thus saith the Lord GOD, the Holy One of Israel; In returning and rest shall ye be saved; in quietness and in confidence shall be your strength: and ye would not.',
      }},
    ],
  },
  {
    number: 31, part: 1,
    title: 'Woe to Those Who Rely on Egypt',
    theme: 'Earthly alliances cannot save; God himself defends Jerusalem',
    keyVerses: [
      { ref: 'Isaiah 31:1', texts: { ESV: 'Woe to those who go down to Egypt for help and rely on horses, who trust in chariots because they are many and in horsemen because they are very strong, but do not look to the Holy One of Israel or consult the LORD!' }},
      { ref: 'Isaiah 31:5', texts: { ESV: 'Like birds hovering, so the LORD of hosts will protect Jerusalem; he will protect and deliver it; he will spare and rescue it.' }},
    ],
  },
  {
    number: 32, part: 1,
    title: 'The Kingdom of Righteousness',
    theme: 'A righteous king and the Spirit poured out bring lasting peace',
    keyVerses: [
      { ref: 'Isaiah 32:2', texts: { ESV: 'Each will be like a hiding place from the wind, a shelter from the storm, like streams of water in a dry place, like the shade of a great rock in a weary land.' }},
      { ref: 'Isaiah 32:17', texts: { ESV: 'And the effect of righteousness will be peace, and the result of righteousness, quietness and trust forever.' }},
    ],
  },
  {
    number: 33, part: 1,
    title: 'The LORD Our King',
    theme: 'God destroys the destroyer; the LORD is judge, lawgiver, and king',
    keyVerses: [
      { ref: 'Isaiah 33:22', texts: { ESV: 'For the LORD is our judge; the LORD is our lawgiver; the LORD is our king; he will save us.' }},
      { ref: 'Isaiah 33:2', texts: { ESV: 'O LORD, be gracious to us; we wait for you. Be our arm every morning, our salvation in the time of trouble.' }},
    ],
  },
  {
    number: 34, part: 1,
    title: 'Judgment on the Nations',
    theme: 'God\'s day of vengeance falls on all nations; Edom is desolate',
    keyVerses: [
      { ref: 'Isaiah 34:8', texts: { ESV: 'For the LORD has a day of vengeance, a year of recompense for the cause of Zion.' }},
    ],
  },
  {
    number: 35, part: 1,
    title: 'The Joy of the Redeemed',
    theme: 'The wilderness blossoms; the redeemed walk the Highway of Holiness',
    keyVerses: [
      { ref: 'Isaiah 35:4', texts: { ESV: 'Say to those who have an anxious heart, "Be strong; fear not! Behold, your God will come with vengeance, with the recompense of God. He will come and save you."' }},
      { ref: 'Isaiah 35:5–6', texts: { ESV: 'Then the eyes of the blind shall be opened, and the ears of the deaf unstopped; then shall the lame man leap like a deer, and the tongue of the mute sing for joy.' }},
      { ref: 'Isaiah 35:10', texts: { ESV: 'And the ransomed of the LORD shall return and come to Zion with singing; everlasting joy shall be upon their heads; they shall obtain gladness and joy, and sorrow and sighing shall flee away.' }},
    ],
  },
  {
    number: 36, part: 1,
    title: 'Sennacherib Threatens Jerusalem',
    theme: 'Assyria mocks the LORD and demands Jerusalem\'s surrender',
    keyVerses: [
      { ref: 'Isaiah 36:18–20', texts: { ESV: '"Beware lest Hezekiah mislead you by saying, \'The LORD will deliver us.\' Has any of the gods of the nations delivered his land out of the hand of the king of Assyria?"' }},
    ],
  },
  {
    number: 37, part: 1,
    title: 'Jerusalem\'s Deliverance',
    theme: 'Hezekiah prays; God answers; the angel strikes 185,000 Assyrians',
    keyVerses: [
      { ref: 'Isaiah 37:16', texts: { ESV: '"O LORD of hosts, God of Israel, enthroned above the cherubim, you are the God, you alone, of all the kingdoms of the earth; you have made heaven and earth."' }},
      { ref: 'Isaiah 37:35', texts: { ESV: '"For I will defend this city to save it, for my own sake and for the sake of my servant David."' }},
    ],
  },
  {
    number: 38, part: 1,
    title: 'Hezekiah\'s Illness',
    theme: 'Hezekiah faces death, prays, and receives fifteen more years',
    keyVerses: [
      { ref: 'Isaiah 38:5', texts: { ESV: '"I have heard your prayer; I have seen your tears. Behold, I will add fifteen years to your life."' }},
      { ref: 'Isaiah 38:17', texts: { ESV: '"Behold, it was for my welfare that I had great bitterness; but in love you have delivered my life from the pit of destruction, for you have cast all my sins behind your back."' }},
    ],
  },
  {
    number: 39, part: 1,
    title: 'Hezekiah and Babylon',
    theme: 'Hezekiah\'s foolish pride sets the stage for Babylonian exile',
    keyVerses: [
      { ref: 'Isaiah 39:6–7', texts: { ESV: '"Behold, the days are coming, when all that is in your house...shall be carried to Babylon. Nothing shall be left, says the LORD."' }},
      { ref: 'Isaiah 39:8', texts: { ESV: 'Then Hezekiah said to Isaiah, "The word of the LORD that you have spoken is good." For he thought, "There will be peace and security in my days."' }},
    ],
  },

  // ── PART 2: Comfort and Hope (40–55) ──────────────────────────────────────
  {
    number: 40, part: 2,
    title: 'Comfort for God\'s People',
    theme: 'God\'s tender comfort announced; the everlasting God renews the weary',
    keyVerses: [
      { ref: 'Isaiah 40:1–2', texts: {
        ESV: '"Comfort, comfort my people, says your God. Speak tenderly to Jerusalem, and cry to her that her warfare is ended, that her iniquity is pardoned, that she has received from the LORD\'s hand double for all her sins."',
        KJV: '"Comfort ye, comfort ye my people, saith your God. Speak ye comfortably to Jerusalem, and cry unto her, that her warfare is accomplished, that her iniquity is pardoned..."',
      }},
      { ref: 'Isaiah 40:8', texts: {
        ESV: '"The grass withers, the flower fades, but the word of our God will stand forever."',
        KJV: '"The grass withereth, the flower fadeth: but the word of our God shall stand for ever."',
        NIV: '"The grass withers and the flowers fall, but the word of our God endures forever."',
      }},
      { ref: 'Isaiah 40:31', texts: {
        ESV: 'But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.',
        KJV: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
        NKJV: 'But those who wait on the LORD shall renew their strength; they shall mount up with wings like eagles, they shall run and not be weary, they shall walk and not faint.',
        NIV: 'But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
      }},
    ],
  },
  {
    number: 41, part: 2,
    title: 'The Helper of Israel',
    theme: 'The nations fear; God assures his servant Israel with his presence',
    keyVerses: [
      { ref: 'Isaiah 41:10', texts: {
        ESV: '"Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand."',
        KJV: '"Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness."',
        NIV: '"So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand."',
      }},
    ],
  },
  {
    number: 42, part: 2,
    title: 'The Servant of the LORD',
    theme: 'God presents his Servant who brings justice gently to the nations',
    keyVerses: [
      { ref: 'Isaiah 42:1', texts: {
        ESV: '"Behold my servant, whom I uphold, my chosen, in whom my soul delights; I have put my Spirit upon him; he will bring forth justice to the nations."',
        NIV: '"Here is my servant, whom I uphold, my chosen one in whom I delight; I will put my Spirit on him, and he will bring justice to the nations."',
      }},
      { ref: 'Isaiah 42:3', texts: { ESV: '"A bruised reed he will not break, and a faintly burning wick he will not quench; he will faithfully bring forth justice."' }},
    ],
  },
  {
    number: 43, part: 2,
    title: 'Israel\'s Only Saviour',
    theme: 'God calls Israel by name; he is the only Saviour and Redeemer',
    keyVerses: [
      { ref: 'Isaiah 43:1', texts: {
        ESV: 'But now thus says the LORD, he who created you, O Jacob, he who formed you, O Israel: "Fear not, for I have redeemed you; I have called you by name, you are mine."',
        KJV: 'But now thus saith the LORD that created thee, O Jacob, and he that formed thee, O Israel, Fear not: for I have redeemed thee, I have called thee by thy name; thou art mine.',
        NKJV: 'But now, thus says the LORD, who created you, O Jacob, and He who formed you, O Israel: "Fear not, for I have redeemed you; I have called you by your name; you are Mine."',
        NIV: 'But now, this is what the LORD says — he who created you, Jacob, he who formed you, Israel: "Do not fear, for I have redeemed you; I have summoned you by name; you are mine."',
      }},
      { ref: 'Isaiah 43:2', texts: { ESV: '"When you pass through the waters, I will be with you; and through the rivers, they shall not overwhelm you; when you walk through fire you shall not be burned, and the flame shall not consume you."' }},
    ],
  },
  {
    number: 44, part: 2,
    title: 'The LORD, Not Idols',
    theme: 'God pours his Spirit and mocks the folly of idol-making',
    keyVerses: [
      { ref: 'Isaiah 44:6', texts: { ESV: '"I am the first and I am the last; besides me there is no god."' }},
      { ref: 'Isaiah 44:22', texts: { ESV: '"I have blotted out your transgressions like a cloud and your sins like mist; return to me, for I have redeemed you."' }},
    ],
  },
  {
    number: 45, part: 2,
    title: 'Cyrus, God\'s Anointed',
    theme: 'God names Cyrus a century ahead; he alone is LORD of all',
    keyVerses: [
      { ref: 'Isaiah 45:5', texts: { ESV: '"I am the LORD, and there is no other, besides me there is no God; I equip you, though you do not know me."' }},
      { ref: 'Isaiah 45:22', texts: { ESV: '"Turn to me and be saved, all the ends of the earth! For I am God, and there is no other."' }},
    ],
  },
  {
    number: 46, part: 2,
    title: 'The Fall of Babylon\'s Gods',
    theme: 'Babylon\'s gods are carried off while God carries his people',
    keyVerses: [
      { ref: 'Isaiah 46:4', texts: {
        ESV: '"Even to your old age I am he, and to grey hairs I will carry you. I have made, and I will bear; I will carry and will save."',
        KJV: '"And even to your old age I am he; and even to hoar hairs will I carry you: I have made, and I will bear; even I will carry, and will deliver you."',
      }},
    ],
  },
  {
    number: 47, part: 2,
    title: 'The Fall of Babylon',
    theme: 'Proud Babylon is shamed and humbled; her sorceries cannot save',
    keyVerses: [
      { ref: 'Isaiah 47:8', texts: { ESV: '"Now therefore hear this, you lover of pleasures, who sit securely, who say in your heart, \'I am, and there is no one besides me; I shall not sit as a widow or know the loss of children.\'"' }},
    ],
  },
  {
    number: 48, part: 2,
    title: 'Israel Refined',
    theme: 'God refines stubborn Israel for his glory; the call to depart Babylon',
    keyVerses: [
      { ref: 'Isaiah 48:10', texts: { ESV: '"Behold, I have refined you, but not as silver; I have tried you in the furnace of affliction."' }},
      { ref: 'Isaiah 48:18', texts: { ESV: '"Oh that you had paid attention to my commandments! Then your peace would have been like a river, and your righteousness like the waves of the sea."' }},
    ],
  },
  {
    number: 49, part: 2,
    title: 'The Servant\'s Mission',
    theme: 'The Servant is called from the womb; God will not forget Zion',
    keyVerses: [
      { ref: 'Isaiah 49:6', texts: { ESV: '"It is too light a thing that you should be my servant to raise up the tribes of Jacob and to bring back the preserved of Israel; I will make you as a light for the nations, that my salvation may reach to the end of the earth."' }},
      { ref: 'Isaiah 49:15–16', texts: {
        ESV: '"Can a woman forget her nursing child, that she should have no compassion on the son of her womb? Even these may forget, yet I will not forget you. Behold, I have engraved you on the palms of my hands."',
        NIV: '"Can a mother forget the baby at her breast and have no compassion on the child she has borne? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands."',
      }},
    ],
  },
  {
    number: 50, part: 2,
    title: 'The Servant\'s Obedience',
    theme: 'The Servant submits to suffering, trusting in God\'s vindication',
    keyVerses: [
      { ref: 'Isaiah 50:7', texts: { ESV: '"But the Lord GOD helps me; therefore I have not been disgraced; therefore I have set my face like a flint, and I know that I shall not be put to shame."' }},
    ],
  },
  {
    number: 51, part: 2,
    title: 'Everlasting Salvation',
    theme: 'Look to Abraham; God\'s salvation lasts forever; wake up, O Zion',
    keyVerses: [
      { ref: 'Isaiah 51:6', texts: { ESV: '"Lift up your eyes to the heavens, and look at the earth beneath; for the heavens vanish like smoke, the earth will wear out like a garment, and they who dwell in it will die in like manner; but my salvation will be forever, and my righteousness will never be dismayed."' }},
    ],
  },
  {
    number: 52, part: 2,
    title: 'Zion\'s Restoration',
    theme: 'Beautiful feet of the messenger; the Servant shocks the nations',
    keyVerses: [
      { ref: 'Isaiah 52:7', texts: {
        ESV: '"How beautiful upon the mountains are the feet of him who brings good news, who publishes peace, who brings good news of happiness, who publishes salvation, who says to Zion, \'Your God reigns.\'"',
        KJV: '"How beautiful upon the mountains are the feet of him that bringeth good tidings, that publisheth peace; that bringeth good tidings of good, that publisheth salvation; that saith unto Zion, Thy God reigneth!"',
      }},
    ],
  },
  {
    number: 53, part: 2,
    title: 'The Suffering Servant',
    theme: 'The Servant is despised, pierced for our sins, and bears our iniquities',
    keyVerses: [
      { ref: 'Isaiah 53:4–5', texts: {
        ESV: 'Surely he has borne our griefs and carried our sorrows; yet we esteemed him stricken, smitten by God, and afflicted. But he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed.',
        KJV: 'Surely he hath borne our griefs, and carried our sorrows: yet we did esteem him stricken, smitten of God, and afflicted. But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.',
        NKJV: 'Surely He has borne our griefs and carried our sorrows; yet we esteemed Him stricken, smitten by God, and afflicted. But He was wounded for our transgressions, He was bruised for our iniquities; the chastisement for our peace was upon Him, and by His stripes we are healed.',
        NIV: 'Surely he took up our pain and bore our suffering, yet we considered him punished by God, stricken by him, and afflicted. But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.',
      }},
      { ref: 'Isaiah 53:6', texts: {
        ESV: 'All we like sheep have gone astray; we have turned—every one—to his own way; and the LORD has laid on him the iniquity of us all.',
        KJV: 'All we like sheep have gone astray; we have turned every one to his own way; and the LORD hath laid on him the iniquity of us all.',
        NIV: 'We all, like sheep, have gone astray, each of us has turned to our own way; and the LORD has laid on him the iniquity of us all.',
      }},
    ],
  },
  {
    number: 54, part: 2,
    title: 'The Future Glory of Zion',
    theme: 'Zion\'s shame ends; God\'s unfailing love and eternal covenant',
    keyVerses: [
      { ref: 'Isaiah 54:10', texts: { ESV: '"For the mountains may depart and the hills be removed, but my steadfast love shall not depart from you, and my covenant of peace shall not be removed," says the LORD, who has compassion on you.' }},
      { ref: 'Isaiah 54:17', texts: { ESV: '"No weapon that is fashioned against you shall succeed, and you shall refute every tongue that rises against you in judgment. This is the heritage of the servants of the LORD and their vindication from me, declares the LORD."' }},
    ],
  },
  {
    number: 55, part: 2,
    title: 'Invitation to the Thirsty',
    theme: 'Come freely; God\'s ways are higher; his word never returns void',
    keyVerses: [
      { ref: 'Isaiah 55:1', texts: {
        ESV: '"Come, everyone who thirsts, come to the waters; and he who has no money, come, buy and eat! Come, buy wine and milk without money and without price."',
        KJV: '"Ho, every one that thirsteth, come ye to the waters, and he that hath no money; come ye, buy, and eat; yea, come, buy wine and milk without money and without price."',
        NIV: '"Come, all you who are thirsty, come to the waters; and you who have no money, come, buy and eat! Come, buy wine and milk without money and without cost."',
      }},
      { ref: 'Isaiah 55:8–9', texts: { ESV: '"For my thoughts are not your thoughts, neither are your ways my ways, declares the LORD. For as the heavens are higher than the earth, so are my ways higher than your ways and my thoughts than your thoughts."' }},
      { ref: 'Isaiah 55:11', texts: { ESV: '"So shall my word be that goes out from my mouth; it shall not return to me empty, but it shall accomplish that which I purpose, and shall succeed in the thing for which I sent it."' }},
    ],
  },

  // ── PART 3: Future Restoration (56–66) ────────────────────────────────────
  {
    number: 56, part: 3,
    title: 'Salvation for All',
    theme: 'Foreigners and eunuchs welcomed; the house of prayer for all peoples',
    keyVerses: [
      { ref: 'Isaiah 56:7', texts: {
        ESV: '"These I will bring to my holy mountain, and make them joyful in my house of prayer; their burnt offerings and their sacrifices will be accepted on my altar; for my house shall be called a house of prayer for all peoples."',
        KJV: '"Even them will I bring to my holy mountain, and make them joyful in my house of prayer: their burnt offerings and their sacrifices shall be accepted upon mine altar; for mine house shall be called an house of prayer for all people."',
      }},
    ],
  },
  {
    number: 57, part: 3,
    title: 'Comfort for the Contrite',
    theme: 'The high and holy One dwells with the humble and contrite',
    keyVerses: [
      { ref: 'Isaiah 57:15', texts: {
        ESV: 'For thus says the One who is high and lifted up, who inhabits eternity, whose name is Holy: "I dwell in the high and holy place, and also with him who is of a contrite and lowly spirit, to revive the spirit of the lowly, and to revive the heart of the contrite."',
        NIV: 'For this is what the high and exalted One says — he who lives forever, whose name is holy: "I live in a high and holy place, but also with the one who is contrite and lowly in spirit, to revive the spirit of the lowly and to revive the heart of the contrite."',
      }},
    ],
  },
  {
    number: 58, part: 3,
    title: 'True Fasting',
    theme: 'God calls for justice over ritual; the Sabbath and its blessings',
    keyVerses: [
      { ref: 'Isaiah 58:6–7', texts: {
        ESV: '"Is not this the fast that I choose: to loose the bonds of wickedness, to undo the straps of the yoke, to let the oppressed go free, and to break every yoke? Is it not to share your bread with the hungry and bring the homeless poor into your house?"',
        NIV: '"Is not this the kind of fasting I have chosen: to loose the chains of injustice and untie the cords of the yoke, to set the oppressed free and break every yoke? Is it not to share your food with the hungry and to provide the poor wanderer with shelter?"',
      }},
    ],
  },
  {
    number: 59, part: 3,
    title: 'Sin, Confession, and Redemption',
    theme: 'Iniquity separates from God; the Redeemer comes to Zion',
    keyVerses: [
      { ref: 'Isaiah 59:1–2', texts: { ESV: 'Behold, the LORD\'s hand is not shortened, that it cannot save, or his ear dull, that it cannot hear; but your iniquities have made a separation between you and your God, and your sins have hidden his face from you so that he does not hear.' }},
      { ref: 'Isaiah 59:20', texts: { ESV: '"And a Redeemer will come to Zion, to those in Jacob who turn from transgression," declares the LORD.' }},
    ],
  },
  {
    number: 60, part: 3,
    title: 'The Glory of Zion',
    theme: 'Arise and shine — the glory of the LORD rises upon his people',
    keyVerses: [
      { ref: 'Isaiah 60:1–2', texts: {
        ESV: '"Arise, shine, for your light has come, and the glory of the LORD has risen upon you. For behold, darkness shall cover the earth, and thick darkness the peoples; but the LORD will arise upon you, and his glory will be seen upon you."',
        NIV: '"Arise, shine, for your light has come, and the glory of the LORD rises upon you. See, darkness covers the earth and thick darkness is over the peoples, but the LORD rises upon you and his glory appears over you."',
      }},
    ],
  },
  {
    number: 61, part: 3,
    title: 'The Year of the LORD\'s Favour',
    theme: 'The Spirit-anointed one proclaims good news, freedom, and restoration',
    keyVerses: [
      { ref: 'Isaiah 61:1–2', texts: {
        ESV: 'The Spirit of the Lord GOD is upon me, because the LORD has anointed me to bring good news to the poor; he has sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to those who are bound; to proclaim the year of the LORD\'s favour, and the day of vengeance of our God.',
        KJV: 'The Spirit of the Lord GOD is upon me; because the LORD hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound.',
        NIV: 'The Spirit of the Sovereign LORD is on me, because the LORD has anointed me to proclaim good news to the poor. He has sent me to bind up the brokenhearted, to proclaim freedom for the captives and release from darkness for the prisoners, to proclaim the year of the LORD\'s favour.',
      }},
      { ref: 'Isaiah 61:3', texts: { ESV: '"To grant to those who mourn in Zion — to give them a beautiful headdress instead of ashes, the oil of gladness instead of mourning, the garment of praise instead of a faint spirit."' }},
    ],
  },
  {
    number: 62, part: 3,
    title: 'Zion\'s New Name',
    theme: 'Zion called by a new name; watchmen intercede until God restores',
    keyVerses: [
      { ref: 'Isaiah 62:2–3', texts: { ESV: '"The nations shall see your righteousness, and all the kings your glory, and you shall be called by a new name that the mouth of the LORD will give. You shall be a crown of beauty in the hand of the LORD, and a royal diadem in the hand of your God."' }},
      { ref: 'Isaiah 62:12', texts: { ESV: '"And they shall be called The Holy People, The Redeemed of the LORD; and you shall be called Sought Out, A City Not Forsaken."' }},
    ],
  },
  {
    number: 63, part: 3,
    title: 'The Day of Vengeance and God\'s Mercy',
    theme: 'God treads the winepress; his people recount his steadfast love',
    keyVerses: [
      { ref: 'Isaiah 63:7', texts: { ESV: 'I will recount the steadfast love of the LORD, the praises of the LORD, according to all that the LORD has granted us, and the great goodness to the house of Israel that he has granted them according to his compassion, according to the abundance of his steadfast love.' }},
    ],
  },
  {
    number: 64, part: 3,
    title: 'A Prayer for the Nation',
    theme: 'The people plead for God to come down; we are the clay, he the potter',
    keyVerses: [
      { ref: 'Isaiah 64:8', texts: {
        ESV: 'But now, O LORD, you are our Father; we are the clay, and you are our potter; we are all the work of your hand.',
        KJV: 'But now, O LORD, thou art our father; we are the clay, and thou our potter; and we all are the work of thy hand.',
        NIV: 'Yet you, LORD, are our Father. We are the clay, you are the potter; we are all the work of your hand.',
      }},
    ],
  },
  {
    number: 65, part: 3,
    title: 'Judgment and Salvation',
    theme: 'God found by those not seeking him; new heavens and a new earth',
    keyVerses: [
      { ref: 'Isaiah 65:17', texts: {
        ESV: '"For behold, I create new heavens and a new earth, and the former things shall not be remembered or come into mind."',
        NIV: '"See, I will create new heavens and a new earth. The former things will not be remembered, nor will they come to mind."',
      }},
      { ref: 'Isaiah 65:24', texts: { ESV: '"Before they call I will answer; while they are yet speaking I will hear."' }},
    ],
  },
  {
    number: 66, part: 3,
    title: 'Judgment and Eternal Hope',
    theme: 'God\'s true temple is a humble heart; the new creation endures forever',
    keyVerses: [
      { ref: 'Isaiah 66:2', texts: { ESV: '"But this is the one to whom I will look: he who is humble and contrite in spirit and trembles at my word."' }},
      { ref: 'Isaiah 66:22', texts: {
        ESV: '"For as the new heavens and the new earth that I make shall remain before me, says the LORD, so shall your offspring and your name remain."',
        KJV: '"For as the new heavens and the new earth, which I will make, shall remain before me, saith the LORD, so shall your seed and your name remain."',
      }},
    ],
  },
]
