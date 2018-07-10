import "react-native";
import React from "react";
import { Dimensions } from "react-native";
import Interactive from "./src/interactive";

const props = {
  audioPlayer: {
    attributes: {
      src: "%2F%2Fnuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com%2Fprojects%2F54e8912427a8d007ece906c577fdca60.html",
      class: "v4-3"
    },
    element: "times-embed-iframe",
    source: "//components.timesdev.tools/lib2/times-embed-1.0.0/times-embed-iframe.html"
  },
  cardTimeline: {
    attributes: { 'deck-id': "4549" },
    element: 'times-card-carousel',
    source: '//components.timesdev.tools/lib2/times-card-carousel-1.0.0/times-card-carousel.html'
  },
  chapterHeading: {
    attributes: {
      chaptercounter: "Chapter%20one",
      heading: "Xxxx%20xxxxxx%20xxxx%20xxxxx%20",
      standfirst: "Xxxx%20xxxxxx%20xxxx%20xxxxx%20xxxxxxxx%20xxxxxx%20xxxx%20xx%20xxxxxxxx"
    },
    element: 'chapter-header',
    source: '//components.timesdev.tools/lib2/times-chapter-header-1.0.0/chapter-header.html'
  },
  googleSheetTable: {
    attributes: {
      headline: "Train company satisfaction",
      id: "1fo7mZidl8YIGyNcOm_X0-1fBcBYhnWcnzanzEBf5BsA",
      headers: "Provider, Dissatisfied or poor, Neither satisfied nor dissatisfied, Satisfied or good, Change since autumn 2015, Sample size",
      standfirst: "Data from the National Rail Passenger Survey, Autumn 2016",
      filter: "true",
      paging: "15"
    },
    element: 'times-table-google-sheet-jsonp',
    source: '//components.timesdev.tools/lib2/times-table-1.1.0/times-table-google-sheet-jsonp.html'
  },
  headline: {
    attributes: {
      headline: "Xxxxx%20xxxxxxxx%20xxx%20xxxxxxxxx",
      standfirst: "Xxxx%20xxxxxx%20xxxx%20xxxxx%20xxxxxxxx%20xxxxxx%20xxxx%20xx%20xxxxxxxx"
    },
    element: 'times-headline',
    source: '//components.timesdev.tools/lib2/times-headline-1.0.0/times-headline.html'
  },
  inArticlePuff: {
    attributes: {ratio: 'r16-9', src: 'http%3A%2F%2Fnuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com%2Fprojects%2F168411596e4c04bb30eaf83385d15c96.html'},
    element: 'times-embed-iframe-max',
    source: '//components.timesdev.tools/lib2/times-embed-1.0.0/times-embed-iframe-max.html'
  },
  livefyre: {
    attributes: { 'embed-code': '%3Cscript%20type%3D%22text%2Fjavascript%22%20src%3D%22https%3A%2F%2Fcdn.livefyre.com%2FLivefyre.js%22%3E%3C%2Fscript%3E%3Cdiv%20class%3D%22lf-app-embed%22%20data-lf-app%3D%224b13c742-c909-4946-b110-549b71dfcfc7%2Ftagged%2Fpublished%22%20data-lf-env%3D%22prod%22%20data-lf-read-only%3D%22%22%3E%3C%2Fdiv%3E%3Cscript%3ELivefyre.require(%5B%22app-embed%231.0.5%22%5D%2C%20function%20(appEmbed)%20%7BappEmbed.loadAll().done(function(embed)%20%7Bembed%20%3D%20embed%5B0%5D%3Bif%20(embed.el.onload%20%26%26%20embed.getConfig)%20%7Bembed.el.onload(embed.getConfig())%3B%7D%7D)%3B%7D)%3B%3C%2Fscript%3E'},
    element: 'times-livefyre',
    source: '//components.timesdev.tools/lib2/times-livefyre-1.0.0/times-livefyre.html'
  },
  matchScore: {
    attributes: {
      season: "112018",
      competition: "336",
      match: "828143"
    },
    element: 'opta-football-match-summary-v3',
    source: '//components.timesdev.tools/lib2/opta-football-1.0.0/opta-football-match-summary-v3.html'
  },
  matchStats: {
    attributes: {
      match: "828143",
      season: "112018",
      header: "true",
      competition: "336"
    },
    element: 'opta-football-match-stats-v3',
    source: '//components.timesdev.tools/lib2/opta-football-1.0.0/opta-football-match-stats-v3.html'
  },
  opinionary: {
    attributes: {'embed-code': "%3Cdiv%20class%3D%22opinary-widget-wrapper%22%20style%3D%22width%3A%20100%25%3B%20max-width%3A%201200px%3B%20height%3A100%25%3B%20margin%3A0%20auto%3B%22%3E%20%3Cdiv%20class%3D%22opinary-widget%22%20style%3D%22position%3Arelative%3B%20padding-top%3A%20100%25%3B%22%3E%20%3Ciframe%20class%3D%22opinary-iframe%22%20src%3D%22%2F%2Fcompass.pressekompass.net%2Fcompasses%2Ftimes%2Fmiddleeast%22%20style%3D%22position%3A%20absolute%3B%20top%3A%200%3B%20left%3A%200%3B%20width%3A%20100%25%3B%20height%3A%20100%25%22%20frameborder%3D%220%22%3E%3C%2Fiframe%3E%20%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cscript%20src%3D%22%2F%2Fcompass.pressekompass.net%2Fstatic%2Fopinary.js%22%3E%3C%2Fscript%3E"},
    element: 'times-opinary',
    source: '//components.timesdev.tools/lib2/times-opinary-1.0.0/times-opinary.html'
  },
  optaHub: {
    attributes: {season: '2018', competition: '8'},
    element: 'opta-football-hub',
    source: '//components.timesdev.tools/lib2/opta-football-1.0.0/opta-football-hub.html'
  },
  quiz: {
    attributes: {
      ratio: "r16-9",
      src: "http%3A%2F%2Fnuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com%2Fprojects%2F444b0d9a802792791bb9a2da568b463d.html"
    },
    element: 'times-embed-iframe-max',
    source: '//components.timesdev.tools/lib2/times-embed-1.0.0/times-embed-iframe-max.html'
  },
  quizMultipleRounds: {
    attributes: {'deck-id': '5761'} ,
    element: 'times-qwiz-rounds',
    source: '//components.timesdev.tools/lib2/times-qwiz-rounds-1.0.0/times-qwiz-rounds.html'
  },
  responsiveGraphics: {
    attributes: {src: "https%3A%2F%2Fnuk-tnl-editorial-prod-graphics.s3.amazonaws.com%2Fai2html2018%2FSport%2Fwinterolympics2018%2Fechristieshorttrack%2Fechristie-short-track2018.preview.html"},
    element: 'times-embed-iframe-max',
    source: '//components.timesdev.tools/lib2/times-embed-1.2.0/times-embed-iframe-max.html'
  },
  storymap: {
    attributes: {src: 'https%3A%2F%2Fnuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com%2Fprojects%2Fce6f311f2548c0e40fbd9beaaa288d32.html'},
    element: 'times-embed-iframe-max',
    source: '//components.timesdev.tools/lib2/times-embed-1.2.0/times-embed-iframe-max.html'
  }
};

export default {
  name: "Primitives/Interactive",
  children: [
    {
      type: "story",
      name: "Default",
      component: ({ select }) => {
        const value = select(
          "Interactive",
          {
            audioPlayer: 'Audio Player',
            cardTimeline: 'Card Timeline',
            chapterHeading: 'Chapter Heading',
            googleSheetTable: 'Google Sheets table',
            headline: 'Headline',
            inArticlePuff: 'In-article puffs',
            livefyre: 'Livefyre poll',
            matchScore: 'Opta - Match Score',
            matchStats: 'Opta - Match Stats',
            optaHub: 'Opta - Football hub',
            opinionary: 'Opinionary widgets',
            quiz: 'Quiz',
            quizMultipleRounds: 'Quiz - Multiple Rounds',
            responsiveGraphics: 'Responsive graphics (SVG)',
            storymap: 'Storymap',
          },
          'storymap'
        );

        const { attributes, element, source } = props[value];

        return (
          <Interactive
            attributes={attributes}
            element={element}
            source={source}
            height={Dimensions.get("window").height}
          />
        )
      }
    }
  ]
};