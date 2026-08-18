const paragraphs = (...parts) => parts.join("\n\n");

export const commonPrayers = {
  signOfCross: {
    title: "Sign of the Cross",
    text: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
  },
  apostlesCreed: {
    title: "The Apostles' Creed",
    text: paragraphs(
      "I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead.",
      "I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
    ),
  },
  ourFather: {
    title: "Our Father",
    text: paragraphs(
      "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven.",
      "Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
    ),
  },
  hailMary: {
    title: "Hail Mary",
    text: paragraphs(
      "Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus.",
      "Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
    ),
  },
  gloryBe: {
    title: "Glory Be",
    text: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.",
  },
  fatimaPrayer: {
    title: "Fatima Prayer",
    text: "O my Jesus, forgive us our sins, save us from the fires of hell; lead all souls to Heaven, especially those in most need of thy mercy. Amen.",
  },
  hailHolyQueen: {
    title: "Hail, Holy Queen",
    text: paragraphs(
      "Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears.",
      "Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.",
      "Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ.",
    ),
  },
  rosaryClosing: {
    title: "Closing Prayer",
    text: "O God, whose Only Begotten Son, by his life, death, and resurrection, has purchased for us the rewards of eternal life, grant, we beseech thee, that while meditating on these mysteries of the most holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.",
  },
};

export const prayers = [
  {
    id: "jesus-prayer",
    title: "The Jesus Prayer",
    shortTitle: "Jesus Prayer",
    subtitle: "A prayer of the heart",
    intro: "A simple prayer to repeat slowly, returning your attention to Christ with each breath.",
    text: "Lord Jesus Christ, Son of God, have mercy on me, a sinner.",
    note: "Pray it once with attention, or repeat it gently in rhythm with your breathing.",
  },
  {
    id: "our-father",
    title: "The Our Father",
    shortTitle: "Our Father",
    subtitle: "The prayer Jesus taught",
    intro: "The Lord's Prayer, given by Jesus to his disciples and prayed at the beginning of every Rosary decade.",
    text: commonPrayers.ourFather.text,
  },
  {
    id: "hail-mary",
    title: "The Hail Mary",
    shortTitle: "Hail Mary",
    subtitle: "A prayer with the Mother of God",
    intro: "A prayer drawn from Scripture that asks Mary to intercede for us and lead us closer to her Son.",
    text: commonPrayers.hailMary.text,
  },
  {
    id: "apostles-creed",
    title: "The Apostles' Creed",
    shortTitle: "Apostles' Creed",
    subtitle: "The faith we profess",
    intro: "An ancient summary of Christian belief and the opening profession of faith in the Rosary.",
    text: commonPrayers.apostlesCreed.text,
  },
  {
    id: "glory-be",
    title: "The Glory Be",
    shortTitle: "Glory Be",
    subtitle: "Praise of the Holy Trinity",
    intro: "A brief doxology giving glory to the Father, Son, and Holy Spirit.",
    text: commonPrayers.gloryBe.text,
  },
  {
    id: "act-of-contrition",
    title: "The Act of Contrition",
    shortTitle: "Act of Contrition",
    subtitle: "A prayer of repentance",
    intro: "A sincere return to God's mercy, with sorrow for sin and a desire to begin again.",
    text: paragraphs(
      "O my God, I am heartily sorry for having offended thee, and I detest all my sins because I dread the loss of heaven and the pains of hell, but most of all because they offend thee, my God, who art all good and deserving of all my love.",
      "I firmly resolve, with the help of thy grace, to confess my sins, to do penance, and to amend my life. Amen.",
    ),
  },
  {
    id: "morning-offering",
    title: "The Morning Offering",
    shortTitle: "Morning Offering",
    subtitle: "Begin the day with God",
    intro: "Offer the whole day, including its work, joys, and difficulties, to Jesus.",
    text: "O Jesus, through the Immaculate Heart of Mary, I offer you my prayers, works, joys, and sufferings of this day for all the intentions of your Sacred Heart, in union with the Holy Sacrifice of the Mass throughout the world, for the salvation of souls, the reparation of sins, the reunion of all Christians, and in particular for the intentions of the Holy Father this month. Amen.",
  },
  {
    id: "grace-before-meals",
    title: "Grace Before Meals",
    shortTitle: "Grace Before Meals",
    subtitle: "A blessing of gratitude",
    intro: "Give thanks for God's provision and ask his blessing upon the food you are about to receive.",
    text: "Bless us O Lord, and these thy gifts, which we are about to receive, from thy bounty, through Christ, our Lord. Amen.",
  },
  {
    id: "grace-after-meals",
    title: "Grace After Meals",
    shortTitle: "Grace After Meals",
    subtitle: "Thanksgiving after a meal",
    intro: "Thank God for his gifts and remember the faithful departed in prayer.",
    text: "We give thee thanks for all thy benefits, O Almighty God, who livest and reignest world without end. Amen. May the souls of the faithful departed, through the mercy of God, rest in peace. Amen.",
  },
  {
    id: "st-michael",
    title: "St. Michael the Archangel",
    shortTitle: "St. Michael",
    subtitle: "A prayer for protection",
    intro: "Ask the Prince of the heavenly host for defense against evil and strength in spiritual battle.",
    text: paragraphs(
      "St. Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the heavenly host, by the power of God, cast into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls.",
      "Amen.",
    ),
  },
  {
    id: "hail-holy-queen",
    title: "The Hail, Holy Queen",
    shortTitle: "Hail, Holy Queen",
    subtitle: "The concluding Rosary prayer",
    intro: "The traditional Marian prayer offered after the five decades of the Rosary.",
    text: commonPrayers.hailHolyQueen.text,
  },
];

