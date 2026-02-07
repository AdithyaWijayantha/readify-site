// Books Database
const booksData = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "fiction",
        pages: 304,
        length: "medium",
        image: "images/themidnight.jpg",
        synopsis: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices. Would you have done anything different, if you had the chance to undo your regrets?",
        series: [],
        reviews: [
            { source: "Goodreads", rating: "4.2/5", reviews: "1.2M" },
            { source: "Amazon", rating: "4.4/5", reviews: "45K" },
            { source: "BookPage", rating: "4.5/5", reviews: "850" }
        ]
    },
    {
        id: 2,
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "sci-fi",
        pages: 476,
        length: "long",
        image: "images/projecthail.jpg",
        synopsis: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
        series: [],
        reviews: [
            { source: "Goodreads", rating: "4.5/5", reviews: "850K" },
            { source: "Amazon", rating: "4.6/5", reviews: "78K" },
            { source: "NYT", rating: "4.3/5", reviews: "320" }
        ]
    },
    {
        id: 3,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "thriller",
        pages: 336,
        length: "medium",
        image:"images/thesilent.jpg",
        synopsis: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
        series: [],
        reviews: [
            { source: "Goodreads", rating: "4.1/5", reviews: "1.5M" },
            { source: "Amazon", rating: "4.3/5", reviews: "92K" },
            { source: "Publishers Weekly", rating: "4.0/5", reviews: "560" }
        ]
    },
    {
        id: 4,
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        genre: "fantasy",
        pages: 662,
        length: "long",
        image:"images/the_name_of_the_wind.jpg",
        synopsis: "Told in Kvothe's own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen. The intimate narrative of his childhood in a troupe of traveling players, his years spent as a near-feral orphan in a crime-ridden city, his daringly brazen yet successful bid to enter a legendary school of magic.",
        series: ["Book 1 of The Kingkiller Chronicle", "Book 2: The Wise Man's Fear"],
        reviews: [
            { source: "Goodreads", rating: "4.5/5", reviews: "950K" },
            { source: "Amazon", rating: "4.6/5", reviews: "34K" },
            { source: "Fantasy Literature", rating: "4.7/5", reviews: "420" }
        ]
    },
    {
        id: 5,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "non-fiction",
        pages: 320,
        length: "medium",
        image:"images/atomic_habits.jpg",
        synopsis: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
        series: [],
        reviews: [
            { source: "Goodreads", rating: "4.4/5", reviews: "1.1M" },
            { source: "Amazon", rating: "4.7/5", reviews: "125K" },
            { source: "Wall Street Journal", rating: "4.5/5", reviews: "290" }
        ]
    },
    {
        id: 6,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        genre: "fiction",
        pages: 400,
        length: "long",
        image:"images/seven.jpg",
        synopsis: "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.",
        series: [],
        reviews: [
            { source: "Goodreads", rating: "4.5/5", reviews: "1.8M" },
            { source: "Amazon", rating: "4.6/5", reviews: "68K" },
            { source: "BookBrowse", rating: "4.4/5", reviews: "730" }
        ]
    },
    {
        id: 7,
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        genre: "mystery",
        pages: 368,
        length: "medium",
        image:"images/the_thursday_murder_club.jpg",
        synopsis: "In a peaceful retirement village, four unlikely friends meet weekly to investigate unsolved murders. But when a local developer is found dead, the Thursday Murder Club find themselves in the middle of their first live case.",
        series: ["Book 1 of The Thursday Murder Club series", "Book 2: The Man Who Died Twice"],
        reviews: [
            { source: "Goodreads", rating: "4.2/5", reviews: "620K" },
            { source: "Amazon", rating: "4.5/5", reviews: "48K" },
            { source: "The Guardian", rating: "4.3/5", reviews: "890" }
        ]
    },
    {
        id: 8,
        title: "Beach Read",
        author: "Emily Henry",
        genre: "romance",
        pages: 368,
        length: "medium",
        image:"images/beach_read.jpg",
        synopsis: "Augustus Everett is an acclaimed author of literary fiction. January Andrews writes bestselling romance. When she pens a happily ever after, he kills off his entire cast. They're polar opposites. In fact, the only thing they have in common is that for the next three months, they're living in neighboring beach houses.",
        series: [],
        reviews: [
            { source: "Goodreads", rating: "4.1/5", reviews: "720K" },
            { source: "Amazon", rating: "4.3/5", reviews: "42K" },
            { source: "RT Book Reviews", rating: "4.5/5", reviews: "340" }
        ]
    },
    {
        id: 9,
        title: "Dune",
        author: "Frank Herbert",
        genre: "sci-fi",
        pages: 688,
        length: "long",
        image:"images/dune.jpg",
        synopsis: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange, a drug capable of extending life and enhancing consciousness.",
        series: ["Book 1 of Dune Chronicles", "Book 2: Dune Messiah", "Book 3: Children of Dune"],
        reviews: [
            { source: "Goodreads", rating: "4.3/5", reviews: "1.2M" },
            { source: "Amazon", rating: "4.5/5", reviews: "28K" },
            { source: "Sci-Fi Chronicles", rating: "4.8/5", reviews: "980" }
        ]
    },
    {
        id: 10,
        title: "The Guest List",
        author: "Lucy Foley",
        genre: "thriller",
        pages: 320,
        length: "medium",
        image:"images/the_guest_list.jpg",
        synopsis: "On an island off the coast of Ireland, guests gather to celebrate two people joining their lives together as one. The bride. The plus one. The best man. The wedding planner. The bridesmaid. The body. It's a wedding to die for.",
        series: [],
        reviews: [
            { source: "Goodreads", rating: "4.0/5", reviews: "580K" },
            { source: "Amazon", rating: "4.2/5", reviews: "54K" },
            { source: "Crime Reads", rating: "4.1/5", reviews: "670" }
        ]
    },
    {
        id: 11,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "fantasy",
        pages: 310,
        length: "medium",
        image:"images/the_hobbit.jpg",
        synopsis: "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep to whisk him away on an adventure.",
        series: ["Prequel to The Lord of the Rings trilogy"],
        reviews: [
            { source: "Goodreads", rating: "4.3/5", reviews: "3.5M" },
            { source: "Amazon", rating: "4.7/5", reviews: "45K" },
            { source: "Fantasy Hive", rating: "4.8/5", reviews: "1.2K" }
        ]
    },
    {
        id: 12,
        title: "Educated",
        author: "Tara Westover",
        genre: "non-fiction",
        pages: 334,
        length: "medium",
        image:"images/educated.jpg",
        synopsis: "Tara Westover was seventeen the first time she set foot in a classroom. Born to survivalists in the mountains of Idaho, she prepared for the end of the world by stockpiling home-canned peaches. The story of her quest for knowledge is an inspiring tale of self-invention.",
        series: [],
        reviews: [
            { source: "Goodreads", rating: "4.5/5", reviews: "2.1M" },
            { source: "Amazon", rating: "4.6/5", reviews: "95K" },
            { source: "NYT Book Review", rating: "4.7/5", reviews: "540" }
        ]
    },
    {
        id: 13,
        title: "People We Meet on Vacation",
        author: "Emily Henry",
        genre: "romance",
        pages: 364,
        length: "medium",
        image:"images/people_we_meet_on_vacation.jpg",
        synopsis: "Poppy and Alex. Alex and Poppy. They have nothing in common. She's a wild child; he wears khakis. She has insatiable wanderlust; he prefers to stay home. And somehow, ever since a fateful car share home from college, they've been best friends. That is, until one night changes everything.",
        series: [],
        reviews: [
            { source: "Goodreads", rating: "4.2/5", reviews: "680K" },
            { source: "Amazon", rating: "4.4/5", reviews: "38K" },
            { source: "Romance Readers", rating: "4.5/5", reviews: "520" }
        ]
    },
    {
        id: 14,
        title: "and_then_there_were_none",
        author: "Agatha Christie",
        genre: "mystery",
        pages: 272,
        length: "short",
        image:"images/and_then_there_were_none.jpg",
        synopsis: "Ten strangers are lured to an isolated island mansion off the Devon coast. Cut off from the mainland, with their generous hosts mysteriously absent, they are each accused of a terrible crime. When one of the party dies suddenly they realize they may be harboring a murderer among their number.",
        series: [],
        reviews: [
            { source: "Goodreads", rating: "4.3/5", reviews: "1.5M" },
            { source: "Amazon", rating: "4.6/5", reviews: "72K" },
            { source: "Mystery Tribune", rating: "4.7/5", reviews: "890" }
        ]
    },
    {
        id: 15,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "fiction",
        pages: 208,
        length: "short",
        image:"images/the_alchemist.jpg",
        synopsis: "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined.",
        series: [],
        reviews: [
            { source: "Goodreads", rating: "3.9/5", reviews: "3.2M" },
            { source: "Amazon", rating: "4.6/5", reviews: "38K" },
            { source: "World Literature Today", rating: "4.2/5", reviews: "670" }
        ]
    }
];

