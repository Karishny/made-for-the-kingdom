export type BibleVersion = 'KJV' | 'NKJV' | 'ESV' | 'NIV'

export interface ChapterData {
  number: number
  title: string
  theme: string
  part: 1 | 2 | 3
  content: Partial<Record<BibleVersion, string>>
}

// `accents` are the approved secondary palette for each part — used subtly for
// borders, small labels, discussion/notes accents and hover states while the
// part's main `color` stays the primary identity.
export const PARTS = [
  { part: 1 as const, label: 'Warning of Judgement', chapters: '1–39', range: [1, 39], schedule: '2–4 chapters a week', color: '#a85b31', accents: ['#763f21', '#a84c5c', '#c57c89'] },
  { part: 2 as const, label: 'Comfort and Hope',     chapters: '40–55', range: [40, 55], schedule: '2–4 chapters a week', color: '#949b61', accents: ['#454930', '#c9b050', '#cfac29'] },
  { part: 3 as const, label: 'Future Restoration',   chapters: '56–66', range: [56, 66], schedule: '2–4 chapters a week', color: '#cfac29', accents: ['#c9b050', '#a85b31', '#949b61'] },
]

export const ISAIAH_CHAPTERS: ChapterData[] = [

  // ── PART 1: Warning of Judgement (1–39) ──────────────────────────────────

  {
    number: 1, part: 1,
    title: 'The Sinful Nation',
    theme: 'God calls rebellious Judah to account and offers cleansing',
    content: {
      NKJV: `1The vision of Isaiah the son of Amoz, which he saw concerning Judah and Jerusalem in the days of Uzziah, Jotham, Ahaz, and Hezekiah, kings of Judah.
The Wickedness of Judah

2Hear, O heavens, and give ear, O earth!
For the Lord has spoken:
"I have nourished and brought up children,
And they have rebelled against Me;
3The ox knows its owner
And the donkey its master's crib;
But Israel does not know,
My people do not consider."
4Alas, sinful nation,
A people laden with iniquity,
A brood of evildoers,
Children who are corrupters!
They have forsaken the Lord,
They have provoked to anger
The Holy One of Israel,
They have turned away backward.
5Why should you be stricken again?
You will revolt more and more.
The whole head is sick,
And the whole heart faints.
6From the sole of the foot even to the head,
There is no soundness in it,
But wounds and bruises and putrefying sores;
They have not been closed or bound up,
Or soothed with ointment.
7Your country is desolate,
Your cities are burned with fire;
Strangers devour your land in your presence;
And it is desolate, as overthrown by strangers.
8So the daughter of Zion is left as a booth in a vineyard,
As a hut in a garden of cucumbers,
As a besieged city.
9Unless the Lord of hosts
Had left to us a very small remnant,
We would have become like Sodom,
We would have been made like Gomorrah.
10Hear the word of the Lord,
You rulers of Sodom;
Give ear to the law of our God,
You people of Gomorrah:
11"To what purpose is the multitude of your sacrifices to Me?"
Says the Lord.
"I have had enough of burnt offerings of rams
And the fat of fed cattle.
I do not delight in the blood of bulls,
Or of lambs or goats.
12"When you come to appear before Me,
Who has required this from your hand,
To trample My courts?
13Bring no more futile sacrifices;
Incense is an abomination to Me.
The New Moons, the Sabbaths, and the calling of assemblies—
I cannot endure iniquity and the sacred meeting.
14Your New Moons and your appointed feasts
My soul hates;
They are a trouble to Me,
I am weary of bearing them.
15When you spread out your hands,
I will hide My eyes from you;
Even though you make many prayers,
I will not hear.
Your hands are full of blood.
16"Wash yourselves, make yourselves clean;
Put away the evil of your doings from before My eyes.
Cease to do evil,
17Learn to do good;
Seek justice,
Rebuke the oppressor;
Defend the fatherless,
Plead for the widow.
18"Come now, and let us reason together,"
Says the Lord,
"Though your sins are like scarlet,
They shall be as white as snow;
Though they are red like crimson,
They shall be as wool.
19If you are willing and obedient,
You shall eat the good of the land;
20But if you refuse and rebel,
You shall be devoured by the sword";
For the mouth of the Lord has spoken.
The Degenerate City

21How the faithful city has become a harlot!
It was full of justice;
Righteousness lodged in it,
But now murderers.
22Your silver has become dross,
Your wine mixed with water.
23Your princes are rebellious,
And companions of thieves;
Everyone loves bribes,
And follows after rewards.
They do not defend the fatherless,
Nor does the cause of the widow come before them.
24Therefore the Lord says,
The Lord of hosts, the Mighty One of Israel,
"Ah, I will rid Myself of My adversaries,
And take vengeance on My enemies.
25I will turn My hand against you,
And thoroughly purge away your dross,
And take away all your alloy.
26I will restore your judges as at the first,
And your counselors as at the beginning.
Afterward you shall be called the city of righteousness, the faithful city."
27Zion shall be redeemed with justice,
And her penitents with righteousness.
28The destruction of transgressors and of sinners shall be together,
And those who forsake the Lord shall be consumed.
29For they shall be ashamed of the terebinth trees
Which you have desired;
And you shall be embarrassed because of the gardens
Which you have chosen.
30For you shall be as a terebinth whose leaf fades,
And as a garden that has no water.
31The strong shall be as tinder,
And the work of it as a spark;
Both will burn together,
And no one shall quench them.`,
      KJV: `1The vision of Isaiah the son of Amoz, which he saw concerning Judah and Jerusalem in the days of Uzziah, Jotham, Ahaz, and Hezekiah, kings of Judah.
2Hear, O heavens, and give ear, O earth: for the LORD hath spoken, I have nourished and brought up children, and they have rebelled against me.
3The ox knoweth his owner, and the ass his master's crib: but Israel doth not know, my people doth not consider.
4Ah sinful nation, a people laden with iniquity, a seed of evildoers, children that are corrupters: they have forsaken the LORD, they have provoked the Holy One of Israel unto anger, they are gone away backward.
5Why should ye be stricken any more? ye will revolt more and more: the whole head is sick, and the whole heart faint.
6From the sole of the foot even unto the head there is no soundness in it; but wounds, and bruises, and putrifying sores: they have not been closed, neither bound up, neither mollified with ointment.
7Your country is desolate, your cities are burned with fire: your land, strangers devour it in your presence, and it is desolate, as overthrown by strangers.
8And the daughter of Zion is left as a cottage in a vineyard, as a lodge in a garden of cucumbers, as a besieged city.
9Except the LORD of hosts had left unto us a very small remnant, we should have been as Sodom, and we should have been like unto Gomorrah.
10Hear the word of the LORD, ye rulers of Sodom; give ear unto the law of our God, ye people of Gomorrah.
11To what purpose is the multitude of your sacrifices unto me? saith the LORD: I am full of the burnt offerings of rams, and the fat of fed beasts; and I delight not in the blood of bullocks, or of lambs, or of he goats.
12When ye come to appear before me, who hath required this at your hand, to tread my courts?
13Bring no more vain oblations; incense is an abomination unto me; the new moons and sabbaths, the calling of assemblies, I cannot away with; it is iniquity, even the solemn meeting.
14Your new moons and your appointed feasts my soul hateth: they are a trouble unto me; I am weary to bear them.
15And when ye spread forth your hands, I will hide mine eyes from you: yea, when ye make many prayers, I will not hear: your hands are full of blood.
16Wash you, make you clean; put away the evil of your doings from before mine eyes; cease to do evil;
17Learn to do well; seek judgment, relieve the oppressed, judge the fatherless, plead for the widow.
18Come now, and let us reason together, saith the LORD: though your sins be as scarlet, they shall be as white as snow; though they be red like crimson, they shall be as wool.
19If ye be willing and obedient, ye shall eat the good of the land:
20But if ye refuse and rebel, ye shall be devoured with the sword: for the mouth of the LORD hath spoken it.
21How is the faithful city become an harlot! it was full of judgment; righteousness lodged in it; but now murderers.
22Thy silver is become dross, thy wine mixed with water:
23Thy princes are rebellious, and companions of thieves: every one loveth gifts, and followeth after rewards: they judge not the fatherless, neither doth the cause of the widow come unto them.
24Therefore saith the Lord, the LORD of hosts, the mighty One of Israel, Ah, I will ease me of mine adversaries, and avenge me of mine enemies:
25And I will turn my hand upon thee, and purely purge away thy dross, and take away all thy tin:
26And I will restore thy judges as at the first, and thy counsellors as at the beginning: afterward thou shalt be called, The city of righteousness, the faithful city.
27Zion shall be redeemed with judgment, and her converts with righteousness.
28And the destruction of the transgressors and of the sinners shall be together, and they that forsake the LORD shall be consumed.
29For they shall be ashamed of the oaks which ye have desired, and ye shall be confounded for the gardens that ye have chosen.
30For ye shall be as an oak whose leaf fadeth, and as a garden that hath no water.
31And the strong shall be as tow, and the maker of it as a spark, and they shall both burn together, and none shall quench them.`,
      ESV: '', NIV: '',
    },
  },
  {
    number: 2, part: 1,
    title: 'The Mountain of the LORD',
    theme: 'The nations stream to Zion; the day of the LORD brings humbling',
    content: {
      NKJV: `² Now it shall come to pass in the latter days that the mountain of the LORD's house shall be established on the top of the mountains, and shall be exalted above the hills; and all nations shall flow to it. ³ Many people shall come and say, "Come, and let us go up to the mountain of the LORD, to the house of the God of Jacob; He will teach us His ways, and we shall walk in His paths." ⁴ He shall judge between the nations, and rebuke many people; they shall beat their swords into plowshares, and their spears into pruning hooks; nation shall not lift up sword against nation, neither shall they learn war anymore.`,
      KJV: `Jerusalem
1The word that Isaiah the son of Amoz saw concerning Judah and Jerusalem.
2And it shall come to pass in the last days, that the mountain of the LORD's house shall be established in the top of the mountains, and shall be exalted above the hills; and all nations shall flow unto it.
3And many people shall go and say, Come ye, and let us go up to the mountain of the LORD, to the house of the God of Jacob; and he will teach us of his ways, and we will walk in his paths: for out of Zion shall go forth the law, and the word of the LORD from Jerusalem.
4And he shall judge among the nations, and shall rebuke many people: and they shall beat their swords into plowshares, and their spears into pruninghooks: nation shall not lift up sword against nation, neither shall they learn war any more.
5O house of Jacob, come ye, and let us walk in the light of the LORD.
6Therefore thou hast forsaken thy people the house of Jacob, because they be replenished from the east, and are soothsayers like the Philistines, and they please themselves in the children of strangers.
7Their land also is full of silver and gold, neither is there any end of their treasures; their land is also full of horses, neither is there any end of their chariots:
8Their land also is full of idols; they worship the work of their own hands, that which their own fingers have made:
9And the mean man boweth down, and the great man humbleth himself: therefore forgive them not.
10Enter into the rock, and hide thee in the dust, for fear of the LORD, and for the glory of his majesty.
11The lofty looks of man shall be humbled, and the haughtiness of men shall be bowed down, and the LORD alone shall be exalted in that day.
12For the day of the LORD of hosts shall be upon every one that is proud and lofty, and upon every one that is lifted up; and he shall be brought low:
13And upon all the cedars of Lebanon, that are high and lifted up, and upon all the oaks of Bashan,
14And upon all the high mountains, and upon all the hills that are lifted up,
15And upon every high tower, and upon every fenced wall,
16And upon all the ships of Tarshish, and upon all pleasant pictures.
17And the loftiness of man shall be bowed down, and the haughtiness of men shall be made low: and the LORD alone shall be exalted in that day.
18And the idols he shall utterly abolish.
19And they shall go into the holes of the rocks, and into the caves of the earth, for fear of the LORD, and for the glory of his majesty, when he ariseth to shake terribly the earth.
20In that day a man shall cast his idols of silver, and his idols of gold, which they made each one for himself to worship, to the moles and to the bats;
21To go into the clefts of the rocks, and into the tops of the ragged rocks, for fear of the LORD, and for the glory of his majesty, when he ariseth to shake terribly the earth.
22Cease ye from man, whose breath is in his nostrils: for wherein is he to be accounted of?`,
      ESV: '', NIV: '',
    },
  },
  {
    number: 3, part: 1,
    title: 'Judgment on Jerusalem',
    theme: "God removes Jerusalem's leaders and judges its pride",
    content: {
      NKJV: `¹⁴ The LORD will enter into judgment with the elders of His people and His princes: "For you have eaten up the vineyard; the plunder of the poor is in your houses. ¹⁵ What do you mean by crushing My people and grinding the faces of the poor?" says the Lord GOD of hosts.`,
      KJV: `1For, behold, the Lord, the LORD of hosts, doth take away from Jerusalem and from Judah the stay and the staff, the whole stay of bread, and the whole stay of water,
2The mighty man, and the man of war, the judge, and the prophet, and the prudent, and the ancient,
3The captain of fifty, and the honourable man, and the counsellor, and the cunning artificer, and the eloquent orator.
4And I will give children to be their princes, and babes shall rule over them.
5And the people shall be oppressed, every one by another, and every one by his neighbour: the child shall behave himself proudly against the ancient, and the base against the honourable.
6When a man shall take hold of his brother of the house of his father, saying, Thou hast clothing, be thou our ruler, and let this ruin be under thy hand:
7In that day shall he swear, saying, I will not be an healer; for in my house is neither bread nor clothing: make me not a ruler of the people.
8For Jerusalem is ruined, and Judah is fallen: because their tongue and their doings are against the LORD, to provoke the eyes of his glory.
9The shew of their countenance doth witness against them; and they declare their sin as Sodom, they hide it not. Woe unto their soul! for they have rewarded evil unto themselves.
10Say ye to the righteous, that it shall be well with him: for they shall eat the fruit of their doings.
11Woe unto the wicked! it shall be ill with him: for the reward of his hands shall be given him.
12As for my people, children are their oppressors, and women rule over them. O my people, they which lead thee cause thee to err, and destroy the way of thy paths.
13The LORD standeth up to plead, and standeth to judge the people.
14The LORD will enter into judgment with the ancients of his people, and the princes thereof: for ye have eaten up the vineyard; the spoil of the poor is in your houses.
15What mean ye that ye beat my people to pieces, and grind the faces of the poor? saith the Lord GOD of hosts.
The Daughters of Zion
16Moreover the LORD saith, Because the daughters of Zion are haughty, and walk with stretched forth necks and wanton eyes, walking and mincing as they go, and making a tinkling with their feet:
17Therefore the Lord will smite with a scab the crown of the head of the daughters of Zion, and the LORD will discover their secret parts.
18In that day the Lord will take away the bravery of their tinkling ornaments about their feet, and their cauls, and their round tires like the moon,
19The chains, and the bracelets, and the mufflers,
20The bonnets, and the ornaments of the legs, and the headbands, and the tablets, and the earrings,
21The rings, and nose jewels,
22The changeable suits of apparel, and the mantles, and the wimples, and the crisping pins,
23The glasses, and the fine linen, and the hoods, and the vails.
24And it shall come to pass, that instead of sweet smell there shall be stink; and instead of a girdle a rent; and instead of well set hair baldness; and instead of a stomacher a girding of sackcloth; and burning instead of beauty.
25Thy men shall fall by the sword, and thy mighty in the war.
26And her gates shall lament and mourn; and she being desolate shall sit upon the ground.`,
      ESV: '', NIV: '',
    },
  },
  {
    number: 4, part: 1,
    title: 'The Branch of the LORD',
    theme: 'After cleansing, the remnant of Zion flourishes in beauty',
    content: {
      NKJV: `² In that day the Branch of the LORD shall be beautiful and glorious; and the fruit of the earth shall be excellent and appealing for those of Israel who have escaped. ⁵ Then the LORD will create above every dwelling place of Mount Zion, and above her assemblies, a cloud and smoke by day and the shining of a flaming fire by night. For over all the glory there will be a covering. ⁶ And there will be a tabernacle for shade in the daytime from the heat, for a place of refuge, and for a shelter from storm and rain.`,
      KJV: `1And in that day seven women shall take hold of one man, saying, We will eat our own bread, and wear our own apparel: only let us be called by thy name, to take away our reproach.
2In that day shall the branch of the LORD be beautiful and glorious, and the fruit of the earth shall be excellent and comely for them that are escaped of Israel.
3And it shall come to pass, that he that is left in Zion, and he that remaineth in Jerusalem, shall be called holy, even every one that is written among the living in Jerusalem:
4When the Lord shall have washed away the filth of the daughters of Zion, and shall have purged the blood of Jerusalem from the midst thereof by the spirit of judgment, and by the spirit of burning.
5And the LORD will create upon every dwelling place of mount Zion, and upon her assemblies, a cloud and smoke by day, and the shining of a flaming fire by night: for upon all the glory shall be a defence.
6And there shall be a tabernacle for a shadow in the daytime from the heat, and for a place of refuge, and for a covert from storm and from rain.`,
      ESV: '', NIV: '',
    },
  },
  {
    number: 5, part: 1,
    title: 'The Song of the Vineyard',
    theme: "God's vineyard (Israel) yields wild grapes; six woes pronounced",
    content: {
      NKJV: `¹ Now let me sing to my Well-beloved a song of my Beloved regarding His vineyard: My Well-beloved has a vineyard on a very fruitful hill. ⁴ What more could have been done to My vineyard that I have not done in it? Why then, when I expected it to bring forth good grapes, did it bring forth wild grapes? § ¹⁶ But the LORD of hosts shall be exalted in judgment, and God who is holy shall be hallowed in righteousness.`,
      KJV: `A Parable
1Now will I sing to my wellbeloved a song of my beloved touching his vineyard. My wellbeloved hath a vineyard in a very fruitful hill:
2And he fenced it, and gathered out the stones thereof, and planted it with the choicest vine, and built a tower in the midst of it, and also made a winepress therein: and he looked that it should bring forth grapes, and it brought forth wild grapes.
3And now, O inhabitants of Jerusalem, and men of Judah, judge, I pray you, betwixt me and my vineyard.
4What could have been done more to my vineyard, that I have not done in it? wherefore, when I looked that it should bring forth grapes, brought it forth wild grapes?
5And now go to; I will tell you what I will do to my vineyard: I will take away the hedge thereof, and it shall be eaten up; and break down the wall thereof, and it shall be trodden down:
6And I will lay it waste: it shall not be pruned, nor digged; but there shall come up briers and thorns: I will also command the clouds that they rain no rain upon it.
7For the vineyard of the LORD of hosts is the house of Israel, and the men of Judah his pleasant plant: and he looked for judgment, but behold oppression; for righteousness, but behold a cry.
8Woe unto them that join house to house, that lay field to field, till there be no place, that they may be placed alone in the midst of the earth!
9In mine ears said the LORD of hosts, Of a truth many houses shall be desolate, even great and fair, without inhabitant.
10Yea, ten acres of vineyard shall yield one bath, and the seed of an homer shall yield an ephah.
11Woe unto them that rise up early in the morning, that they may follow strong drink; that continue until night, till wine inflame them!
12And the harp, and the viol, the tabret, and pipe, and wine, are in their feasts: but they regard not the work of the LORD, neither consider the operation of his hands.
13Therefore my people are gone into captivity, because they have no knowledge: and their honourable men are famished, and their multitude dried up with thirst.
14Therefore hell hath enlarged herself, and opened her mouth without measure: and their glory, and their multitude, and their pomp, and he that rejoiceth, shall descend into it.
15And the mean man shall be brought down, and the mighty man shall be humbled, and the eyes of the lofty shall be humbled:
16But the LORD of hosts shall be exalted in judgment, and God that is holy shall be sanctified in righteousness.
17Then shall the lambs feed after their manner, and the waste places of the fat ones shall strangers eat.
18Woe unto them that draw iniquity with cords of vanity, and sin as it were with a cart rope:
19That say, Let him make speed, and hasten his work, that we may see it: and let the counsel of the Holy One of Israel draw nigh and come, that we may know it!
20Woe unto them that call evil good, and good evil; that put darkness for light, and light for darkness; that put bitter for sweet, and sweet for bitter!
21Woe unto them that are wise in their own eyes, and prudent in their own sight!
22Woe unto them that are mighty to drink wine, and men of strength to mingle strong drink:
23Which justify the wicked for reward, and take away the righteousness of the righteous from him!
24Therefore as the fire devoureth the stubble, and the flame consumeth the chaff, so their root shall be as rottenness, and their blossom shall go up as dust: because they have cast away the law of the LORD of hosts, and despised the word of the Holy One of Israel.
25Therefore is the anger of the LORD kindled against his people, and he hath stretched forth his hand against them, and hath smitten them: and the hills did tremble, and their carcases were torn in the midst of the streets. For all this his anger is not turned away, but his hand is stretched out still.
26And he will lift up an ensign to the nations from far, and will hiss unto them from the end of the earth: and, behold, they shall come with speed swiftly:
27None shall be weary nor stumble among them; none shall slumber nor sleep; neither shall the girdle of their loins be loosed, nor the latchet of their shoes be broken:
28Whose arrows are sharp, and all their bows bent, their horses' hoofs shall be counted like flint, and their wheels like a whirlwind:
29Their roaring shall be like a lion, they shall roar like young lions: yea, they shall roar, and lay hold of the prey, and shall carry it away safe, and none shall deliver it.
30And in that day they shall roar against them like the roaring of the sea: and if one look unto the land, behold darkness and sorrow, and the light is darkened in the heavens thereof.`,
      ESV: '', NIV: '',
    },
  },
  {
    number: 6, part: 1,
    title: "Isaiah's Commission",
    theme: 'Isaiah sees the glory of God and is sent as prophet to a hard-hearted people',
    content: {
      NKJV: `¹ In the year that King Uzziah died, I saw the Lord sitting on a throne, high and lifted up, and the train of His robe filled the temple. ³ And one cried to another and said: "Holy, holy, holy is the LORD of hosts; the whole earth is full of His glory!" ⁵ So I said: "Woe is me, for I am undone! Because I am a man of unclean lips, and I dwell in the midst of a people of unclean lips; for my eyes have seen the King, the LORD of hosts." ⁸ Also I heard the voice of the Lord, saying: "Whom shall I send, and who will go for Us?" Then I said, "Here am I! Send me."`,
      KJV: `Isaiah's Vision and Call
1In the year that king Uzziah died I saw also the Lord sitting upon a throne, high and lifted up, and his train filled the temple.
2Above it stood the seraphims: each one had six wings; with twain he covered his face, and with twain he covered his feet, and with twain he did fly.
3And one cried unto another, and said, Holy, holy, holy, is the LORD of hosts: the whole earth is full of his glory.
4And the posts of the door moved at the voice of him that cried, and the house was filled with smoke.
5Then said I, Woe is me! for I am undone; because I am a man of unclean lips, and I dwell in the midst of a people of unclean lips: for mine eyes have seen the King, the LORD of hosts.
6Then flew one of the seraphims unto me, having a live coal in his hand, which he had taken with the tongs from off the altar:
7And he laid it upon my mouth, and said, Lo, this hath touched thy lips; and thine iniquity is taken away, and thy sin purged.
8Also I heard the voice of the Lord, saying, Whom shall I send, and who will go for us? Then said I, Here am I; send me.
9And he said, Go, and tell this people, Hear ye indeed, but understand not; and see ye indeed, but perceive not.
10Make the heart of this people fat, and make their ears heavy, and shut their eyes; lest they see with their eyes, and hear with their ears, and understand with their heart, and convert, and be healed.
11Then said I, Lord, how long? And he answered, Until the cities be wasted without inhabitant, and the houses without man, and the land be utterly desolate,
12And the LORD have removed men far away, and there be a great forsaking in the midst of the land.
13But yet in it shall be a tenth, and it shall return, and shall be eaten: as a teil tree, and as an oak, whose substance is in them, when they cast their leaves: so the holy seed shall be the substance thereof.`,
      ESV: '', NIV: '',
    },
  },
  {
    number: 7, part: 1,
    title: 'The Sign of Immanuel',
    theme: 'God gives Ahaz the sign of the virgin-born Immanuel',
    content: {
      NKJV: `¹⁴ Therefore the Lord Himself will give you a sign: Behold, the virgin shall conceive and bear a Son, and shall call His name Immanuel.`,
      KJV: `Isaiah and Ahaz
1And it came to pass in the days of Ahaz the son of Jotham, the son of Uzziah, king of Judah, that Rezin the king of Syria, and Pekah the son of Remaliah, king of Israel, went up toward Jerusalem to war against it, but could not prevail against it.
2And it was told the house of David, saying, Syria is confederate with Ephraim. And his heart was moved, and the heart of his people, as the trees of the wood are moved with the wind.
3Then said the LORD unto Isaiah, Go forth now to meet Ahaz, thou, and Shearjashub thy son, at the end of the conduit of the upper pool in the highway of the fuller's field;
4And say unto him, Take heed, and be quiet; fear not, neither be fainthearted for the two tails of these smoking firebrands, for the fierce anger of Rezin with Syria, and of the son of Remaliah.
5Because Syria, Ephraim, and the son of Remaliah, have taken evil counsel against thee, saying,
6Let us go up against Judah, and vex it, and let us make a breach therein for us, and set a king in the midst of it, even the son of Tabeal:
7Thus saith the Lord GOD, It shall not stand, neither shall it come to pass.
8For the head of Syria is Damascus, and the head of Damascus is Rezin; and within threescore and five years shall Ephraim be broken, that it be not a people.
9And the head of Ephraim is Samaria, and the head of Samaria is Remaliah's son. If ye will not believe, surely ye shall not be established.
The Sign Immanuel
10Moreover the LORD spake again unto Ahaz, saying,
11Ask thee a sign of the LORD thy God; ask it either in the depth, or in the height above.
12But Ahaz said, I will not ask, neither will I tempt the LORD.
13And he said, Hear ye now, O house of David; Is it a small thing for you to weary men, but will ye weary my God also?
14Therefore the Lord himself shall give you a sign; Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel.
15Butter and honey shall he eat, that he may know to refuse the evil, and choose the good.
16For before the child shall know to refuse the evil, and choose the good, the land that thou abhorrest shall be forsaken of both her kings.
17The LORD shall bring upon thee, and upon thy people, and upon thy father's house, days that have not come, from the day that Ephraim departed from Judah; even the king of Assyria.
18And it shall come to pass in that day, that the LORD shall hiss for the fly that is in the uttermost part of the rivers of Egypt, and for the bee that is in the land of Assyria.
19And they shall come, and shall rest all of them in the desolate valleys, and in the holes of the rocks, and upon all thorns, and upon all bushes.
20In the same day shall the Lord shave with a razor that is hired, namely, by them beyond the river, by the king of Assyria, the head, and the hair of the feet: and it shall also consume the beard.
21And it shall come to pass in that day, that a man shall nourish a young cow, and two sheep;
22And it shall come to pass, for the abundance of milk that they shall give he shall eat butter: for butter and honey shall every one eat that is left in the land.
23And it shall come to pass in that day, that every place shall be, where there were a thousand vines at a thousand silverlings, it shall even be for briers and thorns.
24With arrows and with bows shall men come thither; because all the land shall become briers and thorns.
25And on all hills that shall be digged with the mattock, there shall not come thither the fear of briers and thorns: but it shall be for the sending forth of oxen, and for the treading of lesser cattle.`,
      ESV: '', NIV: '',
    },
  },
  {
    number: 8, part: 1,
    title: "Assyria, God's Instrument",
    theme: "Assyria floods the land; the faithful hold to God's teaching",
    content: {
      NKJV: `¹³ The LORD of hosts, Him you shall hallow; let Him be your fear, and let Him be your dread. ¹⁶ Bind up the testimony, seal the law among my disciples. ²⁰ To the law and to the testimony! If they do not speak according to this word, it is because there is no light in them.`,
      KJV: `1Moreover the LORD said unto me, Take thee a great roll, and write in it with a man's pen concerning Mahershalalhashbaz.
2And I took unto me faithful witnesses to record, Uriah the priest, and Zechariah the son of Jeberechiah.
3And I went unto the prophetess; and she conceived, and bare a son. Then said the LORD to me, Call his name Mahershalalhashbaz.
4For before the child shall have knowledge to cry, My father, and my mother, the riches of Damascus and the spoil of Samaria shall be taken away before the king of Assyria.
5The LORD spake also unto me again, saying,
6Forasmuch as this people refuseth the waters of Shiloah that go softly, and rejoice in Rezin and Remaliah's son;
7Now therefore, behold, the Lord bringeth up upon them the waters of the river, strong and many, even the king of Assyria, and all his glory: and he shall come up over all his channels, and go over all his banks:
8And he shall pass through Judah; he shall overflow and go over, he shall reach even to the neck; and the stretching out of his wings shall fill the breadth of thy land, O Immanuel.
9Associate yourselves, O ye people, and ye shall be broken in pieces; and give ear, all ye of far countries: gird yourselves, and ye shall be broken in pieces; gird yourselves, and ye shall be broken in pieces.
10Take counsel together, and it shall come to nought; speak the word, and it shall not stand: for God is with us.
11For the LORD spake thus to me with a strong hand, and instructed me that I should not walk in the way of this people, saying,
12Say ye not, A confederacy, to all them to whom this people shall say, A confederacy; neither fear ye their fear, nor be afraid.
13Sanctify the LORD of hosts himself; and let him be your fear, and let him be your dread.
14And he shall be for a sanctuary; but for a stone of stumbling and for a rock of offence to both the houses of Israel, for a gin and for a snare to the inhabitants of Jerusalem.
15And many among them shall stumble, and fall, and be broken, and be snared, and be taken.
16Bind up the testimony, seal the law among my disciples.
17And I will wait upon the LORD, that hideth his face from the house of Jacob, and I will look for him.
18Behold, I and the children whom the LORD hath given me are for signs and for wonders in Israel from the LORD of hosts, which dwelleth in mount Zion.
19And when they shall say unto you, Seek unto them that have familiar spirits, and unto wizards that peep, and that mutter: should not a people seek unto their God? for the living to the dead?
20To the law and to the testimony: if they speak not according to this word, it is because there is no light in them.
21And they shall pass through it, hardly bestead and hungry: and it shall come to pass, that when they shall be hungry, they shall fret themselves, and curse their king and their God, and look upward.
22And they shall look unto the earth; and behold trouble and darkness, dimness of anguish; and they shall be driven to darkness.`,
      ESV: '', NIV: '',
    },
  },
  {
    number: 9, part: 1,
    title: 'The Prince of Peace',
    theme: 'Light dawns on Galilee; the child who is Wonderful Counsellor',
    content: {
      NKJV: `² The people who walked in darkness have seen a great light; those who dwelt in the land of the shadow of death, upon them a light has shined. ⁶ For unto us a Child is born, unto us a Son is given; and the government will be upon His shoulder. And His name will be called Wonderful, Counselor, Mighty God, Everlasting Father, Prince of Peace. ⁷ Of the increase of His government and peace there will be no end, upon the throne of David and over His kingdom, to order it and establish it with judgment and justice from that time forward, even forever. The zeal of the LORD of hosts will perform this.`,
      KJV: `The Prince of Peace
1Nevertheless the dimness shall not be such as was in her vexation, when at the first he lightly afflicted the land of Zebulun and the land of Naphtali, and afterward did more grievously afflict her by the way of the sea, beyond Jordan, in Galilee of the nations.
2The people that walked in darkness have seen a great light: they that dwell in the land of the shadow of death, upon them hath the light shined.
3Thou hast multiplied the nation, and not increased the joy: they joy before thee according to the joy in harvest, and as men rejoice when they divide the spoil.
4For thou hast broken the yoke of his burden, and the staff of his shoulder, the rod of his oppressor, as in the day of Midian.
5For every battle of the warrior is with confused noise, and garments rolled in blood; but this shall be with burning and fuel of fire.
6For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.
7Of the increase of his government and peace there shall be no end, upon the throne of David, and upon his kingdom, to order it, and to establish it with judgment and with justice from henceforth even for ever. The zeal of the LORD of hosts will perform this.
8The Lord sent a word into Jacob, and it hath lighted upon Israel.
9And all the people shall know, even Ephraim and the inhabitant of Samaria, that say in the pride and stoutness of heart,
10The bricks are fallen down, but we will build with hewn stones: the sycomores are cut down, but we will change them into cedars.
11Therefore the LORD shall set up the adversaries of Rezin against him, and join his enemies together;
12The Syrians before, and the Philistines behind; and they shall devour Israel with open mouth. For all this his anger is not turned away, but his hand is stretched out still.
13For the people turneth not unto him that smiteth them, neither do they seek the LORD of hosts.
14Therefore the LORD will cut off from Israel head and tail, branch and rush, in one day.
15The ancient and honourable, he is the head; and the prophet that teacheth lies, he is the tail.
16For the leaders of this people cause them to err; and they that are led of them are destroyed.
17Therefore the LORD shall have no joy in their young men, neither shall have mercy on their fatherless and widows: for every one is an hypocrite and an evildoer, and every mouth speaketh folly. For all this his anger is not turned away, but his hand is stretched out still.
18For wickedness burneth as the fire: it shall devour the briers and thorns, and shall kindle in the thickets of the forest, and they shall mount up like the lifting up of smoke.
19Through the wrath of the LORD of hosts is the land darkened, and the people shall be as the fuel of the fire: no man shall spare his brother.
20And he shall snatch on the right hand, and be hungry; and he shall eat on the left hand, and they shall not be satisfied: they shall eat every man the flesh of his own arm:
21Manasseh, Ephraim; and Ephraim, Manasseh: and they together shall be against Judah. For all this his anger is not turned away, but his hand is stretched out still.`,
      ESV: '', NIV: '',
    },
  },
  {
    number: 10, part: 1,
    title: 'Woe to the Oppressors',
    theme: "Woe to unjust rulers; Assyria is God's rod but will be judged",
    content: {
      NKJV: `¹ Woe to those who decree unrighteous decrees, who write misfortune, which they have prescribed ² to rob the needy of justice, and to take what is right from the poor of My people, that widows may be their prey, and that they may rob the fatherless. ¹⁵ Shall the ax boast itself against him who chops with it? Or shall the saw exalt itself against him who saws with it?`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 11, part: 1,
    title: 'The Branch from Jesse',
    theme: 'The Spirit-filled Messiah brings justice and universal peace',
    content: {
      NKJV: `¹ There shall come forth a Rod from the stem of Jesse, and a Branch shall grow out of his roots. ² The Spirit of the LORD shall rest upon Him, the Spirit of wisdom and understanding, the Spirit of counsel and might, the Spirit of knowledge and of the fear of the LORD. ⁶ The wolf also shall dwell with the lamb, the leopard shall lie down with the young goat, the calf and the young lion and the fatling together; and a little child shall lead them.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 12, part: 1,
    title: 'Songs of Praise',
    theme: "Redeemed Israel sings of God's salvation with joy",
    content: {
      NKJV: `² Behold, God is my salvation, I will trust and not be afraid; for YAH, the LORD, is my strength and song; He also has become my salvation. ³ Therefore with joy you will draw water from the wells of salvation. ⁴ And in that day you will say: "Praise the LORD, call upon His name; declare His deeds among the peoples, make mention that His name is exalted."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 13, part: 1,
    title: 'Prophecy Against Babylon',
    theme: 'The Day of the LORD falls upon mighty Babylon',
    content: {
      NKJV: `⁶ Wail, for the day of the LORD is at hand! It will come as destruction from the Almighty. ¹¹ "I will punish the world for its evil, and the wicked for their iniquity; I will halt the arrogance of the proud, and will lay low the haughtiness of the terrible." ¹⁹ And Babylon, the glory of kingdoms, the beauty of the Chaldeans' pride, will be as when God overthrew Sodom and Gomorrah.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 14, part: 1,
    title: 'Taunt Against Babylon',
    theme: 'The pride of the king of Babylon leads to his downfall',
    content: {
      NKJV: `¹² How you are fallen from heaven, O Lucifer, son of the morning! How you are cut down to the ground, you who weakened the nations! ¹³ For you have said in your heart: "I will ascend into heaven, I will exalt my throne above the stars of God." ²⁷ For the LORD of hosts has purposed, and who will annul it? His hand is stretched out, and who will turn it back?`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 15, part: 1,
    title: 'Prophecy Against Moab',
    theme: 'Moab is laid waste in a night; weeping and mourning throughout the land',
    content: {
      NKJV: `¹ The burden against Moab. Because in the night Ar of Moab is laid waste and destroyed, because in the night Kir of Moab is laid waste and destroyed, ² He has gone up to the temple and Dibon, to the high places to weep. Moab will wail over Nebo and over Medeba; on all their heads will be baldness, and every beard cut off.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 16, part: 1,
    title: 'Moab Humbled',
    theme: "Moab's pride brought low; a remnant pleads for the Davidic king",
    content: {
      NKJV: `⁵ In mercy the throne will be established; and One will sit on it in truth, in the tabernacle of David, judging and seeking justice and hastening righteousness. ⁶ We have heard of the pride of Moab — he is very proud — of his haughtiness and his pride and his wrath; but his lies shall not be so.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 17, part: 1,
    title: 'Prophecy Against Damascus',
    theme: 'Damascus falls; Israel stripped; remnant turns to its Maker',
    content: {
      NKJV: `⁷ In that day a man will look to his Maker, and his eyes will have respect for the Holy One of Israel. ⁸ He will not look to the altars, the work of his hands; he will not respect what his fingers have made, nor the wooden images nor the incense altars.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 18, part: 1,
    title: 'Prophecy Against Ethiopia',
    theme: 'A mighty nation is humbled; gifts brought to the LORD at Zion',
    content: {
      NKJV: `⁷ In that time a present will be brought to the LORD of hosts from a people tall and smooth of skin, and from a people terrible from their beginning onward, a nation powerful and treading down, whose land the rivers divide — to the place of the name of the LORD of hosts, to Mount Zion.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 19, part: 1,
    title: 'Prophecy Against Egypt',
    theme: 'Egypt falls into turmoil; ultimately turns to the LORD',
    content: {
      NKJV: `²⁰ And it will be for a sign and for a witness to the LORD of hosts in the land of Egypt; for they will cry to the LORD because of the oppressors, and He will send them a Savior and a Mighty One, and He will deliver them. ²⁵ For the LORD of hosts shall bless, saying, "Blessed is Egypt My people, and Assyria the work of My hands, and Israel My inheritance."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 20, part: 1,
    title: 'Sign Against Egypt and Ethiopia',
    theme: 'Isaiah walks barefoot as a sign of coming captivity',
    content: {
      NKJV: `³ Then the LORD said, "Just as My servant Isaiah has walked naked and barefoot three years for a sign and a wonder against Egypt and Ethiopia, ⁶ and the inhabitant of this territory will say in that day, 'Such is our expectation, where we flee for help to be delivered from the king of Assyria; and how shall we escape?'"`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 21, part: 1,
    title: 'Prophecy Against Babylon (Desert)',
    theme: 'A night vision of Babylon\'s fall; the watchman reports',
    content: {
      NKJV: `⁹ And look, here comes a chariot of men with a pair of horsemen! Then he answered and said, "Babylon is fallen, is fallen! And all the carved images of her gods He has broken to the ground."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 22, part: 1,
    title: 'Prophecy Against Jerusalem',
    theme: 'Jerusalem feasts instead of mourning; Shebna replaced by Eliakim',
    content: {
      NKJV: `¹³ But instead, joy and gladness, slaying oxen and killing sheep, eating meat and drinking wine: "Let us eat and drink, for tomorrow we die!" ²² The key of the house of David I will lay on his shoulder; so he shall open, and no one shall shut; and he shall shut, and no one shall open.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 23, part: 1,
    title: 'Prophecy Against Tyre',
    theme: 'The great merchant city is silenced; after seventy years restored to service',
    content: {
      NKJV: `⁹ The LORD of hosts has purposed it, to bring to dishonour the pride of all glory, to bring into contempt all the honourable of the earth. ¹⁸ Her gain and her pay will be set apart for the LORD; it will not be treasured nor laid up, for her gain will be for those who dwell before the LORD, to eat sufficiently, and for fine clothing.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 24, part: 1,
    title: 'The Earth Laid Waste',
    theme: 'Universal judgment empties the earth; the LORD reigns on Mount Zion',
    content: {
      NKJV: `³ The land shall be entirely emptied and utterly plundered, for the LORD has spoken this word. ²¹ It shall come to pass in that day that the LORD will punish on high the host of exalted ones, and on the earth the kings of the earth. ²³ Then the moon will be disgraced and the sun ashamed; for the LORD of hosts will reign on Mount Zion and in Jerusalem and before His elders, gloriously.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 25, part: 1,
    title: 'Praise for God\'s Salvation',
    theme: 'The LORD destroys the shroud of death and wipes away tears',
    content: {
      NKJV: `¶ ⁸ He will swallow up death forever, and the Lord GOD will wipe away tears from all faces; the rebuke of His people He will take away from all the earth; for the LORD has spoken. ⁹ And it will be said in that day: "Behold, this is our God; we have waited for Him, and He will save us. This is the LORD; we have waited for Him; we will be glad and rejoice in His salvation."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 26, part: 1,
    title: 'A Song of Trust',
    theme: 'Judah sings of God as rock and refuge; resurrection hope declared',
    content: {
      NKJV: `³ You will keep him in perfect peace, whose mind is stayed on You, because he trusts in You. ⁴ Trust in the LORD forever, for in YAH, the LORD, is everlasting strength. ¹⁹ Your dead shall live; together with my dead body they shall arise. Awake and sing, you who dwell in dust; for your dew is like the dew of herbs, and the earth shall cast out the dead.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 27, part: 1,
    title: 'Restoration of Israel',
    theme: 'The LORD punishes Leviathan; His vineyard Israel is restored',
    content: {
      NKJV: `¹ In that day the LORD with His severe sword, great and strong, will punish Leviathan the fleeing serpent, Leviathan that twisted serpent; and He will slay the reptile that is in the sea. ³ I, the LORD, keep it, I water it every moment; lest any hurt it, I keep it night and day.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 28, part: 1,
    title: 'Woe to Ephraim',
    theme: 'Woe to drunkards; the precious cornerstone laid in Zion',
    content: {
      NKJV: `¹⁶ Therefore thus says the Lord GOD: "Behold, I lay in Zion a stone for a foundation, a tried stone, a precious cornerstone, a sure foundation; whoever believes will not act hastily." ²⁹ This also comes from the LORD of hosts, who is wonderful in counsel and excellent in guidance.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 29, part: 1,
    title: 'Woe to Ariel',
    theme: 'Jerusalem is besieged then suddenly delivered; the deaf will hear',
    content: {
      NKJV: `¹³ Therefore the Lord said: "Inasmuch as these people draw near with their mouths and honour Me with their lips, but have removed their hearts far from Me." ¹⁸ In that day the deaf shall hear the words of the book, and the eyes of the blind shall see out of obscurity and out of darkness.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 30, part: 1,
    title: 'Woe to the Rebellious',
    theme: 'Judah trusts Egypt rather than God; yet grace and healing follow repentance',
    content: {
      NKJV: `¹⁵ For thus says the Lord GOD, the Holy One of Israel: "In returning and rest you shall be saved; in quietness and confidence shall be your strength." ¹⁸ Therefore the LORD will wait, that He may be gracious to you; and therefore He will be exalted, that He may have mercy on you. For the LORD is a God of justice; blessed are all those who wait for Him.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 31, part: 1,
    title: 'Woe to Those Who Go to Egypt',
    theme: 'Trusting Egypt brings ruin; the LORD will defend Jerusalem like a lion',
    content: {
      NKJV: `¹ Woe to those who go down to Egypt for help, and rely on horses, who trust in chariots because they are many, and in horsemen because they are very strong, but who do not look to the Holy One of Israel, nor seek the LORD! ³ Now the Egyptians are men, and not God; and their horses are flesh, and not spirit.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 32, part: 1,
    title: 'The Righteous Kingdom',
    theme: 'A king reigns in righteousness; the Spirit poured out transforms the land',
    content: {
      NKJV: `¹ Behold, a king will reign in righteousness, and princes will rule with justice. ² A man will be as a hiding place from the wind, and a cover from the tempest, as rivers of water in a dry place, as the shadow of a great rock in a weary land. ¹⁵ Until the Spirit is poured upon us from on high, and the wilderness becomes a fruitful field, and the fruitful field is counted as a forest.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 33, part: 1,
    title: 'Woe to the Destroyer',
    theme: 'The destroyer is destroyed; the LORD reigns in beauty and justice',
    content: {
      NKJV: `² O LORD, be gracious to us; we have waited for You. Be their arm every morning, our salvation also in the time of trouble. ⁵ The LORD is exalted, for He dwells on high; He has filled Zion with justice and righteousness. ²² For the LORD is our Judge, the LORD is our Lawgiver, the LORD is our King; He will save us.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 34, part: 1,
    title: 'Judgment on the Nations',
    theme: "God's sword falls on the nations; Edom made a desolation",
    content: {
      NKJV: `² For the indignation of the LORD is against all nations, and His fury against all their armies; He has utterly destroyed them, He has given them over to the slaughter. ¹⁶ Search from the book of the LORD, and read: not one of these shall fail; not one shall lack her mate. For My mouth has commanded it, and His Spirit has gathered them.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 35, part: 1,
    title: 'Joy of the Redeemed',
    theme: 'The wilderness blossoms; the ransomed return to Zion with singing',
    content: {
      NKJV: `¹ The wilderness and the wasteland shall be glad for them, and the desert shall rejoice and blossom as the rose. ⁴ Say to those who are fearful-hearted, "Be strong, do not fear! Behold, your God will come with vengeance, with the recompense of God; He will come and save you." ¹⁰ And the ransomed of the LORD shall return, and come to Zion with singing, with everlasting joy on their heads. They shall obtain joy and gladness, and sorrow and sighing shall flee away.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 36, part: 1,
    title: 'Sennacherib Threatens Jerusalem',
    theme: "Assyria's field commander mocks God and demands surrender",
    content: {
      NKJV: `¹⁸ Beware lest Hezekiah persuade you, saying, "The LORD will deliver us." Has any one of the gods of the nations delivered its land from the hand of the king of Assyria? ²⁰ Who among all the gods of these lands have delivered their countries from my hand, that the LORD should deliver Jerusalem from my hand?`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 37, part: 1,
    title: "Hezekiah's Prayer",
    theme: 'Hezekiah prays; Isaiah prophesies; the angel strikes 185,000 Assyrians',
    content: {
      NKJV: `¹⁵ Then Hezekiah prayed to the LORD, saying: ¹⁶ "O LORD of hosts, God of Israel, the One who dwells between the cherubim, You are God, You alone, of all the kingdoms of the earth. You have made heaven and earth. ²⁰ Now therefore, O LORD our God, save us from his hand, that all the kingdoms of the earth may know that You are the LORD, You alone."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 38, part: 1,
    title: "Hezekiah's Illness and Recovery",
    theme: 'Hezekiah falls ill, prays, and receives fifteen more years',
    content: {
      NKJV: `² And Hezekiah turned his face toward the wall, and prayed to the LORD, ³ and said, "Remember now, O LORD, I pray, how I have walked before You in truth and with a loyal heart, and have done what is good in Your sight." And Hezekiah wept bitterly. ¹⁷ Indeed it was for my own peace that I had great bitterness; but You have lovingly delivered my soul from the pit of corruption, for You have cast all my sins behind Your back.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 39, part: 1,
    title: 'Envoys from Babylon',
    theme: "Hezekiah foolishly shows Babylon's envoys his treasuries; Babylonian exile foretold",
    content: {
      NKJV: `⁵ Then Isaiah said to Hezekiah, "Hear the word of the LORD of hosts: ⁶ 'Behold, the days are coming when all that is in your house, and what your fathers have accumulated until this day, shall be carried to Babylon; nothing shall be left,' says the LORD." ⁸ So Hezekiah said to Isaiah, "The word of the LORD which you have spoken is good!" For he said, "At least there will be peace and truth in my days."`,
      KJV: '', ESV: '', NIV: '',
    },
  },

  // ── PART 2: Comfort and Hope (40–55) ─────────────────────────────────────

  {
    number: 40, part: 2,
    title: 'Comfort for God\'s People',
    theme: "The prophet proclaims God's comfort; His word stands forever; He gives strength to the weary",
    content: {
      NKJV: `¹ "Comfort, yes, comfort My people!" says your God. ² "Speak comfort to Jerusalem, and cry out to her, that her warfare is ended, that her iniquity is pardoned; for she has received from the LORD's hand double for all her sins." ³¹ But those who wait on the LORD shall renew their strength; they shall mount up with wings like eagles, they shall run and not be weary, they shall walk and not faint.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 41, part: 2,
    title: 'The LORD\'s Servant Israel',
    theme: 'God reassures Israel; idols are nothing; He raises up a conqueror from the east',
    content: {
      NKJV: `¹⁰ Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, yes, I will help you, I will uphold you with My righteous right hand. ¹³ For I, the LORD your God, will hold your right hand, saying to you, "Fear not, I will help you."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 42, part: 2,
    title: 'The Servant of the LORD',
    theme: "The first Servant Song: God's chosen one brings justice gently to the nations",
    content: {
      NKJV: `¹ Behold! My Servant whom I uphold, My Elect One in whom My soul delights! I have put My Spirit upon Him; He will bring forth justice to the Gentiles. ² He will not cry out, nor raise His voice, nor cause His voice to be heard in the street. ³ A bruised reed He will not break, and smoking flax He will not quench; He will bring forth justice for truth.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 43, part: 2,
    title: 'Israel Redeemed',
    theme: "God calls Israel by name; redeems from water and fire; declares 'I am He'",
    content: {
      NKJV: `¹ But now, thus says the LORD, who created you, O Jacob, and He who formed you, O Israel: "Fear not, for I have redeemed you; I have called you by your name; you are Mine. ² When you pass through the waters, I will be with you; and through the rivers, they shall not overflow you. When you walk through the fire, you shall not be burned, nor shall the flame scorch you. ³ For I am the LORD your God, the Holy One of Israel, your Savior."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 44, part: 2,
    title: 'The Folly of Idolatry',
    theme: 'God pours out His Spirit; the absurdity of idol-making exposed',
    content: {
      NKJV: `⁶ "Thus says the LORD, the King of Israel, and his Redeemer, the LORD of hosts: 'I am the First and I am the Last; besides Me there is no God.' " ²² I have blotted out, like a thick cloud, your transgressions, and like a cloud, your sins. Return to Me, for I have redeemed you.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 45, part: 2,
    title: 'Cyrus, God\'s Anointed',
    theme: 'Cyrus is named as deliverer; there is no God besides the LORD',
    content: {
      NKJV: `⁵ I am the LORD, and there is no other; there is no God besides Me. I will gird you, though you have not known Me. ²² Look to Me, and be saved, all you ends of the earth! For I am God, and there is no other. ²³ I have sworn by Myself; the word has gone out of My mouth in righteousness, and shall not return, that to Me every knee shall bow, every tongue shall take an oath.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 46, part: 2,
    title: 'The Fall of Babylon\'s Gods',
    theme: "Bel and Nebo collapse; unlike idols, God carries His people",
    content: {
      NKJV: `⁴ Even to your old age, I am He, and even to gray hairs I will carry you! I have made, and I will bear; even I will carry, and will deliver you. ⁹ Remember the former things of old, for I am God, and there is no other; I am God, and there is none like Me.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 47, part: 2,
    title: 'The Fall of Babylon',
    theme: "Babylon's luxury and sorcery cannot save her from sudden ruin",
    content: {
      NKJV: `⁷ "I shall be a lady forever," so that you did not take these things to heart, nor remember the latter end of them. ¹⁰ For you have trusted in your wickedness; you have said, "No one sees me"; your wisdom and your knowledge have warped you; and you have said in your heart, "I am, and there is no one else besides me."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 48, part: 2,
    title: 'Refined but Not as Silver',
    theme: 'God has tested Israel in the furnace of affliction; exhorted to leave Babylon',
    content: {
      NKJV: `¹⁰ Behold, I have refined you, but not as silver; I have tested you in the furnace of affliction. ¹¹ For My own sake, for My own sake, I will do it; for how should My name be profaned? And I will not give My glory to another. ¹⁸ Oh, that you had heeded My commandments! Then your peace would have been like a river, and your righteousness like the waves of the sea.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 49, part: 2,
    title: 'The Servant\'s Mission',
    theme: 'Second Servant Song: the Servant is a light to the Gentiles; Zion will not be forsaken',
    content: {
      NKJV: `¶ ⁶ He says: "It is too small a thing that You should be My Servant to raise up the tribes of Jacob, and to restore the preserved ones of Israel; I will also give You as a light to the Gentiles, that You should be My salvation to the ends of the earth." ¹⁵ Can a woman forget her nursing child, and not have compassion on the son of her womb? Surely they may forget, yet I will not forget you. ¹⁶ See, I have inscribed you on the palms of My hands.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 50, part: 2,
    title: 'The Servant\'s Obedience',
    theme: 'Third Servant Song: the Servant opens His ear; set His face like flint',
    content: {
      NKJV: `⁴ The Lord GOD has given Me the tongue of the learned, that I should know how to speak a word in season to him who is weary. He awakens Me morning by morning, He awakens My ear to hear as the learned. ⁷ For the Lord GOD will help Me; therefore I will not be disgraced; therefore I have set My face like a flint, and I know that I will not be ashamed.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 51, part: 2,
    title: 'Everlasting Salvation',
    theme: "Look to Abraham; the LORD's arm brings everlasting salvation; awake, O arm of the LORD",
    content: {
      NKJV: `³ For the LORD will comfort Zion, He will comfort all her waste places; He will make her wilderness like Eden, and her desert like the garden of the LORD. ¶ ¶ ¶ ⁶ Lift up your eyes to the heavens, and look on the earth beneath. For the heavens will vanish away like smoke, the earth will grow old like a garment, and those who dwell in it will die in like manner; but My salvation will be forever, and My righteousness will not be abolished.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 52, part: 2,
    title: 'Awake, O Zion',
    theme: 'Zion told to awake; redemption announced; the servant exalted',
    content: {
      NKJV: `⁷ How beautiful upon the mountains are the feet of him who brings good news, who proclaims peace, who brings glad tidings of good things, who proclaims salvation, who says to Zion, "Your God reigns!" ¹⁰ The LORD has made bare His holy arm in the eyes of all the nations; and all the ends of the earth shall see the salvation of our God.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 53, part: 2,
    title: 'The Suffering Servant',
    theme: 'Fourth Servant Song: the Servant is despised, pierced for our transgressions, and glorified',
    content: {
      NKJV: `³ He is despised and rejected by men, a Man of sorrows and acquainted with grief. And we hid, as it were, our faces from Him; He was despised, and we did not esteem Him. ⁴ Surely He has borne our griefs and carried our sorrows; yet we esteemed Him stricken, smitten by God, and afflicted. ⁵ But He was wounded for our transgressions, He was bruised for our iniquities; the chastisement for our peace was upon Him, and by His stripes we are healed. ⁶ All we like sheep have gone astray; we have turned, every one, to his own way; and the LORD has laid on Him the iniquity of us all.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 54, part: 2,
    title: 'The Eternal Covenant',
    theme: 'Zion enlarges her tent; the everlasting covenant of peace; her children taught by the LORD',
    content: {
      NKJV: `² Enlarge the place of your tent, and let them stretch out the curtains of your dwellings; do not spare; lengthen your cords, and strengthen your stakes. ¹⁰ "For the mountains shall depart and the hills be removed, but My kindness shall not depart from you, nor shall My covenant of peace be removed," says the LORD, who has mercy on you. ¹³ All your children shall be taught by the LORD, and great shall be the peace of your children.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 55, part: 2,
    title: 'An Invitation to the Thirsty',
    theme: "Come freely; God's word will not return void; everlasting covenant",
    content: {
      NKJV: `¹ "Ho! Everyone who thirsts, come to the waters; and you who have no money, come, buy and eat. Yes, come, buy wine and milk without money and without price." ⁶ Seek the LORD while He may be found, call upon Him while He is near. ⁸ "For My thoughts are not your thoughts, nor are your ways My ways," says the LORD. ¹¹ So shall My word be that goes forth from My mouth; it shall not return to Me void, but it shall accomplish what I please, and it shall prosper in the thing for which I sent it.`,
      KJV: '', ESV: '', NIV: '',
    },
  },

  // ── PART 3: Future Restoration (56–66) ───────────────────────────────────

  {
    number: 56, part: 3,
    title: 'Salvation for All',
    theme: 'Foreigners and eunuchs welcomed; corrupt watchmen rebuked',
    content: {
      NKJV: `¶ ¹ Thus says the LORD: "Keep justice, and do righteousness, for My salvation is about to come, and My righteousness to be revealed." ⁶ Also the sons of the foreigner who join themselves to the LORD, to serve Him, and to love the name of the LORD, to be His servants — everyone who keeps from defiling the Sabbath, and holds fast My covenant — ⁷ even them I will bring to My holy mountain, and make them joyful in My house of prayer. Their burnt offerings and their sacrifices will be accepted on My altar; for My house shall be called a house of prayer for all nations.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 57, part: 3,
    title: 'Idolatry Condemned',
    theme: 'Idolatry mocked; the high and holy One dwells with the contrite',
    content: {
      NKJV: `¹⁵ For thus says the High and Lofty One who inhabits eternity, whose name is Holy: "I dwell in the high and holy place, with him who has a contrite and humble spirit, to revive the spirit of the humble, and to revive the heart of the contrite ones." ¶ ²¹ "There is no peace," says my God, "for the wicked."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 58, part: 3,
    title: 'True Fasting',
    theme: 'Empty religious ritual contrasted with true fasting that looses bonds of injustice',
    content: {
      NKJV: `⁶ "Is this not the fast that I have chosen: to loose the bonds of wickedness, to undo the heavy burdens, to let the oppressed go free, and that you break every yoke? ⁷ Is it not to share your bread with the hungry, and that you bring to your house the poor who are cast out?" ¹¹ The LORD will guide you continually, and satisfy your soul in drought, and strengthen your bones; you shall be like a watered garden, and like a spring of water, whose waters do not fail.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 59, part: 3,
    title: 'Sin, Confession, and Redemption',
    theme: "Sin separates from God; Israel confesses; the Redeemer comes to Zion",
    content: {
      NKJV: `¹ Behold, the LORD's hand is not shortened, that it cannot save; nor His ear heavy, that it cannot hear. ² But your iniquities have separated you from your God; and your sins have hidden His face from you, so that He will not hear. ²⁰ "The Redeemer will come to Zion, and to those who turn from transgression in Jacob," says the LORD. ²¹ "As for Me," says the LORD, "this is My covenant with them: My Spirit who is upon you, and My words which I have put in your mouth, shall not depart from your mouth."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 60, part: 3,
    title: 'The Glory of Zion',
    theme: "Arise, shine — Zion's light has come; nations stream to her glory",
    content: {
      NKJV: `¹ Arise, shine; for your light has come! And the glory of the LORD is risen upon you. ² For behold, the darkness shall cover the earth, and deep darkness the people; but the LORD will arise over you, and His glory will be seen upon you. ³ The Gentiles shall come to your light, and kings to the brightness of your rising.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 61, part: 3,
    title: 'The Year of the LORD\'s Favour',
    theme: 'The anointed one brings good news; the year of jubilee; oaks of righteousness',
    content: {
      NKJV: `¹ The Spirit of the Lord GOD is upon Me, because the LORD has anointed Me to preach good tidings to the poor; He has sent Me to heal the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to those who are bound; ² to proclaim the acceptable year of the LORD. ³ To console those who mourn in Zion, to give them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness; that they may be called trees of righteousness, the planting of the LORD, that He may be glorified.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 62, part: 3,
    title: 'Zion\'s New Name',
    theme: "Zion called 'Hephzibah' — My delight; watchmen pray without ceasing",
    content: {
      NKJV: `⁴ You shall no longer be termed Forsaken, nor shall your land any more be termed Desolate; but you shall be called Hephzibah, and your land Beulah; for the LORD delights in you, and your land shall be married. ⁶ I have set watchmen on your walls, O Jerusalem; they shall never hold their peace day or night. You who make mention of the LORD, do not keep silent, ⁷ and give Him no rest till He establishes and till He makes Jerusalem a praise in the earth.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 63, part: 3,
    title: 'Vengeance and Redemption',
    theme: 'The LORD treads the winepress alone; prayer recalling past mercies',
    content: {
      NKJV: `¹ Who is this who comes from Edom, with dyed garments from Bozrah, this One who is glorious in His apparel, travelling in the greatness of His strength? "I who speak in righteousness, mighty to save." ¹⁶ Doubtless You are our Father, though Abraham was ignorant of us, and Israel does not acknowledge us. You, O LORD, are our Father; our Redeemer from Everlasting is Your name.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 64, part: 3,
    title: 'A Prayer for Mercy',
    theme: 'Prayer: rend the heavens; no eye has seen what God has prepared; we are the clay',
    content: {
      NKJV: `¹ Oh, that You would rend the heavens! That You would come down! That the mountains might shake at Your presence. ⁴ For since the beginning of the world men have not heard nor perceived by the ear, nor has the eye seen any God besides You, who acts for the one who waits for Him. ⁸ But now, O LORD, You are our Father; we are the clay, and You our potter; and all we are the work of Your hand.`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 65, part: 3,
    title: 'Judgment and Salvation',
    theme: 'God found by those who did not seek; judgment on the rebellious; the new creation',
    content: {
      NKJV: `¹ "I was sought by those who did not ask for Me; I was found by those who did not seek Me. I said, 'Here I am, here I am,' to a nation that was not called by My name." ¹⁷ "For behold, I create new heavens and a new earth; and the former shall not be remembered or come to mind." ²⁴ "It shall come to pass that before they call, I will answer; and while they are still speaking, I will hear."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
  {
    number: 66, part: 3,
    title: 'The LORD\'s Final Word',
    theme: "Heaven is God's throne; the humble trembler at His word welcomed; new creation endures",
    content: {
      NKJV: `¹ Thus says the LORD: "Heaven is My throne, and earth is My footstool. Where is the house that you will build Me? And where is the place of My rest? ² For all those things My hand has made, and all those things exist," says the LORD. "But on this one will I look: on him who is poor and of a contrite spirit, and who trembles at My word." ²² "For as the new heavens and the new earth which I will make shall remain before Me," says the LORD, "so shall your descendants and your name remain."`,
      KJV: '', ESV: '', NIV: '',
    },
  },
]
