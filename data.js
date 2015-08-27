var candidateList = [
    'Bernie Sanders',
    'Hillary Clinton',
    'Jeb Bush',
    'Ted Cruz',
    'Marco Rubio',
    'Scott Walker',
];

var groupByFields = [
    'Candidate',
    'Super PAC',
    'Industry',
];

var sortByFields = [
    'Super PAC',
    'Candidate',
    'Amount',
    'Industry',
];

var dataset = [
    {
        "name": "Steven Spielberg",
        "pac": "Priorities USA Action",
        "candidate": "Hillary Clinton",
        "amount": 1,
        "industry": "Media",
        "link1": "https://en.wikipedia.org/wiki/Steven_Spielberg"
    },
    {
        "name": "George Soros",
        "pac": "Priorities USA Action",
        "candidate": "Hillary Clinton",
        "amount": 1,
        "industry": "Finance",
        "link1": "https://en.wikipedia.org/wiki/George_Soros",
        "link2": "https://www.opensecrets.org/outsidespending/donor_detail.php?cycle=2014&id=U0000000364&type=I&super=S&name=Soros%2C+George"
    },
    {
        "name": "Jeffrey Katzenberg",
        "pac": "Priorities USA Action",
        "candidate": "Hillary Clinton",
        "amount": 1,
        "industry": "Media",
        "link1": "https://en.wikipedia.org/wiki/Jeffrey_Katzenberg"
    },
    {
        "name": "Herbert M. Sandler",
        "pac": "Priorities USA Action",
        "candidate": "Hillary Clinton",
        "amount": 1,
        "industry": "Finance",
        "link1": "https://en.wikipedia.org/wiki/Herbert_Sandler"
    },
    {
        "name": "Haim Saban",
        "pac": "Priorities USA Action",
        "candidate": "Hillary Clinton",
        "amount": 1,
        "industry": "Media",
        "link1": "https://en.wikipedia.org/wiki/Haim_Saban"
    },
    {
        "name": "Cheryl Saban",
        "pac": "Priorities USA Action",
        "candidate": "Hillary Clinton",
        "amount": 1,
        "industry": "Media",
        "link1": "https://en.wikipedia.org/wiki/Cheryl_Saban"
    },
    {
        "name": "Donald Sussman",
        "pac": "Priorities USA Action",
        "candidate": "Hillary Clinton",
        "amount": 1,
        "industry": "Finance",
        "link1": "https://en.wikipedia.org/wiki/Donald_Sussman"
    },
    {
        "name": "Fair Share Action",
        "pac": "Priorities USA Action",
        "candidate": "Hillary Clinton",
        "amount": 1,
        "link1": "https://en.wikipedia.org/wiki/Fair_Share_Action"
    },
    {
        "name": "UA Political Education Committee",
        "pac": "Priorities USA Action",
        "candidate": "Hillary Clinton",
        "amount": 1
    },
    {
        "name": "Other Donors",
        "pac": "Priorities USA Action",
        "candidate": "Hillary Clinton",
        "amount": 6.65
    },
    {
        "name": "Hillary For America",
        "pac": "Correct the Record",
        "candidate": "Hillary Clinton",
        "amount": 0.28,
        "link1": "https://en.wikipedia.org/wiki/Hillary_Clinton_presidential_campaign,_2016"
    },
    {
        "name": "Pat A Stryker",
        "pac": "Correct the Record",
        "candidate": "Hillary Clinton",
        "amount": 0.25,
        "link1": "https://en.wikipedia.org/wiki/Pat_Stryker"
    },
    {
        "name": "Stephen M Silberstein",
        "pac": "Correct the Record",
        "candidate": "Hillary Clinton",
        "amount": 0.2,
        "link1": "http://rainmaker.apps.cironline.org/donors/stephen-m-silberstein/"
    },
    {
        "name": "Other Donors",
        "pac": "Correct the Record",
        "candidate": "Hillary Clinton",
        "amount": 0.71
    },
    {
        "name": "Miguel Fernandez",
        "pac": "Right to Rise USA",
        "candidate": "Jeb Bush",
        "amount": 3.02
    },
    {
        "name": "Rooney Holdings Inc.",
        "pac": "Right to Rise USA",
        "candidate": "Jeb Bush",
        "amount": 2
    },
    {
        "name": "William Oberndorf",
        "pac": "Right to Rise USA",
        "candidate": "Jeb Bush",
        "amount": 1.51
    },
    {
        "name": "Other Donors",
        "pac": "Right to Rise USA",
        "candidate": "Jeb Bush",
        "amount": 96.64
    },
    {
        "name": "Robert McNair Sr.",
        "pac": "Keep the Promise PAC",
        "candidate": "Ted Cruz",
        "amount": 0.5
    },
    {
        "name": "John W. Childs",
        "pac": "Keep the Promise PAC",
        "candidate": "Ted Cruz",
        "amount": 0.25,
        "industry": "Finance",
        "link1": "https://en.wikipedia.org/wiki/John_W._Childs"
    },
    {
        "name": "Thomas Patrick",
        "pac": "Keep the Promise PAC",
        "candidate": "Ted Cruz",
        "amount": 0.25
    },
    {
        "name": "Other Donors",
        "pac": "Keep the Promise PAC",
        "candidate": "Ted Cruz",
        "amount": 0.83
    },
    {
        "name": "Robert Mercer",
        "pac": "Keep the Promise I",
        "candidate": "Ted Cruz",
        "amount": 11,
        "industry": "Finance",
        "link1": "https://en.wikipedia.org/wiki/Robert_Mercer_(businessman)"
    },
    {
        "name": "William Lee Hanley, Jr.",
        "pac": "Keep the Promise I",
        "candidate": "Ted Cruz",
        "amount": 0.01
    },
    {
        "name": "Toby Neugebauer",
        "pac": "Keep the Promise II",
        "candidate": "Ted Cruz",
        "amount": 10,
        "industry": "Finance",
        "link1": "https://en.wikipedia.org/wiki/Toby_Neugebauer"
    },
    {
        "name": "Farris Wilks",
        "pac": "Keep the Promise III",
        "candidate": "Ted Cruz",
        "amount": 5,
        "industry": "Fracking",
        "link1": "https://en.wikipedia.org/wiki/Dan_and_Farris_Wilks"
    },
    {
        "name": "Jo Ann Wilks",
        "pac": "Keep the Promise III",
        "candidate": "Ted Cruz",
        "amount": 5,
        "industry": "Fracking",
        "link1": "https://en.wikipedia.org/wiki/Dan_and_Farris_Wilks"
    },
    {
        "name": "Daniel Wilks",
        "pac": "Keep the Promise III",
        "candidate": "Ted Cruz",
        "amount": 2.5,
        "industry": "Fracking",
        "link1": "https://en.wikipedia.org/wiki/Dan_and_Farris_Wilks"
    },
    {
        "name": "Staci Wilks",
        "pac": "Keep the Promise III",
        "candidate": "Ted Cruz",
        "amount": 2.5,
        "industry": "Fracking",
        "link1": "https://en.wikipedia.org/wiki/Dan_and_Farris_Wilks"
    },
    {
        "name": "Norman Braman",
        "pac": "Conservative Solutions PAC",
        "candidate": "Marco Rubio",
        "amount": 5,
        "industry": "Business",
        "link1": "https://en.wikipedia.org/wiki/Norman_Braman"
    },
    {
        "name": "Lawrence J. Ellison",
        "pac": "Conservative Solutions PAC",
        "candidate": "Marco Rubio",
        "amount": 3,
        "industry": "Business",
        "link1": "https://en.wikipedia.org/wiki/Larry_Ellison"
    },
    {
        "name": "Besilu Stables, LLC",
        "pac": "Conservative Solutions PAC",
        "candidate": "Marco Rubio",
        "amount": 2.5
    },
    {
        "name": "Laura Perlmutter",
        "pac": "Conservative Solutions PAC",
        "candidate": "Marco Rubio",
        "amount": 2
    },
    {
        "name": "Other Donors",
        "pac": "Conservative Solutions PAC",
        "candidate": "Marco Rubio",
        "amount": 3.56
    },
    {
        "name": "Diane Hendricks",
        "pac": "Unintimidated PAC",
        "candidate": "Scott Walker",
        "amount": 5,
        "industry": "Business",
        "link1": "https://en.wikipedia.org/wiki/Diane_Hendricks"
    },
    {
        "name": "Marlene Ricketts",
        "pac": "Unintimidated PAC",
        "candidate": "Scott Walker",
        "amount": 4.9
    },
    {
        "name": "Richard Uihlein",
        "pac": "Unintimidated PAC",
        "candidate": "Scott Walker",
        "amount": 1.75,
        "industry": "Business",
        "link1": "https://en.wikipedia.org/wiki/Richard_Uihlein"
    },
    {
        "name": "Other Donors",
        "pac": "Unintimidated PAC",
        "candidate": "Scott Walker",
        "amount": 8.37
    },
    {
        "name": "Willis Johnson",
        "pac": "Our American Revival",
        "candidate": "Scott Walker",
        "amount": 0.5
    },
    {
        "name": "Access Industries",
        "pac": "Our American Revival",
        "candidate": "Scott Walker",
        "amount": 0.25,
        "industry": "Business",
        "link1": "https://en.wikipedia.org/wiki/Access_Industries"
    },
    {
        "name": "Jeanne Sinquefield",
        "pac": "Our American Revival",
        "candidate": "Scott Walker",
        "amount": 0.25
    },
    {
        "name": "Richard Uihlein",
        "pac": "Our American Revival",
        "candidate": "Scott Walker",
        "amount": 0.2,
        "industry": "Business",
        "link1": "https://en.wikipedia.org/wiki/Richard_Uihlein"
    },
    {
        "name": "Other Donors",
        "pac": "Our American Revival",
        "candidate": "Scott Walker",
        "amount": 5.01
    },
];