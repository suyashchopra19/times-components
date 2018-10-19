const React = require('react');
const serverRenderer = require('./get-markup');
const { AuthorProfileWithProvider } = require('./author-profile');

module.exports = {
    renderAuthorProfile: ({ slug, currentPage, uri, perPage = 20, debounceTime = 0 }) => {
         serverRenderer.getMarkup({
            name: 'authorProfile',
            element: React.createElement(AuthorProfileWithProvider, {
                slug,
                page: currentPage,
                pageSize: perPage,
                analyticsStream: () => {},
                debounceTimeMs: debounceTime
            }),
            uri,
            useGET: true
        });
    }
};
