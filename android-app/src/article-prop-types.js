import PropTypes from "prop-types";

export default {
  adTestMode: PropTypes.string,
  articleId: PropTypes.string.isRequired,
  omitErrors: PropTypes.bool.isRequired,
  scale: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired
};