export const featuredPrayerIds = [
  "jesus-prayer",
  "apostles-creed",
  "act-of-contrition",
  "morning-offering",
  "st-michael",
];

export const mysteries = {
  joyful: {
    name: "Joyful Mysteries",
    days: "Monday and Saturday",
    theme: "The hidden life of Christ",
    color: "gold",
    items: [
      {
        title: "The Annunciation",
        image: "/assets/mysteries/joyful-annunciation.webp",
        scripture: "Luke 1:26-38",
        fruit: "Humility",
        meditation: "Mary receives the angel's word with faith and gives herself freely to God's will.",
      },
      {
        title: "The Visitation",
        image: "/assets/mysteries/joyful-visitation.webp",
        scripture: "Luke 1:39-56",
        fruit: "Love of neighbor",
        meditation: "Carrying Christ within her, Mary goes in haste to serve Elizabeth.",
      },
      {
        title: "The Nativity",
        image: "/assets/mysteries/joyful-nativity.webp",
        scripture: "Luke 2:1-20",
        fruit: "Poverty of spirit",
        meditation: "The Son of God enters the world in humility and is laid in a manger.",
      },
      {
        title: "The Presentation",
        image: "/assets/mysteries/joyful-presentation.webp",
        scripture: "Luke 2:22-38",
        fruit: "Obedience",
        meditation: "Mary and Joseph present Jesus to the Father, and Simeon recognizes the promised light.",
      },
      {
        title: "The Finding in the Temple",
        image: "/assets/mysteries/joyful-finding-temple.webp",
        scripture: "Luke 2:41-52",
        fruit: "Desire for Jesus",
        meditation: "After three days of searching, Mary and Joseph find Jesus in his Father's house.",
      },
    ],
  },
  luminous: {
    name: "Luminous Mysteries",
    days: "Thursday",
    theme: "The public ministry of Christ",
    color: "blue",
    items: [
      {
        title: "The Baptism in the Jordan",
        image: "/assets/mysteries/luminous-baptism-jordan.webp",
        scripture: "Matthew 3:13-17",
        fruit: "Openness to the Holy Spirit",
        meditation: "The Father's voice reveals Jesus as the beloved Son, and the Spirit descends upon him.",
      },
      {
        title: "The Wedding at Cana",
        image: "/assets/mysteries/luminous-wedding-cana.webp",
        scripture: "John 2:1-12",
        fruit: "Trust in Mary's intercession",
        meditation: "At Mary's request, Jesus performs his first sign and reveals his glory.",
      },
      {
        title: "The Proclamation of the Kingdom",
        image: "/assets/mysteries/luminous-proclamation-kingdom.webp",
        scripture: "Mark 1:14-15",
        fruit: "Conversion",
        meditation: "Jesus calls every heart to repentance, mercy, and the life of the Kingdom.",
      },
      {
        title: "The Transfiguration",
        image: "/assets/mysteries/luminous-transfiguration.webp",
        scripture: "Matthew 17:1-8",
        fruit: "Desire for holiness",
        meditation: "The glory of Christ shines before the disciples, strengthening them for what lies ahead.",
      },
      {
        title: "The Institution of the Eucharist",
        image: "/assets/mysteries/luminous-eucharist.webp",
        scripture: "Luke 22:14-20",
        fruit: "Adoration",
        meditation: "Jesus gives himself as food and establishes the memorial of his saving sacrifice.",
      },
    ],
  },
  sorrowful: {
    name: "Sorrowful Mysteries",
    days: "Tuesday and Friday",
    theme: "The Passion of Christ",
    color: "red",
    items: [
      {
        title: "The Agony in the Garden",
        image: "/assets/mysteries/sorrowful-agony-garden.webp",
        scripture: "Luke 22:39-46",
        fruit: "Surrender to God's will",
        meditation: "In anguish, Jesus prays and freely accepts the Father's will for our salvation.",
      },
      {
        title: "The Scourging at the Pillar",
        image: "/assets/mysteries/sorrowful-scourging-pillar.webp",
        scripture: "John 19:1",
        fruit: "Purity",
        meditation: "Jesus endures cruel suffering in silence, bearing the wounds of human sin.",
      },
      {
        title: "The Crowning with Thorns",
        image: "/assets/mysteries/sorrowful-crowning-thorns.webp",
        scripture: "Matthew 27:27-31",
        fruit: "Moral courage",
        meditation: "Mocked as a king, Christ answers humiliation with patience and love.",
      },
      {
        title: "The Carrying of the Cross",
        image: "/assets/mysteries/sorrowful-carrying-cross.webp",
        scripture: "Luke 23:26-32",
        fruit: "Patience in trials",
        meditation: "Jesus carries the cross to Calvary and invites us to follow him faithfully.",
      },
      {
        title: "The Crucifixion",
        image: "/assets/mysteries/sorrowful-crucifixion.webp",
        scripture: "John 19:17-37",
        fruit: "Self-giving love",
        meditation: "From the cross, Jesus forgives, entrusts Mary to us, and gives his life for the world.",
      },
    ],
  },
  glorious: {
    name: "Glorious Mysteries",
    days: "Wednesday and Sunday",
    theme: "The triumph of Christ",
    color: "green",
    items: [
      {
        title: "The Resurrection",
        image: "/assets/mysteries/glorious-resurrection.webp",
        scripture: "Matthew 28:1-10",
        fruit: "Faith",
        meditation: "Christ rises from the dead, conquering sin and opening the way to eternal life.",
      },
      {
        title: "The Ascension",
        image: "/assets/mysteries/glorious-ascension.webp",
        scripture: "Acts 1:6-11",
        fruit: "Hope",
        meditation: "Jesus returns to the Father and sends his disciples to witness to the Gospel.",
      },
      {
        title: "The Descent of the Holy Spirit",
        image: "/assets/mysteries/glorious-pentecost.webp",
        scripture: "Acts 2:1-13",
        fruit: "Wisdom",
        meditation: "The Holy Spirit fills Mary and the apostles with courage to proclaim Christ.",
      },
      {
        title: "The Assumption of Mary",
        image: "/assets/mysteries/glorious-assumption.webp",
        scripture: "Revelation 12:1",
        fruit: "Grace of a holy death",
        meditation: "Mary is taken body and soul into heavenly glory, a sign of hope for the Church.",
      },
      {
        title: "The Coronation of Mary",
        image: "/assets/mysteries/glorious-coronation.webp",
        scripture: "Revelation 12:1",
        fruit: "Trust in Mary's intercession",
        meditation: "Mary is crowned Queen of Heaven and continues to pray for all her children.",
      },
    ],
  },
};

export function getSuggestedMystery(date = new Date()) {
  return ["glorious", "joyful", "sorrowful", "glorious", "luminous", "sorrowful", "joyful"][
    date.getDay()
  ];
}
