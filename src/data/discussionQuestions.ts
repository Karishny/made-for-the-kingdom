// Per-week discussion questions for the Isaiah study, adapted to the chapters
// read in that week. Three questions per week — enough to prompt real
// conversation without turning the session into a quiz. Weeks are keyed by
// their global week number (Part 1 = 1–11, Part 2 = 12–16, Part 3 = 17–19),
// matching the week numbers used everywhere else in the study.

export interface DiscussionQuestion {
  question: string
}

const WEEKLY_QUESTIONS: Record<number, DiscussionQuestion[]> = {
  1: [
    { question: "In chapter 1, God calls Israel's worship 'worthless' while their hands are full of wrongdoing. Where does our worship risk becoming empty ritual, and how do we return to a worship that pleases God?" },
    { question: "Chapter 2 envisions a day when 'everyone shall sit under his own vine and fig tree.' What does that picture of peace teach us about the kingdom we are made for?" },
    { question: "The 'Branch of the Lord' appears in chapter 4 as a promise of beauty rising from ashes. How does this image of restoration give you hope for things in your life that feel ruined?" },
  ],
  2: [
    { question: "In the song of the vineyard (chapter 5), God did everything for His vineyard. Why do we so often produce 'wild grapes,' and what does God's care reveal about His heart toward us?" },
    { question: "Isaiah's 'Here am I, send me' (chapter 6) follows his encounter with God's holiness. What does true humility before God look like in your own life?" },
    { question: "The sign of Immanuel (chapter 7) is given to a frightened king. How does the promise that 'God is with us' change how you face fear and uncertain decisions?" },
  ],
  3: [
    { question: "Isaiah 8 tells us not to fear what others fear but to fear the Lord. What fears have more grip on your heart than the Lord Himself?" },
    { question: "In chapter 9, a light dawns in the darkness and a child is born. How does the promise of 'Wonderful Counselor, Mighty God' shape the way you read the rest of this book?" },
    { question: "Chapter 10 warns that Assyria, God's own instrument, falls when it grows proud. Where are you tempted to take credit for what God has done through you?" },
  ],
  4: [
    { question: "The Root of Jesse (chapter 11) is filled with the Spirit and judges with righteousness. What does a leader 'made for the kingdom' look like, and how does that shape your calling?" },
    { question: "Chapter 12 turns judgment into a well of joy — 'I will praise You.' How does remembering God's salvation change the tone of your prayer life?" },
    { question: "Babylon's fall (chapters 13–14) reminds us that every human kingdom ends. How should that eternal perspective change how you spend your time and gifts?" },
  ],
  5: [
    { question: "The oracles against Moab and Damascus show God's sorrow even amid judgment. How do we hold justice and compassion together as He does?" },
    { question: "Chapter 18 describes a people 'tall and smooth' yet ultimately accountable to God. What does it mean to you that every power on earth answers to the Creator?" },
    { question: "These chapters speak of nations turning to God in the last days. How does the picture of the world being drawn to Zion encourage you to share your faith?" },
  ],
  6: [
    { question: "Egypt's judgment ends with the promise that Egypt, Assyria and Israel will be blessed together. What does this surprising hope teach us about the size of God's salvation?" },
    { question: "The 'Valley of Vision' (chapter 22) is a call to look to God rather than to human defenses. Where are you building walls of your own instead of seeking the Lord?" },
    { question: "Chapter 20 shows Isaiah walking barefoot as a sign. What would you be willing to do differently so that people see the urgency of God's message?" },
  ],
  7: [
    { question: "Tyre's fall (chapter 23) reminds us that wealth and trade cannot save. How do you guard your heart against trusting in provision rather than the Provider?" },
    { question: "In chapters 24–25, the earth is laid waste yet God spreads a feast for all peoples. How does the hope of the resurrection give you joy in the middle of a broken world?" },
    { question: "Chapter 26 gives the song of trust: 'You will keep him in perfect peace, whose mind is stayed on You.' What is one area where you need that peace right now?" },
  ],
  8: [
    { question: "Chapter 27 pictures God guarding His vineyard like a gardener. How do you experience God's patient tending in the seasons of your life?" },
    { question: "In chapter 28, the tested cornerstone is the only foundation that will not shake. What foundations have you built your life on, and how can you build more on Christ?" },
    { question: "Chapter 29 rebukes worship that is 'taught by the precept of men.' How do we keep our worship and service heartfelt rather than merely habitual?" },
  ],
  9: [
    { question: "Isaiah 30 warns against trusting in Egypt's horses and chariots, and says 'in quietness and confidence shall be your strength.' Where is it hardest for you to wait on the Lord?" },
    { question: "Chapter 31 reminds us that the Lord will defend Jerusalem as birds hover over their young. What image of God's protective love do you most need to hear today?" },
    { question: "Chapter 32 promises a King who reigns in righteousness and a kingdom of peace. How does longing for that kingdom shape how you live this week?" },
  ],
  10: [
    { question: "In chapter 33, those who walk righteously are promised bread and water and a fixed heart. What does it look like to 'fix' your heart on the Lord daily?" },
    { question: "Chapter 35 pictures the wilderness blossoming and the redeemed walking on the Highway of Holiness. What 'wilderness' in your life is God promising to make bloom?" },
    { question: "In chapter 36, the enemy mocks God and His people. How do you respond when people around you question whether God can really deliver you?" },
  ],
  11: [
    { question: "Hezekiah's prayer in chapter 37 spreads the mocking letter before the Lord. What would change if you took your biggest fears to God like Hezekiah took that letter?" },
    { question: "God answers with deliverance 'for His own sake and for David his servant.' How does it comfort you to know that God acts for His glory and for His promises?" },
    { question: "Chapter 39 ends with the warning of exile after Hezekiah shows his treasures. What 'treasures' might you be tempted to trust more than the Lord?" },
  ],
  12: [
    { question: "'Comfort, comfort My people' opens the second half of the book. How have you experienced the comfort of God in a season of trial, and how can you extend it to others?" },
    { question: "Isaiah 40 asks, 'Who has measured the waters in the hollow of His hand?' How does the greatness of God change the size of the fears you bring to Him?" },
    { question: "The servant of chapter 42 is gentle — 'a bruised reed He will not break.' How does this picture of Jesus shape how you treat people who are fragile?" },
  ],
  13: [
    { question: "'Fear not, for I have redeemed you; I have called you by your name; you are Mine.' Which of those three promises means the most to you right now, and why?" },
    { question: "Chapter 44 mocks the man who bows to a piece of wood he shaped himself. What modern 'idols' do we tend to shape, and how do we turn back to the living God?" },
    { question: "God calls Cyrus 'My shepherd' — a pagan king — to do His work. What does that say about God's ability to use anyone, including you, in His purposes?" },
  ],
  14: [
    { question: "Chapter 46 contrasts gods that must be carried with a God who carries us from birth to old age. How is God carrying you in this season?" },
    { question: "Babylon's fall in chapter 47 warns against self-confidence — 'I am, and there is no one else.' Where do we slip into that 'I've got this' attitude?" },
    { question: "In chapter 48, God says He teaches us to profit and leads us in the way we should go. What would it look like to genuinely let God lead your decisions this week?" },
  ],
  15: [
    { question: "The servant is called to be 'a light to the nations' (chapter 49). How is God using your gifts and story as light for the people around you?" },
    { question: "Chapter 50 describes the servant giving His back to those who struck Him. What does this suffering servant teach you about the love of God in the gospel?" },
    { question: "'Listen to Me, you who follow after righteousness' (chapter 51) — how do you pursue righteousness in a world that runs after comfort and approval?" },
  ],
  16: [
    { question: "Chapter 52 gives the good news of beautiful feet bringing salvation. Who first shared the gospel's good news with you, and who are you praying for to hear it?" },
    { question: "In chapter 53, He was pierced for our transgressions and crushed for our iniquities. How does personally receiving His sacrifice change how you approach God?" },
    { question: "'Everyone who thirsts, come to the waters' (chapter 55) — an open invitation. What is God inviting you to come to Him for today?" },
  ],
  17: [
    { question: "Chapter 56 welcomes foreigners and eunuchs into God's house — 'My house shall be called a house of prayer for all nations.' How inclusive is your welcome of others into the family of God?" },
    { question: "Chapter 58 defines true fasting: loose the bonds of wickedness and feed the hungry. What act of compassion is God prompting you to practice this week?" },
    { question: "Chapter 59 ends with the Redeemer coming to Zion for those who turn from transgression. How does confession prepare your heart to receive Him?" },
  ],
  18: [
    { question: "'Arise, shine, for your light has come' (chapter 60) — God's glory rises over Zion. How does the light of Christ in you reach the dark places around you?" },
    { question: "Jesus read chapter 61 in the synagogue and said, 'Today this Scripture is fulfilled in your hearing.' What does the good news to the poor, captive and blind mean for how you live?" },
    { question: "In chapter 63, God is both the mighty One who saves and the One whose Spirit is grieved by our rebellion. How do you hold awe of His power and nearness of His Spirit together?" },
  ],
  19: [
    { question: "'Oh that You would rend the heavens and come down' (chapter 64) is the cry of a waiting people. What are you longing for God to do in your life and in the world?" },
    { question: "Chapter 65 promises new heavens and a new earth where the wolf and the lamb feed together. How does that eternal hope shape the way you live today?" },
    { question: "The book ends with worship — 'from new moon to new moon, all flesh shall come to worship before Me.' How does made for the kingdom become your daily posture of worship?" },
  ],
}

export function getDiscussionQuestions(weekNumber: number): DiscussionQuestion[] {
  return WEEKLY_QUESTIONS[weekNumber] ?? []
}