// Authors Database (for Author of the Day feature)
const authorsData = [
    {
        name: "Matt Haig",
        bio: "Matt Haig is an award-winning British author known for his novels exploring mental health, philosophy, and human existence. His bestselling works include The Midnight Library and Reasons to Stay Alive.",
        books: "Notable works: The Midnight Library, The Humans, How to Stop Time"
    },
    {
        name: "Andy Weir",
        bio: "Andy Weir is an American science fiction writer best known for his debut novel The Martian. He combines scientific accuracy with gripping storytelling to create compelling space adventures.",
        books: "Notable works: The Martian, Project Hail Mary, Artemis"
    },
    {
        name: "Taylor Jenkins Reid",
        bio: "Taylor Jenkins Reid is an American author known for her historical fiction and contemporary novels. Her emotionally resonant stories often explore fame, love, and identity.",
        books: "Notable works: The Seven Husbands of Evelyn Hugo, Daisy Jones & The Six, Malibu Rising"
    },
    {
        name: "Emily Henry",
        bio: "Emily Henry is a New York Times bestselling author of romance novels that blend humor, heart, and emotional depth. Her books have become modern classics in contemporary romance.",
        books: "Notable works: Beach Read, People We Meet on Vacation, Book Lovers"
    },
    {
        name: "Patrick Rothfuss",
        bio: "Patrick Rothfuss is an American fantasy writer and the author of The Kingkiller Chronicle series. His lyrical prose and intricate world-building have earned him a devoted fanbase.",
        books: "Notable works: The Name of the Wind, The Wise Man's Fear"
    },
    {
        name: "James Clear",
        bio: "James Clear is an author and speaker focused on habits, decision making, and continuous improvement. His work has been featured in The New York Times, Time, and more.",
        books: "Notable works: Atomic Habits"
    },
    {
        name: "Agatha Christie",
        bio: "Agatha Christie was an English writer known for her 66 detective novels and 14 short story collections. She is one of the most widely published authors of all time.",
        books: "Notable works: And Then There Were None, Murder on the Orient Express, The ABC Murders"
    }
];

// Book Quotes for Hero Section
const bookQuotes = [
    {
        quote: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
        author: "George R.R. Martin"
    },
    {
        quote: "Books are a uniquely portable magic.",
        author: "Stephen King"
    },
    {
        quote: "There is no friend as loyal as a book.",
        author: "Ernest Hemingway"
    },
    {
        quote: "Reading is essential for those who seek to rise above the ordinary.",
        author: "Jim Rohn"
    },
    {
        quote: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
        author: "Dr. Seuss"
    },
    {
        quote: "A book is a dream that you hold in your hand.",
        author: "Neil Gaiman"
    },
    {
        quote: "Reading is to the mind what exercise is to the body.",
        author: "Joseph Addison"
    }
];
