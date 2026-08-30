export interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
}

export const blogs: BlogPostData[] = [
  {
    id: "understanding-hearing-loss",
    title: "Understanding Hearing Loss: Causes, Symptoms, and Treatment Options",
    excerpt: "Hearing loss is a common condition that affects millions of people worldwide. Learn about the early warning signs, common causes, and modern treatment options available.",
    content: [
      "Hearing is one of our primary senses, connecting us to the people we love and the world around us. However, hearing loss is an incredibly common condition that affects people of all ages, from infants to seniors. Knowing the early warning signs and understanding the underlying causes can empower you to seek the right care at the right time.",
      "There are three main types of hearing loss: sensorineural, conductive, and mixed. Sensorineural hearing loss is the most common type, usually caused by damage to the tiny hair cells within the inner ear (cochlea) or the auditory nerve. This can happen due to natural aging (presbycusis), prolonged exposure to loud noises, genetics, or illnesses. Conductive hearing loss occurs when sound cannot pass efficiently through the outer or middle ear, often caused by fluid buildup, ear infections, or earwax blockage. Mixed hearing loss is a combination of both.",
      "At NANA Hearing Clinic, we emphasize the importance of early diagnosis. If you find yourself asking others to repeat themselves frequently, struggling to follow conversations in noisy environments, or hearing a persistent ringing in your ears (tinnitus), it is time to schedule a professional hearing assessment. Modern audiology offers highly effective solutions, ranging from advanced digital hearing aids to specialized therapies, restoring your connection to the sounds that matter most."
    ],
    image: "/images/Hearing-loss-ear.jpg",
    date: "August 10, 2026",
    category: "Hearing Health",
    author: "Dr. Alok Kumar",
    readTime: "4 min read"
  },
  {
    id: "evolution-of-hearing-aids",
    title: "The Evolution of Hearing Aids: From Bulky Devices to Invisible Technology",
    excerpt: "Discover how advanced German engineering and smartphone connectivity have transformed modern hearing aids into tiny, virtually invisible, and highly smart accessories.",
    content: [
      "For decades, the mention of hearing aids brought to mind bulky, noticeable devices that whistled and required constant adjustments. Today, the landscape of hearing technology has completely changed. Thanks to rapid advancements in micro-electronics and German engineering, modern hearing aids are smaller, smarter, and more discreet than ever before.",
      "One of the most exciting developments is the rise of Invisible-in-Canal (IIC) and Completely-in-Canal (CIC) hearing aids. These tiny machines sit deep inside your ear canal, making them virtually invisible to the naked eye. Despite their miniature size, they pack powerful digital processors that automatically adapt to your surroundings, amplifying speech while suppressing background noise for a clean, natural sound experience.",
      "In addition to discretion, modern hearing devices feature state-of-the-art smartphone connectivity. You can stream phone calls, music, and television audio directly to your hearing aids via Bluetooth. Rechargeable models have also eliminated the hassle of tiny batteries, offering a full day of usage on a single charge. At NANA Hearing Clinic, we offer free trials of these advanced models to help you find the perfect fit for your lifestyle."
    ],
    image: "/images/Ear-machine-24.jpg",
    date: "August 08, 2026",
    category: "Technology",
    author: "Dr. Smruti Rekha",
    readTime: "5 min read"
  },
  {
    id: "importance-of-speech-therapy",
    title: "Why Early Speech Therapy is Crucial for Children's Development",
    excerpt: "Speech and language skills are foundational for academic and social success. Understand how speech therapy helps children overcome communication challenges early on.",
    content: [
      "Communication is the cornerstone of human interaction, and children begin developing their communication skills from the moment they are born. For some children, however, acquiring language, pronouncing words, or coordinating speech sounds can be challenging. Recognizing these difficulties early and intervening with professional speech therapy can make a world of difference in their development.",
      "Speech and language delays can manifest in various ways, including difficulty understanding others, struggle to express thoughts, stuttering, or mispronouncing age-appropriate sounds. Early intervention, ideally before age five, is highly effective because a child's brain is rapidly developing and highly adaptable. Speech therapy doesn't just help children speak clearly; it also boosts their self-confidence, improves social interactions, and prepares them for school success.",
      "At NANA Hearing Clinic, our speech therapy programs are tailored to each child's unique needs. We use engaging, play-based techniques to help children build vocabulary, improve articulation, and master communication in a fun and supportive environment. If you have concerns about your child's speech milestones, consulting a specialist early is the best step you can take."
    ],
    image: "/images/treating-a-patient-3.jpg",
    date: "August 05, 2026",
    category: "Speech Care",
    author: "Sarah Jenkins, SLP",
    readTime: "3 min read"
  }
];
